"use client";

import { SOUNDS } from "@/lib/sounds";
import { SoundCard } from "./SoundCard";
import { SoundEngine } from "./SoundEngine";

export function SoundPanel() {
  return (
    <div className="space-y-3">
      <SoundEngine />
      <div className="grid grid-cols-3 gap-3">
        {SOUNDS.map((sound) => (
          <SoundCard key={sound.id} sound={sound} />
        ))}
      </div>
    </div>
  );
}
