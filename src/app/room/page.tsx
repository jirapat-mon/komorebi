"use client";

import RoomCanvas from "@/components/room/RoomCanvas";
import TopBar from "@/components/layout/TopBar";
import BottomPanel from "@/components/layout/BottomPanel";

export default function RoomPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background layer */}
      <RoomCanvas />

      {/* UI overlay */}
      <TopBar />
      <BottomPanel />
    </div>
  );
}
