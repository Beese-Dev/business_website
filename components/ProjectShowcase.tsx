"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { Project } from "@/content/work";
import { Icon } from "@/components/Icon";
import { DesktopFrame, ScreenshotPair } from "@/components/ProjectFrame";
import { ButtonLink, CheckList, TagList } from "@/components/ui";

/*
  The portfolio as one main window that browses the projects in place.

  The window shows one project at a time, starting with the featured
  one. Previous and next arrows, the dots and the left and right arrow
  keys move through the rest. A strip of small framed windows under it
  lists every project; picking one swaps it into the main window.
  Nothing opens over the page.

  Every project's case-study link is rendered in the strip, so they
  stay crawlable whichever project the window is showing.
*/

function siteAddress(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export function ProjectShowcase({
  projects,
  preload = false,
}: {
  projects: Project[];
  preload?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(false);
  const windowRef = useRef<HTMLElement>(null);
  const count = projects.length;
  const project = projects[index];

  const go = useCallback(
    (target: number) => {
      const next = (target + count) % count;
      setIndex(next);
      setLive(true);
    },
    [count],
  );

  /* After a pick from the strip, bring the window back into view. */
  function pick(target: number) {
    go(target);
    windowRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  /* Announce the change for screen readers once the visitor starts browsing. */
  useEffect(() => {
    if (!live) return;
    windowRef.current?.focus({ preventScroll: true });
  }, [index, live]);

  return (
    <div>
      {/* The main window */}
      <article
        ref={windowRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        aria-roledescription="project browser"
        aria-label={`Our work, ${index + 1} of ${count}: ${project.name}`}
        className="scroll-mt-24 rounded-md bg-ink text-surface-100 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="flex items-center justify-between gap-4 border-b border-surface-100/15 px-4 py-3 sm:px-6 lg:px-10">
          <p className="t-label text-surface-100/70" aria-live="polite">
            {index + 1} of {count}
            {project.featured ? " · Featured" : ""}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous project"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-surface-100/30 text-surface-100 transition-colors hover:border-surface-100 hover:bg-surface-100/10"
            >
              <Icon name="chevron-left" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next project"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-surface-100/30 text-surface-100 transition-colors hover:border-surface-100 hover:bg-surface-100/10"
            >
              <Icon name="chevron-right" />
            </button>
          </div>
        </div>

        <div
          key={project.slug}
          className="showcase-enter grid gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-14 lg:px-10"
        >
          <div>
            <ScreenshotPair project={project} preload={preload && index === 0} />
          </div>
          <div>
            <p className="t-label text-surface-100/70">
              {project.client} · {project.kind} · {project.year}
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
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={`/work/${project.slug}`}
                variant="accent"
                icon="arrow-right"
              >
                Read the case study
              </ButtonLink>
              {project.url ? (
                <a
                  href={project.url}
                  className="inline-flex min-h-12 items-center gap-2 px-2 font-semibold text-surface-100 underline-offset-4 hover:underline"
                  rel="noopener"
                  target="_blank"
                >
                  Visit {siteAddress(project.url)}
                  <Icon name="external-link" size={18} />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Dots */}
        <ol
          className="flex items-center justify-center gap-2 border-t border-surface-100/15 px-4 py-3"
          aria-label="Projects"
        >
          {projects.map((item, i) => (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${item.name}`}
                aria-current={i === index ? "true" : undefined}
                className={`block h-2.5 rounded-pill transition-all ${
                  i === index
                    ? "w-6 bg-accent"
                    : "w-2.5 bg-surface-100/30 hover:bg-surface-100/60"
                }`}
              />
            </li>
          ))}
        </ol>
      </article>

      {/* Every project as a small window; the current one is marked */}
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {projects.map((item, i) => {
          const current = i === index;
          return (
            <li key={item.slug}>
              <div
                className={`card-lift rounded-md border bg-surface-raised p-3 transition-colors ${
                  current ? "border-brand" : "border-line"
                }`}
              >
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={current}
                  aria-label={`Show ${item.name} in the project window`}
                  className="block w-full rounded-md text-left"
                >
                  <DesktopFrame project={item} />
                  <p className="t-label mt-3 text-ink-muted">
                    {item.client} · {item.kind}
                  </p>
                  <p className="t-h3 mt-1 text-ink">{item.name}</p>
                </button>
                <a
                  href={`/work/${item.slug}`}
                  className="t-small mt-2 inline-flex items-center gap-1 text-brand no-underline hover:underline"
                >
                  Case study
                  <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
