# InvestLigence

AI-Powered Deal Flow Intelligence Platform for investors and fundraising platform for founders — built with React 19, TypeScript, and Tailwind CSS.

---

# What Is InvestLigence?

InvestLigence connects high-quality startups with the right investors through AI-powered matching, warm introductions, and curated deal flow — built **investor-first**.

## For Investors

- Discover and browse AI-curated startup listings
- Get matched to startups based on thesis, sector, stage, and check size
- Receive warm introductions through mutual connections and shared advisors
- Track sector intelligence and deal activity
- Manage portfolio companies with MOIC/IRR tracking
- Control deal flow:
  - Pause submissions
  - Limit submissions
  - Hide sectors

## For Founders

- Apply to get your startup listed on the marketplace
- Track investor interest:
  - Views
  - Bookmarks
  - Intro requests
  - Deck downloads
- Browse investor profiles and understand their thesis before reaching out
- Accept or pass on warm introduction requests
- Monitor your listing’s trust badge progress

```
Verified → Revenue Verified → Top Startup
```

> This repository is a **complete frontend implementation**.  
> No backend or real API integrations are included.

---

# Tech Stack

| Layer | Technology |
|------|------------|
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

# Getting Started

## Prerequisites

- Node.js **18+**
- npm **9+**

## Installation

```bash
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

# Route Structure

```
/                             → Redirect to /auth/login

/auth/login                   → Login
/auth/signup                  → Sign up
/auth/forgot-password         → Forgot password
/auth/reset-password          → Reset password
/auth/verify-email            → Email verification

/onboarding                   → Role-selection + setup wizard

Investor Routes
/dashboard                    → Investor deal flow home
/dashboard/marketplace        → Startup marketplace
/dashboard/ai-matching        → AI-matched startups
/dashboard/sectors            → Sector intelligence
/dashboard/introductions      → Warm introductions
/dashboard/portfolio          → Portfolio tracker
/dashboard/investor-profile   → Investor profile

Founder Routes
/dashboard                    → Founder dashboard
/dashboard/my-listing         → Startup listing preview
/dashboard/application        → Startup application form
/dashboard/browse-investors   → Investor directory
/dashboard/introductions      → Intro requests
/dashboard/sectors            → Sector intelligence

Shared Routes
/dashboard/ask-ai             → AI assistant
/dashboard/settings           → Account settings
```

---

# Project Structure

```
src/
├── main.tsx
└── app/
    ├── App.tsx
    ├── routes.tsx

    ├── components/
    │   ├── ui/
    │   ├── features/
    │   ├── AdvancedFilters.tsx
    │   ├── NotificationCenter.tsx
    │   ├── ProtectedRoute.tsx
    │   └── ThemeToggle.tsx

    ├── context/
    │   ├── AuthContext.tsx
    │   ├── ThemeContext.tsx
    │   ├── NotificationContext.tsx
    │   └── WorkspaceContext.tsx

    ├── layouts/
    │   ├── AuthLayout.tsx
    │   └── DashboardLayout.tsx

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
        │   └── OnboardingPage.tsx

        └── dashboard/
            ├── DashboardHome.tsx
            ├── StartupMarketplacePage.tsx
            ├── AIMatchingPage.tsx
            ├── SectorAnalyticsPage.tsx
            ├── WarmIntroductionsPage.tsx
            ├── PortfolioPage.tsx
            ├── InvestorProfilePage.tsx
            ├── BrowseInvestorsPage.tsx
            ├── MyListingPage.tsx
            ├── StartupApplicationPage.tsx
            ├── AIChatPage.tsx
            └── SettingsPage.tsx
```

---

# Role System

Users select their role during onboarding.  
The role is stored in **AuthContext** and persisted in **localStorage**.

| Role | Portal Label | Sidebar | Home Page |
|-----|--------------|--------|-----------|
| investor | Deal Flow Intelligence | Investor navigation | Deal flow overview |
| founder | Founder Portal | Founder navigation | Investor interest stats |

---

# Investor vs Founder Dashboard

## Sidebar Navigation

| Investor | Founder |
|--------|--------|
| Deal Flow | Dashboard |
| Startup Marketplace | My Listing |
| AI Matching | My Application |
| Sector Intelligence | Browse Investors |
| Warm Introductions | Warm Introductions |
| Portfolio | Sector Intelligence |
| Investor Profile | Ask AI |
| Ask AI | Settings |

---

# Key Features

## Onboarding Wizard

### Investor Flow (7 Steps)

```
Role
Personal Profile
Investment Thesis
Check Size
Sectors
Geography
Complete
```

### Founder Flow (6 Steps)

```
Role
Personal Profile
Company Info
Traction Metrics
Fundraising Details
Complete
```

---

# Investor Features

| Feature | Description |
|------|-------------|
| Deal Flow Home | Weekly digest + KPIs |
| Startup Marketplace | Browse verified startups |
| AI Matching | AI match scores |
| Sector Intelligence | Market analytics |
| Warm Introductions | Founder intro requests |
| Portfolio Tracker | MOIC / IRR tracking |
| Investor Profile | Thesis editor + deal flow settings |

---

# Founder Features

| Feature | Description |
|------|-------------|
| Founder Dashboard | Investor activity metrics |
| My Listing | Startup listing preview |
| Application | Marketplace application |
| Browse Investors | Investor directory |
| Warm Introductions | Meeting requests |

---

# Trust Badges

Startups earn badges that increase investor confidence.

| Badge | Meaning |
|------|------|
| Verified | Startup profile reviewed |
| Revenue Verified | ARR/MRR validated |
| Top Startup | Top 10% match score |

---

# AI Matching Engine

Match scores are calculated using:

- Sector overlap
- Stage alignment
- Check size compatibility
- Location preference
- Portfolio synergy

Score Levels

```
90+   Excellent
80-89 Strong
70-79 Good
<70   Fair
```

---

# Deal Flow Controls

Investors can manage inbound startup submissions:

- Pause deal flow
- Monthly submission limits
- Hidden sectors

---

# Warm Introduction System

All introductions require a **trusted connector**.

Possible connectors:

- Mutual connection
- Shared advisor
- LinkedIn 2nd-degree network

Cold outreach is blocked.

---

# Theme System

- Light / Dark mode toggle
- ThemeContext controls `<html>` class
- Tailwind `darkMode: 'class'`
- Preference stored in `localStorage`

---

# Browser Support

Chrome, Firefox, Safari — latest 2 versions.

Mobile support:

```
iOS 12+
Android 5+
```
