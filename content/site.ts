/*
  Site-wide facts. Everything here is real or absent: leave a field null
  until the real value is known and the page will leave it out.
*/

export const site = {
  name: "CCB Tech",
  legalName: "Chartiers Creek Business Technology",
  url: "https://ccbtec.com",
  tagline: "Websites and web apps that get you launched.",
  description:
    "Web design and web apps for small businesses and entrepreneurs in Pittsburgh and remote. From a polished business site to the first working version of your product, built by one developer.",
  email: "support@ccbtec.com",
  phone: "+14122519026" as string | null, // E.164; shown wherever contact details appear
  phoneDisplay: "412-251-9026" as string | null,
  responseTime: "Replies within one business day",
  area: "Pittsburgh area",
  remote: "Remote projects welcome",
  city: "Pittsburgh",
  region: "PA",
  owner: {
    name: "John Beese",
    photo: null as string | null, // e.g. "/about/john.jpg" (place the file in public/about/)
  },
  clientQuote: null as null | { quote: string; name: string; role: string },
};

export type Service = {
  slug: string;
  icon: "code" | "rocket" | "shield-check";
  title: string;
  summary: string;
  body: string;
  goodFor: string;
  includes: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    slug: "business-websites",
    icon: "code",
    title: "Business websites",
    summary:
      "A site that explains what you do, works on a phone, and makes the next step obvious. Written with you, hosted for you.",
    body: "Most small businesses need one thing from a website: a page you can point people to that brings in the right customers. We write the copy with you, design around your real photos and work, build it to load fast on a phone, and set up the basics that help you show up in local search.",
    goodFor:
      "Trades, shops, studios, practices and services with a local customer base.",
    includes: [
      "Copy written with you, in plain words",
      "Mobile-first layout, fast on cheap phones",
      "Contact form that emails you, with an auto-reply",
      "Local search basics: titles, descriptions, business schema",
      "Hosting, SSL and launch handled",
    ],
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    slug: "launch-sites-and-mvps",
    icon: "rocket",
    title: "Launch sites and MVPs",
    summary:
      "For founders. A landing page to test the idea, or the first working version of the product: sign-in, data, the one feature that matters.",
    body: "An idea becomes real when someone other than you can use it. We scope the smallest version worth launching, then build it: accounts, a database, the core feature, deployed on a real domain. You get something to show users and investors, and a codebase you own.",
    goodFor:
      "Founders and side projects that need a working product before a team.",
    includes: [
      "Scoping session: pick the one feature that proves the idea",
      "Sign-in and accounts (passwordless email or social)",
      "Database, hosting and a real domain",
      "The core feature, built and tested",
      "A written plan for what comes next",
    ],
    stack: ["Next.js", "Postgres", "Vercel"],
  },
  {
    slug: "redesigns-care-and-hosting",
    icon: "shield-check",
    title: "Redesigns, care and hosting",
    summary:
      "Already have a site? We rebuild it on a modern stack, then keep it fast, secure and current, with one person to call.",
    body: "A redesign starts with what already works: the pages people visit, the words that bring calls. We keep those, rebuild the rest, and move the site to hosting we look after. After launch, a care plan covers updates, small changes and someone who answers when something breaks.",
    goodFor:
      "Sites that look dated, load slowly, or have no one maintaining them.",
    includes: [
      "Review of the current site and search traffic",
      "Rebuild on a modern, fast stack",
      "Content moved and tidied, redirects kept",
      "Monthly care: updates, backups, small changes",
      "Hosting with a real person to call",
    ],
    stack: ["Next.js", "Vercel", "Cloudflare"],
  },
];

export type Package = {
  name: string;
  priceFrom: string | null; // e.g. "$200", shown as "$200+"; null shows "Quoted"
  popular?: boolean;
  summary: string;
  includes: string[];
  serviceCategory: ProjectType;
};

export const projectTypes = [
  {
    value: "New website",
    description: "A new site for a business, practice or shop.",
  },
  {
    value: "Web app or MVP",
    description:
      "A launch site or the first working version of a product.",
  },
  {
    value: "Redesign",
    description: "An existing site rebuilt to look right and load fast.",
  },
  {
    value: "Care and hosting",
    description:
      "Hosting, updates and someone to call for a site you already have.",
  },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];

export const packages: Package[] = [
  {
    name: "Starter",
    priceFrom: "$200",
    summary:
      "A one-page site that says what you do, where you are and how to reach you.",
    includes: [
      "One page, written with you",
      "Mobile-first layout",
      "Contact form that emails you",
      "Local search basics",
      "Hosting set up and launched",
    ],
    serviceCategory: "New website",
  },
  {
    name: "Business",
    priceFrom: "$500",
    popular: true,
    summary:
      "A multi-page site for a business that needs to show its work and win customers.",
    includes: [
      "Up to six pages",
      "Service or project pages with your real work",
      "Contact form and lead routing",
      "Search setup for local terms",
      "Care and hosting plan available",
    ],
    serviceCategory: "New website",
  },
  {
    name: "Startup / MVP",
    priceFrom: null, // stays "Quoted"
    summary:
      "The first working version of your product: sign-in, data, the core feature, deployed.",
    includes: [
      "Scoping session",
      "Sign-in and accounts",
      "Database and hosting",
      "The core feature, built and tested",
      "A plan for what comes next",
    ],
    serviceCategory: "Web app or MVP",
  },
];

export const everySiteIncludes = [
  "Fast hosting with SSL",
  "A layout that works on a phone",
  "Your own domain and email forwarding",
  "Source code you own",
  "A real person to call",
];

export const process = [
  {
    title: "Listen",
    body: "We start with what you are trying to get done and what is already in place. No pitch deck.",
  },
  {
    title: "Plan and design",
    body: "You get a short written plan, a price, and a design you can react to before anything is built.",
  },
  {
    title: "Build, test and explain",
    body: "We build it, test it on real phones, launch it, and walk you through how it works.",
  },
];
