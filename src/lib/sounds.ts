import type { Sound } from "@/types/sound";

export const SOUNDS: Sound[] = [
  // Weather
  { id: "rain", name: "Rain", icon: "cloud-rain", category: "weather", src: "/sounds/rain.mp3", color: "#60a5fa", tier: "free" },
  { id: "heavy-rain", name: "Heavy Rain", icon: "cloud-rain-wind", category: "weather", src: "/sounds/heavy-rain.mp3", color: "#3b82f6", tier: "premium" },
  { id: "thunder", name: "Thunder", icon: "cloud-lightning", category: "weather", src: "/sounds/thunder.mp3", color: "#a78bfa", tier: "free" },
  { id: "wind", name: "Wind", icon: "wind", category: "weather", src: "/sounds/wind.mp3", color: "#94a3b8", tier: "free" },
  { id: "snow", name: "Snow", icon: "snowflake", category: "weather", src: "/sounds/snow.mp3", color: "#e2e8f0", tier: "premium" },

  // Nature
  { id: "forest", name: "Forest", icon: "trees", category: "nature", src: "/sounds/forest.mp3", color: "#22c55e", tier: "premium" },
  { id: "birds", name: "Birds", icon: "bird", category: "nature", src: "/sounds/birds.mp3", color: "#34d399", tier: "free" },
  { id: "river", name: "River", icon: "droplets", category: "nature", src: "/sounds/river.mp3", color: "#06b6d4", tier: "premium" },
  { id: "ocean", name: "Ocean", icon: "waves", category: "nature", src: "/sounds/ocean.mp3", color: "#22d3ee", tier: "free" },
  { id: "crickets", name: "Crickets", icon: "bug", category: "nature", src: "/sounds/crickets.mp3", color: "#84cc16", tier: "premium" },

  // Indoor
  { id: "fireplace", name: "Fireplace", icon: "flame", category: "indoor", src: "/sounds/fireplace.mp3", color: "#ef4444", tier: "free" },
  { id: "clock", name: "Clock", icon: "clock", category: "indoor", src: "/sounds/clock.mp3", color: "#d4a868", tier: "premium" },
  { id: "fan", name: "Fan", icon: "fan", category: "indoor", src: "/sounds/fan.mp3", color: "#a8a29e", tier: "premium" },
  { id: "ac-hum", name: "AC Hum", icon: "thermometer-snowflake", category: "indoor", src: "/sounds/ac-hum.mp3", color: "#7dd3fc", tier: "premium" },

  // Cafe
  { id: "cafe-chatter", name: "Cafe Chatter", icon: "coffee", category: "cafe", src: "/sounds/cafe.mp3", color: "#d97706", tier: "premium" },
  { id: "coffee-machine", name: "Coffee Machine", icon: "cup-soda", category: "cafe", src: "/sounds/coffee-machine.mp3", color: "#b45309", tier: "premium" },
  { id: "dishes", name: "Dishes", icon: "utensils", category: "cafe", src: "/sounds/dishes.mp3", color: "#a3a3a3", tier: "premium" },

  // City
  { id: "traffic", name: "Traffic", icon: "car", category: "city", src: "/sounds/traffic.mp3", color: "#fbbf24", tier: "premium" },
  { id: "train", name: "Train", icon: "train-front", category: "city", src: "/sounds/train.mp3", color: "#78716c", tier: "premium" },
  { id: "night-city", name: "Night City", icon: "building-2", category: "city", src: "/sounds/night-city.mp3", color: "#c084fc", tier: "premium" },

  // ASMR
  { id: "keyboard", name: "Keyboard", icon: "keyboard", category: "asmr", src: "/sounds/keyboard.mp3", color: "#e2e8f0", tier: "free" },
  { id: "page-turning", name: "Pages", icon: "book-open", category: "asmr", src: "/sounds/page-turning.mp3", color: "#d6d3d1", tier: "premium" },
  { id: "pen-writing", name: "Pen Writing", icon: "pen-tool", category: "asmr", src: "/sounds/pen-writing.mp3", color: "#1e293b", tier: "premium" },

  // Music
  { id: "lofi", name: "Lo-fi", icon: "headphones", category: "music", src: "/sounds/lofi.mp3", color: "#f472b6", tier: "premium" },
  { id: "jazz", name: "Jazz", icon: "music", category: "music", src: "/sounds/jazz.mp3", color: "#fbbf24", tier: "premium" },
  { id: "classical", name: "Classical", icon: "music-2", category: "music", src: "/sounds/classical.mp3", color: "#c084fc", tier: "premium" },
  { id: "ambient", name: "Ambient", icon: "radio", category: "music", src: "/sounds/ambient.mp3", color: "#67e8f9", tier: "premium" },

  // Sci-fi
  { id: "space-hum", name: "Space Hum", icon: "orbit", category: "scifi", src: "/sounds/space-hum.mp3", color: "#818cf8", tier: "premium" },
  { id: "spaceship", name: "Spaceship", icon: "rocket", category: "scifi", src: "/sounds/spaceship.mp3", color: "#6366f1", tier: "premium" },
  { id: "alien-planet", name: "Alien World", icon: "globe", category: "scifi", src: "/sounds/alien-planet.mp3", color: "#4ade80", tier: "premium" },
];
