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

## Next Steps

- Build the full multi-step consultation form on `/contact`.
- Add the server action for form validation and Office 365 email delivery.
- Confirm lead sender and recipient mailboxes before enabling live email.
- Add MDX service content files and dynamic `/services/[slug]` rendering.
- Replace placeholder service/contact copy with final launch content.
- Run full lint and production build checks after the next implementation pass.
- Handle Vercel, Office 365 SMTP, and DNS deployment details when ready.
