export interface RoomElement {
  id: string;
  type:
    | "window"
    | "desk"
    | "lamp"
    | "candle"
    | "bed"
    | "bookshelf"
    | "plant"
    | "fairy-lights";
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  interactive: boolean;
}

export interface ParticleConfig {
  count: number;
  speed: number;
  size: { min: number; max: number };
  opacity: { min: number; max: number };
  color: string;
}

export interface RoomTheme {
  id: string;
  name: string;
  background: string;
  ambientColor: string;
  elements: RoomElement[];
}

export type ColorPalette = {
  id: string;
  name: string;
  wall: string;
  floor: string;
  accent: string;
};

export interface RoomLayout {
  id: string;
  name: string;
  themeId: string;
  paletteId?: string;
  savedAt: string;
}
