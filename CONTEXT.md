# Slack Access Tool — Project Context

## What this is
A Slack-first access request and approval system with a clean dashboard 
showing who has access to which tools. Built for startups 10–80 people.

## Stack
- Vue 3 + Vite + TypeScript
- Tailwind v4 (@tailwindcss/vite plugin)
- Firebase (Firestore + Auth + Functions + Hosting)
- Slack App (slash commands + interactive buttons)

## Where we left off
- Vue 3 + Vite + TS scaffolded and running
- Tailwind v4 installed and configured
- Firebase project created (Toronto region)
- Firestore + Google Auth enabled (test mode)
- firebase.ts created with db and auth exports
- GitHub repo set up

## Next session goal
- Create Slack app on api.slack.com
- Set up ngrok for local tunneling
- Write first Firebase Function to handle /access slash command
- Write request to Firestore on command received

## Data model
See the PRD for full schema — users, tools, requests, accessRecords, auditLogs

## Key decisions made
- Test mode Firestore rules for now (tighten before showing to anyone)
- No automation in v1 — visibility and requests only
- Slack = actions, Dashboard = clarity