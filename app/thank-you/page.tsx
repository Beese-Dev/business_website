import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Thanks, we have your note",
  description: `Thanks for contacting ${site.name}. ${site.responseTime}.`,
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <Section>
      <Container narrow>
        <div className="rounded-md border border-line bg-surface-raised p-8 md:p-10">
          <Eyebrow>Sent</Eyebrow>
          <h1 className="t-h2 mt-3">Thanks. Your note came through.</h1>
          <p className="t-lead mt-4 text-ink-muted">
            {site.owner.name} will read it and reply within one business day.
            A copy is on its way to your inbox.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/work" variant="secondary">
              See our work meanwhile
            </ButtonLink>
            <ButtonLink href="/" variant="ghost">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
