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
    subtitle:
      'ความซับซ้อนของการทำ Proposal จาก TOR สร้างต้นทุนและความเสี่ยงที่วัดได้',
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
    subtitle:
      'Agentic AI Core เป็น Strategic Partner ไม่ใช่แค่เครื่องมือ — ความรู้ (The Sage) + การเปลี่ยนผลลัพธ์ (The Magician)',
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
    left: 'TOR Insight Extractor — สแกนและวิเคราะห์ TOR เชิงลึก แกะรอยความต้องการที่ซ่อนอยู่ (Deep Tech, Intelligence)',
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
    subtitle:
      'Vision: เป็น global standard สำหรับ AI-driven bidding ที่ human strategy และ AI converge',
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
    subtitle:
      'Winitch — The Winning Intelligence Engine. Designed by Jenosize.',
  },
]

/** Mock: คำนวณ winrate ของทั้ง deck จาก win conditions + เนื้อหาทุก slide (เหมือน AI วิเคราะห์ performance ทั้งชุด) — คืน 0–100 */
export function getMockDeckWinrate(): number {
  return 95
}

export interface WinConditionItem {
  id: string
  label: string
  checked: boolean
}

/** Checklist win conditions ของ pitch จาก deck (ใช้ภายใน getMockDeckWinrate / getMockDeckAnalysis) */
export function getWinConditions(deck: MockSlideContent[]): WinConditionItem[] {
  const conditions: WinConditionItem[] = [
    { id: 'title', label: 'Title / One-liner ชัดเจน', checked: false },
    { id: 'problem', label: 'Problem / Challenge', checked: false },
    { id: 'solution', label: 'Solution', checked: false },
    { id: 'how', label: 'How it works / Product', checked: false },
    { id: 'market', label: 'Market / Opportunity', checked: false },
    { id: 'traction', label: 'Traction / Why Now', checked: false },
    { id: 'ask', label: 'The Ask / Funding', checked: false },
    { id: 'cta', label: 'Call to Action', checked: false },
    { id: 'closing', label: 'Closing / Thank you', checked: false },
  ]

  for (const slide of deck) {
    const t = slide.title.toLowerCase()
    if (slide.layout === 'title' && (slide.title || slide.subtitle))
      conditions[0].checked = true
    if (t.includes('challenge') || t.includes('problem'))
      conditions[1].checked = true
    if (t.includes('solution') || t.includes('winitch'))
      conditions[2].checked = true
    if (t.includes('how it works') || t.includes('work'))
      conditions[3].checked = true
    if (t.includes('market') || t.includes('opportunity'))
      conditions[4].checked = true
    if (t.includes('traction') || t.includes('why'))
      conditions[5].checked = true
    if (t.includes('ask') || t.includes('seed') || t.includes('funding'))
      conditions[6].checked = true
    if (t.includes('call') || t.includes('action')) conditions[7].checked = true
    if (slide.layout === 'closing') conditions[8].checked = true
  }

  return conditions
}

/** Mock: ข้อความวิเคราะห์จาก AI ตามเนื้อหา deck (สำหรับแสดงใน popover) */
export function getMockDeckAnalysis(deck: MockSlideContent[]): string {
  const conditions = getWinConditions(deck)
  const met = conditions.filter((c) => c.checked).length
  const hasProblem = conditions[1].checked
  const hasSolution = conditions[2].checked
  const hasMarket = conditions[4].checked
  const hasTraction = conditions[5].checked
  const hasAsk = conditions[6].checked
  const hasCta = conditions[7].checked

  const parts: string[] = []
  if (met >= 7) {
    parts.push('Pitch deck โครงสร้างครบ ครอบคลุมทุกส่วนที่นักลงทุนมักมองหา')
  } else if (met >= 5) {
    parts.push('โครงสร้าง deck พอใช้ได้ แต่ยังขาดบางส่วนที่ควรเสริม')
  } else {
    parts.push(
      'แนะนำให้เพิ่มสไลด์ให้ครบ Problem, Solution, Market, Traction และ The Ask'
    )
  }

  if (hasProblem && hasSolution) {
    parts.push(
      'การเล่า Problem–Solution ชัดเจน สื่อจุด pain point และทางออกได้ดี'
    )
  }
  if (hasMarket) {
    parts.push('มี Market / Opportunity ช่วยให้เห็นขนาดโอกาส')
  }
  if (hasTraction) {
    parts.push('Traction หรือ Why Now ทำให้เห็นความน่าเชื่อถือและจังหวะ')
  }
  if (hasAsk) {
    parts.push('The Ask ชัดเจน เหมาะสำหรับการปิด deal')
  }
  if (hasCta) {
    parts.push('มี Call to Action ช่วยให้ผู้ฟังรู้ขั้นตอนถัดไป')
  }

  const totalBullets = deck.reduce((n, s) => n + (s.bullets?.length ?? 0), 0)
  if (totalBullets > 12) {
    parts.push('รายละเอียดในสไลด์เพียงพอ ไม่แน่นเกินไป')
  } else if (totalBullets < 5 && deck.length > 3) {
    parts.push('อาจเพิ่ม bullet หรือข้อความสำคัญในบางสไลด์')
  }

  return parts.join('\n\n')
}
