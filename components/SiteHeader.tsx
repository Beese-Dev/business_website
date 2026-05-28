import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-brand-light/95 backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/ccb-logo.png"
            alt="Chartiers Creek Business Technology logo"
            width={150}
            height={129}
            priority
            className="h-[50px] w-[58px] shrink-0 object-contain"
          />
          <span className="min-w-0">
            <span className="block text-base font-bold leading-5 text-brand-primary sm:hidden">
              CCB Tech
            </span>
            <span className="hidden max-w-56 text-sm font-bold uppercase leading-5 tracking-normal text-brand-primary sm:block md:max-w-none">
              Chartiers Creek Business Technology
            </span>
            <span className="hidden text-xs font-medium text-muted md:block">
              Websites, networks, hardware
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex shrink-0 items-center gap-1"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-river focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 sm:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
