# Changelog

This file records meaningful project changes and doubles as a quick next-steps
placeholder between build sessions.

## 2026-05-27

### Added
- Scaffolded the Next.js App Router project with TypeScript, ESLint, and
  Tailwind CSS 4.
- Installed planned runtime dependencies: `nodemailer` and `next-mdx-remote`.
- Copied launch brand assets into `public/`:
  - `public/ccb-logo.png`
  - `public/ccb-shield.png`
- Added global brand color tokens based on the navy, cream, and muted gold logo
  direction.
- Added a branded site header with desktop full-name treatment and mobile CCB
  treatment.
- Added a branded footer.
- Replaced the starter page with a branded homepage.
- Added placeholder route pages for:
  - `/services`
  - `/contact`
  - `/thank-you`
- Updated the README with project-specific setup and documentation references.
- Added `.env.example` for the planned Office 365/Vercel environment variables.
- Added `CONTRIBUTING.md` with local setup, verification, and project rules.
- Added `.gitattributes` to normalize text files and mark binary assets.

### Changed
- Updated the package name to `ccbtec-business-website`.
- Updated the master project plan to reflect Tailwind CSS 4 token setup and the
  selected CCB branding direction.
- Added an npm override for `postcss@8.5.15` to resolve the audit finding from
  Next.js' transitive PostCSS dependency.
- Configured the local Git repo to use `.git/info/exclude` as its excludes file
  to avoid the inaccessible global ignore warning on this machine.

### Verified
- `npm run lint` passes.
- `npm run build` passes and prerenders `/`, `/contact`, `/services`, and
  `/thank-you`.
- `npm audit` passes with zero vulnerabilities after the PostCSS override.

### Notes
- The PostCSS override should be reviewed after future Next.js upgrades. Remove
  it when Next.js no longer depends on the vulnerable transitive version.
- The existing logo is suitable for constrained header/mobile use. A larger
  source asset or SVG is still recommended before final polish.

## 2026-05-30

### Added
- Added the multi-step consultation form as a dedicated client component.
- Added a consultation Server Action with server-side validation, honeypot
  handling, simple submission guarding, Office 365 SMTP delivery, lead
  notification email, requester auto-reply email, expected-error state returns,
  and successful redirect to `/thank-you`.
- Added local `nodemailer` type declarations for the current email usage.
- Added `build_plan/CODEBASE_ANALYSIS.md` as a current implementation snapshot.

### Changed
- Updated the contact page to render the reusable consultation form instead of
  the original static placeholder form.
- Updated the master project plan to mark the contact form and email flow as
  implemented and to keep MDX service pages as the next major feature area.

### Verified
- `npm run lint` passes.
- `npm run build` passes and prerenders `/`, `/contact`, `/services`, and
  `/thank-you`.
- Test live email delivery after Office 365 environment variables are available.

## Next Steps
- Add MDX service content files and dynamic `/services/[slug]` rendering.
- Run full lint and production build checks after the next implementation pass.
- Handle Vercel, Office 365 SMTP, and DNS deployment details when ready.

## 2026-08-12

### Added
- Created dynamic service pages using MDX. This includes:
  - The dynamic route `app/services/[slug]/page.tsx` to render content.
  - Placeholder `.mdx` files for each service in `content/services/`.
- Created `components/MDXComponents.tsx` to provide custom styling for rendered MDX content.
- Rebuilt the consultation form as a single-step component (`components/ConsultationForm.tsx`) with the new fields from the redesign brief.
- Created the new `/how-it-works` page with content from the redesign brief.

### Changed
- Added the `ConsultationForm` to the homepage footer area, replacing the previous CTA link.
- Updated the consultation server action (`app/actions/consultation.ts`) to validate and process the new simplified form fields.
- Updated the contact page (`app/contact/page.tsx`) to render the new form.
- Updated the main services page (`app/services/page.tsx`) to be a landing page that links to the new dynamic service detail pages.
- Updated the homepage content to match the new redesign brief, including new service descriptions.
- Updated the header navigation to include the "How it Works" link.
- Updated `MASTER_PROJECT_PLAN.md` to reflect decisions from the redesign brief review.

## 2026-10-14

### Changed
- Executed the CCB Tech design system and redesign recommendations
  (claude.ai artifact TYG4S3WEkKzkzAnkgGXr2m). The site now sells websites and
  web apps for small businesses and entrepreneurs; networks and hardware are
  gone from every page, the nav, the form and the footer.
- Replaced the brand tokens in `app/globals.css` with the design system's
  colour, type, spacing, radius and shadow tokens, in light and dark themes.
- Switched fonts to Bricolage Grotesque (display), IBM Plex Sans (text) and
  IBM Plex Mono (labels) via `next/font/google`.
- Rebuilt the home page as the seven recommended sections: hero, what we
  build, recent projects (featured case study plus cards), packages on a
  tinted band, how we work, about, contact.
- Rewrote `/services`, `/contact` and `/thank-you` in the new voice.
- Rebuilt the consultation form as a single short step with the four project
  types from the brief; phone is optional; server validation, honeypot and
  rate limit kept.

### Added
- `content/site.ts` and `content/work.ts`: every fact, price and project in
  one place. Null fields are left off the page.
- `/work` portfolio and `/work/[slug]` case studies on one template, with
  Rixa Aperta featured and ccbtec.com as the business-site example.
- Shared components: `ui.tsx` primitives, `Icon.tsx` (inline Lucide icons),
  `ProjectFrame.tsx` (browser and phone frames), `ProjectCard.tsx`,
  `ContactDetails.tsx`.
- LocalBusiness JSON-LD in the root layout, `app/sitemap.ts` and
  `app/robots.ts`.
- `build_plan/` and `.history/` excluded from TypeScript and ESLint so draft
  files there no longer break the build.

### Verified
- `tsc --noEmit`, `npm run lint` and `npm run build` pass; every route
  returns 200 from `next start`.

### Next steps
- Fill in `content/site.ts`: public email, phone, starting prices, owner
  photo, client quote.
- Fill in `content/work.ts`: Rixa Aperta live link, real stack, founder
  quote; add screenshots under `public/work/<slug>/`.
- Browser QA on real phones in both themes, then live email verification.
