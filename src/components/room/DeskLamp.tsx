"use client";

import { useRoomStore } from "@/stores/useRoomStore";

export function DeskLamp() {
  const lightsOn = useRoomStore((s) => s.lightsOn);

  return (
    <div className="absolute bottom-[38%] left-[34%] w-[8%]">
      {/* Lamp shade */}
      <div
        className="relative w-full mx-auto"
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "50%",
          background: lightsOn
            ? "linear-gradient(to bottom, #d97706, #b45309)"
            : "linear-gradient(to bottom, #57534e, #44403c)",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 4px 4px",
        }}
      />

      {/* Lamp neck */}
      <div className="w-[8%] h-8 bg-stone-500 mx-auto" />

      {/* Lamp base */}
      <div className="w-[60%] h-2 bg-stone-500 mx-auto rounded-full" />

      {/* Light glow when on */}
      {lightsOn && (
        <>
          {/* Downward light cone */}
          <div
            className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[200%] h-[150%] pointer-events-none animate-[lamp-pulse_3s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)",
            }}
          />
          {/* Ambient glow around shade */}
          <div
            className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[180%] h-[80%] pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)",
            }}
          />
        </>
      )}
    </div>
  );
}
