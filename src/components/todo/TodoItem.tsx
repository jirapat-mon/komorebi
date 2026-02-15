"use client";

import { X, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Todo } from "@/types/timer";

const priorityColors: Record<Todo["priority"], string> = {
  low: "bg-green-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: TodoItemProps) {
  return (
    <div className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-800/50 transition-colors">
      {/* Priority indicator */}
      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", priorityColors[todo.priority])} />

      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={cn(
          "w-4 h-4 rounded border-2 shrink-0 transition-colors flex items-center justify-center",
          todo.completed
            ? "bg-amber-500 border-amber-500"
            : "border-stone-600 hover:border-stone-400"
        )}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#0c0a09" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Text */}
      <span
        className={cn(
          "flex-1 text-sm truncate",
          todo.completed ? "line-through text-stone-500" : "text-stone-200"
        )}
      >
        {todo.text}
      </span>

      {/* Reorder arrows */}
      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="text-stone-500 hover:text-stone-300 disabled:opacity-0 p-0.5"
          aria-label="Move up"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="text-stone-500 hover:text-stone-300 disabled:opacity-0 p-0.5"
          aria-label="Move down"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-500 hover:text-red-400"
        aria-label="Delete todo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
