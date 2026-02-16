"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo, TodoCategory, RecurringType } from "@/types/todo";
import { DEFAULT_CATEGORIES } from "@/types/todo";

const MAX_TODOS = 5;

type SortMode = "priority" | "dueDate" | "created";

interface TodoStoreState {
  todos: Todo[];
  categories: TodoCategory[];
  activeFilter: string | null;
  sortMode: SortMode;

  addTodo: (
    text: string,
    options?: {
      priority?: Todo["priority"];
      categoryId?: string;
      dueDate?: string;
      recurring?: RecurringType;
    }
  ) => boolean;
  editTodo: (
    id: string,
    updates: Partial<
      Pick<Todo, "text" | "priority" | "categoryId" | "dueDate" | "recurring">
    >
  ) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  reorderTodos: (fromIndex: number, toIndex: number) => void;
  clearCompleted: () => void;

  addCategory: (name: string, color: string) => void;
  deleteCategory: (id: string) => void;
  setActiveFilter: (categoryId: string | null) => void;
  setSortMode: (mode: SortMode) => void;

  getFilteredTodos: () => Todo[];

  processRecurringTodos: () => void;
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const priorityWeight: Record<Todo["priority"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export const useTodoStore = create<TodoStoreState>()(
  persist(
    (set, get) => ({
      todos: [],
      categories: DEFAULT_CATEGORIES,
      activeFilter: null,
      sortMode: "created" as SortMode,

      addTodo: (text, options = {}) => {
        const state = get();
        if (state.todos.length >= MAX_TODOS) return false;

        const {
          priority = "medium",
          categoryId,
          dueDate,
          recurring = "none",
        } = options;

        set((s) => ({
          todos: [
            ...s.todos,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              priority,
              order: s.todos.length,
              createdAt: new Date().toISOString(),
              categoryId,
              dueDate,
              recurring,
            },
          ],
        }));
        return true;
      },

      editTodo: (id, updates) =>
        set((s) => ({
          todos: s.todos.map((t) =>
            t.id === id
              ? { ...t, ...updates, editedAt: new Date().toISOString() }
              : t
          ),
        })),

      toggleTodo: (id) =>
        set((s) => ({
          todos: s.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      deleteTodo: (id) =>
        set((s) => ({
          todos: s.todos.filter((t) => t.id !== id),
        })),

      reorderTodos: (fromIndex, toIndex) =>
        set((s) => {
          const filtered = get().getFilteredTodos();
          const fromTodo = filtered[fromIndex];
          const toTodo = filtered[toIndex];
          if (!fromTodo || !toTodo) return s;

          const realFromIndex = s.todos.findIndex(
            (t) => t.id === fromTodo.id
          );
          const realToIndex = s.todos.findIndex((t) => t.id === toTodo.id);

          const newTodos = [...s.todos];
          const [moved] = newTodos.splice(realFromIndex, 1);
          newTodos.splice(realToIndex, 0, moved);
          return {
            todos: newTodos.map((t, i) => ({ ...t, order: i })),
          };
        }),

      clearCompleted: () =>
        set((s) => ({
          todos: s.todos.filter((t) => !t.completed),
        })),

      addCategory: (name, color) =>
        set((s) => ({
          categories: [
            ...s.categories,
            { id: crypto.randomUUID(), name, color },
          ],
        })),

      deleteCategory: (id) =>
        set((s) => ({
          categories: s.categories.filter((c) => c.id !== id),
          todos: s.todos.map((t) =>
            t.categoryId === id ? { ...t, categoryId: undefined } : t
          ),
        })),

      setActiveFilter: (categoryId) => set({ activeFilter: categoryId }),

      setSortMode: (mode) => set({ sortMode: mode }),

      getFilteredTodos: () => {
        const { todos, activeFilter, sortMode } = get();
        let filtered = activeFilter
          ? todos.filter((t) => t.categoryId === activeFilter)
          : todos;

        if (sortMode === "priority") {
          filtered = [...filtered].sort(
            (a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]
          );
        } else if (sortMode === "dueDate") {
          filtered = [...filtered].sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate.localeCompare(b.dueDate);
          });
        }

        return filtered;
      },

      processRecurringTodos: () => {
        const today = new Date();
        set((s) => {
          const newTodos: Todo[] = [];

          const updatedTodos = s.todos.map((todo) => {
            if (
              todo.completed &&
              todo.recurring !== "none" &&
              !isSameDay(new Date(todo.createdAt), today)
            ) {
              newTodos.push({
                id: crypto.randomUUID(),
                text: todo.text,
                completed: false,
                priority: todo.priority,
                order: s.todos.length + newTodos.length,
                createdAt: today.toISOString(),
                categoryId: todo.categoryId,
                dueDate: undefined,
                recurring: todo.recurring,
              });
              return { ...todo, recurring: "none" as RecurringType };
            }
            return todo;
          });

          if (newTodos.length === 0) return s;
          return { todos: [...updatedTodos, ...newTodos] };
        });
      },
    }),
    { name: "komorebi-todos" }
  )
);
