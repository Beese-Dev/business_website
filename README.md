# Chartiers Creek Business Technology Website

Next.js website for Chartiers Creek Business Technology (CCB Tech): websites
and web apps for small businesses and entrepreneurs, in Pittsburgh and remote.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS 4
- Local MDX content planned with `next-mdx-remote`
- Microsoft 365 email flow through Microsoft Graph (app registration, no SMTP)

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project Docs

- `build_plan/MASTER_PROJECT_PLAN.md`: architecture and execution checklist
- `build_plan/PRE_BUILD_REQUIREMENTS.md`: business, brand, and launch decisions
- `build_plan/CODEBASE_ANALYSIS.md`: current implementation snapshot, risks,
  and next build order
- `build_plan/CHANGELOG.md`: completed work and next-step placeholder

## Current Status

The site follows the CCB Tech design system (tokens, type and voice) and the
redesign brief: websites and web apps for small businesses and entrepreneurs.
Networks and hardware are no longer advertised.

Routes: `/` (hero, what we build, recent projects, packages, how we work,
about, contact), `/work`, `/work/[slug]` case studies, `/services`, `/contact`
and `/thank-you`, plus generated `sitemap.xml` and `robots.txt`.

All copy and facts live in two files, not in the pages:

- `content/site.ts`: contact details, services, packages (prices), process
  steps, owner, client quote. Fields set to `null` are left out of the page.
- `content/work.ts`: the portfolio. One project is `featured`. Screenshots go
  in `public/work/<slug>/` and are referenced from each project's `images`.

Before launch, fill in: the public email and phone, starting prices for the
Starter and Business packages, the Rixa Aperta live link and real stack,
screenshots for each project, a photo of the developer, and a client quote.

Still planned: browser QA on real phones, live email verification, and Vercel
deployment configuration.

## Dependency Notes

`package.json` includes an npm override for `postcss@8.5.15` because the current
Next.js release declares an older transitive PostCSS version that is flagged by
`npm audit`. Keep the override until Next.js ships a dependency update that no
longer needs it.
