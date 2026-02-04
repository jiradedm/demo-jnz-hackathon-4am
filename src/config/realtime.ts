/**
 * ช่องทาง realtime สำหรับแชทแก้ไข slide (WebSocket หรือ SSE)
 * อิงจาก SDD: Client ส่ง prompt, Server ส่งการอัปเดตกลับแบบ realtime
 * ใน Phase 1 ใช้เฉพาะ config ฝั่ง Frontend
 */

/** Base URL สำหรับ WebSocket (ถ้าไม่กำหนดจะได้จาก VITE_API_BASE แปลงเป็น ws/wss) */
const WS_BASE = (() => {
  const envWs = import.meta.env.VITE_WS_BASE
  if (envWs) return envWs
  const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'
  const u = new URL(apiBase)
  u.protocol = u.protocol === 'https:' ? 'wss:' : 'ws:'
  return u.origin
})()

/** URL สำหรับเชื่อมต่อแชท realtime ตาม deck id */
export function getChatWebSocketUrl(deckId: string): string {
  return `${WS_BASE}/api/deck/${deckId}/chat`
}

/** ถ้า Backend รองรับ SSE แทน WebSocket ใช้ endpoint นี้ */
export function getChatStreamUrl(deckId: string): string {
  const base = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'
  return `${base}/api/deck/${deckId}/chat`
}

export const realtime = {
  wsBase: WS_BASE,
  getChatWebSocketUrl,
  getChatStreamUrl,
} as const
