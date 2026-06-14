# Ashanti Connect

A modern **digital governance operating system** for the Ashanti Region of Ghana — a two-way platform connecting citizens and government. Citizens report issues, track responses, access opportunities, and participate in governance; government manages requests, runs operations, and makes data-driven decisions.

> **Phase 1 prototype.** This is a fully interactive frontend built on realistic mock data, architected so a Supabase backend and OpenAI/RAG layer can be dropped in without changing call sites.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** + custom **ShadCN-style** UI primitives (Radix)
- **Framer Motion** (animation), **Recharts** (data viz)
- **React Query**, **next-themes**, **Sonner** (toasts)
- Fonts: **Plus Jakarta Sans** (body), **Sora** (display)

## Design language

Deep **Ashanti Green** primary with **Gold** accents, clean white surfaces, large typography, spacious layouts. Mobile-first, accessible, and bilingual-ready (English + Twi).

## What's inside

| Area | Routes |
| --- | --- |
| **Public site** | `/`, `/about`, `/departments`, `/projects`, `/opportunities`, `/news`, `/contact`, `/assistant` |
| **Citizen Portal** | `/portal` (dashboard), `/portal/report`, `/portal/track`, `/portal/track/[id]`, `/portal/opportunities`, `/portal/town-hall`, `/portal/assistant` |
| **Government Ops** | `/gov` (overview), `/gov/issues`, `/gov/issues/[id]`, `/gov/communication`, `/gov/department` |
| **Executive** | `/executive`, `/executive/districts`, `/executive/projects`, `/executive/intelligence` |

Key flows: report an issue (with live AI classification preview), parcel-style report tracking with timeline + conversation, issue triage/assign/escalate/resolve, citizen↔officer messaging, town-hall polls, project transparency, and an executive dashboard with charts and AI insights.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run lint     # eslint
```

## Architecture & Phase 2

- **Typed domain model** lives in `src/lib/types.ts`.
- **Mock data** lives in `src/lib/data/*` and is exposed through async accessors in `src/lib/data/index.ts` (e.g. `getReports`, `getReportById`). Swapping to Supabase means replacing each accessor body with a query — call sites stay unchanged.
- **AI** is a deterministic, rule-based responder in `src/lib/ai.ts`. Replace `generateAssistantReply` with an `/api/assistant` route backed by OpenAI + RAG to go live.

## Project structure

```
src/
  app/
    (public)/        # public marketing + info site
    portal/          # citizen portal (app shell)
    gov/             # government operations (app shell)
    executive/       # leadership dashboards (app shell)
  components/
    ui/              # ShadCN-style primitives
    layout/          # site header/footer, app shell
    home/ reports/ gov/ executive/ charts/ ...
  lib/
    data/            # mock data + async accessors
    types.ts         # domain model
    ai.ts            # mock assistant
    constants.ts navigation.ts utils.ts
```
