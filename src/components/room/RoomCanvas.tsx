"use client";

import { CozyRoomSVG } from "./CozyRoomSVG";
import { ParticleOverlay } from "./ParticleOverlay";
import { RainOverlay } from "./RainOverlay";

export default function RoomCanvas() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-stone-950 overflow-hidden">
      {/* Pixel art room — small viewBox scaled up with crisp rendering */}
      <div className="absolute inset-0" style={{ imageRendering: "pixelated" }}>
        <CozyRoomSVG />
      </div>

      {/* Rain overlay */}
      <div className="absolute inset-0 z-[2]">
        <RainOverlay />
      </div>

      {/* Dust / particle overlay */}
      <div className="absolute inset-0 z-[3]">
        <ParticleOverlay />
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(12,10,9,0.5) 100%)",
        }}
      />
    </div>
  );
}
