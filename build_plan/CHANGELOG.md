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

## 2026-08-12

### Added
- Reviewed `CCB_Tech_Website_Redesign_Brief.md` against existing build
  decisions and logged the resolution in
  `build_plan/PRE_BUILD_REQUIREMENTS.md` Section 11 (Vercel deployment, no
  IT-support/help-desk positioning, single `/contact` lead form, and 3-item
  nav all stay as previously decided).
- Added a "Who We Help" homepage section identifying the 5-50 employee
  target audience, anchored from a new hero secondary CTA ("See Who We
  Help").
- Added a "Why CCB Tech?" homepage section covering single-vendor
  consolidation.
- Added an `app/globals.css`-token-based redesign integration checklist to
  `build_plan/MASTER_PROJECT_PLAN.md` (Phase 2b).

### Changed
- Updated the site footer to more prominently surface "Pittsburgh-area
  support" and to add a "Get in touch" link to `/contact`, since no real
  business phone number or public email address is confirmed yet.

### Removed
- Removed the Trust Signals placeholder banner added earlier the same day.
  No real client or partner logos exist yet, so the section was pulled
  rather than left rendering placeholder boxes. Marked as deferred in
  `build_plan/MASTER_PROJECT_PLAN.md` Phase 2b.

### Verified
- `npm run lint` passes.
- `npm run build` passes and prerenders `/`, `/contact`, `/services`, and
  `/thank-you`.

## Next Steps

- Confirm lead sender and recipient mailboxes before enabling live email.
- Add MDX service content files and dynamic `/services/[slug]` rendering.
- Replace placeholder service/contact copy with final launch content.
- Run full lint and production build checks after the next implementation pass.
- Handle Vercel, Office 365 SMTP, and DNS deployment details when ready.
