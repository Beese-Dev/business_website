import Link from "next/link";
import { site } from "@/content/site";
import { ContactDetails } from "@/components/ContactDetails";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-raised">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_auto]">
        <div className="max-w-sm">
          <p className="font-display text-xl font-bold text-ink">{site.name}</p>
          <p className="t-small mt-1 text-ink-muted">{site.legalName}</p>
          <p className="t-body mt-4 text-ink-muted">{site.tagline}</p>
        </div>

        <div>
          <p className="t-label text-ink-muted">Contact</p>
          <ContactDetails className="mt-3" />
        </div>

        <nav aria-label="Footer">
          <p className="t-label text-ink-muted">Pages</p>
          <ul className="mt-3 grid gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="t-body text-ink no-underline hover:text-brand hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="t-small mx-auto max-w-[1200px] px-4 py-5 text-ink-muted sm:px-6">
          © {new Date().getFullYear()} {site.legalName}. {site.area} ·{" "}
          {site.remote.toLowerCase()}.
        </p>
      </div>
    </footer>
  );
}
