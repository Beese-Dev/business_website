import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Business Websites",
    kicker: "Web",
    body: "Lean, credible sites that explain the business, work on mobile, and make the next step obvious.",
  },
  {
    title: "SOHO Networks",
    kicker: "Network",
    body: "Wi-Fi, routing, switches, printers, and wired devices configured for small offices and home offices.",
  },
  {
    title: "Hardware Installation",
    kicker: "Install",
    body: "Workstations, monitors, printers, access points, and office hardware installed cleanly and tested on-site.",
  },
];

const proofPoints = [
  "Pittsburgh-area support",
  "Plain-English recommendations",
  "Clean, practical installs",
];

const process = [
  "Listen to the goal and inspect what is already in place.",
  "Recommend the simplest reliable path before you spend money.",
  "Build, connect, test, and explain the finished setup clearly.",
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-brand-light">
        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.02fr_0.98fr] md:items-start md:py-14 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-brand-river">
              Websites, networks, and hardware installation
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] text-brand-dark sm:text-5xl lg:text-6xl">
              Business technology support for small teams that need things to
              work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              CCB Tech helps local businesses look professional online, connect
              their office cleanly, and get everyday equipment installed without
              turning the project into a maze.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center bg-brand-primary px-6 text-sm font-bold text-brand-light shadow-[0_18px_36px_rgba(12,23,32,0.18)] transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center border border-brand-primary/30 bg-surface px-6 text-sm font-bold text-brand-primary transition-colors hover:border-brand-river hover:text-brand-river focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              >
                View Services
              </Link>
            </div>

            <div className="mt-10 grid gap-3 text-sm font-medium text-brand-dark sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point} className="border-l-2 border-brand-accent pl-3">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-6 -top-4 h-8 bg-brand-accent/80" />
            <div className="relative border border-brand-primary/20 bg-surface shadow-[0_24px_70px_rgba(16,47,73,0.18)]">
              <div className="grid gap-0 md:grid-cols-[0.78fr_1fr]">
                <div className="grid place-items-center bg-brand-primary px-8 py-10 text-brand-light">
                  <Image
                    src="/ccb-logo.png"
                    alt="Chartiers Creek Business Technology logo"
                    width={150}
                    height={129}
                    priority
                    className="h-32 w-36 object-contain"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase text-brand-river">
                    Practical support desk
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-brand-dark">
                    One local partner for the small technology jobs that keep
                    stacking up.
                  </h2>
                  <div className="mt-8 grid gap-4">
                    {services.map((service) => (
                      <div
                        key={service.title}
                        className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-border pt-4"
                      >
                        <p className="text-xs font-bold uppercase text-brand-accent">
                          {service.kicker}
                        </p>
                        <div>
                          <h3 className="font-bold text-brand-primary">
                            {service.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-muted">
                            {service.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-brand-river">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">
              Clear help for the work between big IT contracts and doing it
              yourself.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="border border-border bg-brand-light p-5"
              >
                <p className="text-xs font-bold uppercase text-brand-accent">
                  {service.kicker}
                </p>
                <h3 className="mt-3 text-xl font-bold text-brand-primary">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brand-primary text-brand-light">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-start lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-brand-accent">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Less theater. More working equipment and a website you can point
              people to.
            </h2>
          </div>
          <div className="grid gap-5">
            {process.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[3rem_1fr] gap-5 border-t border-brand-secondary/25 pt-5"
              >
                <span className="text-sm font-bold text-brand-accent">
                  0{index + 1}
                </span>
                <p className="text-lg leading-8 text-brand-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-brand-river">
              Ready to talk
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-brand-dark">
              Tell us what needs built, connected, or installed. We will help
              make the next step clear.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 shrink-0 items-center justify-center bg-brand-accent px-6 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary hover:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            Contact CCB Tech
          </Link>
        </div>
      </section>
    </div>
  );
}
