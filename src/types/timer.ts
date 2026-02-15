export type TimerMode = "work" | "break";

export interface TimerConfig {
  workDuration: number; // in seconds
  breakDuration: number; // in seconds
}

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessionsCompleted: number;
  todayMinutes: number;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  order: number;
  createdAt: string;
}
