import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-accent/30 bg-brand-dark text-brand-light">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div>
          <p className="font-bold uppercase tracking-normal">
            Chartiers Creek Business Technology
          </p>
          <p className="mt-2 inline-block bg-brand-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
            Pittsburgh-area support
          </p>
          <p className="mt-2 max-w-xl text-brand-secondary/80">
            Practical websites, office networks, and hardware installation for
            small teams around Pittsburgh.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <Link
            href="/contact"
            className="font-semibold text-brand-secondary transition-colors hover:text-brand-accent"
          >
            Get in touch
          </Link>
          <p className="text-brand-secondary/70">CCBTEC.COM</p>
        </div>
      </div>
    </footer>
  );
}
