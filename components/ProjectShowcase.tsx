"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { Project } from "@/content/work";
import { Icon } from "@/components/Icon";
import { DesktopFrame, ScreenshotPair } from "@/components/ProjectFrame";
import { ButtonLink, CheckList, TagList } from "@/components/ui";

/*
  The portfolio as one main window plus a modal.

  The window shows the first project (the featured one) at full width.
  A strip of small frames underneath lists the others. Clicking the
  window, the strip or "Browse all projects" opens a modal where every
  project is a slide in a horizontally snapping track: scroll, swipe,
  use the arrow buttons or the arrow keys to move between them.

  The modal's markup is always in the page (a closed <dialog>), so the
  case-study links inside it are crawlable.
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
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const main = projects[0];
  const others = projects.slice(1);
  const count = projects.length;

  const scrollToSlide = useCallback(
    (target: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.min(Math.max(target, 0), count - 1);
      track.scrollTo({ left: next * track.clientWidth, behavior });
      setIndex(next);
    },
    [count],
  );

  function openAt(target: number) {
    setIndex(target);
    setOpen(true);
  }

  /* Open and close the native dialog from state, and lock page scroll. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      scrollToSlide(index, "instant");
      const previous = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = previous;
      };
    }
    if (dialog.open) dialog.close();
    // Only re-run when the modal opens or closes; the slide index is
    // handled by scrollToSlide after that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Keep the counter in step when the visitor scrolls or swipes. */
  function handleScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const current = Math.round(track.scrollLeft / track.clientWidth);
    if (current !== index) setIndex(current);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToSlide(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToSlide(index - 1);
    }
  }

  return (
    <div>
      {/* The main window */}
      <article className="rounded-md bg-ink text-surface-100">
        <div className="grid gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-14 lg:px-10">
          <button
            type="button"
            onClick={() => openAt(0)}
            className="group block w-full cursor-zoom-in rounded-md text-left focus-visible:outline-accent"
            aria-label={`${main.name}: browse the projects`}
          >
            <div className="transition-transform duration-200 group-hover:-translate-y-1">
              <ScreenshotPair project={main} preload={preload} />
            </div>
          </button>
          <div>
            <p className="t-label text-surface-100/70">
              {main.featured ? "Featured · " : ""}
              {main.client} · {main.kind}
            </p>
            <h3 className="t-h2 mt-3">{main.name}</h3>
            <p className="t-lead mt-4 text-surface-100/85">{main.summary}</p>
            <div className="mt-6">
              <TagList items={main.stack} tone="on-ink" />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openAt(0)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-accent px-5 font-semibold text-on-accent transition-colors hover:bg-accent-hover"
              >
                Browse all {count} projects
                <Icon name="arrow-right" />
              </button>
              <ButtonLink
                href={`/work/${main.slug}`}
                variant="ghost"
                className="text-surface-100"
              >
                Read the case study
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      {/* The other projects as small windows */}
      {others.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, i) => (
            <li key={project.slug}>
              <button
                type="button"
                onClick={() => openAt(i + 1)}
                className="card-lift block w-full cursor-zoom-in rounded-md border border-line bg-surface-raised p-3 text-left"
                aria-label={`${project.name}: open in the project browser`}
              >
                <DesktopFrame project={project} />
                <p className="t-label mt-3 text-ink-muted">
                  {project.client} · {project.kind}
                </p>
                <p className="t-h3 mt-1 text-ink">{project.name}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {/* The modal */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-auto h-[100dvh] w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-ink/80 backdrop:backdrop-blur-sm sm:h-auto sm:max-h-[92dvh] sm:w-[calc(100vw-2rem)] sm:max-w-[1200px] open:flex open:flex-col"
      >
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-surface-100 sm:rounded-md sm:border sm:border-line sm:shadow-card">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
            <p id={titleId} className="t-label text-ink-muted">
              Our work · {index + 1} of {count}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToSlide(index - 1)}
                disabled={index === 0}
                aria-label="Previous project"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink hover:bg-surface-raised disabled:opacity-40"
              >
                <Icon name="chevron-left" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSlide(index + 1)}
                disabled={index === count - 1}
                aria-label="Next project"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink hover:bg-surface-raised disabled:opacity-40"
              >
                <Icon name="chevron-right" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink hover:bg-surface-raised"
              >
                <Icon name="x" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, i) => (
              <section
                key={project.slug}
                aria-label={project.name}
                aria-hidden={i !== index}
                className="h-full w-full shrink-0 snap-center overflow-y-auto"
              >
                <div className="grid gap-8 px-4 py-6 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-10 md:px-10 md:py-10">
                  <div className="md:sticky md:top-0">
                    <ScreenshotPair project={project} />
                  </div>
                  <div>
                    <p className="t-label text-ink-muted">
                      {project.client} · {project.kind} · {project.year}
                    </p>
                    <h3 className="t-h2 mt-3">{project.name}</h3>
                    <p className="t-body mt-4 text-ink-muted">
                      {project.summary}
                    </p>
                    <CheckList items={project.features} className="mt-6" />
                    <div className="mt-6">
                      <TagList items={project.stack} />
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <ButtonLink
                        href={`/work/${project.slug}`}
                        icon="arrow-right"
                        tabIndex={i === index ? 0 : -1}
                      >
                        Read the case study
                      </ButtonLink>
                      {project.url ? (
                        <a
                          href={project.url}
                          className="inline-flex min-h-12 items-center gap-2 px-2 font-semibold text-brand underline-offset-4 hover:underline"
                          rel="noopener"
                          target="_blank"
                          tabIndex={i === index ? 0 : -1}
                        >
                          Visit {siteAddress(project.url)}
                          <Icon name="external-link" size={18} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Dots */}
          <ol className="flex items-center justify-center gap-2 border-t border-line px-4 py-3">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <button
                  type="button"
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Go to ${project.name}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`block h-2.5 rounded-pill transition-all ${
                    i === index ? "w-6 bg-brand" : "w-2.5 bg-line hover:bg-ink-muted"
                  }`}
                />
              </li>
            ))}
          </ol>
        </div>
      </dialog>
    </div>
  );
}
