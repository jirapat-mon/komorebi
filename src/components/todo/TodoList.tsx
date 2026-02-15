"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useTodoStore } from "@/stores/useTodoStore";
import { cn } from "@/lib/utils";
import type { Todo } from "@/types/timer";
import TodoItem from "./TodoItem";

const priorityOptions: { value: Todo["priority"]; color: string; label: string }[] = [
  { value: "low", color: "bg-green-500", label: "Low" },
  { value: "medium", color: "bg-amber-500", label: "Medium" },
  { value: "high", color: "bg-red-500", label: "High" },
];

export default function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo, reorderTodos, clearCompleted } =
    useTodoStore();
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");

  const completedCount = todos.filter((t) => t.completed).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const success = addTodo(text, priority);
    if (success) {
      setInput("");
    } else {
      toast("Task limit reached", {
        description: "You can only have 5 tasks. Complete or remove some first.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-stone-500">
          {completedCount}/{todos.length} tasks
        </span>
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-stone-800/60 rounded-lg px-3 py-2 border border-stone-700/50 focus-within:border-stone-600">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            maxLength={100}
            className="flex-1 bg-transparent text-sm text-stone-200 placeholder:text-stone-600 outline-none"
          />

          {/* Priority selector */}
          <div className="flex items-center gap-1.5">
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPriority(opt.value)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  opt.color,
                  priority === opt.value
                    ? "ring-2 ring-offset-1 ring-offset-stone-800 ring-stone-400 scale-110"
                    : "opacity-40 hover:opacity-70"
                )}
                aria-label={`Priority: ${opt.label}`}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="p-2 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors"
          aria-label="Add task"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Todo list */}
      <div className="flex flex-col gap-0.5 min-h-[100px]">
        {todos.length === 0 ? (
          <p className="text-center text-sm text-stone-600 py-8">
            No tasks yet. Add one above!
          </p>
        ) : (
          todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onMoveUp={() => reorderTodos(index, index - 1)}
              onMoveDown={() => reorderTodos(index, index + 1)}
              isFirst={index === 0}
              isLast={index === todos.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
