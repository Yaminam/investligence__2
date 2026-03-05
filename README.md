# InvestLigence

AI-Powered Deal Flow Intelligence Platform for investors and fundraising platform for founders — built with React 19, TypeScript, and Tailwind CSS.

---

## What Is InvestLigence?

InvestLigence connects high-quality startups with the right investors through AI-powered matching, warm introductions, and curated deal flow — built **investor-first**.

**For Investors:**
- Discover and browse AI-curated startup listings
- Get matched to startups based on thesis, sector, stage, and check size
- Receive warm introductions through mutual connections and shared advisors
- Track sector intelligence and deal activity
- Manage portfolio companies with MOIC/IRR tracking
- Control deal flow: pause, limit submissions, hide sectors

**For Founders:**
- Apply to get your startup listed on the marketplace
- Track investor interest: views, bookmarks, intro requests, deck downloads
- Browse investor profiles and understand their thesis before reaching out
- Accept or pass on warm introduction requests from interested investors
- Monitor your listing's trust badge progress (Verified → Revenue Verified → Top Startup)

> This repository is a complete frontend implementation. No backend or real API integrations are included.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 (class-based dark mode) |
| UI Primitives | Radix UI via shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts 2.15.2 |
| Animations | Motion (Framer Motion) |
| Toasts | Sonner |
| Build | Vite 6 |
| State | React Context API |

---

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Route Structure

```
/                             → Redirect to /auth/login

/auth/login                   → Login
/auth/signup                  → Sign up
/auth/forgot-password         → Forgot password
/auth/reset-password          → Reset password
/auth/verify-email            → Email verification

/onboarding                   → Role-selection + setup wizard (protected)

── Investor Routes ────────────────────────────────────────
/dashboard                    → Investor deal flow home
/dashboard/marketplace        → Startup marketplace (browse + filter)
/dashboard/ai-matching        → AI-matched startups with match reasoning
/dashboard/sectors            → Sector intelligence & market data
/dashboard/introductions      → Warm introduction requests (investor view)
/dashboard/portfolio          → Portfolio tracker (MOIC, IRR, allocation)
/dashboard/investor-profile   → Investor public profile + thesis editor

── Founder Routes ────────────────────────────────────────
/dashboard                    → Founder deal flow home (investor activity)
/dashboard/my-listing         → Startup public listing preview + stats
/dashboard/application        → Marketplace application form (5 steps)
/dashboard/browse-investors   → Browse verified investor directory
/dashboard/introductions      → Warm intro requests (founder view)
/dashboard/sectors            → Sector intelligence

── Shared Routes ─────────────────────────────────────────
/dashboard/ask-ai             → AI assistant chat
/dashboard/settings           → Account settings
```

---

## Project Structure

```
src/
├── main.tsx
└── app/
    ├── App.tsx
    ├── routes.tsx
    ├── components/
    │   ├── ui/                        ← shadcn/Radix UI components
    │   ├── features/                  ← feature-specific components
    │   ├── AdvancedFilters.tsx
    │   ├── NotificationCenter.tsx
    │   ├── ProtectedRoute.tsx
    │   └── ThemeToggle.tsx
    ├── context/
    │   ├── AuthContext.tsx            ← user, role (investor|founder), auth state
    │   ├── ThemeContext.tsx
    │   ├── NotificationContext.tsx
    │   └── WorkspaceContext.tsx
    ├── layouts/
    │   ├── AuthLayout.tsx             ← InvestLigence branded auth shell
    │   └── DashboardLayout.tsx        ← Role-aware sidebar + header
    ├── lib/
    │   └── validation.ts
    └── pages/
        ├── auth/
        │   ├── LoginPage.tsx
        │   ├── SignupPage.tsx
        │   ├── ForgotPasswordPage.tsx
        │   ├── ResetPasswordPage.tsx
        │   └── EmailVerificationPage.tsx
        ├── onboarding/
        │   └── OnboardingPage.tsx     ← Role-selection wizard
        └── dashboard/
            ├── DashboardHome.tsx         ← Investor or Founder home (role-aware)
            ├── StartupMarketplacePage.tsx
            ├── AIMatchingPage.tsx
            ├── SectorAnalyticsPage.tsx
            ├── WarmIntroductionsPage.tsx  ← Role-aware (investor + founder views)
            ├── PortfolioPage.tsx
            ├── InvestorProfilePage.tsx
            ├── BrowseInvestorsPage.tsx    ← Founders only
            ├── MyListingPage.tsx          ← Founders only
            ├── StartupApplicationPage.tsx ← Founders only
            ├── AIChatPage.tsx
            └── SettingsPage.tsx
```

---

## Role System

Users select their role during onboarding. The role is stored in `AuthContext` and persisted to `localStorage`.

| Role | Portal Label | Sidebar | Home Page |
|---|---|---|---|
| `investor` | Deal Flow Intelligence | 9-item investor nav + VIP badge | Deal flow overview, AI matches, KPIs |
| `founder` | Founder Portal | 8-item founder nav | Investor interest stats, application status |

Role determines navigation, page content, and feature access throughout the app.

---

## Investor vs Founder Dashboard

### Sidebar Navigation

| Investor (9 items) | Founder (8 items) |
|---|---|
| Deal Flow | Dashboard |
| Startup Marketplace | My Listing |
| AI Matching | My Application |
| Sector Intelligence | Browse Investors |
| Warm Introductions | Warm Introductions |
| Portfolio | Sector Intelligence |
| Investor Profile | Ask AI |
| Ask AI | Settings |
| Settings | — |
| + VIP Access badge | Founder badge (emerald) |

---

### Home Page (`/dashboard`)

| | Investor | Founder |
|---|---|---|
| **Banner** | AI Weekly Digest — deal flow summary | Founder Tips — investor activity nudge |
| **KPI 1** | New Startups This Week (12) | Investor Profile Views (138) |
| **KPI 2** | AI Matches For You (18) | Intro Requests Received (7) |
| **KPI 3** | Active Raises (47) | Investors Bookmarked You (24) |
| **KPI 4** | Warm Intros Pending (5) | Pitch Deck Downloads (19) |
| **Chart 1** | Deal Flow Trend (startups + funded) | Investor Interest Over Time (views + bookmarks) |
| **Chart 2** | Hot Sectors (deal volume by sector) | Investors by Sector (investor count) |
| **Bottom Left** | Recently Funded companies feed | Recent Investor Activity (who viewed, bookmarked, downloaded) |
| **Bottom Right** | Deal Flow Controls panel | Listing Application Status checklist |
| **Accent color** | Indigo | Violet |

---

### Exclusive Pages

| Investor Only | Founder Only |
|---|---|
| Startup Marketplace — browse & filter all approved startups | My Listing — preview how investors see their startup |
| AI Matching — match scores + expandable "why matched" reasons | My Application — 5-step form to get listed on the marketplace |
| Portfolio Tracker — MOIC, IRR, value chart, sector allocation | Browse Investors — verified investor directory with thesis & check size |
| Investor Profile — thesis editor + deal flow controls | — |

---

### Warm Introductions (same route `/dashboard/introductions`, different view)

| | Investor View | Founder View |
|---|---|---|
| **Sees** | Startup intro requests from founders | Investor meeting requests |
| **Card shows** | Startup name, sector, raise, ARR | Investor name, firm, check size, sectors |
| **Accept action** | Accept → "Start Chat" | Accept Meeting → "Schedule Call" |
| **Reject action** | Decline | Pass |
| **Stats labels** | Pending / Accepted / Declined | Awaiting Reply / Meetings Booked / Passed |
| **Banner** | "Why warm intros matter" (40–60% response rate) | "How warm intros work for founders" |
| **Accent color** | Indigo | Violet |

---

## Feature Overview

### Onboarding Wizard

Step 0 presents a role selection screen (Investor / Founder cards). Each role then follows its own wizard:

**Investor path (7 steps):**
Role → Personal Profile → Investment Thesis + Stages → Check Size → Sectors → Geography → Done

**Founder path (6 steps):**
Role → Personal Profile → Company Info → Traction Metrics → Fundraising Details → Done

### Investor Features

| Feature | Route | Description |
|---|---|---|
| Deal Flow Home | `/dashboard` | AI weekly digest, KPIs, deal trend charts, AI-matched feed, recently funded |
| Startup Marketplace | `/dashboard/marketplace` | Grid/list browse with sector + stage filters, trust badges, traction metrics |
| AI Matching | `/dashboard/ai-matching` | Match score system, thesis editor, expandable "Why this match?" per startup |
| Sector Intelligence | `/dashboard/sectors` | Deal activity charts, avg deal size, sector table, most active investors |
| Warm Introductions | `/dashboard/introductions` | Intro requests from founders via mutual connectors — accept or decline |
| Portfolio Tracker | `/dashboard/portfolio` | Holdings list with MOIC/IRR, value-over-time chart, sector allocation pie |
| Investor Profile | `/dashboard/investor-profile` | Public profile, thesis editor, deal flow controls (pause, limit, hide sectors) |

### Founder Features

| Feature | Route | Description |
|---|---|---|
| Founder Home | `/dashboard` | Investor activity KPIs, interest trend chart, application status checklist |
| My Listing | `/dashboard/my-listing` | Public listing preview, completion %, trust badge progress, weekly views bar chart |
| Application | `/dashboard/application` | 5-step form: Company → Traction → Funding → Team → Pitch + under-review status |
| Browse Investors | `/dashboard/browse-investors` | Directory of verified investors with thesis, check size, match score, Request Intro |
| Warm Introductions | `/dashboard/introductions` | Investors requesting meetings — accept or pass with one click |

### Trust Badges

Startups earn badges that increase visibility and investor confidence:

| Badge | Color | How to Earn |
|---|---|---|
| Verified | Blue | Profile reviewed and approved by InvestLigence team |
| Revenue Verified | Green | ARR/MRR confirmed via integration or documentation |
| Top Startup | Amber | Top 10% match score + high investor engagement |

### AI Matching Engine

Match scores (0–100%) are computed per investor based on:
- Sector overlap
- Stage alignment
- Check size fit
- Location preference
- Portfolio synergy

Displayed with color-coded tiers: Excellent (90+), Strong (80–89), Good (70–79), Fair (<70).

### Deal Flow Controls (Investors)

Investors can manage their inbound deal flow from their profile:
- **Pause deal flow** — temporarily stop receiving pitches
- **Monthly submission limit** — cap how many decks land in their inbox
- **Hidden sectors** — permanently filter out sectors they don't invest in

### Warm Introductions System

All introductions are routed through a trusted connector:
- **Mutual Connection** — someone both parties know
- **Shared Advisor** — an advisor common to both
- **LinkedIn Network** — 2nd-degree connection via LinkedIn

Cold messages are blocked. Every intro includes connector context and founder/investor message.

### Theme System

- Light / Dark mode toggle in header
- ThemeContext toggles `dark` class on `<html>`
- Tailwind `darkMode: 'class'` — all components fully dark-mode compatible
- Preference persisted in localStorage

---

## Browser Support

Chrome, Firefox, Safari — latest 2 versions. iOS 12+, Android 5+.
#   i n v e s t l i g e n c e _ _ 2  
 