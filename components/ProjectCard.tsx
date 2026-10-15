import Link from "next/link";
import type { Project } from "@/content/work";
import { DesktopFrame, ScreenshotPair } from "@/components/ProjectFrame";
import { Icon } from "@/components/Icon";
import { ButtonLink, CheckList, Container, TagList } from "@/components/ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-md border border-line bg-surface-raised">
      <Link
        href={`/work/${project.slug}`}
        className="block p-4 pb-0 no-underline"
        aria-label={`${project.name}: read the case study`}
      >
        <DesktopFrame project={project} />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="t-label text-ink-muted">
          {project.client} · {project.kind}
        </p>
        <h3 className="t-h3">
          <Link
            href={`/work/${project.slug}`}
            className="text-ink no-underline hover:text-brand hover:underline"
          >
            {project.name}
          </Link>
        </h3>
        <p className="t-body text-ink-muted">{project.result}</p>
        <div className="mt-auto pt-2">
          <TagList items={project.stack} />
        </div>
      </div>
    </article>
  );
}

/* One full-width card on ink above the project grid. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="rounded-md bg-ink text-surface-100">
      <Container className="grid gap-10 py-10 md:grid-cols-2 md:items-center md:py-14">
        <div className="md:order-2">
          <ScreenshotPair project={project} />
        </div>
        <div className="md:order-1">
          <p className="t-label text-surface-100/70">
            Featured · {project.client} · {project.kind}
          </p>
          <h3 className="t-h2 mt-3">{project.name}</h3>
          <p className="t-lead mt-4 text-surface-100/85">{project.summary}</p>
          <CheckList
            items={project.features}
            className="mt-6 text-surface-100"
            tone="on-ink"
          />
          <div className="mt-6">
            <TagList items={project.stack} tone="on-ink" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/work/${project.slug}`} icon="arrow-right">
              Read the case study
            </ButtonLink>
            {project.url ? (
              <a
                href={project.url}
                className="inline-flex min-h-12 items-center gap-2 px-2 font-semibold text-surface-100 underline-offset-4 hover:underline"
                rel="noopener"
                target="_blank"
              >
                Visit the site
                <Icon name="external-link" />
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </article>
  );
}
