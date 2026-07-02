import type { BookingPayload, Details } from "@/lib/book/schema";

export type Step = 1 | 2 | 3 | 4 | "done";
export const TOTAL_STEPS = 4;

export interface PhotoRef {
  name: string;
  /** Object URL for local preview only (never uploaded in demo). */
  url: string;
}

export interface Confirmation {
  reference: string;
  payload: BookingPayload;
  createdAt: string;
}

export interface BookState {
  step: Step;
  mobile: string; // normalised digits
  mobileVerified: boolean;
  details: Partial<Details>;
  photos: PhotoRef[];
  confirmation: Confirmation | null;
}

export const initialBookState: BookState = {
  step: 1,
  mobile: "",
  mobileVerified: false,
  details: {},
  photos: [],
  confirmation: null,
};

export type BookAction =
  | { type: "SET_MOBILE"; mobile: string }
  | { type: "MOBILE_VERIFIED" }
  | { type: "SET_DETAILS"; details: Partial<Details> }
  | { type: "SET_PHOTOS"; photos: PhotoRef[] }
  | { type: "CONFIRM"; confirmation: Confirmation }
  | { type: "GOTO"; step: Step }
  | { type: "RESET" };

export function bookReducer(state: BookState, action: BookAction): BookState {
  switch (action.type) {
    case "SET_MOBILE":
      // Changing the mobile invalidates a prior verification.
      return { ...state, mobile: action.mobile, mobileVerified: false };
    case "MOBILE_VERIFIED":
      return { ...state, mobileVerified: true, step: 3 };
    case "SET_DETAILS":
      return { ...state, details: { ...state.details, ...action.details } };
    case "SET_PHOTOS":
      return { ...state, photos: action.photos };
    case "CONFIRM":
      return { ...state, confirmation: action.confirmation, step: "done" };
    case "GOTO":
      return { ...state, step: action.step };
    case "RESET":
      return initialBookState;
    default:
      return state;
  }
}
