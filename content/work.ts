/*
  Portfolio. One featured project at a time.
  Screenshots live in public/work/<slug>/ and are optional: a project
  without them renders a framed placeholder until they are added.
*/

export type Screenshot = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  client: string;
  kind: "Web app" | "Business website" | "Redesign";
  audience: "entrepreneurs" | "small businesses";
  featured?: boolean;
  url: string | null;
  year: string;
  result: string; // one line, shown on cards
  summary: string; // two or three sentences
  features: string[];
  stack: string[];
  images: {
    desktop: Screenshot | null;
    phone: Screenshot | null;
    before?: Screenshot | null;
  };
  caseStudy: {
    facts: Array<{ label: string; value: string }>;
    idea: string;
    challenge: string;
    built: string[];
    underTheHood: string[];
    result: string;
    quote: { quote: string; name: string; role: string } | null;
  };
};

export const projects: Project[] = [
  {
    slug: "rixa-aperta",
    name: "Rixa Aperta",
    client: "Rixa Aperta",
    kind: "Web app",
    audience: "entrepreneurs",
    featured: true,
    url: "https://rixaaperta.com",
    year: "2026",
    result: "A live debate platform, from idea to working product.",
    summary:
      "Rixa Aperta is a live debate platform. Two people take timed turns on a motion while an audience follows along, scores are kept, and every debater has a profile. We built it from the first sketch to a product people can sign in to and use.",
    features: [
      "Timed turns with automatic forfeits",
      "Live scoring during a debate",
      "Debater profiles and history",
    ],
    stack: ["Web app", "Live timers"], // TODO: replace with the real stack
    images: {
      desktop: {
        src: "/work/rixa-aperta/desktop.png",
        alt: "The Rixa Aperta challenge board on desktop: how a debate works, topic filters and starter propositions",
      },
      phone: {
        src: "/work/rixa-aperta/phone.png",
        alt: "The Rixa Aperta challenge board on a phone",
      },
    },
    caseStudy: {
      facts: [
        { label: "Client", value: "Rixa Aperta" },
        { label: "Type", value: "Web app (MVP)" },
        { label: "For", value: "A founder launching a product" },
      ],
      idea: "Online arguments are endless and nobody wins. The founder wanted the opposite: a structured debate with a clock, where two people argue one motion, turns are timed, and the result is scored. Something closer to a match than a comment thread.",
      challenge:
        "A debate only works if the timing is fair and nobody can stall. Turns have to run on a shared clock, a missed turn has to count against you automatically, and all of it has to feel live on an ordinary phone. The product also had to be simple enough that a first-time visitor could join a debate in under a minute.",
      built: [
        "Debate rooms with timed turns. When a turn runs out the clock moves on; skip too many and the debate is forfeited automatically.",
        "Scoring that updates as the debate runs, so the audience sees who is ahead.",
        "Profiles with each debater's record, so wins mean something.",
      ],
      underTheHood: [
        "Server-driven timers, so a slow phone or a closed tab cannot stretch a turn.",
        "Live updates pushed to everyone in the room, not polled.",
        "Deployed on a real domain with hosting the founder owns.",
      ],
      result:
        "Rixa Aperta went from an idea to a product that people can sign in to and use. The founder has a live platform to put in front of users and a codebase that can grow with it.",
      quote: null, // TODO: add the founder's quote once approved
    },
  },
  {
    slug: "ccbtec",
    name: "ccbtec.com",
    client: "CCB Tech",
    kind: "Business website",
    audience: "small businesses",
    url: "https://ccbtec.com",
    year: "2026",
    result: "Our own site, rebuilt to load fast and lead with the work.",
    summary:
      "The site you are reading. Rebuilt on Next.js from a design system of real tokens, with a contact form that routes leads by email, local business schema for search, and a dark theme that follows your system setting.",
    features: [
      "Home, services and portfolio pages",
      "Contact form with email routing and auto-reply",
      "LocalBusiness schema and sitemap",
      "Light and dark themes",
    ],
    stack: ["Next.js", "Tailwind", "Vercel"],
    images: {
      desktop: null, // e.g. { src: "/work/ccbtec/desktop.png", alt: "The ccbtec.com home page on desktop" }
      phone: null,
    },
    caseStudy: {
      facts: [
        { label: "Client", value: "CCB Tech" },
        { label: "Type", value: "Business website" },
        { label: "Stack", value: "Next.js, Tailwind, Vercel" },
      ],
      idea: "A developer's own site is the first thing a prospect checks. It had to be the proof: fast, plain, and leading with real projects instead of claims.",
      challenge:
        "The previous site told without showing. It listed services three times, mixed websites with networking and hardware, and had no project, screenshot or link. Nothing led.",
      built: [
        "A home page that leads with the work: featured case study, project cards, packages with what each includes.",
        "A portfolio with one case-study template for every project.",
        "A short contact form that sends the lead by email and replies to the sender.",
        "A design system of real tokens: colour, type, spacing and radius, in light and dark.",
      ],
      underTheHood: [
        "Next.js App Router with server components; only the form ships JavaScript.",
        "Self-hosted Google Fonts via next/font, no layout shift.",
        "Server action for the form: validation, honeypot, rate limit, Office 365 SMTP.",
        "LocalBusiness JSON-LD, sitemap and robots generated by the framework.",
      ],
      result:
        "One site that says what we do, shows it, and makes the next step a short form.",
      quote: null,
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProject() {
  return projects.find((project) => project.featured) ?? projects[0];
}
