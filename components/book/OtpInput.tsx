"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  invalid?: boolean;
  /** id for the first box, so a label/aria-describedby can target the group. */
  id?: string;
  describedBy?: string;
}

/**
 * Six single-digit boxes with auto-advance, backspace-to-previous, and paste
 * distribution. Keyboard-navigable; each box is labelled for screen readers.
 */
export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled,
  invalid,
  id,
  describedBy,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focusBox = (i: number) => refs.current[i]?.focus();

  const setChar = (i: number, char: string) => {
    const next = value.split("");
    next[i] = char;
    // Trim to length and drop trailing gaps.
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (i: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1); // last typed digit only
    if (!char) return;
    setChar(i, char);
    if (i < length - 1) focusBox(i + 1);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) {
        setChar(i, "");
      } else if (i > 0) {
        setChar(i - 1, "");
        focusBox(i - 1);
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      focusBox(i - 1);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      focusBox(i + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    focusBox(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex gap-2 sm:gap-3" role="group" aria-label="Verification code">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          id={i === 0 ? id : undefined}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={invalid || undefined}
          aria-describedby={i === 0 ? describedBy : undefined}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "h-14 w-full min-w-0 rounded-sm border bg-white text-center text-h3 font-semibold text-ink",
            "transition-[border-color,box-shadow] focus:outline-none focus:border-blue focus:ring-[3px] focus:ring-blue-tint",
            "disabled:opacity-60",
            invalid ? "border-error" : "border-line",
          )}
        />
      ))}
    </div>
  );
}
