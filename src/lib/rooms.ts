export interface RoomThemeDefinition {
  id: string;
  name: string;
  description: string;
  tier: "free" | "premium";
  previewGradient: string;
  previewEmoji: string;
}

export const ROOM_THEMES: RoomThemeDefinition[] = [
  {
    id: "cozy-bedroom",
    name: "Cozy Bedroom",
    description: "A warm bedroom with desk lamp, bed, and bookshelves",
    tier: "free",
    previewGradient:
      "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #16213e 100%)",
    previewEmoji: "🛏️",
  },
  {
    id: "lofi-cafe",
    name: "Lo-fi Cafe",
    description: "A cozy cafe with coffee bar and rainy windows",
    tier: "premium",
    previewGradient:
      "linear-gradient(135deg, #3d2b1f 0%, #5c3d2e 50%, #2d1810 100%)",
    previewEmoji: "☕",
  },
  {
    id: "forest-cabin",
    name: "Forest Cabin",
    description: "A cabin in the woods with fireplace and trees",
    tier: "premium",
    previewGradient:
      "linear-gradient(135deg, #1a3a1a 0%, #2d5a27 50%, #0d1f0d 100%)",
    previewEmoji: "🌲",
  },
  {
    id: "beach-house",
    name: "Beach House",
    description: "Seaside house with ocean waves and breeze",
    tier: "premium",
    previewGradient:
      "linear-gradient(135deg, #0c4a6e 0%, #06b6d4 50%, #164e63 100%)",
    previewEmoji: "🏖️",
  },
  {
    id: "city-loft",
    name: "City Loft",
    description: "Modern loft with city skyline and neon lights",
    tier: "premium",
    previewGradient:
      "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)",
    previewEmoji: "🌃",
  },
  {
    id: "library",
    name: "Library",
    description: "Old library with bookshelves and candles",
    tier: "premium",
    previewGradient:
      "linear-gradient(135deg, #44403c 0%, #78716c 50%, #292524 100%)",
    previewEmoji: "📚",
  },
  {
    id: "rooftop-garden",
    name: "Rooftop Garden",
    description: "Rooftop garden with plants and string lights",
    tier: "premium",
    previewGradient:
      "linear-gradient(135deg, #14532d 0%, #22c55e 50%, #052e16 100%)",
    previewEmoji: "🌿",
  },
  {
    id: "space-station",
    name: "Space Station",
    description: "Space station with stars and ambient sci-fi",
    tier: "premium",
    previewGradient:
      "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #020617 100%)",
    previewEmoji: "🚀",
  },
];
