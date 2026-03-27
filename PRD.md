# Slack-Based Access Control Tool (MVP)

## Overview

A Slack-first access request and approval system paired with a clean, non-technical dashboard that shows who has access to which tools.

- Slack = where actions happen (request + approve)
- Dashboard = where clarity happens (who has access to what)

## Problem

In startups (10–80 people), access management is messy:

- Requests happen in Slack messages or DMs
- CTO / HR manually handle approvals
- No clear record of approvals
- No easy way to see who has access to what
- Offboarding is risky (access gets missed)
- CTO gets constantly interrupted

## Core Value

- Reduce interruptions for CTO
- Provide instant visibility
- Create a simple system of record
- Make onboarding/offboarding safer

## Positioning

A simple, Slack-connected access control system for startup tools (Jira, Bitbucket, Figma).

NOT an enterprise IT platform, secrets manager, automation engine, or AI assistant.

Pitch: "Requests happen in Slack, approvals happen in one click, and we keep a clean dashboard showing who has access to what."

## Users

- **Employee / Developer** — Requests access, checks their access
- **CTO / Eng Lead** — Approves requests quickly, wants fewer interruptions, needs visibility
- **HR / Ops** — Needs visibility into access, supports onboarding/offboarding

## Product Philosophy

- Slack is for quick actions, requests, approvals
- Dashboard is the product — clarity, visibility, decision-making

## MVP Scope

### Slack Features

Slash Commands:
- `/access [tool]` — request access
- `/my-access` — check your access
- `/who-has [tool]` — see who has access to a tool
- `/my-requests` — check your pending requests

Core Flow:
1. Request: `/access jira` → creates request → sends approval to CTO
2. Approve: Slack message with [Approve] [Deny] buttons → updates request, creates access record, notifies user
3. Deny: Updates request, logs action, notifies user

### Dashboard

Design goals: clean, simple, readable by non-technical users, no clutter

**Access Overview (main screen):**

| Person | Role | Tools |
|--------|------|-------|
| Robin | Dev | Jira, Figma |
| Mark | Design | Figma |
| Alex | Backend | Jira, Bitbucket |

**Requests Page:**

| Person | Tool | Status | Approved By | Date |

**Tool View:** Click a tool to see all users with access.

### UX Principles

1. Non-technical language ("give access" not "provision access")
2. Minimal UI — no graphs, no heavy settings
3. Scannable — understand the page in < 5 seconds
4. Focus on clarity — every screen answers "Who has access to what?"

### What NOT to Build (Step 1)

- No Jira / Bitbucket integrations
- No automation
- No secrets or passwords
- No env handling
- No n8n
- No AI chat
- No complex Slack Home UI

## Technical Architecture

### Stack

- Frontend: Vue 3, Vite, Tailwind, Pinia
- Backend: Firebase Cloud Functions, Firestore, Firebase Auth
- Slack: Slack App, slash commands, interactive buttons

### Architecture Flow

```
Slack → Firebase Function → Firestore → Vue Dashboard
                          → Slack approval message
```

### Data Model

**users**
```json
{
  "id": "uid",
  "email": "user@company.com",
  "name": "User Name",
  "role": "employee | cto | hr",
  "slackUserId": "U123"
}
```

**tools**
```json
{
  "id": "jira",
  "name": "Jira",
  "requiresApproval": true
}
```

**requests**
```json
{
  "id": "req_123",
  "userId": "uid",
  "toolId": "jira",
  "status": "pending | approved | denied",
  "requestedAt": "timestamp",
  "approvedBy": "uid",
  "approvedAt": "timestamp"
}
```

**accessRecords**
```json
{
  "id": "acc_123",
  "userId": "uid",
  "toolId": "jira",
  "grantedBy": "uid",
  "grantedAt": "timestamp"
}
```

**auditLogs**
```json
{
  "id": "log_123",
  "type": "request_approved",
  "actor": "uid",
  "target": "uid",
  "tool": "jira",
  "timestamp": "timestamp"
}
```

### Backend Flows

**Request Access:** Slack command → create request → send approval message

**Approve:** Slack button → update request → create access record → create audit log → notify user

**Deny:** Update request → log action → notify user

## Security (Step 1)

- Firebase Auth (Google SSO)
- Restrict to company domain
- Verify Slack signatures
- No password storage
- Role-based Firestore rules

## Stickiness Strategy

- Daily: access requests, approvals
- Weekly: checking who has access, reviewing team
- Key sticky features: `/who-has jira`, `/my-access`

## Success Criteria

After 1–2 weeks:
- CTO uses it without prompting
- Developers use `/access`
- CTO checks `/who-has`
- CTO says: "Can this automatically add users?"

## Future (Not Now)

- Jira / Bitbucket / Figma integrations
- Automation via APIs
- Onboarding / offboarding flows
- n8n workflows
- AI layer

## Build Order

1. Vue app + Firebase setup
2. Slack `/access` command
3. Approve / Deny buttons
4. Requests + Access dashboard
5. Polish + demo
