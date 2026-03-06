# Capital Connect

> AI-Powered Deal Flow Intelligence Platform â€” connecting the right capital with the right founders.

Built with React 19, TypeScript, and Tailwind CSS. Supports **6 investor types** with fully personalised onboarding, dashboards, and navigation â€” plus separate flows for **Active Startup** and **Idea Stage** founders.

---

## What Is Capital Connect?

Capital Connect matches high-quality startups with the right investors through AI-powered matching, warm introductions, and curated deal flow intelligence â€” built investor-first.

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

### For Founders

**Active Startup Founders:**
- Apply to list on the curated marketplace
- Track investor interest: views, bookmarks, intro requests, deck downloads
- Manage your trust badge progression (`Verified â†’ Revenue Verified â†’ Top Startup`)
- Browse investor profiles and understand thesis before outreach

**Idea Stage Founders** *(new)*:
- Separate onboarding flow tailored to early-stage ideas
- Mentor matching (120+ mentors available)
- Co-founder matching network
- Pre-seed investor introductions
- Community events and workshops
- Milestone progress tracker (Idea â†’ Validation â†’ MVP â†’ Launch)

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

### Idea Stage Founder Flow
A separate, dedicated path within onboarding:
1. Idea title, sector, stage, and problem statement
2. Target market and perks overview
3. Support needs multiselect (mentorship, co-founder, pre-seed, etc.)
4. Violet-themed completion screen with community stats
5. Custom dashboard with mentor booking, progress tracker, and events calendar

### AI Chat Assistant
- Role-aware responses (investor vs founder)
- Predefined prompt suggestions per role
- Streaming-style message display
- Full conversation history

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
The `founderType` (active/idea) is persisted inside `onboardingData`.

---

## Branding

Product: **Capital Connect**  
Logo: Custom SVG â€” C-shaped network graph with blue gradient nodes  
Component: `src/app/components/CapitalConnectLogo.tsx`  
Exports: `CapitalConnectLogo` (icon only) Â· `CapitalConnectLogoFull` (icon + wordmark)

