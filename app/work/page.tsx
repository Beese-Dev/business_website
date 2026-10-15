import type { Metadata } from "next";
import { FeaturedProject, ProjectCard } from "@/components/ProjectCard";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { getFeaturedProject, projects } from "@/content/work";

export const metadata: Metadata = {
  title: "Work: websites and web apps we have built",
  description:
    "Case studies of websites and web apps built by CCB Tech for small businesses and founders, with live links.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const featured = getFeaturedProject();
  const rest = projects.filter((project) => project.slug !== featured.slug);

  return (
    <div>
      <Section className="border-b border-line">
        <Container>
          <div className="max-w-[680px]">
            <Eyebrow>Work</Eyebrow>
            <h1 className="t-hero mt-4">Websites and web apps we have built</h1>
            <p className="t-lead mt-6 text-ink-muted">
              Each one has a case study: what it is for, what was hard, what we
              built and how it turned out.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <FeaturedProject project={featured} />
          {rest.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : null}
        </Container>
      </Section>

      <Section tint>
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="t-h2">Have a project like one of these?</h2>
            <p className="t-lead mt-3 text-ink-muted">
              Tell us what you are trying to launch and we will say how we
              would do it.
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
