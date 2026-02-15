export interface Sound {
  id: string;
  name: string;
  icon: string;
  category: "nature" | "indoor" | "music";
  src: string;
  color: string;
}

export interface SoundState {
  id: string;
  playing: boolean;
  volume: number;
}

export type SoundMixPreset = {
  id: string;
  name: string;
  sounds: { id: string; volume: number }[];
};
