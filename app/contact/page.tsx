import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Chartiers Creek Business Technology about a website, small office network, home office network, or hardware installation.",
};

const projectTypes = [
  "Website",
  "Small office / home office network",
  "Hardware installation",
  "Not sure yet",
];

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

        <form
          action="/thank-you"
          className="border border-border bg-surface p-6 shadow-[0_24px_60px_rgba(16,47,73,0.12)] md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-brand-dark">
              Full name
              <input
                className="h-12 border border-border bg-brand-light px-4 text-base font-normal text-brand-dark outline-none transition-colors focus:border-brand-accent"
                name="name"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-brand-dark">
              Company
              <input
                className="h-12 border border-border bg-brand-light px-4 text-base font-normal text-brand-dark outline-none transition-colors focus:border-brand-accent"
                name="company"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-brand-dark">
              Email
              <input
                className="h-12 border border-border bg-brand-light px-4 text-base font-normal text-brand-dark outline-none transition-colors focus:border-brand-accent"
                name="email"
                type="email"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-brand-dark">
              Phone
              <input
                className="h-12 border border-border bg-brand-light px-4 text-base font-normal text-brand-dark outline-none transition-colors focus:border-brand-accent"
                name="phone"
                type="tel"
              />
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-brand-dark">
              What are you looking for help with?
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {projectTypes.map((type) => (
                <label
                  key={type}
                  className="flex min-h-12 items-center gap-3 border border-border bg-brand-light px-4 text-sm font-semibold text-brand-dark"
                >
                  <input
                    className="h-4 w-4 accent-brand-primary"
                    name="projectType"
                    type="radio"
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-6 grid gap-2 text-sm font-bold text-brand-dark">
            What is going on?
            <textarea
              className="min-h-36 resize-y border border-border bg-brand-light px-4 py-3 text-base font-normal leading-7 text-brand-dark outline-none transition-colors focus:border-brand-accent"
              name="details"
            />
          </label>

          <button
            className="mt-6 inline-flex h-12 w-full items-center justify-center bg-brand-primary px-6 text-sm font-bold text-brand-light transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 sm:w-auto"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
