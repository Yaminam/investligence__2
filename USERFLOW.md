# Capital Connect — User Flow

> Complete step-by-step journey for **Investors** (6 types) and **Founders** (Active Startup + Idea Stage).
> Covers every screen, decision point, navigation path, and feature interaction from first visit to daily use.

---

## PART 1 — PRE-LOGIN & AUTHENTICATION

---

### Step 1 · Landing (`/`)
- User visits the app
- Immediately redirected to `/auth/login`
- No component renders, no state set

---

### Step 2 · Login (`/auth/login`)

**Layout:** AuthLayout — Capital Connect network logo, "AI-Powered Deal Flow Intelligence" tagline

**Fields:**
| Field | Validation |
|---|---|
| Email | RFC format `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` |
| Password | Min 8 characters |

**Flow:**
```
Submit
  → Validate fields
      FAIL → show inline errors, stop
      PASS → 800ms loading spinner
               → login(email, password)
                   onboardingCompleted = true  → /dashboard
                   onboardingCompleted = false → /onboarding
```

**Other interactions:**
- Enter key → submit
- "Forgot password" → `/auth/forgot-password`
- "Create account" → `/auth/signup`

---

### Step 3 · Sign Up (`/auth/signup`)

**Fields:**
| Field | Validation |
|---|---|
| First Name | Required |
| Last Name | Required |
| Company / Startup name | Required |
| Email | RFC format |
| Password | Min 8 chars + live 4-bar strength meter |
| Terms checkbox | Must be checked |

**Flow:**
```
Submit
  → Validate all fields
      FAIL → show per-field errors, stop
      PASS → 900ms loading
               → register(user, password)
               → clears onboardingCompleted from localStorage
               → navigate("/onboarding")
```

---

### Step 4 · Forgot Password (`/auth/forgot-password`)
1. User enters email → clicks "Send reset link"
2. 800ms loading state
3. Success screen: MailCheck icon + "Check your inbox" message
4. "Try again" link resets to initial state

### Step 5 · Reset Password (`/auth/reset-password`)
1. User enters new password + confirm password
2. Live match indicator + strength meter
3. On success → `/auth/login`

---

## PART 2 — ONBOARDING WIZARD (`/onboarding`)

`ProtectedRoute`: requires `isAuthenticated`. If already `onboardingCompleted` → `/dashboard`.

---

### Step 0 · Role Selection (ALL users)

Full-screen card picker. User must choose one:

| Option | Badge | What it unlocks |
|---|---|---|
| **I'm an Investor** | Indigo | 6 investor types, personalised dashboards, deal flow |
| **I'm a Founder** | Emerald | Active Startup or Idea Stage path |

Selected card highlights with gradient border + checkmark. Cannot proceed without selecting.

---

### INVESTOR Onboarding (type-specific grouped steps)

```
Step 0: Role confirm
  └─ Shows "Investor" role badge, brief description

Step 1: Investor Type Selection
  ├─ Angel Investor     (Amber badge)
  ├─ Venture Capital    (Violet badge)
  ├─ Bank               (Blue badge)
  ├─ NBFC               (Cyan badge)
  ├─ Family Office      (Emerald badge)
  └─ Corporate VC (CVC) (Orange badge)
  Each option shows: icon, label, "Invest In" description
  └─ Selecting type sets investorType in AuthContext

Step 2: Personal Profile
  ├─ First name (pre-filled, read-only)
  ├─ Last name (pre-filled, read-only)
  ├─ Title / Role (e.g. "General Partner")
  └─ Firm name

Step 3: Investment Focus (fields vary by type)
  Angel:        Thesis text, focus sectors (pills), investment stages (pills)
  VC:           Fund name, AUM size, check range, target sectors
  Bank:         Loan types, loan range, sector focus, collateral requirements
  NBFC:         Financing types, revenue threshold, loan range, diligence time
  Family Office: Investment mandate, ESG checkbox, target return, hold period
  CVC:          Parent company, strategic areas, partnership types, co-invest checkbox

Step 4: Geography & Preferences
  All types:  Region pills, min traction threshold, annual deal target

Step 5: Done
  ├─ Type-specific completion card with gradient matching badge colour
  ├─ "Your [type] dashboard is ready" message
  └─ CTA: "Explore Dashboard" → completeOnboarding("investor", investorType, data) → /dashboard
```

---

### FOUNDER Onboarding

```
Step 0: Role confirm
  └─ "Founder" role badge

Step 1: Founder Type
  ├─ Active Startup (emerald) — "I have a registered company seeking investment"
  └─ Idea Stage    (violet)  — "I have an idea, seeking mentors / co-founder / pre-seed"

Step 2: Profile
  └─ First name & Last name (pre-filled, read-only)

── ACTIVE STARTUP path ──
Step 3: Company Info
  ├─ Company name (required)
  ├─ Sector (dropdown)
  └─ Stage (dropdown)

Step 4: Traction Metrics
  ├─ Monthly ARR
  └─ MoM growth %

Step 5: Fundraising
  ├─ Amount raising (required)
  └─ Note: full application reviewed within 3–5 days

Step 6: Done (emerald)
  └─ CTA: "Go to Founder Dashboard"

── IDEA STAGE path ──
Step 3: Your Idea
  ├─ Idea title (required)
  ├─ Domain / sector + current stage (Just an Idea / Researching / Prototype / Validation)
  └─ Problem statement (textarea)

Step 4: Vision
  ├─ Target market / customer
  └─ "Idea Stage Perks" card (mentors, co-founder match, pre-seed intros, workshops)

Step 5: Support Needed (multiselect pills)
  Options: Pre-seed Funding, Mentorship, Co-founder Search, Legal Advice,
           Product Feedback, Tech Support, Marketing Help, Community Access

Step 6: Done (violet)
  ├─ Community stats: 120+ Mentors · 84 Co-founder Matches · 47 Pre-seed Investors · 12 Communities
  └─ CTA: "Explore Idea Stage Dashboard"
```

`founderType` ("active" | "idea") is saved to `user.onboardingData.founderType` in AuthContext.

---

## PART 3 — INVESTOR DASHBOARDS (per type)

Each investor type has a **unique dashboard home** with custom KPIs, charts, and opportunity feeds.

---

### ANGEL INVESTOR Dashboard

**Banner:** Indigo→Violet gradient, "AI Weekly Digest"

**KPIs:**
| Card | Value |
|---|---|
| New Matches | 18 |
| Portfolio Companies | 7 |
| Avg Check Size | $75K |
| Intros Sent | 12 |

**Charts:**
- Deal Flow by Stage (BarChart: Pre-Seed / Seed / Series A counts)
- Deals by Sector (horizontal BarChart, colour-coded)

**Feed:** Early-stage startup matches with ARR, growth %, raise amount, match score circle

**Actions:** "View AI Matches" → `/dashboard/ai-matching` | "View All" → `/dashboard/marketplace`

---

### VENTURE CAPITAL Dashboard

**Banner:** Violet→Purple gradient, "VC Pipeline Briefing"

**KPIs:** Deal Pipeline (24) · Portfolio Companies (18) · Fund Deployed ($28M) · DD Queue (5)

**Charts:**
- Deal Funnel AreaChart (Sourced / In DD / Closed, 7 months, 3 areas)
- Portfolio Allocation PieChart (donut, by sector %)

**Feed:** Pipeline with deal status badges (Due Diligence / Term Sheet / First Call)

---

### BANK Dashboard

**Banner:** Blue→Indigo gradient, "Lending Opportunities"

**KPIs:** Loan Applications (34) · Under Review (8) · Approved This Month (6) · Avg Loan ($2.4M)

**Charts:**
- Application Volume Trend AreaChart (Applications vs Approved, 7 months)
- Applications by Sector (horizontal BarChart)

**Feed:** Loan opportunities with credit rating badges (A+ / A / B+)

---

### NBFC Dashboard

**Banner:** Cyan→Blue gradient, "NBFC Pipeline"

**KPIs:** Funding Requests (28) · Active Borrowers (15) · Disbursed ($12M) · Default Rate (1.2%)

**Charts:**
- Requests vs Disbursements AreaChart (7 months)
- By Funding Type BarChart (Revenue-Based / Debt / Invoice Disc. / Growth Capital)

**Feed:** Requests with financing type badges and repayment timeline

---

### FAMILY OFFICE Dashboard

**Banner:** Emerald→Teal gradient, "Portfolio Digest"

**KPIs:** Portfolio Value ($24M) · Active Investments (18) · Co-invest Offers (4) · Curated Deals (11)

**Charts:**
- Portfolio Growth $M AreaChart (7 months, Sep → Mar: $18.2M → $24M)
- Asset Allocation PieChart (donut, 5 sectors)

**Feed:** Long-term curated opportunities with ESG badge, investment horizon, ARR, raise amount

---

### CORPORATE VENTURE (CVC) Dashboard

**Banner:** Amber→Orange gradient, "Strategic Innovation Digest"

**KPIs:** Strategic Matches (14) · Partnership Offers (7) · Innovation Score (87%) · Active Pilots (3)

**Charts:**
- Strategic Matches & Partnerships AreaChart (7 months)
- Innovation Focus Areas horizontal BarChart

**Feed:** Strategic opportunities with partnership type badge (Tech Integration / R&D Collab / Distribution) and strategic fit %

---

## PART 4 — FOUNDER DASHBOARDS

---

### ACTIVE STARTUP Dashboard (`/dashboard`)

**Banner:** Violet→Indigo gradient, "Founder Tips"

**KPIs:**
| Card | Value |
|---|---|
| Investor Profile Views | 138 |
| Intro Requests Received | 7 |
| Investors Bookmarked You | 24 |
| Pitch Deck Downloads | 19 |

**Charts:**
- Investor Interest AreaChart (Profile Views + Bookmarks, 7 months)
- Investors by Sector BarChart (horizontal)

**Sections:** Recent Investor Activity feed · Listing Application checklist · Share profile dialog

---

### IDEA STAGE Dashboard (`/dashboard`)

**Banner:** Violet→Fuchsia gradient, Lightbulb icon

**KPIs:**
| Card | Value |
|---|---|
| Mentor Sessions | 3 |
| Co-founder Matches | 8 |
| Upcoming Events | 2 |
| Resources Unlocked | 24 |

**Sections:**
- **Idea Journey Progress Tracker** — 5-step milestone list (Idea Defined ✓ → Problem Validated ✓ → Market Research □ → MVP Plan □ → First Mentor Call □) with "Next" badge on current step
- **Upcoming Events** — 3 events with type badge (Hackathon / Mentorship / Networking) and spots remaining
- **Recommended Mentors** — name, role, expertise, session count, "Book" / "Busy" button

---

## PART 5 — SHARED DASHBOARD FEATURES

---

### Dashboard Layout

**Sidebar header:**
- Capital Connect network logo (SVG, blue gradient)
- "Capital Connect" wordmark
- Subtitle: "Founder Portal" or "Deal Flow Intelligence" (role-aware)
- Role badge(s): Founder (emerald) | Investor type badge (colour per type)

**Navigation items** adapt per investor type (set via `investorTypeDashboardItems` in `investorTypes.ts`).

**Sidebar footer:** Logged-in user avatar, name, company, logout button

**Header:** Search bar · Theme toggle (sun/moon) · Notification bell with badge count · User avatar

---

### Startup Marketplace (`/dashboard/marketplace`)

**Filter controls:** Search bar · Sector pills · Stage dropdown · Grid/List toggle

**Startup card (grid):** Coloured avatar, name, trust badges, tagline, sector/stage/location pills, ARR, growth %, team size, "Request Intro" CTA

**Startup row (list):** Same data, compact horizontal layout with AI match score

---

### AI Matching (`/dashboard/ai-matching`)

- Match score legend: 90–100% Excellent (emerald) · 80–89% Strong (indigo) · 70–79% Good (amber) · <70% Fair (gray)
- Thesis editor panel (toggleable): textarea + stage pills + sector pills
- Match cards with expandable "Why this match?" accordion (5 reasons with strength bars)

---

### Sector Intelligence (`/dashboard/sectors`)

- KPI row: Total Active Deals · Capital Deployed · Fastest Growing · Most Active Investors
- Deal Activity LineChart (6 lines, 7 months)
- Avg Investment Size BarChart
- Sector Breakdown Table with YoY Growth and Trend badges

---

### Warm Introductions (`/dashboard/introductions`)

**Investor view:** Accept/Decline intro requests from founders. Accepted → "Start Chat".

**Founder view:** Accept/Pass on investor intro requests. Accepted → "Schedule Call".

**Each card shows:** Counterparty avatar, name, status badge, sector, raise/check size, connection type badge (Mutual / Shared Advisor / LinkedIn), connector name, quoted message, AI match score, timestamp.

---

### Portfolio Tracker (`/dashboard/portfolio`)

- KPIs: Total Invested · Portfolio Value · MOIC · Active Companies
- Portfolio Value AreaChart (7 months)
- Sector Allocation PieChart
- Holdings table: Company · Sector · Stage · Invested · Current Value · MOIC · IRR · Status

---

### AI Chat (`/dashboard/ask-ai`)

- Role-aware initial message (deal flow intel for investors, listing help for founders)
- Keyword-matched responses
- 3-dot typing indicator (600ms)
- Suggested prompt chips (disappear after first exchange)
- Per-message: Copy / ThumbsUp / ThumbsDown actions
- "Capital Connect AI" branding in chat header

---

### Settings (`/dashboard/settings`)

Sections: Profile · Notifications · Security · Billing · Integrations
(Separate billing plan display for investors vs founders)

---

### Notifications

- Bell icon with unread count badge in header
- `NotificationCenter` popover: Info / Warning / Error / Success types
- Auto-dismiss after 5 seconds · Mark read / remove / clear all

---

### Theme Toggle

- Sun/Moon icon in header
- Toggles `dark` class on `<html>`
- All pages fully dark-mode compatible
- Preference saved to `localStorage`

---

## PART 6 — AUTH CONTEXT & STATE

**File:** `AuthContext.tsx` — persists to `localStorage`

| Key | Type | Description |
|---|---|---|
| `isAuthenticated` | boolean | Set on login/register, cleared on logout |
| `onboardingCompleted` | boolean | Set after wizard completes |
| `user.role` | `"investor" \| "founder"` | Drives all role-aware logic |
| `user.investorType` | `InvestorType \| undefined` | Angel / VC / Bank / NBFC / FamilyOffice / CVC |
| `user.onboardingData.founderType` | `"active" \| "idea"` | Determines which founder dashboard to show |
| `user.firstName` | string | Used in personalised greetings everywhere |

**Route guards:**
- `/dashboard/*` → requires `isAuthenticated` + `onboardingCompleted`
- `/onboarding` → requires `isAuthenticated` only
- If authenticated + onboarding incomplete → redirected to `/onboarding`

**DashboardHome routing logic:**
```
if founder + founderType === "idea"  → IdeaFounderDashboard
if founder + founderType === "active" → FounderDashboard
if investor + investorType === "angel"            → AngelDashboard
if investor + investorType === "venture-capital"  → VCDashboard
if investor + investorType === "bank"             → BankDashboard
if investor + investorType === "nbfc"             → NBFCDashboard
if investor + investorType === "family-office"    → FamilyOfficeDashboard
if investor + investorType === "corporate-venture" → CVCDashboard
default                                           → InvestorDashboard (generic fallback)
```

---

## PART 7 — TRUST BADGE SYSTEM

| Badge | Colour | Earn Criteria | Impact |
|---|---|---|---|
| Verified | Blue | Profile reviewed by Capital Connect | Basic marketplace visibility |
| Revenue Verified | Emerald | ARR/MRR confirmed via docs | +35% investor views, more intro requests |
| Top Startup | Amber | Top 10% match score + high engagement | Featured in AI matching feed |

---

## PART 8 — AI MATCH SCORE SYSTEM

Scores (0–100%) computed per investor–startup pair:
- Sector overlap, stage alignment, check size fit, geography match, portfolio synergy

| Score | Label | Colour |
|---|---|---|
| 90–100% | Excellent | Emerald |
| 80–89% | Strong | Indigo |
| 70–79% | Good | Amber |
| <70% | Fair | Gray |

---

## PART 9 — BRANDING

| Asset | Detail |
|---|---|
| Product name | **Capital Connect** |
| Logo | C-shaped network graph, blue gradient nodes |
| Logo component | `src/app/components/CapitalConnectLogo.tsx` |
| Exports | `CapitalConnectLogo` (icon) · `CapitalConnectLogoFull` (icon + wordmark) |
| Used in | AuthLayout header · DashboardLayout sidebar · OnboardingPage top bar |
| Primary colours | `#56CCF2` → `#2F80ED` (blue gradient gradient) |


---

## PART 1 — SHARED: Pre-Login & Authentication

---

### Step 1 · Landing (`/`)
- User visits the app
- Immediately redirected to `/auth/login`
- No component renders, no state set

---

### Step 2 · Login (`/auth/login`)

**Layout:** AuthLayout — InvestLigence gradient logo, "AI-Powered Deal Flow Intelligence" tagline

**Fields:**
| Field | Validation |
|---|---|
| Email | RFC format `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` |
| Password | Min 8 characters |

**Flow:**
```
Submit
  → Validate fields
      FAIL → show inline errors, stop
      PASS → 800ms loading spinner
               → login(email, password)
                   onboardingCompleted = true  → /dashboard
                   onboardingCompleted = false → /onboarding
```

**Other interactions:**
- Enter key → submit
- "Forgot password" → `/auth/forgot-password`
- "Create account" → `/auth/signup`

---

### Step 3 · Sign Up (`/auth/signup`)

**Fields:**
| Field | Validation |
|---|---|
| First Name | Required |
| Last Name | Required |
| Company / Startup name | Required |
| Email | RFC format |
| Password | Min 8 chars + live 4-bar strength meter |
| Terms checkbox | Must be checked |

**Flow:**
```
Submit
  → Validate all fields
      FAIL → show per-field errors, stop
      PASS → 900ms loading
               → register(user, password)
               → navigate("/onboarding")
```

---

### Step 4 · Forgot Password (`/auth/forgot-password`)
1. User enters email → clicks "Send reset link"
2. 800ms loading state
3. Success screen: MailCheck icon + "Check your inbox" message
4. "Try again" link resets to initial state

### Step 5 · Reset Password (`/auth/reset-password`)
1. User enters new password + confirm password
2. Live match indicator + strength meter
3. On success → `/auth/login`

---

## PART 2 — SHARED: Onboarding Wizard (`/onboarding`)

ProtectedRoute: requires `isAuthenticated`. If already `onboardingCompleted` → `/dashboard`.

---

### Step 0 · Role Selection (BOTH roles)

Full-screen card picker. User must choose one:

| Option | Badge | What it unlocks |
|---|---|---|
| **I'm an Investor** | Indigo | Deal flow, AI matching, marketplace, portfolio |
| **I'm a Founder** | Emerald | Listing application, investor browsing, intro requests |

Selected card highlights with gradient border + checkmark. Cannot proceed without selecting.

---

### INVESTOR Onboarding (7 steps after role selection)

```
Step 0: Role confirm
  └─ Shows "Investor" role badge, brief description of investor portal

Step 1: Personal Profile
  ├─ First name, Last name (required)
  ├─ Title / Role (e.g. "General Partner")
  └─ Firm name

Step 2: Investment Thesis + Stages
  ├─ Thesis textarea (what you invest in, your edge)
  └─ Stage pills (multi-select): Pre-Seed · Seed · Series A · Series B · Series C+

Step 3: Check Size
  ├─ Minimum check size (USD)
  └─ Maximum check size (USD)

Step 4: Focus Sectors
  └─ Multi-select pills: AI/ML · FinTech · HealthTech · SaaS · CleanTech
                         EdTech · AgTech · Deep Tech · Marketplace · Crypto

Step 5: Geography
  └─ Region pills: North America · Europe · South Asia
                   Southeast Asia · Latin America · Global

Step 6: Done
  ├─ Setup summary card
  ├─ "Your deal flow is ready" message
  └─ CTA: "Go to Deal Flow" → completeOnboarding("investor") → /dashboard
```

---

### FOUNDER Onboarding (6 steps after role selection)

```
Step 0: Role confirm
  └─ Shows "Founder" role badge, brief description of founder portal

Step 1: Personal Profile
  ├─ First name, Last name (required)
  └─ LinkedIn profile URL

Step 2: Company Info
  ├─ Company name (required)
  ├─ One-line tagline
  ├─ Sector (dropdown)
  └─ HQ location

Step 3: Traction Metrics
  ├─ ARR or MRR (USD)
  ├─ Month-over-month growth %
  ├─ Number of customers
  └─ Team size

Step 4: Fundraising Details
  ├─ Current stage (Pre-Seed / Seed / Series A / Series B)
  ├─ Amount raising (USD)
  └─ Use of funds (brief text)

Step 5: Done
  ├─ Setup summary card
  ├─ "Your founder profile is ready" message
  └─ CTA: "Go to Founder Portal" → completeOnboarding("founder") → /dashboard
```

---

## PART 3 — INVESTOR FLOW

---

### Dashboard Layout (Investor)

**Sidebar header:**
- InvestLigence logo (indigo→violet gradient)
- Subtitle: "Deal Flow Intelligence"
- Role badges: `Investor` (indigo) + `VIP Access` (amber)

**Navigation:**
| # | Label | Route |
|---|---|---|
| 1 | Deal Flow | `/dashboard` |
| 2 | Startup Marketplace | `/dashboard/marketplace` |
| 3 | AI Matching | `/dashboard/ai-matching` |
| 4 | Sector Intelligence | `/dashboard/sectors` |
| 5 | Warm Introductions | `/dashboard/introductions` |
| 6 | Portfolio | `/dashboard/portfolio` |
| 7 | Investor Profile | `/dashboard/investor-profile` |
| 8 | Ask AI | `/dashboard/ask-ai` |
| 9 | Settings | `/dashboard/settings` |

**Sidebar footer:** Quick stats — "247 startups · 18 AI matches"

---

### I-1 · Investor Home (`/dashboard`)

**AI Weekly Digest Banner** (dismissable, indigo→violet gradient)
- Personalised greeting: "Good morning, [FirstName]!"
- Summary: new matches count, trending startup name + match %, warm intro count, sector activity
- CTA 1: "View AI Matches" → `/dashboard/ai-matching`
- CTA 2: "Review Intros" → `/dashboard/introductions`

**KPI Cards (4):**
| Card | Value | Trend |
|---|---|---|
| New Startups This Week | 12 | +4 vs last week |
| AI Matches For You | 18 | +6 new matches |
| Active Raises | 47 | Currently fundraising |
| Warm Intros Pending | 5 | 2 new requests |

**Deal Flow Trend Chart** (AreaChart, 7 months)
- Two areas: New Startups (indigo) + Funding Closed (emerald)

**Hot Sectors Chart** (BarChart horizontal)
- Deal volume per sector: AI/ML · FinTech · HealthTech · SaaS · CleanTech · EdTech

**AI-Recommended Feed** (5 startups)
- Each row: startup avatar, name, trust badges, sector/stage/views, ARR, growth %, raise amount, AI match score circle
- Trending indicator (orange dot) on hot startups
- Click row → `/dashboard/marketplace`
- "View All" link → `/dashboard/marketplace`

**Recently Funded** (3 companies)
- Company, amount, round type, sector, days since close

**Deal Flow Controls Panel**
- Deal Flow Status / Sectors Watching / Inbox Limit / Stage Preference
- CTA: "Manage Your Thesis & Preferences" → `/dashboard/investor-profile`

---

### I-2 · Startup Marketplace (`/dashboard/marketplace`)

**Browse all approved startups** — investor's primary discovery tool.

**Filter controls:**
- Search bar (name, sector, description)
- Sector pills: All + 7 sectors
- Stage dropdown
- Grid / List view toggle

**Startup card (grid):**
- Colored logo avatar, startup name, trust badges (Verified / Revenue Verified / Top Startup)
- Tagline, sector + stage + location pills
- Traction: ARR, growth %, team size
- CTA: "Request Intro"

**Startup row (list):**
- Same data in compact horizontal layout with match score

**Empty state:** shown when filters return no results

---

### I-3 · AI Matching (`/dashboard/ai-matching`)

**Match Score Legend** (top of page):
- 90–100% = Excellent (emerald circle)
- 80–89% = Strong (indigo circle)
- 70–79% = Good (amber circle)
- <70% = Fair (gray circle)

**Thesis Editor Panel** (toggleable sidebar):
- Investment thesis textarea
- Stage pills (multi-select)
- Sector pills (multi-select)
- "Update Thesis" button → updates match scores locally

**Match Cards** (5 startups):
Each card shows:
1. Startup name, sector, stage, raise amount
2. Trust badges
3. AI match score circle (color-coded by tier)
4. Expandable **"Why this match?"** accordion:
   - 5 individual reasons
   - Each reason has: label, strength (strong/moderate/weak), progress bar
5. "Request Intro" CTA button

---

### I-4 · Sector Intelligence (`/dashboard/sectors`)

**KPI Row (4 cards):**
Total Active Deals · Total Capital Deployed · Fastest Growing Sector · Most Active Investors

**Deal Activity by Sector** (LineChart multi-line, 7 months)
- 6 colored lines, one per sector

**Average Investment Size by Sector** (BarChart)

**Sector Breakdown Table:**
| Column | Description |
|---|---|
| Sector | Name |
| Active Deals | Current count |
| Avg Deal Size | USD |
| Active Investors | Count |
| Total Deployed | USD |
| YoY Growth | % change |
| Trend | Up/Down/Stable badge |

**Most Active Investors** section — top 5 with deal count and portfolio value

---

### I-5 · Warm Introductions — Investor (`/dashboard/introductions`)

**"Why Warm Intros?" banner:**
- Mutual connections have 40–60% response rate vs <3% cold

**Stats (3 cards):** Pending · Accepted · Declined

**Tab filter:** All · Pending · Accepted · Declined

**Intro card (per request):**
- Startup avatar, name, status badge
- Sector, raise, ARR
- Connection badge: Mutual Connection / Shared Advisor / LinkedIn Network
- Connector name + role
- Founder's message (quoted)
- AI match score % + timestamp

**Actions:**
- Pending → **Accept** (indigo gradient) or **Decline** (red outline)
- Accepted → **Start Chat** (emerald)

---

### I-6 · Portfolio Tracker (`/dashboard/portfolio`)

**KPI Row (4 cards):** Total Invested · Portfolio Value · MOIC · Active Companies

**Portfolio Value Over Time** (AreaChart, 7 months, indigo gradient)

**Sector Allocation** (PieChart with legend, custom colors per sector)

**Holdings List:**
| Column | |
|---|---|
| Company | Startup name + avatar |
| Sector | Pill |
| Stage | Round |
| Invested | USD amount |
| Current Value | USD amount |
| MOIC | Multiple |
| IRR | % |
| Status | Active (emerald) / Exited (gray) badge |

"Add Investment" button in header

---

### I-7 · Investor Profile (`/dashboard/investor-profile`)

**Public Profile Section:**
- Avatar, name, title, firm, location, bio, LinkedIn
- Stats: Portfolio companies · Total deployed · Avg check size · Target return

**Investment Thesis Editor:**
- Editable textarea
- Focus sectors (12 pills, multi-select with active highlighting)
- Investment stages (5 pills)
- Check size min/max inputs (USD)
- "Save Thesis" CTA

**Deal Flow Controls:**
| Control | Type | Behaviour |
|---|---|---|
| Deal Flow Status | Toggle | Active = receiving pitches; Paused = no new submissions |
| Monthly Submission Limit | +/- counter | Sets max decks per month |
| Hidden Sectors | Multi-select | Sectors shown in red, permanently filtered out |

**Portfolio Companies List:**
- Active investments with stage, amount, status badge + "View" link

---

## PART 4 — FOUNDER FLOW

---

### Dashboard Layout (Founder)

**Sidebar header:**
- InvestLigence logo (indigo→violet gradient)
- Subtitle: "Founder Portal"
- Role badge: `Founder` (emerald)

**Navigation:**
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

### F-1 · Founder Home (`/dashboard`)

**Founder Tips Banner** (dismissable, violet→indigo gradient)
- Personalised greeting: "Welcome back, [FirstName]!"
- Summary: investor views this month, warm intro count, team bio nudge
- CTA 1: "Complete Profile" → `/dashboard/application`
- CTA 2: "View Intros" → `/dashboard/application`

**KPI Cards (4):**
| Card | Value | Trend |
|---|---|---|
| Investor Profile Views | 138 | +22 this week |
| Intro Requests Received | 7 | +3 new |
| Investors Bookmarked You | 24 | +8 this month |
| Pitch Deck Downloads | 19 | +5 since update |

**Investor Interest Over Time** (AreaChart, 7 months)
- Two areas: Profile Views (violet) + Bookmarks (emerald)

**Investors by Sector** (BarChart horizontal)
- Count of active investors per sector aligned with your startup

**Recent Investor Activity Feed** (4 items)
- Live feed: "Andreessen Horowitz viewed your profile · 2h ago"
- Actions: viewed, downloaded deck, bookmarked, requested intro

**Listing Application Status** (checklist card)
- Company overview ✅
- Traction metrics ✅
- Pitch deck uploaded ✅
- Team bios ⬜ Pending
- Revenue verification ⬜ Pending
- CTA: "Complete Your Application" → `/dashboard/application`

---

### F-2 · My Listing (`/dashboard/my-listing`)

**Header actions:**
- "Edit Listing" → inline tagline editor (Input + Save/Cancel)
- "Update Application" → `/dashboard/application`

**KPI Row (4 cards):**
Profile Views · Bookmarked By · Intro Requests · Deck Downloads

**Public Listing Preview** (how investors see the startup):
- Startup logo avatar, name, trust badge(s)
- Editable tagline
- Traction metrics: ARR / Growth % / Team size
- Stage + Raise amount + Sector + Location pills
- "Pitch deck & team info locked until approval" note

**Trust Badges Panel:**
| Badge | Status | Action |
|---|---|---|
| Verified | ✅ Earned | — |
| Revenue Verified | ⬜ Not earned | "Complete steps" → `/dashboard/application` |
| Top Startup | ⬜ Not earned | "Complete steps" → `/dashboard/application` |

**Views This Week** (custom bar chart, Mon–Sun)

**Right sidebar:**
- Profile completion % progress bar + item checklist
- "Boost Your Visibility" tips (3 numbered tips)
- Recent Activity feed (icon + text + timestamp)
- Pitch Deck upload zone (PDF, max 20MB)

---

### F-3 · My Application (`/dashboard/application`)

**Two views depending on state:**

#### Under-Review View (default)
- Status badge: "Under Review" (amber)
- Review checklist — criteria met/pending
- "What happens after approval" steps
- "Edit Application" link → switches to form view

#### Application Form (5 steps)

```
Step 1: Company Info
  ├─ Company name
  ├─ One-line tagline
  ├─ Sector (dropdown)
  ├─ HQ location
  ├─ Website URL
  ├─ Founded year
  └─ Company description

Step 2: Traction & Metrics
  ├─ ARR (USD)
  ├─ MoM growth %
  ├─ Number of customers
  ├─ Team size
  └─ Product stage (Idea / MVP / Beta / Live / Scaling)

Step 3: Funding Details
  ├─ Current stage (Pre-Seed → Series B)
  ├─ Amount raising (USD)
  ├─ Use of funds (text)
  └─ Previous funding raised (USD, optional)

Step 4: Team & Advisors
  ├─ CEO name + LinkedIn
  ├─ CTO name + LinkedIn
  └─ Notable advisors (name + role)

Step 5: Pitch & Deck
  ├─ Pitch deck upload (PDF, drag-and-drop zone)
  ├─ Demo video URL (optional)
  └─ 3 key differentiators (text inputs)
```

Progress dots shown between steps. "Next" / "Back" navigation.
Final step: **"Submit Application"** CTA.

---

### F-4 · Browse Investors (`/dashboard/browse-investors`)

**Founder's directory of verified investors.**

**Filter controls:**
- Search bar (name, firm, sector)
- Sector pills: All + 8 sectors
- Stage pills: All Stages + 4 stages (Pre-Seed through Series B)

**Investor Card:**
- Colored avatar (initials), name, Verified checkmark, title, firm name, location
- Response rate badge: High (emerald) / Medium (amber) / Low (red)
- "Actively Investing" badge (when active)
- Investment thesis text
- Sector badges (indigo) + Stage badges (violet)
- Check size range + portfolio count
- Recent investments list
- AI match score circle (color-coded)
- **"Request Intro"** button → changes to "✓ Requested" (disabled) after click
- LinkedIn link (when available)

**Empty state:** shown when filters return no results

---

### F-5 · Warm Introductions — Founder (`/dashboard/introductions`)

**"How Warm Intros Work for Founders" banner** (violet gradient)
- Explains connector-based handoff system
- "Accepting takes 30 seconds — the connector handles the warm handoff"

**Stats (3 cards):** Awaiting Reply · Meetings Booked · Passed

**Tab filter:** All · Pending · Accepted · Declined

**Intro card (per investor request):**
- Investor avatar (colored), name, Verified badge, status badge
- Title, firm, check size, focus sectors
- Connection type badge: Mutual Connection / Shared Advisor / LinkedIn Network
- Connector name + context (e.g. "Your advisor & a16z scout")
- Investor's message (quoted)
- AI match score % + timestamp

**Actions:**
- Pending → **Accept Meeting** (violet gradient) or **Pass** (red outline)
- Accepted → **Schedule Call** (emerald)

---

## PART 5 — SHARED FEATURES

---

### Sector Intelligence (`/dashboard/sectors`)

Accessible to both investors and founders.

**KPI Row:** Total Active Deals · Total Capital Deployed · Fastest Growing Sector · Most Active Investors

**Deal Activity by Sector** (LineChart multi-line, 7 months)

**Average Investment Size** (BarChart by sector)

**Sector Breakdown Table** — Sector, Active Deals, Avg Deal, Active Investors, Total Deployed, YoY Growth, Trend badge

> Note: Investors also see the "Most Active Investors" section at the bottom. Founders see it for market research.

---

### AI Chat (`/dashboard/ask-ai`)

- Chat bubbles (user right, AI left) with distinct avatars
- Keyword-matched responses relevant to role (deal flow for investors, listing help for founders)
- 3-dot typing indicator (600ms delay)
- Suggested question chips (disappear after first exchange)
- Per AI message: Copy / ThumbsUp / ThumbsDown (toggleable)
- Enter to send, Shift+Enter for newline
- Auto-scroll to latest message
- "Clear chat" button

---

### Notifications

- Bell icon in header with unread count badge
- Click → `NotificationCenter` popover
- Types: Info · Warning · Error · Success
- Auto-dismiss after 5 seconds
- Mark as read / remove individual / clear all

---

### Theme Toggle

- Sun/Moon icon in header
- Toggles `dark` class on `<html>`
- All pages and components fully dark-mode compatible
- Preference saved to `localStorage`

---

### Settings (`/dashboard/settings`)

Shared by both roles. Sections: Profile · Notifications · Security · Billing · Integrations

---

## PART 6 — AUTH CONTEXT & STATE

**File:** `AuthContext.tsx` — persists to `localStorage`

| Key | Type | Description |
|---|---|---|
| `isAuthenticated` | boolean | Set on login/register, cleared on logout |
| `onboardingCompleted` | boolean | Set after wizard completes |
| `user.role` | `"investor" \| "founder"` | Set during onboarding, drives all role-aware logic |
| `user.firstName` | string | Used in personalised greetings |
| `user.company` | string | Shown in sidebar user info |

**Route guards:**
- `/dashboard/*` → requires `isAuthenticated` + `onboardingCompleted`
- `/onboarding` → requires `isAuthenticated` only
- If authenticated + onboarding incomplete → always redirected to `/onboarding` before dashboard

---

## PART 7 — TRUST BADGE SYSTEM

| Badge | Color | Earn Criteria | Impact |
|---|---|---|---|
| Verified | Blue | Profile reviewed by InvestLigence | Basic marketplace visibility |
| Revenue Verified | Emerald | ARR/MRR confirmed via docs | +35% investor views, unlocks more intro requests |
| Top Startup | Amber | Top 10% match score + high engagement | Featured placement in AI matching feed |

Badges appear on: Marketplace cards · AI Matching cards · Deal Flow feed · Listing preview

---

## PART 8 — AI MATCH SCORE SYSTEM

Scores (0–100%) computed per investor–startup pair based on:
- Sector overlap between investor thesis and startup sector
- Stage alignment (investor stage focus vs startup current stage)
- Check size fit (startup raise vs investor check range)
- Geography match (investor region preference vs startup HQ)
- Portfolio synergy (complementary rather than competing companies)

**Color tiers:**
| Score | Label | Color |
|---|---|---|
| 90–100% | Excellent | Emerald |
| 80–89% | Strong | Indigo |
| 70–79% | Good | Amber |
| <70% | Fair | Gray |

Displayed as colored circle badges throughout: Home feed · Marketplace · AI Matching · Warm Intros · Browse Investors
