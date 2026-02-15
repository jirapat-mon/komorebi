"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo } from "@/types/timer";

const MAX_TODOS = 5;

interface TodoStoreState {
  todos: Todo[];
  addTodo: (text: string, priority?: Todo["priority"]) => boolean;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  reorderTodos: (fromIndex: number, toIndex: number) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStoreState>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (text, priority = "medium") => {
        const state = get();
        if (state.todos.length >= MAX_TODOS) return false;

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
            },
          ],
        }));
        return true;
      },

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
          const newTodos = [...s.todos];
          const [moved] = newTodos.splice(fromIndex, 1);
          newTodos.splice(toIndex, 0, moved);
          return {
            todos: newTodos.map((t, i) => ({ ...t, order: i })),
          };
        }),

      clearCompleted: () =>
        set((s) => ({
          todos: s.todos.filter((t) => !t.completed),
        })),
    }),
    { name: "komorebi-todos" }
  )
);
