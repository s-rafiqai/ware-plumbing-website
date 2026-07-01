"use client";

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import {
  bookReducer,
  initialBookState,
  type BookAction,
  type BookState,
} from "@/lib/book/state";
import type { Details } from "@/lib/book/schema";

interface BookContextValue {
  state: BookState;
  dispatch: Dispatch<BookAction>;
}

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({
  children,
  initialDetails,
}: {
  children: ReactNode;
  /** Pre-filled Step 3 fields from a deep-link (?service=/?suburb=). */
  initialDetails?: Partial<Details>;
}) {
  const [state, dispatch] = useReducer(bookReducer, initialBookState, (init) =>
    initialDetails ? { ...init, details: { ...init.details, ...initialDetails } } : init,
  );
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
