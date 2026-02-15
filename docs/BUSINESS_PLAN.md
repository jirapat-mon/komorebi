# Komorebi — Business Plan

## 1. Executive Summary

**Komorebi** คือ Virtual Cozy Room / Study Room แบบ pixel art ที่ customize ได้
ผู้ใช้สามารถตกแต่งห้องเสมือนจริง ฟังเสียง ambient ตั้ง Pomodoro timer
จดบันทึก to-do list และเรียน/ทำงานร่วมกับเพื่อนใน multiplayer room

**Mission**: ทำให้ทุกคนมีห้องส่วนตัวบนเว็บที่อยากกลับมาทุกวัน

---

## 2. Problem

- นักเรียน/Freelancer ไม่มีพื้นที่ทำงานที่โฟกัสได้ดี
- แอป productivity ส่วนใหญ่น่าเบื่อ ไม่มี aesthetic
- คนอยากมี "ที่ของตัวเอง" บนโลกออนไลน์ที่ cozy และ personal
- เรียน/ทำงานคนเดียวเหงา อยากมีเพื่อนนั่งด้วย

## 3. Solution

Virtual room แบบ pixel art ที่รวม:
- **Room Customization**: แต่งห้องด้วยเฟอร์นิเจอร์/ของตกแต่ง
- **Ambient Sound**: เสียง lo-fi, ฝนตก, คาเฟ่, เตาผิง, ธรรมชาติ
- **Focus Timer**: Pomodoro / custom timer + streak tracking
- **To-do List**: จัดการ tasks ง่ายๆ ในห้อง
- **Multiplayer**: เรียน/ทำงานกับเพื่อนใน shared room
- **Collectibles**: สะสมของตกแต่ง seasonal/limited edition

## 4. Target Audience

| Segment | Age | Size | Behavior |
|---|---|---|---|
| นักเรียน/นักศึกษา | 16-25 | Primary | Study-with-me, aesthetic, social |
| Freelancer / Remote | 22-35 | Secondary | Productivity, focus, routine |
| WFH / Office Worker | 25-40 | Tertiary | Background ambience, relaxation |

**Primary Market**: ไทย, SEA
**Secondary Market**: Global (EN, JP, KR)

## 5. Competitive Analysis

| Feature | Komorebi | Lofi Girl | Forest | Noisli | Habitica |
|---|---|---|---|---|---|
| Room Customization | Yes | No | No | No | Limited |
| Ambient Sound | Yes | Music only | No | Yes | No |
| Focus Timer | Yes | No | Yes | Yes | No |
| To-do List | Yes | No | No | No | Yes |
| Multiplayer | Yes | No | No | No | Yes |
| Collectibles | Yes | No | Trees | No | Yes |
| Web-based | Yes | YouTube | App | Yes | Yes |
| Free Tier | Yes | Yes | Limited | Limited | Yes |

**Unfair Advantage**: All-in-one + Aesthetic ที่คนอยาก screenshot แชร์

## 6. Business Model

→ ดูรายละเอียดที่ [REVENUE_MODEL.md](REVENUE_MODEL.md)

- Freemium subscription (Free / Premium ฿79 / Premium+ ฿149)
- One-time item purchases
- Seasonal limited edition packs

## 7. Key Metrics (KPIs)

| Metric | Target (6 เดือน) | Target (12 เดือน) |
|---|---|---|
| Total Users | 5,000 | 15,000 |
| DAU (Daily Active) | 500 | 2,000 |
| Conversion Rate | 8% Premium | 10% Premium |
| MRR | ฿50,000 | ฿180,000 |
| Avg Session Time | 25 min | 35 min |
| Churn Rate | < 8%/month | < 5%/month |

## 8. Go-to-Market Strategy

→ ดูรายละเอียดที่ [MARKETING.md](MARKETING.md)

**Phase 1 (Month 1)**: Soft launch + social media organic
**Phase 2 (Month 2-3)**: Content creator collabs + Product Hunt
**Phase 3 (Month 4+)**: Paid ads (ถ้า unit economics ดี)

## 9. Team

- **Chawalwit** — Full-stack Developer & Data Engineer
  - Next.js, React, TypeScript, Python
  - Marketplace/SaaS experience (Accordara, Ripples Commerce)

## 10. Financial Overview

**Startup Costs**:
| Item | Cost |
|---|---|
| Domain + Hosting | ฿2,000/year |
| Vercel Pro | ฿0 (hobby tier เริ่มต้น) |
| Supabase | ฿0 (free tier) |
| Sound Assets | ฿0-3,000 (freesound.org + purchase) |
| Pixel Art Assets | ฿0-5,000 (create + purchase) |
| **Total** | **฿2,000 - 10,000** |

**Break-even**: ~100 Premium subscribers = ฿7,900/month (cover hosting + domain)

## 11. Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Low conversion rate | Revenue ต่ำ | Optimize free→premium funnel, A/B test pricing |
| User retention ต่ำ | DAU drop | Streak system, seasonal events, social features |
| Competition copies | Market share | First-mover in TH, community moat, unique art style |
| Scale issues | Performance | Start with Vercel edge, optimize PixiJS rendering |
| Pixel art production | Content bottleneck | Community creator program, AI-assisted generation |
