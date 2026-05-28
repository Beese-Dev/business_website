# Pre-Build Requirements

This file tracks decisions that should be resolved before starting the main website build. These items are focused on avoiding rework during implementation.

## 1. Business Identity
- [x] Confirm business name to display until the final logo is ready.
  - Decision: Chartiers Creek Business Technology
- [x] Confirm preferred domain or placeholder domain.
  - Decision: ccbtec.com
- [x] Confirm primary location or service area, if applicable.
  - Decision: Local service area focused on Pittsburgh, Pennsylvania.

## 2. Navigation Structure
- [x] Confirm initial top-level navigation pages.
  - Decision: Home, Services, Contact

Recommended starting structure:
```text
Home
Services
Contact
```

Optional future pages:
```text
About
Blog / Resources
Testimonials
FAQ
```

## 3. Initial Service List
- [x] Confirm whether the current form categories should also be public service pages.
  - Decision: Launch service focus should be website development, networking, and hardware setup. Do not focus the site on support.

Current service categories:
```text
Website Development
Office Networking
Hardware Setup
```

Potential public service page names:
```text
Business Website Development
Network Setup
Workstation & Hardware Setup
```

## 4. Contact Form Email Flow
- [ ] Confirm which mailbox sends lead notification emails.
  - Pending: skipped for now.
- [ ] Confirm which mailbox receives lead notification emails.
  - Pending: skipped for now.
- [x] Decide whether users receive an auto-reply after submission.
  - Decision: Yes, users should receive an auto-reply after submission.
- [x] Decide whether submissions are email-only for launch or stored somewhere later.
  - Decision: Email-only for launch.

## 5. Contact Form Fields
- [x] Confirm final launch fields.
  - Decision: Use the current planned fields only. Do not add the possible additional fields for launch.

Current planned fields:
```text
Full Name
Company Name
Email
Phone
Service Category
Project / Support Details
```

Possible additional fields:
```text
Preferred Contact Method
Budget Range
Timeline
Company Size
Address / Service Location
```

## 6. Homepage Positioning
- [x] Confirm the homepage positioning statement.
  - Decision: Business websites, networking, and hardware setup for Pittsburgh small businesses.
- [x] Decide whether the homepage emphasizes IT support, website development, or both equally.
  - Decision: Focus on website development, networking, and hardware setup. Do not position the homepage around IT support.

Positioning statement:
```text
Business websites, networking, and hardware setup for Pittsburgh small businesses.
```

## 7. Brand Placeholders
- [x] Confirm temporary text logo value.
  - Decision: Use the shield logo with the full business name, Chartiers Creek Business Technology, on desktop.
  - Decision: Use compact CCB/shield branding on mobile.
- [x] Confirm temporary primary color.
  - Decision: Use a deep navy inspired by the shield logo.
- [x] Confirm temporary accent color.
  - Decision: Use a muted gold inspired by the shield logo.
- [x] Confirm expected logo shape if known: horizontal, square, icon-only, or unknown.
  - Decision: Use the existing shield logo as the primary brand mark. Pair it with full text on desktop and compact CCB/shield treatment on mobile.

Brand direction:
```text
Pittsburgh-local, trustworthy, practical, and professional.
Use a navy, cream, and gold palette that avoids a generic blue tech-template feel.
```

Initial palette direction:
```text
Primary navy: #0F2E4A
Warm light: #F8F6E7
Muted gold accent: #C7A24A
Neutral dark: #111827
Neutral border: #D1D5DB
```

Logo implementation notes:
```text
Use images/ccb-logo.png in the header.
Desktop: shield logo plus "Chartiers Creek Business Technology".
Mobile: compact CCB/shield branding.
Constrain logo dimensions in CSS so future logo replacement does not shift header layout.
Treat the current logo as the launch brand asset unless a higher-resolution replacement is provided.
```

## 8. MDX Content Scope
- [ ] Confirm launch content depth for each service page.
  - Pending: deal with content separately.

Recommended short page structure:
```text
Overview
Common Problems
What We Provide
Call to Action
```

Optional full page structure:
```text
Overview
Benefits
Process
FAQ
Related Services
Call to Action
```

## 9. Legal and Trust Requirements
- [x] Decide whether a privacy policy is needed at launch.
  - Decision: No, not for now.
- [x] Decide whether terms are needed at launch.
  - Decision: No, not for now.
- [x] Decide whether to display a business address.
  - Decision: No, not for now.
- [x] Confirm any license, certification, or partnership claims before publishing.
  - Decision: No claims for now.
- [x] Decide whether an emergency support disclaimer is needed.
  - Decision: No, not for now.

## 10. Deployment Access
- [ ] Confirm Vercel account/project access.
  - Pending: deal with deployment when ready.
- [ ] Confirm Office 365 SMTP app password or approved mail method.
  - Pending: deal with deployment when ready.
- [ ] Confirm domain and DNS access if launching on a real domain.
  - Pending: deal with deployment when ready.

## Priority Decisions Before Build

Resolve these first:
```text
Business name: resolved
Initial navigation: resolved
Initial service list: resolved
Lead recipient email: pending, skipped for now
Homepage positioning: resolved
```
