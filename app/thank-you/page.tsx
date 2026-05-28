import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thanks for contacting Chartiers Creek Business Technology about your website, network, or hardware project.",
};

export default function ThankYouPage() {
  return (
    <section className="bg-brand-light">
      <div className="mx-auto grid min-h-[70svh] max-w-7xl place-items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl border border-border bg-surface p-8 text-center shadow-[0_24px_60px_rgba(16,47,73,0.12)] sm:p-10">
          <Image
            src="/ccb-shield.png"
            alt="Chartiers Creek Business Technology shield"
            width={150}
            height={150}
            className="mx-auto h-24 w-24 object-contain"
          />
          <p className="mt-6 text-sm font-bold uppercase text-brand-river">
            Thank You
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-dark">
            Thanks. Your message came through.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">
            We will read through the details and follow up about your website,
            small office network, home office network, or hardware installation.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center bg-brand-primary px-6 text-sm font-bold text-brand-light transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
