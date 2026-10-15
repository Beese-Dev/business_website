import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";

/* Layout */

export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 ${
        narrow ? "max-w-[680px]" : "max-w-[1200px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tint = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 md:py-24 ${
        tint ? "bg-surface-tint" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-12 max-w-[680px] ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="t-h2 mt-3">{title}</h2>
      {lead ? <p className="t-lead mt-4 text-ink-muted">{lead}</p> : null}
    </div>
  );
}

/* Text */

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="t-label text-brand">{children}</p>;
}

/* `tone="on-ink"` is for the featured card, which sits on the ink colour. */
type Tone = "default" | "on-ink";

export function Tag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`t-label inline-flex items-center rounded-sm border px-2 py-1 ${
        tone === "on-ink"
          ? "border-surface-100/40 text-surface-100/90"
          : "border-line text-ink-muted"
      }`}
    >
      {children}
    </span>
  );
}

export function TagList({
  items,
  tone = "default",
}: {
  items: string[];
  tone?: Tone;
}) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="t-label inline-flex items-center rounded-pill bg-accent px-3 py-1 text-on-accent">
      {children}
    </span>
  );
}

export function CheckList({
  items,
  className = "",
  tone = "default",
}: {
  items: string[];
  className?: string;
  tone?: Tone;
}) {
  return (
    <ul className={`grid gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="t-body flex items-start gap-2">
          <Icon
            name="check"
            className={`mt-1 shrink-0 ${
              tone === "on-ink" ? "text-surface-100" : "text-brand"
            }`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* Buttons */

type Variant = "primary" | "accent" | "secondary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm font-sans text-base font-semibold no-underline transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand px-5 text-on-brand hover:bg-brand-hover",
  accent: "bg-accent px-5 text-on-accent hover:bg-accent-hover",
  secondary:
    "border border-ink-muted bg-transparent px-5 text-ink hover:bg-surface-raised",
  ghost: "px-2 text-brand hover:underline",
};

export function ButtonLink({
  variant = "primary",
  icon,
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: Variant;
  icon?: IconName;
}) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon ? <Icon name={icon} /> : null}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* Cards */

export function Card({
  children,
  className = "",
  lift = false,
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <div
      className={`rounded-md border border-line bg-surface-raised p-6 ${
        lift ? "card-lift" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
