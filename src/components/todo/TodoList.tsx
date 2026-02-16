"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Repeat,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { useTodoStore } from "@/stores/useTodoStore";
import { cn } from "@/lib/utils";
import type { Todo, RecurringType } from "@/types/todo";
import TodoItem from "./TodoItem";

const priorityOptions: {
  value: Todo["priority"];
  color: string;
  label: string;
}[] = [
  { value: "low", color: "bg-green-500", label: "Low" },
  { value: "medium", color: "bg-amber-500", label: "Medium" },
  { value: "high", color: "bg-red-500", label: "High" },
];

const sortOptions: { value: "created" | "priority" | "dueDate"; label: string }[] = [
  { value: "created", label: "Created" },
  { value: "priority", label: "Priority" },
  { value: "dueDate", label: "Due date" },
];

export default function TodoList() {
  const {
    todos,
    categories,
    activeFilter,
    sortMode,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    reorderTodos,
    clearCompleted,
    setActiveFilter,
    setSortMode,
    getFilteredTodos,
    processRecurringTodos,
  } = useTodoStore();

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState("");
  const [recurring, setRecurring] = useState<RecurringType>("none");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    processRecurringTodos();
  }, [processRecurringTodos]);

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter((t) => t.completed).length;

  const hasCategorizedTasks = todos.some((t) => t.categoryId);
  const activeCategory = categories.find((c) => c.id === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const success = addTodo(text, {
      priority,
      categoryId,
      dueDate: dueDate || undefined,
      recurring,
    });
    if (success) {
      setInput("");
      setDueDate("");
      setRecurring("none");
      setShowDateInput(false);
    } else {
      toast("Task limit reached", {
        description:
          "You can only have 5 tasks. Complete or remove some first.",
      });
    }
  };

  const cycleRecurring = () => {
    const order: RecurringType[] = ["none", "daily", "weekly"];
    const idx = order.indexOf(recurring);
    setRecurring(order[(idx + 1) % order.length]);
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      {/* Category filter tabs */}
      {hasCategorizedTasks && (
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none px-1">
          <button
            onClick={() => setActiveFilter(null)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              activeFilter === null
                ? "bg-amber-500/20 text-amber-400"
                : "bg-stone-800/50 text-stone-500 hover:text-stone-300"
            )}
          >
            All
          </button>
          {categories.map((cat) => {
            const count = todos.filter(
              (t) => t.categoryId === cat.id
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveFilter(
                    activeFilter === cat.id ? null : cat.id
                  )
                }
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5",
                  activeFilter === cat.id
                    ? "text-white"
                    : "bg-stone-800/50 text-stone-500 hover:text-stone-300"
                )}
                style={
                  activeFilter === cat.id
                    ? { backgroundColor: cat.color + "33" }
                    : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-stone-500">
          {completedCount}/{todos.length} tasks
          {activeCategory && (
            <span style={{ color: activeCategory.color }}>
              {" "}
              · {activeCategory.name}
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          {/* Sort toggle */}
          <div className="relative">
            <button
              onClick={() => setShowSort((s) => !s)}
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1"
            >
              <ArrowUpDown className="w-3 h-3" />
              {sortOptions.find((s) => s.value === sortMode)?.label}
            </button>
            {showSort && (
              <div className="absolute right-0 top-6 z-10 bg-stone-800 border border-stone-700 rounded-lg shadow-lg py-1 min-w-[100px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortMode(opt.value);
                      setShowSort(false);
                    }}
                    className={cn(
                      "block w-full text-left px-3 py-1.5 text-xs transition-colors",
                      sortMode === opt.value
                        ? "text-amber-400"
                        : "text-stone-400 hover:text-stone-200"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
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

            {/* Category selector */}
            <select
              value={categoryId ?? ""}
              onChange={(e) =>
                setCategoryId(e.target.value || undefined)
              }
              className="bg-stone-700/50 text-xs text-stone-400 rounded px-1.5 py-0.5 outline-none border-none cursor-pointer max-w-[80px]"
            >
              <option value="">No cat.</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Due date toggle */}
            <button
              type="button"
              onClick={() => setShowDateInput((s) => !s)}
              className={cn(
                "p-1 rounded transition-colors",
                showDateInput || dueDate
                  ? "text-amber-400"
                  : "text-stone-600 hover:text-stone-400"
              )}
              aria-label="Set due date"
            >
              <Calendar className="w-3.5 h-3.5" />
            </button>

            {/* Recurring toggle */}
            <button
              type="button"
              onClick={cycleRecurring}
              className={cn(
                "p-1 rounded transition-colors text-xs flex items-center gap-0.5",
                recurring !== "none"
                  ? "text-amber-400"
                  : "text-stone-600 hover:text-stone-400"
              )}
              aria-label={`Recurring: ${recurring}`}
            >
              <Repeat className="w-3.5 h-3.5" />
              {recurring !== "none" && (
                <span className="text-[10px]">
                  {recurring === "daily" ? "D" : "W"}
                </span>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="p-2 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors"
            aria-label="Add task"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Due date input row */}
        {showDateInput && (
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs text-stone-500">Due:</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-stone-800 text-stone-200 text-xs rounded px-2 py-1 border border-stone-700 outline-none"
            />
            {dueDate && (
              <button
                type="button"
                onClick={() => {
                  setDueDate("");
                  setShowDateInput(false);
                }}
                className="text-xs text-stone-500 hover:text-stone-300"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </form>

      {/* Todo list */}
      <div className="flex flex-col gap-0.5 min-h-[100px]">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-sm text-stone-600 py-8">
            {activeFilter
              ? "No tasks in this category."
              : "No tasks yet. Add one above!"}
          </p>
        ) : (
          filteredTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              category={categories.find((c) => c.id === todo.categoryId)}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={(updates) => editTodo(todo.id, updates)}
              onMoveUp={() => reorderTodos(index, index - 1)}
              onMoveDown={() => reorderTodos(index, index + 1)}
              isFirst={index === 0}
              isLast={index === filteredTodos.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
