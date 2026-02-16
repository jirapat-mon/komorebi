export type SoundCategory = "weather" | "nature" | "indoor" | "cafe" | "city" | "asmr" | "music" | "scifi";
export type SoundTier = "free" | "premium";

export interface Sound {
  id: string;
  name: string;
  icon: string; // lucide icon key
  category: SoundCategory;
  src: string;
  color: string;
  tier: SoundTier;
}

export interface SoundState {
  id: string;
  playing: boolean;
  volume: number;
}

export interface SoundMixPreset {
  id: string;
  name: string;
  sounds: { id: string; volume: number }[];
  createdAt: string;
}

export const SOUND_CATEGORY_LABELS: Record<SoundCategory, string> = {
  weather: "Weather",
  nature: "Nature",
  indoor: "Indoor",
  cafe: "Cafe",
  city: "City",
  asmr: "ASMR",
  music: "Music",
  scifi: "Sci-fi",
};
