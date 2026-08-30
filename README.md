# Portfolio Frontend

The Angular frontend for my personal portfolio — public pages for education, licenses, and projects, plus a full admin dashboard for managing content.

**Live site:** https://aleksao.me

## Tech Stack

- **Framework:** Angular 22 (standalone components, signals)
- **Language:** TypeScript
- **Styling:** SCSS with a design token system
- **Forms:** Reactive Forms
- **State:** Angular Signals
- **HTTP:** Angular HttpClient with functional interceptors
- **Deployment:** Docker (nginx) → Railway

## Features

### Public site

- Home page with animated hero section
- Education, Licenses, and Projects listing pages
- Contact form with client + server-side validation

### Admin dashboard

- JWT-based login, route-protected with a functional guard
- Full CRUD for Education, Licenses, and Projects
- Upsert form for the About section
- Inbox for contact messages (read / delete)

### UX details

- Route-based page transition animation showing the target page name
- Auth interceptor that attaches the JWT to every protected request
- Error interceptor that logs the user out automatically on a 401 response

## Architecture

src/app/
├── core/
│   ├── services/       # API communication per resource
│   ├── guards/          # authGuard
│   ├── interceptors/     # auth + error interceptors
│   ├── models/            # TypeScript interfaces per resource
│   └── constants/          # centralized UI message keys
├── pages/
│   ├── home/, education/, licenses/, projects/, contact/
│   ├── admin-login/
│   └── admin-dashboard/
│       └── admin-*/          # one CRUD page per resource
├── app.ts                      # root component, nav, page transitions
├── app.routes.ts                 # route definitions (incl. nested admin routes)
└── app.config.ts                   # router + HttpClient providers

## Getting Started

### Prerequisites

- Node.js 22+
- The portfolio-backend running locally or accessible remotely

### Setup

npm install
ng serve

App runs on `http://localhost:4200`. Configure the API URL in `src/environments/environment.ts`.

### Build

ng build

Production build uses `environment.prod.ts` via Angular's `fileReplacements` configuration.

## Docker

docker build -t portfolio-frontend .

Served through nginx, configured for SPA routing (`try_files` fallback to `index.html`).

## Related Repositories

- [portfolio-backend](https://github.com/aleksa0206/portfolio-backend) — Node.js / Express / Prisma API