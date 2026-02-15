# Komorebi — Feature Specification

## Core Features

---

### 1. Room System

#### 1.1 Room Themes
| Room | Tier | Description |
|---|---|---|
| Cozy Bedroom | Free | ห้องนอนอบอุ่น โคมไฟ, เตียง, โต๊ะทำงาน |
| Lo-fi Cafe | Premium | คาเฟ่เล็กๆ บาร์กาแฟ, หน้าต่างฝนตก |
| Forest Cabin | Premium | กระท่อมในป่า ต้นไม้, เตาผิง |
| Beach House | Premium | บ้านริมทะเล คลื่น, ลมทะเล |
| City Loft | Premium | ห้อง loft ในเมือง วิวตึก, neon |
| Library | Premium | ห้องสมุดเก่า ชั้นหนังสือ, เทียน |
| Rooftop Garden | Premium | สวนบนดาดฟ้า ต้นไม้, ไฟปิ้งย่าง |
| Space Station | Premium | สถานีอวกาศ ดาว, เสียง ambient sci-fi |

#### 1.2 Room Customization
- **Drag & Drop**: ลากวางเฟอร์นิเจอร์/ของตกแต่งในห้อง
- **Grid System**: Snap to grid สำหรับจัดวาง (isometric/top-down)
- **Layers**: ของซ้อนกันได้ (หน้า/หลัง)
- **Color Palette**: เปลี่ยนสี wall/floor (Premium)
- **Custom Wallpaper**: Upload รูปเป็น background (Premium)
- **Save/Load**: บันทึก layout หลายแบบ (Premium 5 slots)

#### 1.3 Items / Furniture
**Categories**:
- Furniture: โต๊ะ, เก้าอี้, เตียง, ชั้นวาง, โซฟา
- Lighting: โคมไฟ, เทียน, ไฟ LED, neon sign
- Plants: ต้นไม้ขนาดต่างๆ, กระถาง, ดอกไม้
- Tech: คอม, แท็บเล็ต, หูฟัง, ลำโพง
- Decor: รูปภาพ, โปสเตอร์, พรม, ผ้าม่าน
- Food & Drink: แก้วกาแฟ, ขนม, boba
- Pets: แมว, หมา, กระต่าย (มี animation)
- Seasonal: Christmas, Songkran, Halloween, Sakura

---

### 2. Ambient Sound System

#### 2.1 Sound Categories
| Category | Sounds | Tier |
|---|---|---|
| Weather | Rain, Heavy Rain, Thunder, Wind, Snow | Free (Rain) |
| Nature | Forest, Birds, River, Ocean Waves, Crickets | Free (Forest) |
| Indoor | Fireplace, Clock Ticking, Fan, AC Hum | Free (Fireplace) |
| Cafe | People Chatting, Coffee Machine, Dishes | Premium |
| City | Traffic, Train, Night City, Construction | Premium |
| ASMR | Keyboard Typing, Page Turning, Pen Writing | Premium |
| Music | Lo-fi beats, Jazz, Classical, Ambient | Premium |
| Sci-fi | Space Hum, Spaceship, Alien Planet | Premium |

#### 2.2 Sound Mixer
- **Volume Slider**: แต่ละเสียงปรับ volume แยกกัน (0-100%)
- **Master Volume**: ปรับรวมทั้งหมด
- **Layer Limit**: Free 2 layers / Premium unlimited
- **Presets**: บันทึก mix ที่ชอบ (Premium 5 presets)
- **Fade In/Out**: เสียงค่อยๆ เข้า/ออกเมื่อเปลี่ยน
- **Auto-pause**: หยุดเสียงเมื่อ timer จบ (optional)

---

### 3. Focus Timer (Pomodoro)

#### 3.1 Timer Modes
| Mode | Work | Break | Tier |
|---|---|---|---|
| Classic Pomodoro | 25 min | 5 min | Free |
| Long Focus | 50 min | 10 min | Premium |
| Custom | User-defined | User-defined | Premium |
| Stopwatch | Count up | Manual | Free |

#### 3.2 Timer Features
- **Visual Timer**: วงกลม countdown + progress bar
- **Session Counter**: นับรอบ pomodoro วันนี้
- **Long Break**: ทุก 4 รอบ พัก 15-30 นาที
- **Sound Notification**: เสียงแจ้งเตือนเมื่อหมดเวลา (เลือกได้)
- **Auto-start**: เริ่มรอบถัดไปอัตโนมัติ (optional)
- **Focus Stats**: ชั่วโมงโฟกัสรายวัน/สัปดาห์/เดือน (Premium)
- **Streak System**: นับวันติดต่อกัน + badge rewards

---

### 4. To-do List

#### 4.1 Features
- **Add/Edit/Delete**: จัดการ tasks
- **Checkbox**: ✓ เสร็จแล้ว
- **Priority**: High / Medium / Low (color coded)
- **Drag to Reorder**: ลำดับ tasks
- **Item Limit**: Free 5 items / Premium unlimited
- **Categories**: แยกหมวดหมู่ (Premium)
- **Due Date**: ตั้ง deadline (Premium)
- **Recurring Tasks**: ทำซ้ำทุกวัน/สัปดาห์ (Premium)

---

### 5. Multiplayer Study Room (Premium+)

#### 5.1 Room Features
- **Create Room**: สร้างห้อง + ได้ invite link
- **Join Room**: เข้าห้องผ่าน link
- **Max 8 People**: ต่อ 1 ห้อง
- **Shared Timer**: ทุกคนเห็น timer เดียวกัน (host control)
- **Individual Timer**: หรือตั้ง timer ส่วนตัวก็ได้
- **Avatars**: เห็น avatar คนอื่นในห้อง
- **Status**: Focusing / On Break / AFK
- **Chat**: Text chat ด้านข้าง (optional, toggle on/off)
- **Presence**: เห็นว่าใครออนไลน์/ออฟไลน์

#### 5.2 Avatar System (Premium+)
- **Character**: เลือกตัวละคร pixel art (8-12 แบบ)
- **Customization**: เปลี่ยนสีผม, เสื้อผ้า, accessory
- **Animations**: นั่งทำงาน, อ่านหนังสือ, ดื่มกาแฟ, หลับ
- **Position**: เลือกที่นั่งในห้อง

---

### 6. User Account & Social

#### 6.1 Authentication
- Google OAuth (primary)
- Email Magic Link
- Guest mode (limited, no save)

#### 6.2 Profile
- Display name + avatar
- Focus stats summary
- Streak badge
- Room showcase (public/private)

#### 6.3 Social Features
- **Share Screenshot**: Auto-generate OG image ของห้อง
- **Room Gallery**: ดูห้องคนอื่น (public rooms)
- **Referral System**: ชวนเพื่อน = ได้ items ฟรี
- **Leaderboard**: Focus hours ranking (opt-in)

---

## UI/UX Guidelines

### Visual Style
- **Art**: Pixel art / Isometric
- **Colors**: Warm, muted palette (earth tones, pastels)
- **Animation**: Subtle — flickering candles, floating particles, gentle sway
- **Typography**: Rounded, friendly fonts (Inter, Nunito)
- **Dark Mode**: Default dark, light mode optional

### Layout
```
┌─────────────────────────────────────────────┐
│  [Logo]  [Room▾]  [Sound🔊]  [Timer⏰]     │  ← Top bar
│                                             │
│                                             │
│            ┌─────────────────┐              │
│            │                 │              │
│            │   PIXEL ART     │              │
│            │   ROOM VIEW     │              │
│            │                 │              │
│            │                 │              │
│            └─────────────────┘              │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Sound    │  │ Timer    │  │ To-do    │  │  ← Bottom panels
│  │ Mixer    │  │ 25:00    │  │ List     │  │    (collapsible)
│  └──────────┘  └──────────┘  └──────────┘  │
│                                    [👤 User] │  ← Bottom right
└─────────────────────────────────────────────┘
```

### Responsive
- **Desktop**: Full layout ตาม wireframe
- **Tablet**: Room เต็มจอ, panels overlay
- **Mobile**: Room เต็มจอ, bottom sheet panels
