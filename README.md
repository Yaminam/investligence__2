# InvestLigence

> AI-Powered Startup Discovery Platform — helping founders get discovered and investors find the right deals.

Built with React 19, TypeScript, and Tailwind CSS. Supports **6 investor types** with fully personalised onboarding, dashboards, and navigation — plus a dedicated **Active Startup Founder** flow.

---

## What Is InvestLigence?

InvestLigence is a discovery platform where high-quality founders get found by the right investors. Investors discover, research, and connect with startups through AI-curated feeds, sector intelligence, and warm introductions — no cold outreach required.

### For Investors

| Investor Type | Badge Colour | Specialisation |
|---|---|---|
| Angel Investor | Amber | Early-stage, Seed & Pre-Seed deals |
| Venture Capital | Violet | Pipeline management, fund deployment tracking |
| Bank | Blue | Venture lending, credit assessment |
| NBFC | Cyan | Revenue-based & debt financing |
| Family Office | Emerald | Long-term, ESG-aligned curated deals |
| Corporate VC (CVC) | Orange | Strategic partnerships, tech integration |

**Platform capabilities:**
- AI-curated startup discovery and smart matching
- Type-specific dashboards with personalised KPIs and charts
- Warm introductions via mutual connections
- Sector intelligence and deal activity tracking
- Portfolio management with MOIC/IRR tracking
- Deal flow controls (pause, limit, hide sectors)

### For Founders (Active Startup)

- Apply to list on the curated marketplace via a 5-step application
- Track investor interest: views, bookmarks, intro requests, deck downloads
- Manage trust badge progression (`Verified â†’ Revenue Verified â†’ Top Startup`)
- Browse verified investor profiles and understand thesis before outreach
- **Merged listing + application management** in one tabbed page

> This repository is a **complete frontend implementation**. No backend or real API integrations are included.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI (shadcn/ui) |
| Icons | Lucide React |
| Charts | Recharts |
| Animations | Framer Motion |
| Toasts | Sonner |
| Build Tool | Vite 6 |
| State Management | React Context API |

---

## Getting Started

### Prerequisites

- Node.js **18+**
- npm **9+**

### Installation

```bash
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## Route Structure

```
/                             → Redirect to /auth/login

/auth/login                   → Login
/auth/signup                  → Sign up
/auth/forgot-password         → Forgot password
/auth/reset-password          → Reset password
/auth/verify-email            → Email verification

/onboarding                   → Role-selection + setup wizard
                                (6 investor types × personalised steps)
                                (Active Startup founder path)

Investor Routes (all 6 types)
/dashboard                    → Type-specific home dashboard
/dashboard/marketplace        → Startup marketplace
/dashboard/ai-matching        → AI-matched startups
/dashboard/sectors            → Sector intelligence
/dashboard/introductions      → Warm introductions
/dashboard/portfolio          → Portfolio tracker
/dashboard/investor-profile   → Investor profile
/dashboard/funding-tracker    → Funding rounds tracker
/dashboard/news-feed          → Startup & market news
/dashboard/trending           → Trending startups & sectors

Founder Routes (Active Startup)
/dashboard                    → Founder dashboard
/dashboard/my-listing         → Startup listing + application (tabbed)
/dashboard/browse-investors   → Investor directory
/dashboard/introductions      → Intro requests
/dashboard/news-feed          → Market news
/dashboard/trending           → Trending feed
/dashboard/funding-tracker    → Funding rounds
/dashboard/events             → Events calendar
/dashboard/sectors            → Sector intelligence

Shared Routes
/dashboard/ask-ai             → AI assistant (3 modes)
/dashboard/settings           → Account settings
```

---

## Key Features

### Investor Type System
Each investor type gets a fully custom experience:
- **Personalised onboarding** — grouped steps with type-specific fields
- **Custom dashboard** — unique KPIs, charts, and opportunity feed
- **Type-aware sidebar** — navigation items relevant to that investor type
- **Colour-coded badges** — visual identity per type

### VC Dashboard (Mix-of-All Layout)
The Venture Capital dashboard features a "best of platform" layout:
- **Row 1:** Deal Funnel chart (AreaChart, 7 months) + Latest News (compact card feed)
- **Row 2:** Active Pipeline table + Trending Startups list + Funding Rounds list

### My Listing (Tabbed — Merged with Application)
Founders manage everything in one page with two tabs:
- **My Listing tab** — KPIs, public listing preview, trust badges, weekly views chart, completion progress, activity feed, pitch deck upload
- **My Application tab** — 5-step application form (Company Info → Traction → Funding → Team → Pitch) or under-review status view

All buttons that previously navigated to `/dashboard/application` now switch to the Application tab inline — no page navigation required.

### Ask AI — 3 Mode Card Selection
The AI chat has a two-phase UX:

**Phase 1 — Card selection screen:**
Three large cards, each with gradient header, icon, description, bullet list, and "Start chatting →" button:

| Mode | Colour | Investor Focus | Founder Focus |
|---|---|---|---|
| Compliance Guide | Orange/Amber | Legal DD, SEBI AIF, term sheets, cap tables | Entity types, FEMA/RBI, DPDP/GDPR, Startup India DPIIT |
| Market Intel | Blue/Cyan | Sector trends, valuation multiples, competitive landscape | TAM/SAM/SOM, competitor analysis, market tailwinds |
| Fundraising & Growth | Violet/Purple | Thesis calibration, portfolio construction, LP reporting | Pitch coaching, fundraising strategy, growth levers, valuation |

**Phase 2 — Chat interface:**
- Back arrow button returns to card selection
- Mode-coloured header, stat pills, message bubbles
- Full canned response library (keyword pattern matching)
- Role-aware responses (investor vs founder)

---

## Project Structure

```
src/
  app/
    components/
      CapitalConnectLogo.tsx   ← SVG logo component
      features/                ← Charts, mentions, workspace switcher
      ui/                      ← shadcn/ui component library (45+ components)
    context/
      AuthContext.tsx          ← Auth + onboarding state
      ThemeContext.tsx
      WorkspaceContext.tsx
      NotificationContext.tsx
    layouts/
      AuthLayout.tsx           ← Login/Signup shell
      DashboardLayout.tsx      ← App shell with role-aware sidebar
    lib/
      investorTypes.ts         ← All 6 investor type configs + onboarding steps
      validation.ts            ← Form validation helpers
    pages/
      auth/                    ← Login, Signup, Forgot/Reset password
      dashboard/
        DashboardHome.tsx      ← Routes to correct type dashboard
        InvestorTypeDashboards.tsx  ← 6 investor dashboards
        AIChatPage.tsx         ← 3-mode AI chat (card selection + chat)
        MyListingPage.tsx      ← Tabbed: listing + application
        StartupApplicationPage.tsx  ← Application form (embedded in MyListingPage)
        BrowseInvestorsPage.tsx
        PortfolioPage.tsx
        SettingsPage.tsx
        WarmIntroductionsPage.tsx
        SectorAnalyticsPage.tsx
        FundingTrackerPage.tsx
        NewsFeedPage.tsx
        TrendingFeedPage.tsx
        EventsPage.tsx
        InvestorProfilePage.tsx
        ... (24 pages total)
      onboarding/
        OnboardingPage.tsx     ← Unified wizard (investor + founder)
```

---

## Authentication Flow

```
Register → /onboarding → complete wizard → /dashboard
Login    → /dashboard  (ProtectedRoute redirects to /onboarding if not completed)
```

Auth state lives in `localStorage` under keys: `authUser`, `onboardingCompleted`.

---

## Sidebar Navigation

### Investor (all types)
Dashboard · Startup Marketplace · AI Matching · Funding Tracker · Sector Intelligence · Warm Introductions · Portfolio · Investor Profile · Ask AI · Settings

### Founder (Active Startup)
Dashboard · My Listing · Browse Investors · Warm Introductions · News Feed · Trending · Funding Tracker · Events · Sector Intelligence · Ask AI · Settings

> "My Application" is no longer a separate nav item — it is accessed via the **My Application** tab inside My Listing.

---

## Trust Badges

| Badge | Earn Criteria | Impact |
|---|---|---|
| Verified | Profile reviewed by InvestLigence | Basic marketplace visibility |
| Revenue Verified | ARR/MRR confirmed via documents | +35% investor views, more intro requests |
| Top Startup | Top 10% match score + engagement | Featured in AI matching feed |

---

## AI Match Score System

Scores 0–100% per investor–startup pair:
- **90–100%** Excellent (Emerald)
- **80–89%** Strong (Indigo)
- **70–79%** Good (Amber)
- **< 70%** Fair (Gray)

Factors: sector overlap · stage alignment · check size fit · geography · portfolio synergy

---

## Branding

Product: **InvestLigence**
Logo: Custom SVG — C-shaped network graph with blue gradient nodes
Component: `src/app/components/CapitalConnectLogo.tsx`
Exports: `CapitalConnectLogo` (icon only) · `CapitalConnectLogoFull` (icon + wordmark)
Primary colours: `#56CCF2` to `#2F80ED` (blue gradient) â†’ Validation â†’ MVP â†’ Launch)

> This repository is a **complete frontend implementation**. No backend or real API integrations are included.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI (shadcn/ui) |
| Icons | Lucide React |
| Charts | Recharts |
| Animations | Framer Motion |
| Toasts | Sonner |
| Build Tool | Vite 6 |
| State Management | React Context API |

---

## Getting Started

### Prerequisites

- Node.js **18+**
- npm **9+**

### Installation

```bash
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## Route Structure

```
/                             â†’ Redirect to /auth/login

/auth/login                   â†’ Login
/auth/signup                  â†’ Sign up
/auth/forgot-password         â†’ Forgot password
/auth/reset-password          â†’ Reset password
/auth/verify-email            â†’ Email verification

/onboarding                   â†’ Role-selection + setup wizard
                                (6 investor types Ã— personalised steps)
                                (Active founder OR Idea Stage founder paths)

Investor Routes (all 6 types)
/dashboard                    â†’ Type-specific home dashboard
/dashboard/marketplace        â†’ Startup marketplace
/dashboard/ai-matching        â†’ AI-matched startups
/dashboard/sectors            â†’ Sector intelligence
/dashboard/introductions      â†’ Warm introductions
/dashboard/portfolio          â†’ Portfolio tracker
/dashboard/investor-profile   â†’ Investor profile

Founder Routes (Active Startup)
/dashboard                    â†’ Founder dashboard
/dashboard/my-listing         â†’ Startup listing preview
/dashboard/application        â†’ Startup application form
/dashboard/browse-investors   â†’ Investor directory
/dashboard/introductions      â†’ Intro requests
/dashboard/sectors            â†’ Sector intelligence

Founder Routes (Idea Stage)
/dashboard                    â†’ Idea Stage hub (mentors, co-founders, milestones)
/dashboard/browse-investors   â†’ Discover mentors & pre-seed investors
/dashboard/introductions      â†’ Book mentor / co-founder sessions

Shared Routes
/dashboard/ask-ai             â†’ AI assistant
/dashboard/settings           â†’ Account settings
/dashboard/alerts-crisis      â†’ Alerts & crisis feed
```

---

## Key Features

### Investor Type System
Each investor type gets a fully custom experience:
- **Personalised onboarding** â€” grouped steps with type-specific fields
- **Custom dashboard** â€” unique KPIs, charts, and opportunity feed
- **Type-aware sidebar** â€” navigation items relevant to that investor type
- **Colour-coded badges** â€” visual identity per type

### VC Dashboard (Mix-of-All Layout)
The Venture Capital dashboard features a "best of platform" layout:
- **Row 1:** Deal Funnel chart (AreaChart, 7 months) + Latest News (compact card feed)
- **Row 2:** Active Pipeline table + Trending Startups list + Funding Rounds list

### My Listing (Tabbed — Merged with Application)
Founders manage everything in one page with two tabs:
- **My Listing tab** — KPIs, public listing preview, trust badges, weekly views chart, completion progress, activity feed, pitch deck upload
- **My Application tab** — 5-step application form (Company Info → Traction → Funding → Team → Pitch) or under-review status view

All buttons that previously navigated to `/dashboard/application` now switch to the Application tab inline — no page navigation required.

### Ask AI — 3 Mode Card Selection
The AI chat has a two-phase UX:

**Phase 1 — Card selection screen:**
Three large cards, each with gradient header, icon, description, bullet list, and "Start chatting →" button:

| Mode | Colour | Investor Focus | Founder Focus |
|---|---|---|---|
| Compliance Guide | Orange/Amber | Legal DD, SEBI AIF, term sheets, cap tables | Entity types, FEMA/RBI, DPDP/GDPR, Startup India DPIIT |
| Market Intel | Blue/Cyan | Sector trends, valuation multiples, competitive landscape | TAM/SAM/SOM, competitor analysis, market tailwinds |
| Fundraising & Growth | Violet/Purple | Thesis calibration, portfolio construction, LP reporting | Pitch coaching, fundraising strategy, growth levers, valuation |

**Phase 2 — Chat interface:**
- Back arrow button returns to card selection
- Mode-coloured header, stat pills, message bubbles
- Full canned response library (keyword pattern matching)
- Role-aware responses (investor vs founder)

---

## Project Structure

```
src/
  app/
    components/
      CapitalConnectLogo.tsx   â† SVG logo component
      features/                â† Charts, mentions, workspace switcher
      ui/                      â† shadcn/ui component library
    context/
      AuthContext.tsx          â† Auth + onboarding state
      ThemeContext.tsx
      WorkspaceContext.tsx
    layouts/
      AuthLayout.tsx           â† Login/Signup shell
      DashboardLayout.tsx      â† App shell with type-aware sidebar
    lib/
      investorTypes.ts         â† All 6 investor type configs + onboarding
    pages/
      auth/                    â† Login, Signup, Forgot/Reset password
      dashboard/
        DashboardHome.tsx      â† Routes to correct type dashboard
        InvestorTypeDashboards.tsx â† 6 investor + IdeaFounder dashboards
        AIChatPage.tsx
        MarketplacePage.tsx
        PortfolioPage.tsx
        SettingsPage.tsx
        ... (20 pages total)
      onboarding/
        OnboardingPage.tsx     â† Unified wizard (investor + both founder types)
```

---

## Authentication Flow

```
Register â†’ /onboarding â†’ complete wizard â†’ /dashboard
Login    â†’ /dashboard  (ProtectedRoute redirects to /onboarding if not completed)
```

Auth state lives in `localStorage` under keys: `authUser`, `onboardingCompleted`.

---

## Sidebar Navigation

### Investor (all types)
Dashboard · Startup Marketplace · AI Matching · Funding Tracker · Sector Intelligence · Warm Introductions · Portfolio · Investor Profile · Ask AI · Settings

### Founder (Active Startup)
Dashboard · My Listing · Browse Investors · Warm Introductions · News Feed · Trending · Funding Tracker · Events · Sector Intelligence · Ask AI · Settings

> "My Application" is no longer a separate nav item — it is accessed via the **My Application** tab inside My Listing.

---

## Trust Badges

| Badge | Earn Criteria | Impact |
|---|---|---|
| Verified | Profile reviewed by InvestLigence | Basic marketplace visibility |
| Revenue Verified | ARR/MRR confirmed via documents | +35% investor views, more intro requests |
| Top Startup | Top 10% match score + engagement | Featured in AI matching feed |

---

## AI Match Score System

Scores 0–100% per investor–startup pair:
- **90–100%** Excellent (Emerald)
- **80–89%** Strong (Indigo)
- **70–79%** Good (Amber)
- **< 70%** Fair (Gray)

Factors: sector overlap · stage alignment · check size fit · geography · portfolio synergy

---

## Branding

Product: **InvestLigence**  
Logo: Custom SVG â€” C-shaped network graph with blue gradient nodes  
Component: `src/app/components/CapitalConnectLogo.tsx`  
Exports: `CapitalConnectLogo` (icon only) Â· `CapitalConnectLogoFull` (icon + wordmark)

#   c a p i t a l  
 