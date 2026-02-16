export interface TodoCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export type RecurringType = "daily" | "weekly" | "none";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  order: number;
  createdAt: string;
  categoryId?: string;
  dueDate?: string;
  recurring: RecurringType;
  editedAt?: string;
}

export const DEFAULT_CATEGORIES: TodoCategory[] = [
  { id: "work", name: "Work", color: "#3b82f6" },
  { id: "study", name: "Study", color: "#8b5cf6" },
  { id: "personal", name: "Personal", color: "#ec4899" },
  { id: "health", name: "Health", color: "#22c55e" },
  { id: "other", name: "Other", color: "#6b7280" },
];
