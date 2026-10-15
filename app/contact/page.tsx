import type { Metadata } from "next";
import { ConsultationForm } from "@/components/ConsultationForm";
import { ContactDetails } from "@/components/ContactDetails";
import { Container, Eyebrow, Section } from "@/components/ui";
import { projectTypes, site, type ProjectType } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact: start a website or web app project",
  description: `Tell ${site.name} about your website, web app or redesign. ${site.area}, ${site.remote.toLowerCase()}. ${site.responseTime}.`,
  alternates: { canonical: "/contact" },
};

type Props = {
  searchParams: Promise<{ project?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { project } = await searchParams;
  const requested = Array.isArray(project) ? project[0] : project;
  const defaultProjectType = projectTypes.find(
    (type) => type.value === requested,
  )?.value as ProjectType | undefined;

  return (
    <Section>
      <Container className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-[520px]">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="t-hero mt-4">Tell us about the project</h1>
          <p className="t-lead mt-6 text-ink-muted">
            You do not need the technical wording. Say what you do, what you
            want the site or app to do, and when you would like it live.
          </p>
          <ContactDetails className="mt-8" />
          <p className="t-small mt-8 text-ink-muted">
            Prefer email? Write to{" "}
            <a href={`mailto:${site.email}`} className="text-brand">
              {site.email}
            </a>{" "}
            with the same details.
          </p>
        </div>
        <ConsultationForm defaultProjectType={defaultProjectType} />
      </Container>
    </Section>
  );
}
