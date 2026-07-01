import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Blue fill, white text — the main action (book, call, contact).
  primary: "bg-blue text-white hover:bg-blue-dark",
  // White fill, line border, ink text — secondary action.
  outline: "bg-white text-ink border border-line hover:bg-surface hover:border-grey",
  // Blue text, no fill — inline CTA with a chevron (the hero CTA style).
  ghost: "text-blue hover:text-blue-dark",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-5 text-body",
  lg: "h-12 px-6 text-body",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Fully rounded (pill) shape — used for the nav action. Defaults to 8px radius. */
  pill?: boolean;
  /** Show a trailing chevron. Defaults on for the ghost (inline CTA) variant. */
  chevron?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  /** When set, renders an anchor. Internal paths use next/link. */
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** True for links that leave the app or aren't page routes (tel:, mailto:, http, #). */
function isNonRouteHref(href: string): boolean {
  return /^(https?:|tel:|mailto:|#)/.test(href);
}

export function Button({
  variant = "primary",
  size = "md",
  pill,
  chevron,
  className,
  children,
  ...rest
}: ButtonProps) {
  const showChevron = chevron ?? variant === "ghost";
  const classes = cn(
    base,
    pill ? "rounded-pill" : "rounded-sm",
    variants[variant],
    // Ghost is an inline text link, so it skips the fixed height/padding sizing.
    variant !== "ghost" && sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {showChevron && <ChevronRight aria-hidden className="size-4" />}
    </>
  );

  // Link form: `href` is present.
  if (typeof rest.href === "string") {
    const { href } = rest;
    return isNonRouteHref(href) ? (
      <a href={href} className={classes}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  // Button form: spread the remaining native button attributes.
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
