"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Timer, ListTodo, Palette, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import PomodoroTimer from "@/components/timer/PomodoroTimer";
import TodoList from "@/components/todo/TodoList";
import { RoomCustomizer } from "@/components/room/RoomCustomizer";

const SoundPanel = dynamic(
  () =>
    import("@/components/sound/SoundPanel").then((mod) => ({
      default: mod.SoundPanel,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="text-center text-sm text-stone-500 py-8">
        Loading sounds...
      </div>
    ),
  }
);

type Tab = "sound" | "timer" | "todo" | "room";

const tabs: { id: Tab; label: string; icon: typeof Music }[] = [
  { id: "room", label: "Room", icon: Palette },
  { id: "sound", label: "Sound", icon: Music },
  { id: "timer", label: "Timer", icon: Timer },
  { id: "todo", label: "Todo", icon: ListTodo },
];

export default function BottomPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("timer");
  const [expanded, setExpanded] = useState(false);

  const handleTabClick = (tab: Tab) => {
    if (activeTab === tab && expanded) {
      setExpanded(false);
    } else {
      setActiveTab(tab);
      setExpanded(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="w-full sm:max-w-md md:max-w-lg pointer-events-auto">
        {/* Collapse button */}
        <AnimatePresence>
          {expanded && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(false)}
              className="mx-auto mb-1 flex items-center justify-center w-8 h-5 rounded-t-lg bg-stone-800/80 text-stone-500 hover:text-stone-300 transition-colors"
              aria-label="Collapse panel"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Panel content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-stone-900/95 backdrop-blur-md border-t border-stone-800/50 rounded-t-2xl"
            >
              <div className="px-3 sm:px-4 py-3 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
                {activeTab === "room" && <RoomCustomizer />}
                {activeTab === "sound" && <SoundPanel />}
                {activeTab === "timer" && <PomodoroTimer />}
                {activeTab === "todo" && <TodoList />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab bar */}
        <div className="flex items-center justify-around bg-stone-900/95 backdrop-blur-md border-t border-stone-800/50 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && expanded;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 rounded-lg transition-colors min-w-[56px] sm:min-w-[64px]",
                  isActive
                    ? "text-amber-500"
                    : "text-stone-500 hover:text-stone-300"
                )}
                aria-label={tab.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
