# AGENTS.md — Claude Code Instructions

## Project Overview
Slack-first access request and approval system with a Vue dashboard.
Requests happen in Slack, approvals happen in one click, visibility lives in the dashboard.

## Stack
- Vue 3 + Vite + TypeScript
- Tailwind v4 (@tailwindcss/vite — no tailwind.config.js)
- Pinia (state management)
- Vue Router
- Firebase (Firestore, Auth, Functions, Hosting)
- Slack API (slash commands, interactive buttons)

## Project Structure
src/
├── assets/
├── components/        # Reusable UI components
│   ├── ui/            # Generic (Button, Badge, Table etc.)
│   └── features/      # Feature-specific (AccessTable, RequestRow etc.)
├── views/             # Page-level components (tied to routes)
├── stores/            # Pinia stores (one per domain)
│   ├── auth.ts
│   ├── access.ts
│   └── requests.ts
├── composables/       # Reusable logic (useAuth, useAccess etc.)
├── firebase.ts        # Firebase init — db and auth exports
├── router/
│   └── index.ts
└── types/
    └── index.ts       # All shared TypeScript interfaces

functions/             # Firebase Cloud Functions
├── src/
│   ├── slack/         # Slack command handlers
│   └── index.ts
└── package.json

## Code Rules

### General
- Always use TypeScript — no `any` types
- Use `const` over `let` wherever possible
- Never commit secrets or API keys
- All Firebase config via environment variables

### Vue
- Composition API only — no Options API
- `<script setup>` syntax always
- Props must be typed with interfaces
- Emit events must be typed
- No logic in templates — extract to composables

### Naming
- Components: PascalCase (`AccessTable.vue`)
- Composables: camelCase with `use` prefix (`useAccess.ts`)
- Stores: camelCase domain name (`access.ts`)
- Types/Interfaces: PascalCase (`AccessRecord`, `User`)
- Files: kebab-case for non-components (`firebase.ts`, `index.ts`)

### Firestore
- Never write raw Firestore calls in components
- All db reads/writes go through Pinia stores or composables
- Always handle loading and error states
- Use typed converters for all collections

### Tailwind
- Utility classes only — no custom CSS unless absolutely necessary
- No inline styles
- Responsive classes where relevant

### Firebase Functions
- Each Slack command gets its own handler file in `functions/src/slack/`
- Always verify Slack request signatures
- Always return proper HTTP status codes
- Keep functions small and single-purpose

## Data Model
interface User {
  id: string
  email: string
  name: string
  role: 'employee' | 'cto' | 'hr'
  slackUserId: string
}

interface Tool {
  id: string
  name: string
  requiresApproval: boolean
}

interface Request {
  id: string
  userId: string
  toolId: string
  status: 'pending' | 'approved' | 'denied'
  requestedAt: Timestamp
  approvedBy?: string
  approvedAt?: Timestamp
}

interface AccessRecord {
  id: string
  userId: string
  toolId: string
  grantedBy: string
  grantedAt: Timestamp
}

interface AuditLog {
  id: string
  type: 'request_approved' | 'request_denied' | 'access_revoked'
  actor: string
  target: string
  tool: string
  timestamp: Timestamp
}

## What NOT to do
- No Options API
- No any types
- No direct Firestore calls in .vue files
- No hardcoded secrets
- No CSS files (Tailwind only)
- No automation or integrations in v1
- No AI features in v1