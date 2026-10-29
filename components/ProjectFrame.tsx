import Image from "next/image";
import type { Project, Screenshot } from "@/content/work";

/*
  Browser-framed screenshots on surface-raised. A project with no
  screenshot yet gets a plain title card inside the same frame, so the
  layout holds until the real image is dropped into public/work/<slug>/.
*/

function Placeholder({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col justify-end bg-surface-100 p-4 sm:p-6">
      <p className="t-label text-ink-muted">{project.kind}</p>
      <p
        className={`mt-2 font-display font-bold leading-tight text-ink ${
          compact ? "text-xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {project.name}
      </p>
      {!compact ? (
        <p className="t-small mt-2 text-ink-muted">{project.result}</p>
      ) : null}
    </div>
  );
}

export function DesktopFrame({
  project,
  image = project.images.desktop,
  preload = false,
  className = "",
}: {
  project: Project;
  image?: Screenshot | null;
  preload?: boolean;
  className?: string;
}) {
  const address = project.url
    ? project.url.replace(/^https?:\/\//, "")
    : `${project.slug}.app`;

  return (
    <figure
      className={`overflow-hidden rounded-md border border-line bg-surface-raised ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-pill bg-line" />
          <span className="h-2.5 w-2.5 rounded-pill bg-line" />
          <span className="h-2.5 w-2.5 rounded-pill bg-line" />
        </span>
        <span className="t-label ml-2 truncate rounded-sm bg-surface-100 px-2 py-1 normal-case tracking-normal text-ink-muted">
          {address}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={preload}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <Placeholder project={project} />
        )}
      </div>
    </figure>
  );
}

export function PhoneFrame({
  project,
  image = project.images.phone,
  className = "",
}: {
  project: Project;
  image?: Screenshot | null;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[20px] border-2 border-line bg-surface-raised p-1.5 ${className}`}
    >
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[14px]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-pill bg-line"
        />
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="200px"
            className="object-cover object-top"
          />
        ) : (
          <Placeholder project={project} compact />
        )}
      </div>
    </figure>
  );
}

/* Desktop and phone side by side, phone overlapping the lower right. */
export function ScreenshotPair({
  project,
  preload = false,
}: {
  project: Project;
  preload?: boolean;
}) {
  return (
    <div className="relative">
      <DesktopFrame project={project} preload={preload} className="mr-10 sm:mr-16" />
      <PhoneFrame
        project={project}
        className="absolute -bottom-4 right-0 w-24 shadow-card sm:w-32"
      />
    </div>
  );
}
