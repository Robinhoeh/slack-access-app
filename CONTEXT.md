# Slack Access Tool — Project Context

## What this is
A Slack-first access request and approval system with a clean dashboard
showing who has access to which tools. Built for startups 10–80 people.

See [PRD.md](PRD.md) for full product spec.

## Stack
- Vue 3 + Vite + TypeScript
- Tailwind v4 (@tailwindcss/vite plugin)
- Firebase (Firestore + Auth + Functions + Hosting)
- Slack App (slash commands + interactive buttons)

## What's done
- Vue 3 + Vite + TS scaffolded and running
- Tailwind v4 installed and configured
- Firebase project created (Toronto region)
- Firestore + Google Auth enabled (test mode)
- firebase.ts created (app + analytics init — auth/db exports still needed)
- GitHub repo set up
- Slack app created on api.slack.com
- ngrok installed for local tunneling
- Firebase Functions set up (`/access` slash command working)
- `/access [tool]` writes request to Firestore and responds in Slack

## Next up
- Approve / Deny buttons (Slack interactive messages)
- Wire up firebase.ts with auth + db exports
- Dashboard: Access Overview, Requests page
- Additional slash commands: /my-access, /who-has, /my-requests

## Key decisions made
- Test mode Firestore rules for now (tighten before showing to anyone)
- No automation in v1 — visibility and requests only
- Slack = actions, Dashboard = clarity
- Firebase Functions v2 (2nd gen) with onRequest
- Slack signature verification on all incoming requests
