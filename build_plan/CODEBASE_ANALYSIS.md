# Codebase Analysis

Last reviewed: 2026-05-30

## Snapshot

- The project is a Next.js 16.2.6 App Router site using React 19, TypeScript,
  Tailwind CSS 4, and Vercel-oriented deployment.
- Global layout, metadata, branded header, footer, homepage, services page,
  contact page, and thank-you page are implemented.
- The current visual system uses semantic Tailwind theme tokens from
  `app/globals.css`, with navy, warm neutral, gold, river, and moss brand
  colors.
- Contact submission is now implemented with a Client Component form in
  `components/ConsultationForm.tsx` and a Server Action in
  `app/actions/consultation.ts`.

## Implemented Flow

- `/contact` renders a three-step consultation form for contact information,
  service category, and project details.
- Client-side validation blocks step progression and submit attempts when
  required values are missing or invalid.
- The form posts to `submitConsultationRequest` using React `useActionState`.
- The server action re-reads and validates all submitted `FormData`, applies a
  hidden honeypot field, applies a simple in-memory short-window submission
  guard, checks required Office 365 email environment variables, sends a lead
  notification email, sends a requester auto-reply, and redirects to
  `/thank-you` on success.
- Expected failures are returned to the form as state so the user keeps entered
  values and sees inline errors.

## Current Risks and Follow-Up

- The in-memory submission guard is sufficient as a simple launch guard, but it
  is process-local. It should not be treated as durable rate limiting across
  multiple Vercel instances.
- Live email cannot be fully verified until `OFFICE365_EMAIL`,
  `OFFICE365_APP_PASSWORD`, and `LEAD_NOTIFICATION_TO` are configured in the
  runtime environment.
- The service pages are still static summary content. The planned
  `content/services` MDX files and `/services/[slug]` route have not been built.
- Browser-level responsive QA is still pending.

## Next Best Build Order

1. Configure local or Vercel email environment variables and test one successful
   and one failed contact submission.
2. Add the MDX service content folder, initial service files, MDX component
   mappings, and dynamic `/services/[slug]` route with `notFound()` handling.
3. Run browser QA across mobile and desktop viewports, especially the contact
   form stepper and long labels.
4. Finalize deployment environment variables and Vercel project settings.
