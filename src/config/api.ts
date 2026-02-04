/**
 * API base URL and endpoint constants for deck, chat, download.
 * อิงจาก SDD Section 3: API / Interface Design (Draft)
 * ใน Phase 1 ใช้เฉพาะ config ฝั่ง Frontend (ยังไม่มี Backend)
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'

export const api = {
  base: API_BASE,

  /** POST — ส่งข้อมูล pitch สร้าง deck; คืน deck id และชุด slide เริ่มต้น */
  deckCreate: `${API_BASE}/api/deck`,

  /** GET — ดึงข้อมูล deck และรายการ slide ปัจจุบัน */
  deckById: (id: string) => `${API_BASE}/api/deck/${id}`,

  /** GET — ดึงรายการ slide ของ deck */
  deckSlides: (id: string) => `${API_BASE}/api/deck/${id}/slides`,

  /** POST หรือ GET — เรียกขั้นตอนดาวน์โหลด (mock) */
  deckDownload: (id: string) => `${API_BASE}/api/deck/${id}/download`,
} as const

export type ApiEndpoints = typeof api
