import type { Metadata } from "next";
import { ConsultationForm } from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Chartiers Creek Business Technology about a website, small office network, home office network, or hardware installation.",
};

export default function ContactPage() {
  return (
    <section className="bg-brand-light">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase text-brand-river">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
            Tell us what you need built, connected, or installed.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            You do not need to have the technical wording figured out. Send a
            quick note about the website, network, or hardware project, and we
            will help make sense of the next step.
          </p>
          <div className="mt-8 border-y border-brand-accent/50 py-5">
            <p className="text-sm font-bold text-brand-primary">
              Good fits include new websites, small office and home office
              networks, Wi-Fi setup, printer installs, workstations, monitors,
              and network hardware.
            </p>
          </div>
        </div>

        <ConsultationForm />
      </div>
    </section>
  );
}
