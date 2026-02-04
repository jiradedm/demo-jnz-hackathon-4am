# Prompt: Generate BRD

## CONTEXT

- Prompt นี้เป็น session ใหม่
- ห้ามใช้ memory จาก session อื่น
- เอกสารใน repo คือ Source of Truth

## ROLE

ทำหน้าที่เป็น Architect (Business View)

## INPUT

ผมอยากทำเว็ปไซต์สำหรับในการใช้ AI สร้าง slide pitch deck
คล้ายๆ https://pitch.com แต่เปลี่ยนจากการแก้ไข เป็นการสร้างจาก input file
โดยมี brand identity ตาม file นี้ \_docs/resource/Winitch Brand CI.txt
และมี syle design แบบ modern อิงจาก file นี้ \_docs/resource/1.html

โดยการสร้าง slide จะมาจากหลาย step

1. form โดยมี input ข้อมูลที่จำเป็นที่ต้องกรอกรวมถึงการ
2. แสดง slide ที่ gen ออกมา แสดงเหมือนเป็น power point บน website โดยที่มี chat ที่สามารถ prompt ในการแก้ไขแต่ละ slide realtime ได้
3. download slide เมื่อเสร็จสิ้นการแก้ไข

note: result ให้เป็น mock data แต่มี flow/animation เหมือนทำงานได้จริง

## TEMPLATE

- \_docs/01-brd/brd-template.md ไฟล์ template ที่ต้องยึดตาม 100%

## TASK

สร้างเอกสาร BRD ที่มี:

- Objective
- ผู้ใช้งาน
- Scope / Out of Scope
- ตัวอย่างการใช้งานจริง
- Success Criteria

## CONSTRAINTS

- ใช้ภาษาคน
- ไม่ลงเทคนิค
- ไม่เขียนโค้ด

## OUTPUT

- เขียนไฟล์: \_docs/01-brd/brd.md
