import Image from "next/image";
import Link from "next/link";
import { ConsultationForm } from "@/components/ConsultationForm";
import { ContactDetails } from "@/components/ContactDetails";
import { Icon } from "@/components/Icon";
import { FeaturedProject, ProjectCard } from "@/components/ProjectCard";
import { ScreenshotPair } from "@/components/ProjectFrame";
import {
  ButtonLink,
  Card,
  CheckList,
  Container,
  Eyebrow,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  everySiteIncludes,
  packages,
  process,
  services,
  site,
} from "@/content/site";
import { getFeaturedProject, projects } from "@/content/work";

export default function Home() {
  const featured = getFeaturedProject();
  const otherProjects = projects.filter((p) => p.slug !== featured.slug);

  return (
    <div>
      {/* 1. Hero */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div className="max-w-[680px]">
            <Eyebrow>
              Web design and web apps · {site.city}, {site.region}
            </Eyebrow>
            <h1 className="t-hero mt-4 text-ink">
              Websites and web apps that get you{" "}
              <span className="text-brand">launched.</span>
            </h1>
            <p className="t-lead mt-6 max-w-[560px] text-ink-muted">
              For small businesses and entrepreneurs. From a polished business
              site to the first working version of your product, designed,
              built and looked after by one developer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#contact" variant="accent">
                Start a project
              </ButtonLink>
              <ButtonLink href="#work" variant="secondary" icon="arrow-right">
                See our work
              </ButtonLink>
            </div>
            <p className="t-small mt-8 text-ink-muted">
              {site.area} · {site.remote} · {site.responseTime}
            </p>
          </div>
          <div className="md:pl-4">
            <ScreenshotPair project={featured} priority />
          </div>
        </Container>
      </section>

      {/* 2. What we build */}
      <Section id="what-we-build">
        <Container>
          <SectionHeading
            eyebrow="What we build"
            title="Three ways we help"
            lead="Pick the one that sounds like you. If none does, say so on the form and we will point you the right way."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} lift className="flex flex-col">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-surface-tint text-brand">
                  <Icon name={service.icon} />
                </span>
                <h3 className="t-h3 mt-5">{service.title}</h3>
                <p className="t-body mt-3 text-ink-muted">{service.summary}</p>
                <p className="t-small mt-4 text-ink-muted">
                  <span className="font-semibold text-ink">Good for:</span>{" "}
                  {service.goodFor}
                </p>
                <Link
                  href={`/services#${service.slug}`}
                  className="mt-auto inline-flex items-center gap-1 pt-6 font-semibold text-brand no-underline hover:underline"
                >
                  More about {service.title.toLowerCase()}
                  <Icon name="arrow-right" size={18} />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Recent projects */}
      <Section id="work" className="border-t border-line">
        <Container>
          <SectionHeading
            eyebrow="Recent projects"
            title="Our Work"
            lead="Real projects, with links. Every claim on this page sits next to one of these."
          />
        </Container>
        <Container>
          <FeaturedProject project={featured} />
          {otherProjects.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : null}
          <div className="mt-10">
            <ButtonLink href="/work" variant="secondary" icon="arrow-right">
              See all work
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 4. Packages */}
      <Section id="packages" tint>
        <Container>
          <SectionHeading
            eyebrow="Packages"
            title="Pick a starting point"
            lead="Every project gets a written quote after one conversation. These are the shapes most projects fit."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`flex flex-col ${
                  pkg.popular ? "border-brand" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="t-h3">{pkg.name}</h3>
                  {pkg.popular ? <Pill>Most popular</Pill> : null}
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-ink">
                  {pkg.priceFrom ? (
                    <>
                      <span className="t-small font-sans font-normal text-ink-muted">
                        from{" "}
                      </span>
                      {pkg.priceFrom}
                    </>
                  ) : (
                    "Quoted"
                  )}
                </p>
                <p className="t-body mt-3 text-ink-muted">{pkg.summary}</p>
                <CheckList items={pkg.includes} className="mt-5" />
                <ButtonLink
                  href={`/contact?project=${encodeURIComponent(
                    pkg.serviceCategory,
                  )}`}
                  variant={pkg.popular ? "primary" : "secondary"}
                  className="mt-8"
                >
                  Start with {pkg.name}
                </ButtonLink>
              </Card>
            ))}
          </div>
          <div className="mt-12 rounded-md border border-line bg-surface-raised p-6 md:p-8">
            <h3 className="t-h3">Every site includes</h3>
            <CheckList
              items={everySiteIncludes}
              className="mt-4 sm:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </Container>
      </Section>

      {/* 5. How we work */}
      <Section id="how-we-work">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Less theater. More working software."
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {process.map((step, index) => (
              <li
                key={step.title}
                className="border-t-2 border-brand pt-5"
              >
                <p className="t-label text-ink-muted">Step {index + 1}</p>
                <h3 className="t-h3 mt-2">{step.title}</h3>
                <p className="t-body mt-3 text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 6. About / proof */}
      <Section id="about" className="border-t border-line">
        <Container className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
          {site.owner.photo ? (
            <Image
              src={site.owner.photo}
              alt={`${site.owner.name}, the developer behind ${site.name}`}
              width={240}
              height={240}
              className="h-40 w-40 rounded-md object-cover md:h-60 md:w-60"
            />
          ) : null}
          <div className="max-w-[680px]">
            <Eyebrow>Who you are talking to</Eyebrow>
            <h2 className="t-h2 mt-3">
              One developer. Local, reachable, and on the whole project.
            </h2>
            <p className="t-lead mt-4 text-ink-muted">
              {site.name} is {site.owner.name}, a developer in {site.city}.
              You talk to the person who designs, builds and hosts your site,
              and that person answers the phone afterwards.
            </p>
            {site.clientQuote ? (
              <blockquote className="mt-8 border-l-2 border-brand pl-5">
                <p className="t-lead text-ink">“{site.clientQuote.quote}”</p>
                <footer className="t-small mt-3 text-ink-muted">
                  {site.clientQuote.name}, {site.clientQuote.role}
                </footer>
              </blockquote>
            ) : null}
            <p className="t-body mt-8 flex items-center gap-2 text-ink-muted">
              <Icon name="map-pin" className="text-brand" />
              {site.area}, on site when it helps. {site.remote}.
            </p>
          </div>
        </Container>
      </Section>

      {/* 7. Contact */}
      <Section id="contact" className="border-t border-line">
        <Container className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-[520px]">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="t-h2 mt-3">Tell us about the project</h2>
            <p className="t-lead mt-4 text-ink-muted">
              A few sentences is enough. You will get a reply from{" "}
              {site.owner.name}, not a sales team.
            </p>
            <ContactDetails className="mt-8" />
          </div>
          <ConsultationForm />
        </Container>
      </Section>
    </div>
  );
}
