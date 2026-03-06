# Investor Types — Onboarding & Dashboard Comparison

## Overview

InvestLigence supports **6 investor types**, each with a tailored onboarding flow and customized dashboard experience. All types share the same 5-step structure (Investor Type → Profile → Focus → Details → Ready!), but the fields and dashboard content differ per type.

---

## 1. Angel Investor

### Onboarding (3 Steps)

| Step | Title | Fields Collected |
|------|-------|-----------------|
| **Profile** | Your Profile | First Name, Last Name, Title (e.g. "Angel Investor, Advisor") |
| **Focus** | Investment Focus | Industries (multiselect), Investment Stage (Pre-seed / Seed), Geographic Focus |
| **Details** | Ticket Size | Min Ticket Size, Max Ticket Size |

**Key differentiator:** Lightest onboarding — no fund name, no AUM. Stage locked to early (Pre-seed, Seed only).

### Dashboard
- **Sidebar Badge:** `Angel Investor` (indigo)
- **Banner:** "Here's your angel deal flow summary"
- **Navigation:**
  - Deal Flow
  - AI Matches
  - Startup Marketplace
  - Founder Intros
  - My Portfolio
  - Sector Intelligence
  - Ask AI
  - Settings

---

## 2. Venture Capital (VC)

### Onboarding (3 Steps)

| Step | Title | Fields Collected |
|------|-------|-----------------|
| **Profile** | Fund Profile | First Name, Last Name, Fund Name, Fund Size (AUM) |
| **Focus** | Investment Strategy | Sector Focus (multiselect), Investment Stages (Seed → Series C+), Investment Thesis (textarea) |
| **Details** | Check Size & Portfolio | Min Check Size, Max Check Size, Active Portfolio Companies |

**Key differentiator:** Only type with an open **Investment Thesis** textarea and **AUM / portfolio size** fields.

### Dashboard
- **Sidebar Badge:** `Venture Capital (VC)` (violet)
- **Banner:** "Here's your VC pipeline summary"
- **Navigation:**
  - Deal Flow
  - Startup Marketplace
  - AI Matching
  - Sector Intelligence
  - Warm Introductions
  - Portfolio
  - Investor Profile
  - Ask AI
  - Settings

---

## 3. Bank

### Onboarding (3 Steps)

| Step | Title | Fields Collected |
|------|-------|-----------------|
| **Profile** | Bank Profile | First Name, Last Name, Bank Name |
| **Focus** | Products & Preferences | Lending Products (Startup Loans, Venture Debt, Working Capital, etc.), Industry Preferences |
| **Details** | Ticket Size & Risk | Min Loan Size, Max Loan Size, Risk Appetite (Low / Medium / High) |

**Key differentiator:** Lending-oriented language throughout. Collects **Lending Products** instead of investment sectors. Has a **Risk Appetite** selector.

### Dashboard
- **Sidebar Badge:** `Bank` (blue)
- **Banner:** "Here's your lending opportunities summary" — mentions startups seeking debt financing and pending credit assessments
- **Navigation:**
  - Deal Flow
  - Startup Marketplace
  - Sector Intelligence
  - AI Matching
  - Warm Introductions
  - Portfolio
  - Ask AI
  - Settings

---

## 4. NBFC (Non-Banking Financial Company)

### Onboarding (3 Steps)

| Step | Title | Fields Collected |
|------|-------|-----------------|
| **Profile** | NBFC Profile | First Name, Last Name, NBFC Name |
| **Focus** | Financing Products | Funding Types (Revenue-Based, Growth Capital, Invoice Discounting, etc.), Preferred Sectors |
| **Details** | Ticket Size & Risk Tolerance | Min Ticket Size, Max Ticket Size, Risk Tolerance (Conservative / Moderate / Aggressive) |

**Key differentiator:** Similar to Bank but **Funding Types** include flexible instruments (Revenue-Based Financing, Invoice Discounting). Risk field uses **Tolerance** scale vs Bank's **Appetite** level.

### Dashboard
- **Sidebar Badge:** `NBFC` (cyan)
- **Banner:** "Here's your NBFC funding requests summary"
- **Navigation:**
  - Deal Flow
  - Startup Marketplace
  - AI Matching
  - Sector Intelligence
  - Warm Introductions
  - Portfolio
  - Ask AI
  - Settings

---

## 5. Family Office

### Onboarding (3 Steps)

| Step | Title | Fields Collected |
|------|-------|-----------------|
| **Profile** | Family Office Profile | First Name, Last Name, Family Office Name |
| **Focus** | Investment Mandate | Sectors of Interest (includes Infrastructure, Consumer, Real Estate), Risk Appetite (Conservative → Aggressive), Co-Investment Interest |
| **Details** | Ticket Size & Geography | Min Ticket Size, Max Ticket Size, Geographic Focus |

**Key differentiator:** Only type with a **Co-Investment Interest** field. Broadest sector list (includes Real Estate, Infrastructure). Ticket sizes typically largest range.

### Dashboard
- **Sidebar Badge:** `Family Office` (emerald)
- **Banner:** Standard deal flow digest
- **Navigation:**
  - Deal Flow
  - Startup Marketplace
  - AI Matching
  - Sector Intelligence
  - Co-invest Opportunities (maps to `/dashboard/introductions`)
  - Portfolio Performance
  - Ask AI
  - Settings

---

## 6. Corporate Venture Capital (CVC)

### Onboarding (3 Steps)

| Step | Title | Fields Collected |
|------|-------|-----------------|
| **Profile** | Corporate Profile | First Name, Last Name, Parent Company (e.g. Microsoft), CVC Fund Name (optional, e.g. M12) |
| **Focus** | Strategic Focus | Strategic Sectors (multiselect), Innovation Focus Areas (Technology, Business Model, Market Access, etc.) |
| **Details** | Partnerships & Stages | Partnership Types (Tech Integration, Distribution, R&D, etc.), Investment Stages |

**Key differentiator:** Two unique fields — **Parent Company** (mandatory) and **CVC Fund Name** (optional). Has **Innovation Focus Areas** and **Partnership Types** not available to any other type.

### Dashboard
- **Sidebar Badge:** `Corporate Venture Capital (CVC)` (amber)
- **Banner:** "Here's your strategic innovation summary" — highlights startups open to corporate partnerships and strategic fit score
- **Navigation:**
  - Deal Flow
  - Strategic Startups (maps to `/dashboard/marketplace`)
  - Innovation Matching (maps to `/dashboard/ai-matching`)
  - Industry Trends (maps to `/dashboard/sectors`)
  - Partnership Intros (maps to `/dashboard/introductions`)
  - CVC Portfolio
  - Ask AI
  - Settings

---

## Side-by-Side Summary

| Feature | Angel | VC | Bank | NBFC | Family Office | CVC |
|---------|-------|----|------|------|---------------|-----|
| **Badge Color** | Indigo | Violet | Blue | Cyan | Emerald | Amber |
| **Fund/Org Name Field** | — | Fund Name + AUM | Bank Name | NBFC Name | FO Name | Parent Company + CVC Name |
| **Investment Stage Options** | Pre-seed, Seed | Seed → Series C+ | — | — | All stages | Seed → Series C+ |
| **Thesis / Strategy Field** | — | ✅ Textarea | — | — | — | — |
| **Risk Field** | — | — | Risk Appetite | Risk Tolerance | Risk Appetite | — |
| **Lending Products** | — | — | ✅ | ✅ | — | — |
| **Co-investment Field** | — | — | — | — | ✅ | — |
| **Partnership Types** | — | — | — | — | — | ✅ |
| **Innovation Focus** | — | — | — | — | — | ✅ |
| **Geography Field** | ✅ | — | — | — | ✅ | — |
| **Portfolio Count** | — | ✅ | — | — | — | — |
| **Unique Nav Label** | Founder Intros | Investor Profile | — | — | Co-invest Opportunities | Strategic Startups, Partnership Intros |
| **Dashboard Banner Tone** | Angel deal flow | VC pipeline | Lending/debt | NBFC funding | Standard | Strategic/innovation |

---

## Onboarding Flow (Common for All Types)

```
Step 0 → Role Selection (Investor or Founder)
Step 1 → Investor Type Selection (6 cards)
Step 2 → Group 1: Profile  
Step 3 → Group 2: Focus / Strategy / Products  
Step 4 → Group 3: Ticket Size / Details  
Step 5 → Ready! (completion screen)
```

Progress bar shows: `Investor Type → Profile → Focus → Details → Ready!`
