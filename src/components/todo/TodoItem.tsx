"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  Repeat,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Todo, TodoCategory } from "@/types/todo";

const priorityColors: Record<Todo["priority"], string> = {
  low: "bg-green-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

function formatDueDate(dueDate: string): {
  label: string;
  className: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + "T00:00:00");

  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return { label: "Overdue", className: "text-red-400" };
  if (diffDays === 0) return { label: "Today", className: "text-amber-400" };
  if (diffDays === 1)
    return { label: "Tomorrow", className: "text-stone-400" };

  const d = new Date(dueDate + "T00:00:00");
  const label = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return { label, className: "text-stone-500" };
}

interface TodoItemProps {
  todo: Todo;
  category?: TodoCategory;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (
    updates: Partial<
      Pick<Todo, "text" | "priority" | "categoryId" | "dueDate" | "recurring">
    >
  ) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function TodoItem({
  todo,
  category,
  onToggle,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (todo.completed) return;
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit({ text: trimmed });
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleEditSubmit();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const dueDateInfo = todo.dueDate ? formatDueDate(todo.dueDate) : null;

  return (
    <div className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-800/50 transition-colors">
      {/* Priority indicator */}
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full shrink-0",
          priorityColors[todo.priority]
        )}
      />

      {/* Category dot */}
      {category && (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: category.color }}
          title={category.name}
        />
      )}

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
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#0c0a09"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Text / Inline edit */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-1">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
            maxLength={100}
            className="flex-1 bg-stone-800 text-sm text-stone-200 rounded px-2 py-0.5 outline-none border border-stone-600"
          />
          <button
            onClick={handleEditSubmit}
            className="p-0.5 text-green-400 hover:text-green-300"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className={cn(
            "flex-1 text-sm truncate cursor-default",
            todo.completed
              ? "line-through text-stone-500"
              : "text-stone-200"
          )}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {/* Recurring icon */}
      {todo.recurring !== "none" && (
        <span
          className="text-stone-500 flex items-center gap-0.5 shrink-0"
          title={`Recurring: ${todo.recurring}`}
        >
          <Repeat className="w-3 h-3" />
          <span className="text-[10px]">
            {todo.recurring === "daily" ? "D" : "W"}
          </span>
        </span>
      )}

      {/* Due date badge */}
      {dueDateInfo && (
        <span
          className={cn(
            "text-xs whitespace-nowrap shrink-0",
            dueDateInfo.className
          )}
        >
          {dueDateInfo.label}
        </span>
      )}

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
