import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { DesktopFrame, PhoneFrame } from "@/components/ProjectFrame";
import {
  ButtonLink,
  CheckList,
  Container,
  Eyebrow,
  Section,
  TagList,
} from "@/components/ui";
import { getProject, projects } from "@/content/work";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name}: ${project.kind.toLowerCase()} case study`,
    description: project.result,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = project.caseStudy;

  return (
    <article>
      {/* Intro and facts */}
      <Section className="border-b border-line">
        <Container>
          <Link
            href="/work"
            className="t-small inline-flex items-center gap-1 text-ink-muted no-underline hover:text-brand hover:underline"
          >
            <Icon name="arrow-left" size={16} />
            All work
          </Link>
          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-[680px]">
              <Eyebrow>
                {project.client} · {project.kind} · {project.year}
              </Eyebrow>
              <h1 className="t-hero mt-4">{project.name}</h1>
              <p className="t-lead mt-6 text-ink-muted">{project.summary}</p>
              {project.url ? (
                <a
                  href={project.url}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-brand"
                  rel="noopener"
                  target="_blank"
                >
                  Visit {project.url.replace(/^https?:\/\//, "")}
                  <Icon name="external-link" size={18} />
                </a>
              ) : null}
            </div>
            <dl className="grid min-w-[220px] gap-3 rounded-md border border-line bg-surface-raised p-5">
              {study.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="t-label text-ink-muted">{fact.label}</dt>
                  <dd className="t-body mt-1 text-ink">{fact.value}</dd>
                </div>
              ))}
              <div>
                <dt className="t-label text-ink-muted">Stack</dt>
                <dd className="mt-2">
                  <TagList items={project.stack} />
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* Hero screenshot */}
      <Section className="pb-0 md:pb-0">
        <Container className="grid gap-6 md:grid-cols-[1fr_200px] md:items-end">
          <DesktopFrame project={project} priority />
          <PhoneFrame project={project} className="w-40 md:w-full" />
        </Container>
      </Section>

      {/* The story */}
      <Section>
        <Container narrow className="grid gap-12">
          <Block title="The idea">
            <p className="t-lead text-ink-muted">{study.idea}</p>
          </Block>
          <Block title="The challenge">
            <p className="t-body text-ink-muted">{study.challenge}</p>
          </Block>
          <Block title="What we built">
            <CheckList items={study.built} className="gap-3" />
          </Block>
          <Block title="Under the hood">
            <ul className="grid gap-3">
              {study.underTheHood.map((item) => (
                <li
                  key={item}
                  className="t-body border-l-2 border-line pl-4 text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="The result">
            <p className="t-lead text-ink">{study.result}</p>
            {study.quote ? (
              <blockquote className="mt-8 border-l-2 border-brand pl-5">
                <p className="t-lead text-ink">“{study.quote.quote}”</p>
                <footer className="t-small mt-3 text-ink-muted">
                  {study.quote.name}, {study.quote.role}
                </footer>
              </blockquote>
            ) : null}
          </Block>
        </Container>
      </Section>

      {/* Call to action */}
      <Section tint>
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="t-h2">
              {project.audience === "entrepreneurs"
                ? "Have a product to launch?"
                : "Need a site like this?"}
            </h2>
            <p className="t-lead mt-3 text-ink-muted">
              Tell us what you are trying to do. You will hear back within one
              business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="accent">
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              More work
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </article>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="t-h2">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
