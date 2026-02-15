# Komorebi — Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│  Next.js 15 (App Router) + React 19 + TypeScript        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ PixiJS   │ │ Howler   │ │ Framer   │ │Liveblocks│   │
│  │ Room     │ │ Audio    │ │ Motion   │ │ Realtime │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │ API Routes / Server Actions
┌──────────────────────▼──────────────────────────────────┐
│                       SERVER                            │
│  Next.js API Routes + Server Actions                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ NextAuth │ │ Prisma   │ │ Stripe   │ │ Omise    │   │
│  │ Auth     │ │ ORM      │ │ Payment  │ │ Payment  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                     DATABASE                            │
│  ┌──────────────────┐  ┌────────────────────────┐       │
│  │ PostgreSQL       │  │ Vercel Blob / R2       │       │
│  │ (Supabase)       │  │ (static assets/sounds) │       │
│  │ - Users          │  └────────────────────────┘       │
│  │ - Subscriptions  │                                   │
│  │ - Rooms          │  ┌────────────────────────┐       │
│  │ - Items          │  │ Upstash Redis          │       │
│  │ - Timer Stats    │  │ (rate limit, sessions) │       │
│  │ - Todos          │  └────────────────────────┘       │
│  └──────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack Detail

### Frontend
| Tech | Version | Purpose |
|---|---|---|
| Next.js | 15 | App Router, SSR, API routes |
| React | 19 | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 11 | UI animations, transitions |
| PixiJS | 8 | Pixel art room rendering (WebGL/Canvas) |
| Howler.js | 2.2 | Audio playback, mixing, volume control |
| Zustand | 5 | Client state management |
| Liveblocks | latest | Real-time multiplayer (cursor, presence) |

### Backend
| Tech | Purpose |
|---|---|
| Next.js API Routes | REST endpoints |
| Server Actions | Form mutations, data fetching |
| NextAuth v5 | Authentication (Google, Magic Link) |
| Prisma | 6 | ORM, migrations, type-safe queries |

### Database & Storage
| Tech | Purpose | Tier |
|---|---|---|
| Supabase PostgreSQL | Primary DB | Free (500MB) → Pro |
| Upstash Redis | Rate limiting, session cache | Free (10K req/day) |
| Vercel Blob / Cloudflare R2 | Audio files, pixel art assets | Pay-per-use |

### Payment
| Tech | Market | Features |
|---|---|---|
| Stripe | International | Card, Apple Pay, Google Pay |
| Omise | Thailand | Card, PromptPay, TrueMoney |

### Infrastructure
| Tech | Purpose | Cost |
|---|---|---|
| Vercel | Hosting, Edge, CDN | Free → Pro (฿640/mo) |
| Supabase | Database | Free → Pro ($25/mo) |
| Upstash | Redis | Free tier |
| Cloudflare | DNS, CDN, R2 storage | Free tier |

---

## Database Schema

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?

  // Subscription
  tier          Tier      @default(FREE)
  stripeId      String?   @unique
  subExpiry     DateTime?

  // Stats
  totalFocus    Int       @default(0)    // total minutes
  currentStreak Int       @default(0)    // consecutive days
  longestStreak Int       @default(0)
  lastActiveAt  DateTime?

  // Relations
  rooms         Room[]
  items         UserItem[]
  todos         Todo[]
  sessions      FocusSession[]
  accounts      Account[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Tier {
  FREE
  PREMIUM
  PREMIUM_PLUS
}

model Room {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id])

  themeId     String    // references RoomTheme
  name        String    @default("My Room")
  layout      Json      // item positions { itemId, x, y, layer }
  soundPreset Json?     // saved sound mix { soundId, volume }[]
  isPublic    Boolean   @default(false)

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([userId])
}

model RoomTheme {
  id          String  @id @default(cuid())
  name        String  // "Cozy Bedroom", "Lo-fi Cafe"
  slug        String  @unique
  tier        Tier    @default(FREE)
  background  String  // asset path
  gridSize    Json    // { width, height }
  price       Int?    // one-time purchase price (satang)
}

model Item {
  id          String    @id @default(cuid())
  name        String
  category    String    // furniture, lighting, plant, tech, decor, pet
  spriteUrl   String    // pixel art sprite path
  size        Json      // { width, height } in grid units
  tier        Tier      @default(FREE)
  packId      String?   // belongs to item pack
  seasonal    String?   // "christmas", "sakura", null
  animated    Boolean   @default(false)

  users       UserItem[]
}

model UserItem {
  id      String @id @default(cuid())
  userId  String
  user    User   @relation(fields: [userId], references: [id])
  itemId  String
  item    Item   @relation(fields: [itemId], references: [id])

  @@unique([userId, itemId])
  @@index([userId])
}

model Sound {
  id        String @id @default(cuid())
  name      String // "Rain", "Cafe Chatter"
  category  String // weather, nature, indoor, cafe, city, music
  fileUrl   String // audio file path
  tier      Tier   @default(FREE)
  iconEmoji String // "🌧️", "☕"
}

model Todo {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  text      String
  done      Boolean  @default(false)
  priority  String   @default("medium") // high, medium, low
  order     Int      @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}

model FocusSession {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  duration  Int      // minutes
  type      String   // "pomodoro", "custom", "stopwatch"
  date      DateTime @default(now())

  @@index([userId, date])
}

model Subscription {
  id              String   @id @default(cuid())
  userId          String   @unique

  provider        String   // "stripe" | "omise"
  providerId      String   // subscription ID from provider
  tier            Tier
  status          String   // "active", "canceled", "past_due"
  currentPeriodEnd DateTime

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([providerId])
}
```

---

## Project Structure

```
komorebi/
├── public/
│   ├── sounds/            # Ambient audio files (.mp3/.ogg)
│   ├── sprites/           # Pixel art spritesheets
│   │   ├── rooms/         # Room backgrounds
│   │   ├── items/         # Furniture/decor sprites
│   │   └── avatars/       # Character sprites
│   └── og/                # OG images
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Landing / Main room
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── api/auth/[...nextauth]/route.ts
│   │   ├── (app)/
│   │   │   ├── room/page.tsx     # Main room view
│   │   │   ├── shop/page.tsx     # Item shop
│   │   │   ├── profile/page.tsx  # User profile & stats
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── subscription/route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/route.ts
│   │   │   │   └── omise/route.ts
│   │   │   └── rooms/route.ts
│   │   └── multiplayer/
│   │       └── [roomId]/page.tsx
│   │
│   ├── components/
│   │   ├── room/
│   │   │   ├── RoomCanvas.tsx    # PixiJS room renderer
│   │   │   ├── ItemPlacer.tsx    # Drag & drop items
│   │   │   └── RoomToolbar.tsx
│   │   ├── sound/
│   │   │   ├── SoundMixer.tsx    # Ambient mixer panel
│   │   │   ├── SoundSlider.tsx
│   │   │   └── SoundPresets.tsx
│   │   ├── timer/
│   │   │   ├── PomodoroTimer.tsx
│   │   │   ├── TimerDisplay.tsx
│   │   │   └── TimerStats.tsx
│   │   ├── todo/
│   │   │   ├── TodoList.tsx
│   │   │   └── TodoItem.tsx
│   │   ├── multiplayer/
│   │   │   ├── AvatarPresence.tsx
│   │   │   └── RoomChat.tsx
│   │   ├── layout/
│   │   │   ├── TopBar.tsx
│   │   │   ├── BottomPanel.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/              # Shared UI components
│   │
│   ├── lib/
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Prisma client
│   │   ├── stripe.ts        # Stripe config
│   │   ├── omise.ts         # Omise config
│   │   ├── sounds.ts        # Sound registry & loader
│   │   └── pixi.ts          # PixiJS setup & helpers
│   │
│   ├── stores/
│   │   ├── useRoomStore.ts  # Room state (Zustand)
│   │   ├── useSoundStore.ts # Sound state
│   │   ├── useTimerStore.ts # Timer state
│   │   └── useTodoStore.ts  # Todo state
│   │
│   └── types/
│       ├── room.ts
│       ├── sound.ts
│       ├── timer.ts
│       └── user.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts              # Seed rooms, items, sounds
│   └── migrations/
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Performance Considerations

1. **PixiJS Room**: ใช้ WebGL renderer, fallback Canvas2D
2. **Audio**: Lazy load sounds เมื่อ user เลือก, ใช้ Web Audio API
3. **Assets**: CDN via Vercel/Cloudflare, sprite sheets (reduce HTTP requests)
4. **DB Queries**: Prisma query optimization, index on userId + date
5. **Realtime**: Liveblocks handles WebSocket connection pooling
6. **Bundle Size**: Dynamic import PixiJS + Howler (client-only)
