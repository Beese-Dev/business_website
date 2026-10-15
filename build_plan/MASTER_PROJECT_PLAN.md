# IT Services Website - Master Project Plan & Source of Truth

## 2026-08-12: Design Brief Review
- **Decision:** Proceed with updates based on the new design brief (`CCB_Tech_Website_Redesign_Brief (1).md`).
- **Navigation:** The navigation structure will be updated to `Home, Services, How it Works, Contact`. A new "How it Works" page will be created.
- **Service Scope:** The site's focus will be expanded to include "Managed IT services" and "Help Desk & Hardware Support" as core offerings, updating homepage and service content accordingly.
- **Contact Form:** The contact form fields will be updated to `Name, Email, Phone, Company Size, "Tell us what needs built, connected, or installed"`. The multi-step form will be simplified to a single step.
- **Technical Stack:** The project will continue to use the established Next.js/Vercel stack, ignoring the brief's mentions of EJS and Azure.

## 1. Core Architectural Constraints
- **Framework**: Next.js (App Router, React Server Components)
- **Styling**: Raw Tailwind CSS. **Constraint:** No third-party UI component libraries (e.g., shadcn/ui, Radix). All components must be built from scratch using HTML primitives and Tailwind utility classes.
- **State & Logic**: Standard React hooks (`useState`, `useRef`). **Constraint:** No third-party form or validation libraries (e.g., React Hook Form, Formik, Zod). Native HTML5 validation and simple React state will be used.
- **Content Management**: Local `.mdx` files using `next-mdx-remote/rsc`.
- **Deployment**: Vercel.

## 2. File Structure Pattern
```text
/app
  /actions         # Next.js Server Actions (e.g., SMTP logic)
  /contact         # Client-side multi-step form
  /services/[slug] # Dynamic MDX rendering route
  /thank-you       # Redirection target after successful form submission
/components        # Reusable UI (ConsultationForm, MDXComponents, etc.)
/content
  /services        # Local .mdx files (web-development.mdx, etc.)
```

Current implementation note: the launch routes are currently `app/page.tsx`,
`app/services/page.tsx`, `app/contact/page.tsx`, and `app/thank-you/page.tsx`.
The multi-step consultation form now lives in `components/ConsultationForm.tsx`
and posts to `app/actions/consultation.ts`. The dynamic MDX service route and
`content/services` folder are still planned work.

## 3. Features and Data Flow

### 3.1. Multi-Step Consultation Form
- **Location:** `/contact`
- **Architecture:** A single React Client Component that uses a server action.
- **Fields Collected:**
  - Name, Email, Phone
  - Company Size
  - "Tell us what needs built, connected, or installed" (Textarea)
- **Client Validation:** Managed manually via standard React state checks before allowing progression to the next step.
- **Server Validation:** The server action must re-validate required fields, email format, maximum message length, and allowed service category before sending email. Client-side validation must never be treated as the only source of truth.
- **Spam Protection:** Include a hidden honeypot field and a simple server-side submission guard. Avoid adding CAPTCHA or third-party anti-spam tooling unless spam becomes a confirmed issue.
- **Accessibility:** All inputs must have visible labels, visible focus states, keyboard-accessible navigation, and field-level error messages associated with the relevant controls where applicable.
- **Submission Outcome:** Upon successful submission, the user is **redirected to a dedicated `/thank-you` page** using Next.js `redirect` or router navigation.

### 3.2. Lead Generation / Email Routing
- **Method:** Next.js Server Action (`'use server'`) triggered by the final form submission.
- **Integration:** Nodemailer configured with Microsoft Office 365 SMTP.
- **Auto-reply:** Send a simple confirmation email to the requester after the
  lead notification email succeeds.
- **Security:** Use `.env.local` for secrets and deployment environment variables in Vercel. Do not hardcode email credentials or recipients.
- **Environment Contract:**
  ```env
  OFFICE365_EMAIL=
  OFFICE365_APP_PASSWORD=
  LEAD_NOTIFICATION_TO=
  NEXT_PUBLIC_SITE_URL=
  ```
- **Error Handling:** The server action must return a clear success or failure state. If SMTP fails, validation fails, or the server action throws, the UI must show an inline error message, preserve entered form data, and avoid redirecting to the thank you page.

### 3.3. MDX Content Rendering & Routing
- **Method:** Server-side reading of local `.mdx` files using Node's `fs` and `path` modules.
- **Routing:** Handled via the `/app/services/[slug]/page.tsx` dynamic route.
- **Metadata & Titles:** Keep it simple. Metadata and page titles will be derived directly and hardcoded from the file name (the `[slug]`). No frontmatter parsing or complex configuration objects are required.
- **Features:** Map standard Markdown elements to custom Tailwind-styled React components (e.g., `h1`, `p`, custom call-to-action blocks) using `next-mdx-remote`.
- **404 Behavior:** Unknown `/services/[slug]` routes must call `notFound()` and render the standard Next.js 404 state.
- **SEO:** Home, contact, thank-you, and service pages must define metadata. Service page metadata may be generated from the slug and simple page defaults rather than frontmatter.

### 3.4. Conversion Tracking Placeholder
- Keep the `/thank-you` page isolated as the future conversion tracking location.
- Do not embed analytics or conversion tracking logic directly into the form component.

## 4. UI and Branding Guidelines

### 4.1. Aesthetic Identity
- **Vibe:** Pittsburgh-local, trustworthy, practical, technical, and professional.
- **Typography:** Clean, highly legible sans-serif (Inter or Roboto).
- **Shapes:** Sharp corners or very slight border-radius to convey technical precision.
- **Logo Strategy:** Use the existing shield logo from `images/ccb-logo.png` as the launch brand mark. Desktop header should pair the shield with the full business name, "Chartiers Creek Business Technology". Mobile header should use compact CCB/shield branding. Logo dimensions must be constrained with CSS so replacing the asset does not shift the header layout.

### 4.2. Color Palette Configuration
Use semantic CSS variables for all brand-facing colors so the final logo and color scheme can be applied later without rewriting components.

Define the initial palette in `app/globals.css`:
```css
:root {
  --color-brand-primary: #0F2E4A;
  --color-brand-secondary: #F8F6E7;
  --color-brand-accent: #C7A24A;
  --color-brand-dark: #111827;
  --color-brand-light: #F8F6E7;
  --color-surface: #FFFFFF;
  --color-border: #D1D5DB;
  --color-text: #111827;
  --color-muted: #6B7280;
}
```

Expose the variables as Tailwind CSS 4 theme tokens in `app/globals.css`:
```css
@theme inline {
  --color-brand-primary: var(--color-brand-primary);
  --color-brand-secondary: var(--color-brand-secondary);
  --color-brand-accent: var(--color-brand-accent);
  --color-brand-dark: var(--color-brand-dark);
  --color-brand-light: var(--color-brand-light);
  --color-surface: var(--color-surface);
  --color-border: var(--color-border);
  --color-text: var(--color-text);
  --color-muted: var(--color-muted);
}
```

Components must use semantic Tailwind classes such as `bg-brand-primary`, `text-text`, `border-border`, and `text-muted` instead of hardcoded color utilities like `bg-blue-600` or `text-gray-700`.

The launch palette should follow the shield logo's navy, cream, and muted gold direction. Avoid a generic blue tech-template feel.

### 4.3. UI Component Rules
- Built strictly with Tailwind utilities.
- Use clean borders and subtle box-shadows.
- Avoid excessive animations; stick to simple fade-ins for form steps and hover states for buttons.
- Ensure all inputs in the multi-step form have high contrast and clear focus states.
- Avoid hardcoded brand colors in component classes. Use the semantic Tailwind color tokens defined in Section 4.2.

## 5. Build Initialization Instructions
When ready to begin, scaffold the application using:
```bash
npx create-next-app@latest app-scaffold --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
npm i nodemailer next-mdx-remote
```
The app was scaffolded into `app-scaffold` first because the project root
already contained `build_plan/` and `images/`; generated files were then moved
to the project root.

Ensure all components use TypeScript with strict typing.

## 6. Pre-Deployment Checklist
- Run `npm run lint`.
- Run `npm run build`.
- Verify all required environment variables are configured in Vercel.
- Test successful form submission and confirm redirect to `/thank-you`.
- Test failed SMTP or validation failure and confirm the form shows an inline error without redirecting.
- Confirm known service slugs render successfully.
- Confirm unknown service slugs render the standard 404 state.

## 7. Build Execution Checklist

### Phase 1: Project Setup
- [x] Scaffold Next.js app.
- [x] Install dependencies.
- [x] Configure Tailwind semantic color tokens.
- [x] Add base metadata.
- [x] Verify `npm run lint`.
- [x] Verify `npm run build`.

### Phase 2: Layout & Branding Foundation
- [x] Build global layout.
- [x] Add shield logo support.
- [x] Add desktop full-name brand treatment.
- [x] Add mobile compact CCB/shield brand treatment.
- [x] Preserve future logo replacement slot.
- [x] Build header navigation.
- [x] Build footer.
- [ ] Confirm responsive layout in browser.

### Phase 3: Contact Form
- [x] Build multi-step form UI.
- [x] Add client-side validation.
- [x] Add accessible labels and errors.
- [x] Add honeypot field.
- [x] Preserve form state on errors.

### Phase 4: Server Action & Email
- [x] Add consultation form server action.
- [x] Validate form data server-side.
- [x] Configure Nodemailer Office 365 SMTP.
- [x] Add env var checks.
- [x] Send lead email to `LEAD_NOTIFICATION_TO`.
- [x] Send requester auto-reply email after lead notification succeeds.
- [x] Handle SMTP failure without redirect.
- [x] Redirect successful submissions to `/thank-you`.

### Phase 5: MDX Services
- [ ] Add service content directory.
- [ ] Add initial service MDX files.
- [ ] Build `/services/[slug]` route.
- [ ] Add MDX component mappings.
- [ ] Add service metadata.
- [ ] Add `notFound()` behavior.

### Phase 6: Final QA & Deployment
- [ ] Run lint.
- [ ] Run production build.
- [ ] Test successful form submission.
- [ ] Test failed form submission.
- [ ] Test known service slugs.
- [ ] Test unknown service slugs.
- [ ] Configure Vercel env vars.
- [ ] Deploy to Vercel.
