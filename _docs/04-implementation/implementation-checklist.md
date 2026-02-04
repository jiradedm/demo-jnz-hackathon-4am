> ⚠️ This document is a fixed template.
> Do NOT change section order or headings.
> Fill content only.

# Implementation Checklist
## Phase 1: Setup
- [x] สร้างโครงสร้างโปรเจกต์ (Frontend + Backend แยกหรือ monorepo ตาม stack) — ทำเฉพาะ Frontend: React + Vite + TypeScript + Tailwind
- [x] ตั้งค่า config พื้นฐาน (build, env, port)
- [x] กำหนด Winitch brand tokens ฝั่ง Frontend (สี, ฟอนต์, spacing) ตาม Brand CI
- [x] ตั้งค่า REST API base และ endpoint สำหรับ deck/chat/download — ฝั่ง Frontend: `src/config/api.ts`, `.env.example`
- [x] ตั้งค่าช่องทาง realtime (WebSocket หรือ SSE) สำหรับแชท — ฝั่ง Frontend: `src/config/realtime.ts`

## Phase 2: Core Features
- [x] **Form/Input**: ฟอร์มหรือช่องทางอัปโหลด รวบรวม pitch (projectName, objective, highlights, companyInfo) ส่ง POST ไปยัง Backend
- [ ] **Backend – Deck**: รับ payload จากฟอร์ม → สร้าง deck + slide ชุดแรก (mock) คืน deck id และ slides เริ่มต้น
- [x] **Deck Viewer**: แสดง deck เป็นชุด slide มีลำดับ นำทางดูได้หลาย slide (front-end mock ใช้ Swiper + mock data จาก libs)
- [ ] **Chat UI**: หน้า/คอมโพเนนต์แชท ให้ผู้ใช้พิมพ์ prompt ส่งผ่าน realtime channel
- [ ] **Backend – Chat**: รับข้อความแชท ประมวล (mock) ส่งผลกลับแบบ realtime (slideUpdates หรือข้อความตอบกลับ)
- [ ] **Frontend – Merge state**: เมื่อได้การอัปเดตจากแชท merge กับ state deck และ re-render deck viewer
- [ ] **Download**: ปุ่ม/flow ดาวน์โหลด เรียก API; Backend คืนสถานะหรือ payload mock (ไม่ใช่ไฟล์จริง)
- [ ] **Brand/Style**: ใช้ Winitch brand + style แบบ modern ตามที่กำหนดใน SDD

## Phase 3: Enhancement
- [ ] Validation ข้อมูลเข้า: ค่าว่าง/ไม่ครบ กำหนด default หรือแจ้งเตือนที่ Frontend/Backend
- [ ] Realtime feel: จำลอง delay ให้เหมาะสม (หรือตอบกลับเร็ว) ให้ flow แชทลื่น
- [ ] ลำดับเหตุการณ์แชท: ให้การอัปเดตหลายข้อความไม่ทับกัน (order/sequence)
- [ ] Deck/Slide ขนาดใหญ่: พิจารณาโหลดเป็นช่วงหรือจำกัดจำนวนใน view ถ้าจำเป็น
- [ ] แยกขอบเขต mock (generate เนื้อหา, export) ให้ชัด เพื่อสลับเป็นของจริงใน phase ถัดไป

## Phase 4: Finalization
- [ ] ลบ code ที่ไม่ใช้ คงเฉพาะ flow ที่จำเป็น
- [ ] อัปเดต README หรือ docs น้อยที่สุด (วิธีรัน, env ที่ต้องมี)
- [ ] ตรวจว่า flow หลัก (ฟอร์ม → deck → แชท → ดาวน์โหลด) ทำงานครบและให้ความรู้สึกใช้งานได้จริง

---

## สิ่งที่ไม่ทำในรอบนี้ (Out of Scope)
- ระบบสมาชิก / ล็อกอิน
- การเชื่อม AI จริง (ใช้ mock เท่านั้น)
- การ export เป็นไฟล์จริง (PDF/PPT เป็นต้น)
- Production deployment, security hardening, การ scale
