# Contributing

This project is the website for Chartiers Creek Business Technology.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Before Committing

Run:

```bash
npm run lint
npm run build
npm audit
```

The default branch is currently `master`.

## Project Rules

- Use the Next.js App Router.
- Use TypeScript for application code.
- Use Tailwind CSS utilities and the semantic brand tokens in `app/globals.css`.
- Do not add third-party UI component libraries.
- Do not add form or validation libraries unless the project plan changes.
- Keep secrets in `.env.local`; use `.env.example` only for variable names.
- Update `build_plan/CHANGELOG.md` when meaningful work lands.

## Documentation

- `README.md` explains local development and project status.
- `build_plan/MASTER_PROJECT_PLAN.md` is the implementation source of truth.
- `build_plan/PRE_BUILD_REQUIREMENTS.md` records business and launch decisions.
- `build_plan/CHANGELOG.md` tracks completed work and next steps.
