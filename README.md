# Chartiers Creek Business Technology Website

Next.js website for Chartiers Creek Business Technology, focused on business
websites, networking, and hardware setup for Pittsburgh small businesses.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS 4
- Local MDX content planned with `next-mdx-remote`
- Office 365 email flow with `nodemailer`

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

The project has been scaffolded and the branding foundation is in place. The
home, services, contact, and thank-you routes exist. The contact page now uses a
multi-step consultation form backed by a Next.js Server Action, Office 365 SMTP
configuration checks, lead notification email, requester auto-reply email,
honeypot handling, and inline expected-error states.

Still planned: dynamic MDX service pages, browser QA, live email verification,
and Vercel deployment configuration.

## Dependency Notes

`package.json` includes an npm override for `postcss@8.5.15` because the current
Next.js release declares an older transitive PostCSS version that is flagged by
`npm audit`. Keep the override until Next.js ships a dependency update that no
longer needs it.
