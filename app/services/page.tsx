import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import {
  ButtonLink,
  CheckList,
  Container,
  Eyebrow,
  Section,
  TagList,
} from "@/components/ui";
import { services, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services: business websites, launch sites and MVPs, redesigns",
  description: `Web design in ${site.city} and web apps for startups. Business websites, launch sites and MVPs for founders, and redesigns with care and hosting.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div>
      <Section className="border-b border-line">
        <Container>
          <div className="max-w-[680px]">
            <Eyebrow>Services</Eyebrow>
            <h1 className="t-hero mt-4">
              Three offers. One developer on each.
            </h1>
            <p className="t-lead mt-6 text-ink-muted">
              A business website, the first version of a product, or a rebuild
              of what you already have. Each is scoped in one conversation and
              quoted in writing.
            </p>
          </div>
        </Container>
      </Section>

      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          className={index > 0 ? "border-t border-line" : ""}
        >
          <Container className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div className="max-w-[560px]">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-surface-tint text-brand">
                <Icon name={service.icon} />
              </span>
              <h2 className="t-h2 mt-5">{service.title}</h2>
              <p className="t-lead mt-4 text-ink-muted">{service.summary}</p>
              <p className="t-body mt-5 text-ink-muted">{service.body}</p>
              <p className="t-body mt-5">
                <span className="font-semibold">Good for:</span>{" "}
                <span className="text-ink-muted">{service.goodFor}</span>
              </p>
              <div className="mt-6">
                <TagList items={service.stack} />
              </div>
            </div>
            <div className="rounded-md border border-line bg-surface-raised p-6 md:p-8">
              <h3 className="t-h3">What you get</h3>
              <CheckList items={service.includes} className="mt-4 gap-3" />
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Start a project</ButtonLink>
                <ButtonLink href="/#packages" variant="secondary">
                  See packages
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tint>
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="t-h2">Not sure which one you need?</h2>
            <p className="t-lead mt-3 text-ink-muted">
              Describe the project in a few sentences and we will tell you
              which fits, and roughly what it costs.
            </p>
          </div>
          <ButtonLink href="/contact" variant="accent">
            Start a project
          </ButtonLink>
        </Container>
      </Section>
    </div>
  );
}
