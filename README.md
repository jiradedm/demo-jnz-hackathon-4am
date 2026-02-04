# Pitch Deck (Winitch)

Frontend สำหรับระบบสร้าง pitch deck จากข้อมูลผู้ใช้ — อิง BRD/SRD/SDD และ Winitch Brand CI

## Stack

- React 18
- Vite 5
- TypeScript
- Tailwind CSS

## วิธีรัน

```bash
npm install
npm run dev
```

เปิด [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Environment (เมื่อมี Backend)

คัดลอก `.env.example` เป็น `.env` แล้วกำหนดค่าตามต้องการ:

- `VITE_API_BASE` — URL ของ Backend API (default: `http://localhost:3000`)
- `VITE_WS_BASE` — (optional) URL สำหรับ WebSocket; ถ้าไม่กำหนดจะได้จาก `VITE_API_BASE`

## โครงสร้าง (Phase 1)

- `src/config/api.ts` — REST endpoint สำหรับ deck/chat/download
- `src/config/realtime.ts` — URL WebSocket/SSE สำหรับแชท
- `src/theme/` — อ้างอิง Winitch brand tokens (สี/ฟอนต์อยู่ใน Tailwind config และ `index.css`)
- Winitch brand: สี winitch/victory/dark, ฟอนต์ Inter + Prompt (ตาม `_docs/resource`)
