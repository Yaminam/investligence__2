# Investor Types Implementation - Documentation

## Overview

The InvestLigence platform now supports 6 distinct investor types with type-specific onboarding flows and customized dashboard navigation.

## Investor Types

### 1. **Angel Investor**
- Individual investing early with personal capital
- **Onboarding Flow:** Industries, Investment Stage (Pre-seed/Seed), Ticket Size, Geography, Deal Alerts
- **Dashboard Features:** Recommended Early-Stage Startups, New Deals, Founder Intro Requests, Trending Startups

### 2. **Venture Capital (VC)**
- Professional funds looking for scalable startups
- **Onboarding Flow:** Fund Info, Fund Size, Investment Stage, Sector Focus, Investment Thesis, Portfolio Companies
- **Dashboard Features:** Deal Pipeline, Startup Analytics, Market Trends, Portfolio Tracking, Founder Introductions

### 3. **Bank**
- Provide debt funding or venture debt
- **Onboarding Flow:** Bank Name, Lending Products, Ticket Size, Risk Category, Industry Preferences
- **Dashboard Features:** Loan Requests, Debt Opportunities, Credit Risk Scoring, Financial Metrics, Application Pipeline

### 4. **NBFC (Non-Banking Financial Companies)**
- Flexible financing options to startups
- **Onboarding Flow:** NBFC Name, Funding Types, Ticket Size, Sector Preferences, Risk Tolerance
- **Dashboard Features:** Funding Requests, Startups Seeking Capital, Financial Health Reports, Repayment Analytics

### 5. **Family Office**
- Long-term wealth investments
- **Onboarding Flow:** Investment Sectors, Ticket Size, Risk Appetite, Geographic Focus, Co-Investment Interest
- **Dashboard Features:** Curated Startups, Long-Term Growth Companies, Co-Investment Opportunities, Investment Performance

### 6. **Corporate Venture Capital (CVC)**
- Strategic investing in startups
- **Onboarding Flow:** Parent Company, Strategic Sectors, Innovation Focus, Partnership Interest, Investment Stage
- **Dashboard Features:** Strategic Startups, Innovation Trends, Industry Disruption, Partnership Opportunities

## Technical Implementation

### Files Modified/Created

1. **[src/app/lib/investorTypes.ts](src/app/lib/investorTypes.ts)** *(NEW)*
   - Defines `InvestorType` type
   - Configurations for each investor type
   - Onboarding field specifications
   - Dashboard navigation items per type

2. **[src/app/context/AuthContext.tsx](src/app/context/AuthContext.tsx)** *(UPDATED)*
   - Extended `AuthUser` interface with `investorType` field
   - Added `onboardingData` storage for investor-specific responses
   - Updated `completeOnboarding` to accept investor type and onboarding data

3. **[src/app/pages/onboarding/OnboardingPage.tsx](src/app/pages/onboarding/OnboardingPage.tsx)** *(REFACTORED)*
   - Added investor type selection screen (Step 1)
   - Dynamic field rendering based on selected investor type
   - Configurable onboarding flows per investor type
   - Type-specific form validation

4. **[src/app/layouts/DashboardLayout.tsx](src/app/layouts/DashboardLayout.tsx)** *(UPDATED)*
   - Dynamic navigation based on investor type
   - Type badges showing investor classification
   - Icon mapping for investor-specific menu items

## Data Flow

```
Onboarding (Step 0: Role Selection)
    ↓
Onboarding (Step 1: Investor Type Selection)
    ↓
Onboarding (Steps 2+: Type-Specific Fields)
    ↓
completeOnboarding(role, investorType, formData)
    ↓
AuthContext stores: role, investorType, onboardingData
    ↓
DashboardLayout reads investorType → Shows type-specific navigation
    ↓
Dashboard displays type-customized features
```

## Usage

### For Existing Investors
- Show default "Investor" navigation (backward compatible)
- Display "VIP Access" badge

### For New Investors
- Present investor type selection
- Show type-specific onboarding form
- Store investor type in AuthContext
- Dashboard automatically adjusts navigation

### In DashboardLayout
The component now:
1. Checks if user has an `investorType`
2. If yes, uses `investorTypeDashboardItems[investorType]`
3. If no, falls back to default `investorNavigation`
4. Updates badge to show investor type or "VIP Access"

## Future Enhancements

1. **Type-Specific Dashboards**: Create dedicated dashboard pages for each investor type
2. **Deal Filtering**: Customize deal matching algorithms per investor type
3. **Analytics**: Type-specific metrics and KPIs
4. **Integrations**: Type-specific third-party integrations (e.g., fund reporting for VCs)
5. **Admin Panel**: Manage investor types and customize fields

## Testing Checklist

- [ ] Test Angel Investor onboarding end-to-end
- [ ] Test VC onboarding with fund details
- [ ] Test Bank onboarding with lending products
- [ ] Test NBFC onboarding with financing options
- [ ] Test Family Office onboarding
- [ ] Test CVC onboarding with parent company
- [ ] Verify dashboard navigation switches per type
- [ ] Verify investor type badge displays correctly
- [ ] Test backward compatibility with existing investors
- [ ] Test localStorage persistence of investor type
