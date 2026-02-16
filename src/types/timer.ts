export type TimerMode = "work" | "break" | "longBreak";
export type TimerPreset = "classic" | "long" | "custom" | "stopwatch";

export interface TimerConfig {
  workDuration: number; // in seconds
  breakDuration: number; // in seconds
  longBreakDuration: number; // in seconds
  longBreakInterval: number; // every N sessions
  autoStart: boolean;
}

export interface FocusStats {
  daily: Record<string, number>; // date -> minutes
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalSessions: number;
  totalMinutes: number;
}

// Keep existing Todo interface here for now (will be moved later)
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  order: number;
  createdAt: string;
}
