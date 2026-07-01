"use client";

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import {
  bookReducer,
  initialBookState,
  type BookAction,
  type BookState,
} from "@/lib/book/state";

interface BookContextValue {
  state: BookState;
  dispatch: Dispatch<BookAction>;
}

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookReducer, initialBookState);
  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook(): BookContextValue {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used within <BookProvider>");
  return ctx;
}
