"use client";

import { Furniture } from "./Furniture";
import { Window } from "./Window";
import { DeskLamp } from "./DeskLamp";
import { Candle } from "./Candle";
import { FairyLights } from "./FairyLights";
import { ParticleOverlay } from "./ParticleOverlay";

export default function RoomCanvas() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-stone-950 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-stone-950" />

      {/* Room elements layered by z-index */}
      {/* Background layer: walls and furniture */}
      <div className="absolute inset-0 z-0">
        <Furniture />
      </div>

      {/* Window layer */}
      <div className="absolute inset-0 z-[1]">
        <Window />
      </div>

      {/* Furniture lighting */}
      <div className="absolute inset-0 z-[2]">
        <DeskLamp />
        <Candle />
      </div>

      {/* Fairy lights overlay */}
      <div className="absolute inset-0 z-[3]">
        <FairyLights />
      </div>

      {/* Particle overlay */}
      <div className="absolute inset-0 z-[4]">
        <ParticleOverlay />
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(12,10,9,0.6) 100%)",
        }}
      />
    </div>
  );
}
