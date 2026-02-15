import type { Sound } from "@/types/sound";

export const SOUNDS: Sound[] = [
  {
    id: "rain",
    name: "Rain",
    icon: "cloud-rain",
    category: "nature",
    src: "/sounds/rain.mp3",
    color: "#60a5fa",
  },
  {
    id: "cafe",
    name: "Café",
    icon: "coffee",
    category: "indoor",
    src: "/sounds/cafe.mp3",
    color: "#d97706",
  },
  {
    id: "fireplace",
    name: "Fireplace",
    icon: "flame",
    category: "indoor",
    src: "/sounds/fireplace.mp3",
    color: "#ef4444",
  },
];
