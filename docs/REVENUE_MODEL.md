# Komorebi — Revenue Model

## Pricing Tiers

### Free (฿0)
จุดประสงค์: ดึง users เข้ามา + สร้าง habit

| Feature | Limit |
|---|---|
| ห้อง | 1 (Cozy Bedroom) |
| Ambient sounds | 3 (Rain, Cafe, Fireplace) |
| Sound mixing | 2 เสียงพร้อมกัน |
| Pomodoro timer | Basic (25/5 min fixed) |
| To-do list | 5 items |
| ของตกแต่ง | Starter pack 10 ชิ้น |
| Focus stats | วันนี้เท่านั้น |
| Room screenshot | มี watermark |

### Premium — ฿79/เดือน | ฿690/ปี (save 27%)
จุดประสงค์: Core revenue stream

| Feature | Detail |
|---|---|
| ห้อง | ทั้งหมด 6-8 themes |
| Ambient sounds | 30+ เสียง |
| Sound mixing | Unlimited layers |
| Pomodoro timer | Custom intervals + break sounds |
| To-do list | Unlimited items + categories |
| ของตกแต่ง | 100+ ชิ้น |
| Custom wallpaper | Upload + color themes |
| Focus stats | Weekly/Monthly graphs + streak |
| Room screenshot | HD ไม่มี watermark |
| Save presets | 5 sound/room presets |

### Premium+ — ฿149/เดือน | ฿1,290/ปี (save 28%)
จุดประสงค์: Power users + social features

| Feature | Detail |
|---|---|
| ทุกอย่างใน Premium | ✓ |
| Multiplayer Room | สร้างห้อง max 8 คน |
| Custom Avatar | เลือก/customize ตัวละคร |
| Avatar Animations | เดิน, นั่ง, หลับ, อ่านหนังสือ |
| Private Room Link | แชร์ link ให้เพื่อนเข้า |
| Exclusive Items | Seasonal/Limited edition |
| Priority Support | Feature request priority |
| Early Access | ได้ลองของใหม่ก่อน |

---

## One-time Purchases (เสริม)

| Product | Price | Description |
|---|---|---|
| Item Pack — Cafe Set | ฿29 | เฟอร์นิเจอร์คาเฟ่ 8 ชิ้น |
| Item Pack — Gaming Setup | ฿39 | โต๊ะเกม, จอ, เก้าอี้, LED |
| Item Pack — Plant Collection | ฿29 | ต้นไม้ 10 แบบ |
| Item Pack — Pet Friends | ฿49 | แมว, หมา, กระต่าย + animation |
| Room Theme — Sakura | ฿49 | ห้องธีม sakura (spring) |
| Room Theme — Christmas | ฿49 | ห้องธีม christmas |
| Sound Pack — ASMR | ฿29 | เสียง ASMR 10 แบบ |
| Sound Pack — City Night | ฿29 | เสียงเมืองกลางคืน 8 แบบ |

---

## Revenue Projection

### Assumptions
- Organic growth 500 users/month (social media)
- Free → Premium conversion: 8%
- Free → Premium+ conversion: 3%
- Monthly churn: 6%
- ARPU (Premium): ฿79
- ARPU (Premium+): ฿149
- Item purchase rate: 5% of free users, avg ฿35/purchase

### Month-by-Month

| Month | Total Users | Free | Premium | Premium+ | Item Sales | MRR |
|---|---|---|---|---|---|---|
| 1 | 300 | 270 | 20 | 10 | ฿470 | ฿3,060 |
| 2 | 750 | 680 | 50 | 20 | ฿1,190 | ฿6,930 |
| 3 | 1,500 | 1,350 | 105 | 45 | ฿2,360 | ฿14,980 |
| 4 | 2,500 | 2,225 | 190 | 85 | ฿3,890 | ฿27,680 |
| 5 | 3,800 | 3,380 | 290 | 130 | ฿5,910 | ฿42,280 |
| 6 | 5,000 | 4,450 | 380 | 170 | ฿7,790 | ฿55,380 |
| 9 | 10,000 | 8,800 | 800 | 400 | ฿15,400 | ฿122,800 |
| 12 | 15,000 | 13,050 | 1,300 | 650 | ฿22,840 | ฿199,590 |

### Annual Summary (Year 1)
- **Total Revenue**: ~฿1,200,000
- **Costs**: ~฿120,000 (hosting, assets, domain, tools)
- **Net Profit**: ~฿1,080,000
- **Profit Margin**: ~90% (solo developer, low infra cost)

---

## Payment Integration

### Thailand
- **Omise**: Credit/Debit card, PromptPay, TrueMoney
- **Fee**: 3.65% + ฿0

### International
- **Stripe**: Credit card, Apple Pay, Google Pay
- **Fee**: 3.4% + ฿11

### Flow
```
User clicks "Upgrade"
  → Choose plan (monthly/yearly)
  → Stripe/Omise checkout
  → Webhook confirms payment
  → Update user subscription in DB
  → Unlock premium features instantly
```

---

## Pricing Strategy Notes

1. **฿79 sweet spot**: ถูกกว่ากาแฟ 2 แก้ว/เดือน — easy decision
2. **Annual discount 27-28%**: ดึงให้จ่ายล่วงหน้า ลด churn
3. **Free tier ต้องดีพอ**: ให้ติดใจก่อน แต่อยากได้มากกว่า
4. **Item packs ราคาต่ำ (฿29-49)**: Impulse purchase ไม่ต้องคิดเยอะ
5. **No ads**: ขายค่า subscription/items เท่านั้น — ไม่ทำลาย UX
