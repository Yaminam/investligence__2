/**
 * Investor Type Definitions and Configurations
 * Each investor type has specific onboarding and dashboard behaviors
 */

export type InvestorType = 
  | 'angel'
  | 'venture-capital'
  | 'bank'
  | 'nbfc'
  | 'family-office'
  | 'corporate-venture';

export interface InvestorTypeConfig {
  id: InvestorType;
  label: string;
  description: string;
  icon: string; // icon name from lucide
  color: string; // tailwind color class
  badge: string;
}

export const investorTypeConfigs: Record<InvestorType, InvestorTypeConfig> = {
  angel: {
    id: 'angel',
    label: 'Angel Investor',
    description: 'Individual investing early with personal capital',
    icon: 'Sparkles',
    color: 'indigo',
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  },
  'venture-capital': {
    id: 'venture-capital',
    label: 'Venture Capital (VC)',
    description: 'Professional funds looking for scalable startups',
    icon: 'TrendingUp',
    color: 'violet',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  },
  bank: {
    id: 'bank',
    label: 'Bank',
    description: 'Provide debt funding or venture debt',
    icon: 'Building2',
    color: 'blue',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  nbfc: {
    id: 'nbfc',
    label: 'NBFC',
    description: 'Non-Banking Financial Company - flexible financing',
    icon: 'Banknote',
    color: 'cyan',
    badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  },
  'family-office': {
    id: 'family-office',
    label: 'Family Office',
    description: 'Focus on long-term wealth investments',
    icon: 'Home',
    color: 'emerald',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  'corporate-venture': {
    id: 'corporate-venture',
    label: 'Corporate Venture Capital (CVC)',
    description: 'Corporations investing strategically in startups',
    icon: 'Building',
    color: 'amber',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
};

// Onboarding field config
export interface OnboardingFieldConfig {
  field: string;
  label: string;
  placeholder?: string;
  required: boolean;
  type: 'text' | 'textarea' | 'number' | 'select' | 'multiselect';
  options?: string[];
  half?: boolean; // render side-by-side with next half field
}

// Groups of fields rendered on a single step
export interface OnboardingStepGroup {
  title: string;
  subtitle?: string;
  fields: OnboardingFieldConfig[];
}

// 3 grouped steps per investor type: Profile · Focus · Details
export const investorTypeOnboarding: Record<InvestorType, OnboardingStepGroup[]> = {
  angel: [
    {
      title: 'Your Profile',
      subtitle: 'Shown to founders when you send intro requests.',
      fields: [
        { field: 'firstName', label: 'First Name', required: true, type: 'text', half: true },
        { field: 'lastName', label: 'Last Name', required: true, type: 'text', half: true },
        { field: 'title', label: 'Your Title', placeholder: 'e.g. Angel Investor, Advisor', required: false, type: 'text' },
      ],
    },
    {
      title: 'Investment Focus',
      subtitle: 'Our AI uses this to surface the right deals for you.',
      fields: [
        { field: 'industries', label: 'Industries of Interest', required: true, type: 'multiselect', options: ['AI/ML', 'FinTech', 'HealthTech', 'SaaS', 'CleanTech', 'EdTech', 'AgTech', 'DeepTech'] },
        { field: 'investmentStage', label: 'Investment Stage', required: true, type: 'multiselect', options: ['Pre-seed', 'Seed'] },
        { field: 'geography', label: 'Geographic Focus', required: true, type: 'multiselect', options: ['USA', 'Europe', 'India', 'Southeast Asia', 'Latin America', 'Africa', 'Global'] },
      ],
    },
    {
      title: 'Ticket Size',
      subtitle: 'Deals outside this range won\'t appear in your feed.',
      fields: [
        { field: 'checkMin', label: 'Min Ticket Size', placeholder: 'e.g. $10K', required: true, type: 'text', half: true },
        { field: 'checkMax', label: 'Max Ticket Size', placeholder: 'e.g. $500K', required: true, type: 'text', half: true },
      ],
    },
  ],
  'venture-capital': [
    {
      title: 'Fund Profile',
      subtitle: 'Tell founders and co-investors about your fund.',
      fields: [
        { field: 'firstName', label: 'Your First Name', required: true, type: 'text', half: true },
        { field: 'lastName', label: 'Your Last Name', required: true, type: 'text', half: true },
        { field: 'fundName', label: 'Fund Name', required: true, type: 'text', half: true },
        { field: 'fundSize', label: 'Fund Size (AUM)', placeholder: 'e.g. $50M', required: true, type: 'text', half: true },
      ],
    },
    {
      title: 'Investment Strategy',
      subtitle: 'Our AI matches startups against your thesis.',
      fields: [
        { field: 'sectorFocus', label: 'Sector Focus', required: true, type: 'multiselect', options: ['AI/ML', 'FinTech', 'HealthTech', 'SaaS', 'CleanTech', 'EdTech', 'AgTech', 'DeepTech'] },
        { field: 'investmentStage', label: 'Investment Stages', required: true, type: 'multiselect', options: ['Seed', 'Series A', 'Series B', 'Series C+'] },
        { field: 'investmentThesis', label: 'Investment Thesis', placeholder: 'Your edge, focus, and what makes a great investment for you...', required: true, type: 'textarea' },
      ],
    },
    {
      title: 'Check Size & Portfolio',
      subtitle: 'Helps founders understand your fit before outreach.',
      fields: [
        { field: 'checkMin', label: 'Min Check Size', placeholder: 'e.g. $500K', required: true, type: 'text', half: true },
        { field: 'checkMax', label: 'Max Check Size', placeholder: 'e.g. $5M', required: true, type: 'text', half: true },
        { field: 'portfolioCompanies', label: 'Active Portfolio Companies', placeholder: 'e.g. 24', required: false, type: 'number' },
      ],
    },
  ],
  bank: [
    {
      title: 'Bank Profile',
      subtitle: 'Startups see this when browsing debt financing options.',
      fields: [
        { field: 'firstName', label: 'Your First Name', required: true, type: 'text', half: true },
        { field: 'lastName', label: 'Your Last Name', required: true, type: 'text', half: true },
        { field: 'bankName', label: 'Bank Name', required: true, type: 'text' },
      ],
    },
    {
      title: 'Products & Preferences',
      subtitle: 'Define what types of financing you offer.',
      fields: [
        { field: 'lendingProducts', label: 'Lending Products', required: true, type: 'multiselect', options: ['Startup Loans', 'Venture Debt', 'Working Capital', 'Equipment Financing', 'Revenue-Based Financing'] },
        { field: 'industryPreferences', label: 'Industry Preferences', required: true, type: 'multiselect', options: ['SaaS', 'FinTech', 'HealthTech', 'E-commerce', 'Marketplace', 'DeepTech'] },
      ],
    },
    {
      title: 'Ticket Size & Risk',
      subtitle: 'Set your lending parameters.',
      fields: [
        { field: 'checkMin', label: 'Min Loan Size', placeholder: 'e.g. $50K', required: true, type: 'text', half: true },
        { field: 'checkMax', label: 'Max Loan Size', placeholder: 'e.g. $10M', required: true, type: 'text', half: true },
        { field: 'riskCategory', label: 'Risk Appetite', required: true, type: 'select', options: ['Low Risk', 'Medium Risk', 'High Risk'] },
      ],
    },
  ],
  nbfc: [
    {
      title: 'NBFC Profile',
      subtitle: 'Startups see this when browsing flexible financing.',
      fields: [
        { field: 'firstName', label: 'Your First Name', required: true, type: 'text', half: true },
        { field: 'lastName', label: 'Your Last Name', required: true, type: 'text', half: true },
        { field: 'nbfcName', label: 'NBFC Name', required: true, type: 'text' },
      ],
    },
    {
      title: 'Financing Products',
      subtitle: 'Define your funding types and sector preferences.',
      fields: [
        { field: 'fundingTypes', label: 'Funding Types', required: true, type: 'multiselect', options: ['Debt Financing', 'Revenue-Based Financing', 'Growth Capital', 'Equipment Financing', 'Invoice Discounting'] },
        { field: 'sectorPreferences', label: 'Preferred Sectors', required: true, type: 'multiselect', options: ['SaaS', 'E-commerce', 'FinTech', 'HealthTech', 'Marketplace', 'AgTech'] },
      ],
    },
    {
      title: 'Ticket Size & Risk Tolerance',
      subtitle: 'Set your financing parameters.',
      fields: [
        { field: 'checkMin', label: 'Min Ticket Size', placeholder: 'e.g. $25K', required: true, type: 'text', half: true },
        { field: 'checkMax', label: 'Max Ticket Size', placeholder: 'e.g. $5M', required: true, type: 'text', half: true },
        { field: 'riskTolerance', label: 'Risk Tolerance', required: true, type: 'select', options: ['Conservative', 'Moderate', 'Aggressive'] },
      ],
    },
  ],
  'family-office': [
    {
      title: 'Family Office Profile',
      subtitle: 'Your identity on the platform.',
      fields: [
        { field: 'firstName', label: 'Your First Name', required: true, type: 'text', half: true },
        { field: 'lastName', label: 'Your Last Name', required: true, type: 'text', half: true },
        { field: 'officeFamily', label: 'Family Office Name', placeholder: 'e.g. Blackstone Family Office', required: true, type: 'text' },
      ],
    },
    {
      title: 'Investment Mandate',
      subtitle: 'Define your long-term investment focus.',
      fields: [
        { field: 'investmentSectors', label: 'Sectors of Interest', required: true, type: 'multiselect', options: ['AI/ML', 'FinTech', 'HealthTech', 'CleanTech', 'DeepTech', 'Infrastructure', 'Consumer', 'Real Estate'] },
        { field: 'riskAppetite', label: 'Risk Appetite', required: true, type: 'select', options: ['Conservative', 'Balanced', 'Growth-Oriented', 'Aggressive'] },
        { field: 'coInvestmentInterest', label: 'Co-Investment Interest', required: true, type: 'select', options: ['Very Interested', 'Somewhat Interested', 'Not Interested'] },
      ],
    },
    {
      title: 'Ticket Size & Geography',
      subtitle: 'Set your investment parameters.',
      fields: [
        { field: 'checkMin', label: 'Min Ticket Size', placeholder: 'e.g. $100K', required: true, type: 'text', half: true },
        { field: 'checkMax', label: 'Max Ticket Size', placeholder: 'e.g. $50M', required: true, type: 'text', half: true },
        { field: 'geographicFocus', label: 'Geographic Focus', required: true, type: 'multiselect', options: ['USA', 'Europe', 'India', 'Southeast Asia', 'Global'] },
      ],
    },
  ],
  'corporate-venture': [
    {
      title: 'Corporate Profile',
      subtitle: 'About your parent company and CVC arm.',
      fields: [
        { field: 'firstName', label: 'Your First Name', required: true, type: 'text', half: true },
        { field: 'lastName', label: 'Your Last Name', required: true, type: 'text', half: true },
        { field: 'parentCompany', label: 'Parent Company', placeholder: 'e.g. Microsoft, Sony', required: true, type: 'text', half: true },
        { field: 'cvcName', label: 'CVC Fund Name (optional)', placeholder: 'e.g. M12, Intel Capital', required: false, type: 'text', half: true },
      ],
    },
    {
      title: 'Strategic Focus',
      subtitle: 'Define the sectors and innovations you target.',
      fields: [
        { field: 'strategicSectors', label: 'Strategic Sectors', required: true, type: 'multiselect', options: ['AI/ML', 'SaaS', 'FinTech', 'HealthTech', 'CleanTech', 'LogTech', 'AgTech', 'CyberSec'] },
        { field: 'innovationFocus', label: 'Innovation Focus Areas', required: true, type: 'multiselect', options: ['Technology', 'Business Model', 'Market Access', 'Talent', 'Supply Chain', 'Distribution'] },
      ],
    },
    {
      title: 'Partnerships & Stages',
      subtitle: 'How you want to collaborate with portfolio startups.',
      fields: [
        { field: 'partnershipInterest', label: 'Partnership Types', required: true, type: 'multiselect', options: ['Technology Integration', 'Supply Chain', 'Distribution', 'Customer Base', 'Talent Acquisition', 'R&D'] },
        { field: 'investmentStage', label: 'Investment Stages', required: true, type: 'multiselect', options: ['Seed', 'Series A', 'Series B', 'Series C+'] },
      ],
    },
  ],
};

// Dashboard menu items for each investor type
export const investorTypeDashboardItems: Record<InvestorType, Array<{ label: string; route: string; icon: string }>> = {
  angel: [
    { label: 'Deal Flow', route: '/dashboard', icon: 'Sparkles' },
    { label: 'AI Matches', route: '/dashboard/ai-matching', icon: 'Zap' },
    { label: 'Startup Marketplace', route: '/dashboard/marketplace', icon: 'TrendingUp' },
    { label: 'Founder Intros', route: '/dashboard/introductions', icon: 'Users' },
    { label: 'My Portfolio', route: '/dashboard/portfolio', icon: 'BriefcaseBusiness' },
    { label: 'Sector Intelligence', route: '/dashboard/sectors', icon: 'BarChart3' },
    { label: 'Ask AI', route: '/dashboard/ask-ai', icon: 'Bot' },
    { label: 'Settings', route: '/dashboard/settings', icon: 'Settings' },
  ],
  'venture-capital': [
    { label: 'Deal Flow', route: '/dashboard', icon: 'Home' },
    { label: 'Startup Marketplace', route: '/dashboard/marketplace', icon: 'Zap' },
    { label: 'AI Matching', route: '/dashboard/ai-matching', icon: 'Sparkles' },
    { label: 'Sector Intelligence', route: '/dashboard/sectors', icon: 'BarChart3' },
    { label: 'Warm Introductions', route: '/dashboard/introductions', icon: 'GitMerge' },
    { label: 'Portfolio', route: '/dashboard/portfolio', icon: 'BriefcaseBusiness' },
    { label: 'Investor Profile', route: '/dashboard/investor-profile', icon: 'Users' },
    { label: 'Ask AI', route: '/dashboard/ask-ai', icon: 'Bot' },
    { label: 'Settings', route: '/dashboard/settings', icon: 'Settings' },
  ],
  'bank': [
    { label: 'Deal Flow', route: '/dashboard', icon: 'Home' },
    { label: 'Startup Marketplace', route: '/dashboard/marketplace', icon: 'Zap' },
    { label: 'Sector Intelligence', route: '/dashboard/sectors', icon: 'BarChart3' },
    { label: 'AI Matching', route: '/dashboard/ai-matching', icon: 'Sparkles' },
    { label: 'Warm Introductions', route: '/dashboard/introductions', icon: 'GitMerge' },
    { label: 'Portfolio', route: '/dashboard/portfolio', icon: 'BriefcaseBusiness' },
    { label: 'Ask AI', route: '/dashboard/ask-ai', icon: 'Bot' },
    { label: 'Settings', route: '/dashboard/settings', icon: 'Settings' },
  ],
  'nbfc': [
    { label: 'Deal Flow', route: '/dashboard', icon: 'Home' },
    { label: 'Startup Marketplace', route: '/dashboard/marketplace', icon: 'Zap' },
    { label: 'AI Matching', route: '/dashboard/ai-matching', icon: 'Sparkles' },
    { label: 'Sector Intelligence', route: '/dashboard/sectors', icon: 'BarChart3' },
    { label: 'Warm Introductions', route: '/dashboard/introductions', icon: 'GitMerge' },
    { label: 'Portfolio', route: '/dashboard/portfolio', icon: 'BriefcaseBusiness' },
    { label: 'Ask AI', route: '/dashboard/ask-ai', icon: 'Bot' },
    { label: 'Settings', route: '/dashboard/settings', icon: 'Settings' },
  ],
  'family-office': [
    { label: 'Deal Flow', route: '/dashboard', icon: 'Home' },
    { label: 'Startup Marketplace', route: '/dashboard/marketplace', icon: 'Zap' },
    { label: 'AI Matching', route: '/dashboard/ai-matching', icon: 'Sparkles' },
    { label: 'Sector Intelligence', route: '/dashboard/sectors', icon: 'BarChart3' },
    { label: 'Co-invest Opportunities', route: '/dashboard/introductions', icon: 'Users' },
    { label: 'Portfolio Performance', route: '/dashboard/portfolio', icon: 'BriefcaseBusiness' },
    { label: 'Ask AI', route: '/dashboard/ask-ai', icon: 'Bot' },
    { label: 'Settings', route: '/dashboard/settings', icon: 'Settings' },
  ],
  'corporate-venture': [
    { label: 'Deal Flow', route: '/dashboard', icon: 'Home' },
    { label: 'Strategic Startups', route: '/dashboard/marketplace', icon: 'Target' },
    { label: 'Innovation Matching', route: '/dashboard/ai-matching', icon: 'Sparkles' },
    { label: 'Industry Trends', route: '/dashboard/sectors', icon: 'TrendingUp' },
    { label: 'Partnership Intros', route: '/dashboard/introductions', icon: 'GitMerge' },
    { label: 'CVC Portfolio', route: '/dashboard/portfolio', icon: 'BriefcaseBusiness' },
    { label: 'Ask AI', route: '/dashboard/ask-ai', icon: 'Bot' },
    { label: 'Settings', route: '/dashboard/settings', icon: 'Settings' },
  ],
};
