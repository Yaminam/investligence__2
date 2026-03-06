# Capital Connect — Founder Guide

> Complete reference for the **Founder** experience: onboarding paths, dashboard features, and platform tools.

---

## Overview

Capital Connect supports two distinct founder paths, each with a tailored onboarding flow and dedicated dashboard:

| Founder Type | Best For | Theme | Dashboard Focus |
|---|---|---|---|
| **Active Startup** | Registered companies seeking investment | Emerald | Investor traction, listing management, intro requests |
| **Idea Stage** | Pre-company, idea-first builders | Violet | Mentors, co-founders, milestones, community |

---

## PART 1 — ONBOARDING

### How to Get Started

1. Go to `/auth/signup` and create an account
2. You'll be redirected to `/onboarding` automatically
3. On **Step 0**, select **"I am a Founder"**
4. On **Step 1**, choose your founder type

---

### Step 0 · Role Selection

Select **"I am a Founder"** from the two-option card picker.

```
┌─────────────────────────────────────┐
│  🏢  I am an Investor               │
│      Angels, VCs, Banks, NBFCs...   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  🚀  I am a Founder   ← select this │
│      Startup founders seeking       │
│      institutional investment       │
└─────────────────────────────────────┘
```

---

### Step 1 · Founder Type

Choose your current stage:

```
┌─────────────────────────────────────────┐
│  🚀  Active Startup       Apply Required│
│  I have a registered company, am        │
│  building a product, and seeking        │
│  investment.                            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  💡  Idea Stage           Early Access  │
│  I have a business idea and am looking  │
│  for mentorship, a co-founder, or       │
│  pre-seed support.                      │
└─────────────────────────────────────────┘
```

Your choice sets `founderType` in your profile and determines all subsequent steps and your dashboard.

---

### Step 2 · Your Profile (Both Types)

Pre-filled from your signup. Read-only confirmation:

| Field | Source |
|---|---|
| First Name | From signup |
| Last Name | From signup |

---

## PATH A — ACTIVE STARTUP ONBOARDING

### Step 3 · Company Info

| Field | Required | Notes |
|---|---|---|
| Company Name | ✅ | Your registered startup name |
| Sector | ✅ | Dropdown: AI/ML, FinTech, HealthTech, SaaS, CleanTech, EdTech, Deep Tech, etc. |
| Stage | ✅ | Dropdown: Pre-Seed, Seed, Series A, Series B, Series C+ |

---

### Step 4 · Traction Metrics

| Field | Notes |
|---|---|
| Monthly ARR | e.g. $150K |
| MoM Growth | e.g. +25% |

> Investors make quick decisions based on metrics. Be accurate.

---

### Step 5 · Fundraising

| Field | Required | Notes |
|---|---|---|
| Amount Raising | ✅ | e.g. $2M |

> After setup, you can submit a full application. Our team reviews within 3–5 days.

---

### Step 6 · Ready (Emerald)

```
  ┌──────────────────────────────────┐
  │  🎉  Almost there, [FirstName]!  │
  │                                  │
  │  Complete your startup           │
  │  application to be reviewed by   │
  │  our curation team and go live   │
  │  to 500+ verified investors.     │
  │                                  │
  │  [  Go to Founder Dashboard  ]   │
  └──────────────────────────────────┘
```

Calls `completeOnboarding("founder", undefined, { ...data, founderType: "active" })` → navigates to `/dashboard`.

---

### Active Startup Progress Bar Labels

```
Profile → Company → Traction → Fundraising → Ready
```

---

## PATH B — IDEA STAGE ONBOARDING

### Step 3 · Your Idea

| Field | Required | Notes |
|---|---|---|
| Idea Title | ✅ | e.g. "AI-powered hiring platform for SMEs" |
| Domain / Sector | ✅ | Same sector dropdown as Active path |
| Current Stage | ✅ | Just an Idea / Researching / Prototype / Validation |
| Problem Statement | — | What pain point does your idea address? Who faces this problem? (textarea) |

---

### Step 4 · Your Vision

| Field | Notes |
|---|---|
| Target Market / Customer | e.g. "Small businesses in India, 1–50 employees" |

**Idea Stage Perks card** (shown automatically):
- ✦ Access to mentors & domain experts
- ✦ Co-founder matching network
- ✦ Pre-seed investor introductions
- ✦ Startup community & workshops

---

### Step 5 · Support Needed

Multiselect pill buttons — choose all that apply:

| Option | Description |
|---|---|
| Pre-seed Funding | Connect with early-stage investors |
| Mentorship | Domain expert guidance |
| Co-founder Search | Find technical or business co-founders |
| Legal Advice | Incorporation, IP, contracts |
| Product Feedback | UX / market validation |
| Tech Support | Engineering & dev resources |
| Marketing Help | GTM, branding, growth |
| Community Access | Peer founders, events |

---

### Step 6 · Ready (Violet)

```
  ┌──────────────────────────────────────┐
  │  💡  Welcome, [FirstName]!           │
  │                                      │
  │  Your idea stage profile is live.   │
  │  We'll start matching you with       │
  │  mentors, co-founders, and           │
  │  early-stage investors.              │
  │                                      │
  │  120+          84                    │
  │  Mentors    Co-founder Matches       │
  │                                      │
  │  47            12                    │
  │  Pre-seed   Active Communities       │
  │  Investors                           │
  │                                      │
  │  [  Explore Idea Stage Dashboard  ] │
  └──────────────────────────────────────┘
```

Calls `completeOnboarding("founder", undefined, { ...data, founderType: "idea" })` → navigates to `/dashboard`.

---

### Idea Stage Progress Bar Labels

```
Profile → Your Idea → Vision → Support → Ready
```

---

## PART 2 — DASHBOARDS

---

## ACTIVE STARTUP DASHBOARD (`/dashboard`)

For founders with `founderType === "active"`.

---

### Banner

**Violet → Indigo gradient**, dismissable.

> *"Welcome back, [FirstName]! Here's how your listing is performing."*

- Shows: investor views count, intro requests, listing tips
- CTA 1: **"Complete Profile"** → `/dashboard/application`
- CTA 2: **"View Intros"** → `/dashboard/introductions`

---

### KPI Cards

| Card | Sample Value | Trend |
|---|---|---|
| Investor Profile Views | 138 | +22 this week |
| Intro Requests Received | 7 | +3 new |
| Investors Bookmarked You | 24 | +8 this month |
| Pitch Deck Downloads | 19 | +5 since update |

---

### Charts

**Investor Interest Over Time** (AreaChart, 7 months)
- Area 1: Profile Views (violet)
- Area 2: Bookmarks (emerald)

**Investors by Sector** (horizontal BarChart)
- Active investor count per sector aligned to your startup

---

### Recent Investor Activity Feed

Live updates on investor interactions:

```
🏢  Andreessen Horowitz    viewed your profile        · 2h ago
⭐  Sequoia Capital         bookmarked your startup    · 5h ago
📄  Tiger Global           downloaded your pitch deck · 1d ago
🤝  Lightspeed Ventures    requested an intro         · 2d ago
```

---

### Listing Application Checklist

Progress card showing application completion:

| Item | Status |
|---|---|
| Company overview | ✅ Done |
| Traction metrics | ✅ Done |
| Pitch deck uploaded | ✅ Done |
| Team bios | ⬜ Pending |
| Revenue verification | ⬜ Pending |

CTA: **"Complete Your Application"** → `/dashboard/application`

---

### Navigation (Active Startup Sidebar)

| # | Label | Route |
|---|---|---|
| 1 | Dashboard | `/dashboard` |
| 2 | My Listing | `/dashboard/my-listing` |
| 3 | My Application | `/dashboard/application` |
| 4 | Browse Investors | `/dashboard/browse-investors` |
| 5 | Warm Introductions | `/dashboard/introductions` |
| 6 | Sector Intelligence | `/dashboard/sectors` |
| 7 | Ask AI | `/dashboard/ask-ai` |
| 8 | Settings | `/dashboard/settings` |

---

## IDEA STAGE DASHBOARD (`/dashboard`)

For founders with `founderType === "idea"`.

---

### Banner

**Violet → Fuchsia gradient**, Lightbulb icon, dismissable.

> *"Welcome, [FirstName]! Let's build your idea into reality."*

- Shows: co-founder matches count, mentor availability, next milestone
- CTA 1: **"Find Co-founder"** → `/dashboard/browse-investors`
- CTA 2: **"Book Mentor"** → `/dashboard/introductions`

---

### KPI Cards

| Card | Sample Value | Trend |
|---|---|---|
| Mentor Sessions | 3 | +1 scheduled |
| Co-founder Matches | 8 | +3 new profiles |
| Upcoming Events | 2 | Next: Mar 10 |
| Resources Unlocked | 24 | 6 new this week |

---

### Idea Journey Progress Tracker

Step-by-step milestone with visual progress:

| # | Milestone | Status |
|---|---|---|
| 1 | Idea Defined | ✅ Done — Your idea is registered on the platform |
| 2 | Problem Validated | ✅ Done — At least 3 customer interviews completed |
| 3 | Market Research | ⬜ Next — Identify TAM, SAM, SOM for your market |
| 4 | MVP Plan | ⬜ — Define your MVP feature set |
| 5 | First Mentor Call | ⬜ — Schedule and complete a mentor session |

"Next" badge is shown on the current incomplete step.

---

### Upcoming Events

| Event | Date | Type | Spots Left |
|---|---|---|---|
| Startup Weekend Mumbai | Mar 10–12 | Hackathon | 8 |
| Idea Stage Office Hours | Mar 14 | Mentorship | 3 |
| Co-founder Mixer | Mar 18 | Networking | 20 |

---

### Recommended Mentors

Each mentor card shows:

| Field | Example |
|---|---|
| Name | Priya Sharma |
| Role | Ex-Sequoia Partner |
| Expertise | FinTech, SaaS |
| Sessions | 42 sessions completed |
| Availability | Available (Book) / Busy |

CTA: **"Book"** → `/dashboard/introductions`

---

### Navigation (Idea Stage Sidebar)

| # | Label | Route |
|---|---|---|
| 1 | Dashboard | `/dashboard` |
| 2 | Browse Investors | `/dashboard/browse-investors` |
| 3 | Warm Introductions | `/dashboard/introductions` |
| 4 | Sector Intelligence | `/dashboard/sectors` |
| 5 | Ask AI | `/dashboard/ask-ai` |
| 6 | Settings | `/dashboard/settings` |

---

## PART 3 — OTHER FOUNDER PAGES

---

### My Listing (`/dashboard/my-listing`)

*Active Startup only.*

- Public listing preview — exactly how investors see your startup
- Inline tagline editor
- Trust Badges panel: Verified → Revenue Verified → Top Startup
- Profile views bar chart (Mon–Sun)
- Profile completion % progress bar
- Pitch deck PDF upload zone (max 20MB)

---

### My Application (`/dashboard/application`)

*Active Startup only.*

5-step application form:

| Step | Fields |
|---|---|
| 1. Company Info | Name, tagline, sector, location, website, founded year, description |
| 2. Traction & Metrics | ARR, MoM growth, customer count, team size, product stage |
| 3. Funding Details | Stage, amount raising, use of funds, previous funding |
| 4. Team & Advisors | CEO + CTO names & LinkedIn, notable advisors |
| 5. Pitch & Deck | Pitch deck PDF, demo video URL, 3 key differentiators |

---

### Browse Investors (`/dashboard/browse-investors`)

Available to both founder types.

- Search by name, firm, sector
- Filter by sector (8 options) and stage (4 options)
- Investor cards with: thesis, sector badges, check size, portfolio count, AI match score, response rate badge
- **"Request Intro"** button (changes to "✓ Requested" after click)

---

### Warm Introductions — Founder (`/dashboard/introductions`)

- Founder receives intro requests *from* investors
- Actions: **Accept Meeting** (violet) or **Pass** (red outline)
- Accepted → **Schedule Call** (emerald)
- Each request shows: investor name, firm, check size, connector name, quoted message, match score

---

### Ask AI (`/dashboard/ask-ai`)

Founder-mode responses focus on:
- Listing optimisation tips
- How to improve match scores
- Revenue verification guidance
- Pitch deck feedback pointers
- Investor approach strategies

---

## PART 4 — TRUST BADGE SYSTEM

| Badge | Colour | How to Earn | Benefit |
|---|---|---|---|
| **Verified** | Blue | Profile reviewed by Capital Connect team | Basic marketplace visibility |
| **Revenue Verified** | Emerald | ARR/MRR confirmed via documents or Stripe | +35% investor views, unlocks more intro requests |
| **Top Startup** | Amber | Top 10% match score + high profile engagement | Featured placement in investor AI matching feed |

Badges appear on: Marketplace cards · AI Matching feed · Investor search results · Your listing preview.

---

## PART 5 — AI MATCH SCORE (Founder Perspective)

Your startup receives match scores from investors based on:

| Factor | Weight |
|---|---|
| Sector alignment | Highest |
| Stage fit | High |
| Check size vs raise amount | Medium |
| Geography match | Medium |
| Portfolio synergy | Low |

**Score colours investors see for your startup:**

| Score | Label | What It Means for You |
|---|---|---|
| 90–100% | Excellent (Emerald) | Very likely to receive an intro request |
| 80–89% | Strong (Indigo) | High probability of engagement |
| 70–79% | Good (Amber) | Worth reviewing but not top priority |
| <70% | Fair (Gray) | Low fit — improve traction or adjust raise |

---

## PART 6 — QUICK REFERENCE

### Founder Onboarding Comparison

| | Active Startup | Idea Stage |
|---|---|---|
| Steps | 6 | 6 |
| Step 3 focus | Company name, sector, stage | Idea title, sector, problem |
| Step 4 focus | Traction (ARR, growth) | Vision + target market |
| Step 5 focus | Fundraising amount | Support needed (multiselect) |
| Completion screen | Emerald 🎉 | Violet 💡 with community stats |
| Dashboard theme | Emerald / Indigo | Violet / Fuchsia |
| Primary goal | Get investment | Find mentor / co-founder |

### Key Routes

| Route | Page |
|---|---|
| `/onboarding` | Role + founder type selection |
| `/dashboard` | Home dashboard (type-specific) |
| `/dashboard/my-listing` | Public listing preview & management |
| `/dashboard/application` | Full startup application form |
| `/dashboard/browse-investors` | Investor & mentor directory |
| `/dashboard/introductions` | Warm intro requests |
| `/dashboard/sectors` | Sector intelligence |
| `/dashboard/ask-ai` | AI assistant |
| `/dashboard/settings` | Account, notifications, billing |
