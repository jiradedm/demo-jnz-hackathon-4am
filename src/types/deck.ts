/**
 * Data models สำหรับ deck / pitch ตาม SDD Section 4.
 * ใช้กับ Form ส่ง POST และ response จาก Backend.
 */

/** ข้อมูลที่ส่งจากฟอร์มไปยัง Backend (สร้าง deck) */
export interface DeckInput {
  projectName: string
  objective: string
  /** จุดเด่น — ส่งเป็น array (จาก textarea แยกบรรทัด) */
  highlights: string[]
  companyInfo: string
}

/** Slide ใน deck (จาก Backend) */
export interface Slide {
  id: string
  deckId: string
  order: number
  content: string
  layout?: string
}

/** Deck ที่ Backend สร้าง (response จาก POST /api/deck) */
export interface Deck {
  id: string
  createdAt?: string
  title?: string
  slides: Slide[]
}
