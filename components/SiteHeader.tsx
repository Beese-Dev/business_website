import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

function NavLinks({ className = "" }: { className?: string }) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-sm px-3 py-2 text-base font-medium text-ink no-underline hover:text-brand hover:underline ${className}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface-raised/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 no-underline"
          aria-label={`${site.name} home`}
        >
          <Image
            src="/ccb-logo.png"
            alt=""
            width={150}
            height={129}
            priority
            className="h-9 w-10 shrink-0 object-contain"
          />
          <span className="min-w-0">
            <span className="block font-display text-xl font-bold leading-none text-ink">
              {site.name}
            </span>
            <span className="t-small hidden text-ink-muted lg:block">
              {site.legalName}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <NavLinks />
          <ButtonLink href="/contact" className="ml-3">
            Start a project
          </ButtonLink>
        </nav>

        <details className="relative md:hidden">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-sm border border-ink-muted px-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Main"
            className="absolute right-0 top-full mt-2 flex w-56 flex-col gap-1 rounded-md border border-line bg-surface-raised p-2 shadow-card"
          >
            <NavLinks className="block" />
            <ButtonLink href="/contact" className="mt-1">
              Start a project
            </ButtonLink>
          </nav>
        </details>
      </div>
    </header>
  );
}
