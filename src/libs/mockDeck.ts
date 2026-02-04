/**
 * Mock pitch deck data สำหรับ Deck Viewer (front-end only).
 * โครงสร้างตาม pitch deck ทั่วไป: title → problem → solution → product → market → traction → ask → thank you
 * อิง Winitch Brand CI: The Sage + The Magician, Electric Indigo, Victory Green, Tone: Professional, Sharp, Encouraging.
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
    subtitle:
      'The Winning Intelligence Engine — Decode the TOR. Design the Win. เปลี่ยนเอกสาร TOR ที่ซับซ้อนให้เป็น Pitch Deck ผู้ชนะด้วย Agentic AI',
  },
  {
    id: 's2',
    order: 2,
    layout: 'section',
    title: 'The Challenge',
    subtitle: 'ความซับซ้อนของการทำ Proposal จาก TOR สร้างต้นทุนและความเสี่ยงที่วัดได้',
    bullets: [
      'Complex Requirements — แกะ TOR 100+ หน้าใช้เวลา 5–7 วัน และเสี่ยงตีความผิดพลาด',
      'Time-consuming — ทีม BD ต้องอ่านวนไปมา จับประเด็นไม่ครบ = ตกม้าตาย',
      'เสียโอกาสทางธุรกิจ — สไลด์สวยแต่เนื้อหาไม่โดนใจกรรมการ หรือตกหล่นเงื่อนไขสำคัญ',
    ],
  },
  {
    id: 's3',
    order: 3,
    layout: 'section',
    title: 'The Winitch Solution',
    subtitle: 'Agentic AI Core เป็น Strategic Partner ไม่ใช่แค่เครื่องมือ — ความรู้ (The Sage) + การเปลี่ยนผลลัพธ์ (The Magician)',
    bullets: [
      'อ่าน TOR เชิงลึก — สกัด Insight และ Requirement ที่ซ่อนอยู่ด้วย Context Awareness',
      'สร้างโครงสร้าง Pitch Deck ที่ Professional & Sharp โดยอัตโนมัติ — ออกแบบมาเพื่อชนะใจกรรมการ',
      'Human + AI — ความแม่นยำกับความเร็ว: ลดเวลาเตรียม Deck จาก 5 วันเหลือ 5 นาที',
    ],
  },
  {
    id: 's4',
    order: 4,
    layout: 'two-column',
    title: 'How It Works',
    left:
      'TOR Insight Extractor — สแกนและวิเคราะห์ TOR เชิงลึก แกะรอยความต้องการที่ซ่อนอยู่ (Deep Tech, Intelligence)',
    right:
      'AI Content Architect — เปลี่ยนความว่างเปล่าเป็นโครงสร้างสไลด์ที่ขายได้จริง และ Context Awareness ที่เข้าใจบริบทธุรกิจ ไม่ใช่แค่แปลภาษา',
  },
  {
    id: 's5',
    order: 5,
    layout: 'bullet',
    title: 'Market Opportunity',
    bullets: [
      'Target: B2G Contractors, System Integrators (SI), Agency และ BD Teams ที่ยื่นซองประมูลภาครัฐและเอกชน',
      'ตลาด GovTech และ Procurement Software ระดับโลก มูลค่า 4 แสนล้านดอลลาร์',
      'ตลาด AI Productivity เติบโต 40% ต่อปี — Winitch อยู่จุดตัดของทั้งสอง',
    ],
  },
  {
    id: 's6',
    order: 6,
    layout: 'section',
    title: 'Traction & Why Winitch',
    subtitle: 'Vision: เป็น global standard สำหรับ AI-driven bidding ที่ human strategy และ AI converge',
    bullets: [
      'Pilot กับ SI ชั้นนำ 3 แห่ง — ลดเวลาเตรียม Deck จาก 5 วันเหลือ 5 นาที',
      'ความแม่นยำในการตีความ TOR 98% (The Sage Precision)',
      'Tone of Voice: Professional, Sharp, Encouraging — เราให้ direction ไม่ใช่แค่ data',
    ],
  },
  {
    id: 's7',
    order: 7,
    layout: 'section',
    title: 'The Ask',
    subtitle:
      'Seed Round 20,000,000 THB — 60% Agentic AI Core, 25% Market & B2G Partnership, 15% Operations & Team',
  },
  {
    id: 's8',
    order: 8,
    layout: 'section',
    title: 'Call to Action',
    subtitle:
      'พร้อมเปลี่ยนเกมการประมูลหรือยัง? Partner with Winitch — ลองใช้ The Winning Intelligence Engine วันนี้',
  },
  {
    id: 's9',
    order: 9,
    layout: 'closing',
    title: 'ขอบคุณ',
    subtitle: 'Winitch — The Winning Intelligence Engine. Designed by Jenosize.',
  },
]
