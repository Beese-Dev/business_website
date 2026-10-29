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
    slug: "orderly-move",
    name: "Orderly Move",
    client: "Orderly Move",
    kind: "Web app",
    audience: "entrepreneurs",
    featured: true,
    url: "https://orderlymove.com",
    year: "2026",
    result: "A paid moving checklist, built and launched from spec to Stripe checkout.",
    summary:
      "Orderly Move turns nine answers about a move into a checklist dated back from moving day, week by week. Visitors see the first two weeks free, then pay once for the full PDF in Letter or A4, with optional box labels, a calendar file and weekly email reminders. Built from a written spec to a live, paid launch in the US, Canada and the UK.",
    features: [
      "Every task dated from the moving day",
      "Free two-week preview, then one payment",
      "PDF in Letter or A4, plus three add-ons",
      "US, Canada and UK versions with tax at checkout",
    ],
    stack: ["React", "Azure Functions", "PostgreSQL", "Stripe"],
    images: {
      desktop: {
        src: "/work/orderly-move/desktop.png",
        alt: "The Orderly Move home page on desktop: a live sample week that re-dates as you change the moving day",
      },
      phone: {
        src: "/work/orderly-move/phone.png",
        alt: "The Orderly Move home page on a phone",
      },
    },
    caseStudy: {
      facts: [
        { label: "Client", value: "Orderly Move" },
        { label: "Type", value: "Paid web tool" },
        { label: "Scope", value: "Spec to launch" },
        { label: "Markets", value: "US, Canada, UK" },
      ],
      idea: "Generic moving checklists tell you what to do but not when. The brief was a checklist with real dates: tell it your moving day, where you are going and who is coming, and every task lands on a day, counted back from the move. Small enough to pay for once, like a roll of tape.",
      challenge:
        "The product has to be useful before anyone pays, without giving the whole thing away. The server only ever sends the first two weeks to the browser; later weeks are counts, not blurred text. Add to that three countries with different notice periods and sales tax, a PDF that prints well in black and white on two paper sizes, and download links that keep working for thirty days without accounts or passwords.",
      built: [
        "A nine-question form and a preview that shows the first two weeks fully dated, with totals for the rest.",
        "A rules engine that builds the timeline from the answers: renter or owner, kids and pets, country, and how far away the move is, down to a move that is today.",
        "Stripe Checkout with Stripe Tax for US sales tax, Canadian GST/HST/PST and UK VAT, in each country's currency.",
        "The full checklist as a PDF in Letter or A4, with room-by-room packing pages, and three add-ons: box labels and an inventory sheet, a calendar file, and weekly reminder emails.",
        "Fast, crawlable landing pages for each kind of move, since the traffic comes from search.",
      ],
      underTheHood: [
        "TypeScript monorepo: a pure rules engine and task library shared by the API, the PDF and the tests.",
        "React Router front end, prerendered and served from Azure Static Web Apps with a strict content security policy.",
        "Azure Functions API on Node 24 with PostgreSQL, Stripe webhooks for fulfilment, and a daily timer for reminder emails.",
        "PDFs rendered server-side with react-pdf; download tokens stored hashed, two per order.",
        "Infrastructure as code in Bicep, CI with unit, API and Playwright end-to-end tests on every pull request.",
      ],
      result:
        "Orderly Move is live and taking payments in three countries. It went from a written spec to a launched product with tests, infrastructure as code and a deploy pipeline.",
      quote: null,
    },
  },
  {
    slug: "starcradle",
    name: "Starcradle",
    client: "Starcradle",
    kind: "Web app",
    audience: "entrepreneurs",
    url: "https://starcradle.space",
    year: "2026",
    result: "A small universe that runs in the browser, from stars to black holes.",
    summary:
      "Starcradle is a small universe that runs in a browser tab. Plant stars, grow planets out of their discs, name worlds and moons, launch probes, and watch stars live, die and feed black holes on a real clock, from a day per second up to a million years per second. A daily challenge gives everyone the same seeded universe and a shared leaderboard.",
    features: [
      "Stars of every class that age, die and leave remnants",
      "Procedural planets, moons, rings and habitable zones",
      "Probes on gravity-bent trajectories",
      "A daily seeded challenge with a shared leaderboard",
    ],
    stack: ["three.js", "WebGL", "esbuild", "Cloudflare Workers", "GitHub Pages"],
    images: {
      desktop: {
        src: "/work/starcradle/desktop.png",
        alt: "Starcradle on desktop: a G-type star with planets in orbit, the time and plant controls, and the first welcome lesson",
      },
      phone: {
        src: "/work/starcradle/phone.png",
        alt: "Starcradle on a phone",
      },
    },
    caseStudy: {
      facts: [
        { label: "Client", value: "Starcradle" },
        { label: "Type", value: "Browser game" },
        { label: "Scope", value: "Idea to launch" },
        { label: "Runs on", value: "Any modern browser, nothing to install" },
      ],
      idea: "Most space games are about ships. Starcradle is the opposite: a quiet universe you tend. Plant a star, watch its disc settle into planets, name the worlds, and come back to find that time has moved on. It had to run in a browser tab with nothing to install, save itself, and still feel like a real place with real physics behind it.",
      challenge:
        "Time is the hard part. The clock runs from a day per second up to a million years per second, and everything has to stay consistent at every speed: orbits, stellar lifetimes, comets, impacts and the deaths of stars. It all has to render smoothly on an ordinary laptop or phone, and the daily challenge has to hand every player the same universe from one seed so that scores mean something.",
      built: [
        "Stars of every class with lifetimes set by their mass: red giants, planetary nebulae, white dwarfs, supernovas, pulsars and stellar black holes.",
        "Procedurally generated planets (rocky, ocean, gas giant, lava, ice) with moons, rings, tidal locking and habitable zones.",
        "Comets, impacts and impact winters, and black holes that bend orbits, capture stars and feed on close companions.",
        "Probes on real gravity-bent trajectories, with a report when they arrive.",
        "Field notes, postcards, discoveries, share codes and an ambient generative soundtrack.",
        "A daily challenge: the same seeded universe for everyone each UTC day, one billion years to play, and a shared Legacy leaderboard.",
      ],
      underTheHood: [
        "Rendered with three.js on WebGL, with custom shaders and bloom post-processing.",
        "Pure, unit-tested modules for the physics formulas, the seeded random numbers, formatting and scoring.",
        "Built with esbuild into a static site. Everything is saved in the browser, and share codes carry a universe to a friend's copy of the page.",
        "The daily leaderboard runs on a small Cloudflare Worker.",
        "Tests, build and deploy to GitHub Pages run on every push. No servers to look after.",
      ],
      result:
        "Starcradle is live at starcradle.space and plays in any modern browser, with a daily challenge that gives people a reason to come back.",
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

/* Featured project first, then the rest in their listed order. */
export function getShowcaseProjects() {
  const featured = getFeaturedProject();
  return [featured, ...projects.filter((p) => p.slug !== featured.slug)];
}
