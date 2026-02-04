/**
 * Mock pitch deck data สำหรับ Deck Viewer (front-end only).
 * โครงสร้างตาม pitch deck ทั่วไป: title → problem → solution → product → traction → team → ask → thank you
 */

export interface MockSlideContent {
  id: string
  order: number
  layout: 'title' | 'section' | 'bullet' | 'two-column' | 'closing'
  title: string
  subtitle?: string
  bullets?: string[]
  left?: string
  right?: string
}

export const MOCK_PITCH_DECK: MockSlideContent[] = [
  {
    id: 's1',
    order: 1,
    layout: 'title',
    title: 'Winitch',
    subtitle: 'The Winning Intelligence Engine — Decode the TOR. Design the Win.',
  },
  {
    id: 's2',
    order: 2,
    layout: 'section',
    title: 'ปัญหา (Problem)',
    bullets: [
      'อ่าน TOR วนไปมา 3–4 ชั่วโมง',
      'ตีความผิด จับประเด็นไม่ครบ ตกหล่น',
      'สไลด์สวยแต่เนื้อหา "ไม่โดนใจ" กรรมการ',
    ],
  },
  {
    id: 's3',
    order: 3,
    layout: 'section',
    title: 'แนวทางแก้ (Solution)',
    bullets: [
      'สแกน TOR และสกัด Insight ในวินาที',
      'Checklist แม่นยำ ป้องกันการตกหล่น',
      'โครงสร้างสไลด์ออกแบบมาเพื่อชนะใจกรรมการ',
    ],
  },
  {
    id: 's4',
    order: 4,
    layout: 'two-column',
    title: 'ทำอย่างไร (How It Works)',
    left: 'TOR Insight Extractor — แกะรอยความต้องการที่ซ่อนอยู่',
    right: 'AI Content Architect — เปลี่ยนความว่างเปล่าเป็นโครงสร้างสไลด์ที่ขายได้จริง',
  },
  {
    id: 's5',
    order: 5,
    layout: 'bullet',
    title: 'จุดเด่น (Why Winitch)',
    bullets: [
      'ลดเวลาทำงานจาก 4 ชั่วโมงเหลือ 5 นาที',
      'Human + AI: ความแม่นยำกับความเร็ว',
      'Strategic Partner ไม่ใช่แค่เครื่องมือ',
    ],
  },
  {
    id: 's6',
    order: 6,
    layout: 'section',
    title: 'ทีม (Team)',
    subtitle: 'Powered by Jenosize — ผสานความเชี่ยวชาญด้าน AI กับประสบการณ์การประมูล',
  },
  {
    id: 's7',
    order: 7,
    layout: 'section',
    title: 'Call to Action',
    subtitle: 'พร้อมเปลี่ยนเกมการประมูลหรือยัง? ลองใช้ Winitch วันนี้',
  },
  {
    id: 's8',
    order: 8,
    layout: 'closing',
    title: 'ขอบคุณ',
    subtitle: 'Winitch — The Winning Intelligence Engine',
  },
]
