# SDD: System Design Document
## 1. Architecture Overview
ภาพรวมโครงสร้างระบบ

- **รูปแบบ**: Client–Server; Frontend (SPA หรือ multi-view) ติดต่อ Backend ผ่าน REST + ช่องทาง realtime (WebSocket หรือ Server-Sent Events) สำหรับแชท
- **Frontend**: รับข้อมูลจากผู้ใช้ (ฟอร์ม/อัปโหลด) แสดง deck แบบหลาย slide มีลำดับ, UI แชทสำหรับส่ง prompt แก้ไข, ปุ่มดาวน์โหลด; ใช้ Winitch brand (สี ฟอนต์ layout) แบบ modern
- **Backend**: รับ payload จากฟอร์ม/อัปโหลด → สร้าง/อัปเดต deck และ slide (logic เป็น mock), รับข้อความแชท → ประมวลและส่งผลกลับแบบ realtime (mock ได้), จัดการขอดาวน์โหลด (mock)
- **ขอบเขต**: ไม่มีระบบสมาชิก/ล็อกอิน ไม่เชื่อม AI จริง ไม่ export เป็นไฟล์จริง; การ generate เนื้อหาและดาวน์โหลดเป็น mock ได้ แต่ flow และการตอบสนองต้องให้ความรู้สึกว่าใช้งานได้จริง

---

## 2. Component Responsibilities
อธิบายหน้าที่ของแต่ละส่วน

| Component | Responsibility |
| --------- | -------------- |
| **Frontend – Form/Input** | แสดงฟอร์มหรือช่องทางอัปโหลด รวบรวมข้อมูล pitch (ชื่อโปรเจกต์ วัตถุประสงค์ จุดเด่น ข้อมูลบริษัท) ส่งไปยัง Backend |
| **Frontend – Deck Viewer** | แสดง deck เป็นชุด slide บนเว็บ รองรับการนำทาง/มองเห็นหลาย slide และลำดับ คล้ายการดู deck |
| **Frontend – Chat UI** | แสดงแชท ให้ผู้ใช้พิมพ์ prompt เพื่อแก้ไขเนื้อหา/การจัดวาง slide แสดงการอัปเดตหรือการตอบสนองแบบ realtime |
| **Frontend – Download** | แสดงปุ่ม/ขั้นตอนดาวน์โหลด เมื่อผู้ใช้พอใจ; ในรอบนี้เรียก flow ดาวน์โหลด (mock) |
| **Frontend – Brand/Style** | ใช้ Winitch brand identity (สี ฟอนต์ ลักษณะภาพรวม) และ style แบบ modern ตามที่กำหนด |
| **Backend – Deck Service** | รับข้อมูลจากฟอร์ม/อัปโหลด สร้าง deck และ slide ชุดแรก (mock); อัปเดต slide ตามผลจากแชท (mock) |
| **Backend – Chat/Realtime** | รับข้อความแชท ประมวล (mock) ส่งผลกลับแบบ realtime ให้ Frontend อัปเดต deck/view |
| **Backend – Download** | รับคำขอดาวน์โหลด คืนสถานะหรือข้อมูล mock (ไม่จำเป็นต้องเป็นไฟล์จริง) |

---

## 3. API / Interface Design (Draft)
| Method | Interface | Description |
| ------ | --------- | ----------- |
| POST | `/api/deck` หรือ `/api/deck/create` | ส่งข้อมูล pitch (จากฟอร์ม/อัปโหลด) สร้าง deck; คืน deck id และชุด slide เริ่มต้น (mock) |
| GET | `/api/deck/:id` | ดึงข้อมูล deck และรายการ slide ปัจจุบัน |
| GET | `/api/deck/:id/slides` | ดึงรายการ slide ของ deck (หรือรวมใน GET deck ตามการออกแบบ) |
| WebSocket หรือ SSE | `/api/deck/:id/chat` หรือ `/api/chat` | เชื่อมต่อ realtime; Client ส่ง prompt แก้ไข slide, Server ส่งการอัปเดต/ผลลัพธ์กลับแบบ realtime (mock) |
| POST | `/api/deck/:id/download` หรือ GET | เรียกขั้นตอนดาวน์โหลด; คืน URL สมมติ หรือ payload mock (ไม่ใช่ไฟล์จริงใน scope ปัจจุบัน) |

---

## 4. Data Model (Draft)
อธิบายโครงสร้างข้อมูลหลัก

- **DeckInput**: ข้อมูลที่ส่งจากฟอร์ม/อัปโหลด — `projectName`, `objective`, `highlights` (array หรือ text), `companyInfo` (หรือ nested object ตามความจำเป็น); ใช้เป็นต้นทางสร้าง slide
- **Deck**: `id`, `createdAt`, อ้างอิงถึง slide หลายรายการ; อาจมี `title` หรือ metadata เพิ่มตามต้องการ
- **Slide**: `id`, `deckId`, `order` (หรือ `index`), `content` (ข้อความ/หัวข้อ/รายการ), `layout` (หรือ type เช่น title, bullet, image placeholder); แก้ไขได้ผ่านแชท
- **Chat**: ฝั่ง Client ส่ง `message` (prompt ข้อความ), อาจมี `slideId` หรือ `deckId` เพื่อระบุเป้าหมาย; ฝั่ง Server ส่งกลับการอัปเดต เช่น `slideUpdates[]` หรือข้อความตอบกลับ + สถานะ
- **Download (mock)**: สถานะหรือ record ที่ระบุว่า “มีการขอดาวน์โหลดแล้ว”; อาจมี `downloadUrl` จำลอง หรือ `status: "ready"` สำหรับ mock

---

## 5. Edge Cases & Risks
กรณีที่ต้องระวัง

- **Realtime ล่าช้า**: ถ้าใช้ mock ที่ตอบช้า อาจทำให้ความรู้สึก realtime ลดลง — ควรจำลองความล่าช้าให้เหมาะสมหรือตอบกลับเร็วพอให้ flow ลื่น
- **ข้อมูลเข้าไม่ครบ**: ฟอร์มหรืออัปโหลดอาจส่งค่าว่างหรือไม่ครบ — กำหนดค่า default หรือข้อความแจ้งเตือนที่ Frontend/Backend
- **Deck/Slide ขนาดใหญ่**: ถ้า slide เยอะ อาจกระทบการโหลดหรือการอัปเดต — พิจารณาโหลดเป็นช่วงหรือจำกัดจำนวนใน view
- **การ sync แชทกับ deck**: ให้การอัปเดตจากแชทสะท้อนไปที่ deck viewer ทันที และไม่ทับกันเมื่อมีหลายข้อความติดกัน (ลำดับเหตุการณ์)
- **ขอบเขต mock**: แยกขอบเขต mock (generate เนื้อหา, export) ให้ชัด เพื่อสลับเป็นของจริงใน phase ถัดไปโดยไม่กระทบ flow หลัก

---

## 6. Design Notes
แนวคิดสำคัญสำหรับการ implement

- **Winitch brand**: กำหนดค่าคงที่สำหรับสี ฟอนต์ spacing ไว้ที่ Frontend (หรือ design tokens) เพื่อให้เปลี่ยน theme ง่าย
- **Realtime**: เลือก WebSocket หรือ SSE ตาม stack ที่ใช้; สำหรับ mock อาจใช้ delay สั้นๆ แล้วส่งผลกลับทีเดียวหรือแบบ stream จำลอง
- **State ฝั่ง Client**: เก็บ deck และ slide หลังโหลด; เมื่อได้การอัปเดตจากแชท ให้ merge กับ state และ re-render deck viewer
- **ไม่เขียน production code ในขั้นตอนนี้**: SDD นี้เป็นระดับ design เท่านั้น; การ implement จริงจะยึด draft API และ data model นี้เป็นฐาน
