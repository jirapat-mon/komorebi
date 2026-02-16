"use client";

import { useState } from "react";
import { SOUNDS } from "@/lib/sounds";
import { SoundCard } from "./SoundCard";
import { SoundEngine } from "./SoundEngine";
import { useSoundStore } from "@/stores/useSoundStore";
import { cn } from "@/lib/utils";
import {
  Volume1,
  Save,
  ChevronDown,
  ChevronRight,
  X,
  Play,
} from "lucide-react";
import type { SoundCategory } from "@/types/sound";
import { SOUND_CATEGORY_LABELS } from "@/types/sound";

const CATEGORIES: (SoundCategory | "all")[] = [
  "all",
  "weather",
  "nature",
  "indoor",
  "cafe",
  "city",
  "asmr",
  "music",
  "scifi",
];

export function SoundPanel() {
  const masterVolume = useSoundStore((s) => s.masterVolume);
  const setMasterVolume = useSoundStore((s) => s.setMasterVolume);
  const activeCategory = useSoundStore((s) => s.activeCategory);
  const setActiveCategory = useSoundStore((s) => s.setActiveCategory);
  const presets = useSoundStore((s) => s.presets);
  const savePreset = useSoundStore((s) => s.savePreset);
  const loadPreset = useSoundStore((s) => s.loadPreset);
  const deletePreset = useSoundStore((s) => s.deletePreset);
  const activeCount = useSoundStore((s) =>
    Object.values(s.sounds).filter((ss) => ss.playing).length
  );

  const [presetsOpen, setPresetsOpen] = useState(false);
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [presetName, setPresetName] = useState("");

  const filteredSounds =
    activeCategory === "all"
      ? SOUNDS
      : SOUNDS.filter((s) => s.category === activeCategory);

  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    const success = savePreset(presetName.trim());
    if (success) {
      setPresetName("");
      setShowSaveInput(false);
    }
  };

  return (
    <div className="space-y-3">
      <SoundEngine />

      {/* Master volume */}
      <div className="flex items-center gap-2 px-1">
        <Volume1 className="w-3.5 h-3.5 text-stone-500 shrink-0" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={masterVolume}
          onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
          className="flex-1 h-1 rounded-full appearance-none cursor-pointer bg-stone-700 accent-amber-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
        />
        <span className="text-[10px] text-stone-500 tabular-nums w-6 text-right">
          {activeCount}/3
        </span>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-200 border",
              activeCategory === cat
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                : "bg-stone-800/50 text-stone-400 border-stone-700/30 hover:text-stone-300 hover:border-stone-600/50"
            )}
          >
            {cat === "all" ? "All" : SOUND_CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Presets section */}
      <div className="border border-stone-700/30 rounded-lg overflow-hidden">
        <button
          onClick={() => setPresetsOpen(!presetsOpen)}
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-stone-400 hover:text-stone-300 transition-colors"
        >
          <div className="flex items-center gap-1.5">
            {presetsOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <span>Presets</span>
            <span className="text-[10px] text-stone-500">
              {presets.length}/5
            </span>
          </div>
          {activeCount > 0 && presets.length < 5 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPresetsOpen(true);
                setShowSaveInput(true);
              }}
              className="p-1 rounded hover:bg-stone-700/50 text-stone-500 hover:text-amber-400 transition-colors"
            >
              <Save className="w-3 h-3" />
            </button>
          )}
        </button>

        {presetsOpen && (
          <div className="px-3 pb-2 space-y-1.5">
            {/* Save input */}
            {showSaveInput && (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSavePreset()}
                  placeholder="Preset name..."
                  className="flex-1 bg-stone-900/50 border border-stone-700/30 rounded px-2 py-1 text-[10px] sm:text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-amber-500/30"
                  autoFocus
                />
                <button
                  onClick={handleSavePreset}
                  className="px-2 py-1 rounded text-[10px] sm:text-xs bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowSaveInput(false);
                    setPresetName("");
                  }}
                  className="p-1 rounded text-stone-500 hover:text-stone-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Preset list */}
            {presets.length === 0 ? (
              <p className="text-[10px] text-stone-600 py-1">
                No presets saved yet
              </p>
            ) : (
              presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-stone-800/50 border border-stone-700/30 hover:border-stone-600/50 transition-colors group"
                >
                  <button
                    onClick={() => loadPreset(preset.id)}
                    className="flex-1 flex items-center gap-1.5 text-left"
                  >
                    <Play className="w-2.5 h-2.5 text-stone-500 group-hover:text-amber-400 transition-colors fill-current" />
                    <span className="text-[10px] sm:text-xs text-stone-300 truncate">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-stone-600">
                      ({preset.sounds.length})
                    </span>
                  </button>
                  <button
                    onClick={() => deletePreset(preset.id)}
                    className="p-0.5 rounded text-stone-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Sound grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-[400px]:grid-cols-3">
        {filteredSounds.map((sound) => (
          <SoundCard key={sound.id} sound={sound} />
        ))}
      </div>
    </div>
  );
}
