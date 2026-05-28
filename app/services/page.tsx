import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, small office and home office networks, and hardware installation for Pittsburgh-area businesses.",
};

const services = [
  {
    title: "Websites for Small Businesses",
    summary:
      "A website should make it easy for people to understand what you do and get in touch. We build straightforward sites that look professional, load quickly, and are easy to keep current.",
    details: [
      "Clear page structure",
      "Mobile-friendly build",
      "Basic local search setup",
    ],
  },
  {
    title: "Small Office and Home Office Networks",
    summary:
      "Whether you work from a small office, a home office, or a mixed setup, the network needs to be steady. We help set up routers, Wi-Fi, switches, printers, and wired devices so the space works the way it should.",
    details: [
      "Router and Wi-Fi setup",
      "Switches and wired connections",
      "Printer and device connections",
    ],
  },
  {
    title: "Hardware Installation",
    summary:
      "New equipment is only useful when it is installed cleanly and tested. We handle common hardware installs for workstations, monitors, printers, network gear, and office devices.",
    details: [
      "Computers and monitors",
      "Printers and peripherals",
      "Network equipment installs",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="border-b border-border bg-brand-primary text-brand-light">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase text-brand-accent">
            Services
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Websites, office networks, and hardware installs without the
            runaround.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-secondary/90">
            Some projects are simple. Some are tangled. Either way, we start
            with what you are trying to get done and keep the work practical.
          </p>
        </div>
      </section>

      <section className="bg-brand-light">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="grid gap-6 border border-border bg-surface p-6 shadow-sm md:grid-cols-[0.32fr_0.68fr] md:p-8"
            >
              <div>
                <p className="text-sm font-bold text-brand-accent">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-brand-primary">
                  {service.title}
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-muted">
                  {service.summary}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="border-l-2 border-brand-accent bg-brand-light px-4 py-3 text-sm font-semibold text-brand-dark"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-brand-river">
              Not sure where to start?
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-brand-dark">
              A quick conversation is usually enough to figure out what should
              happen first.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 shrink-0 items-center justify-center bg-brand-primary px-6 text-sm font-bold text-brand-light transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
          >
            Talk Through a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
