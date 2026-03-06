/**
 * Type-specific dashboards for each InvestorType and IdeaFounder.
 * DashboardHome routes to the correct component.
 */

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  ArrowUp, TrendingUp, Sparkles, Target, GitMerge, Eye,
  DollarSign, Users, ChevronRight, Zap, X, CheckCircle,
  BriefcaseBusiness, BarChart3, Lightbulb, Star, BookOpen,
  Building2, AlertTriangle, Banknote, Home, Calendar,
  ShieldCheck, Clock, Rocket,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function KPICard({ name, value, change, icon: Icon, color, bgColor, borderColor }: {
  name: string; value: string; change: string;
  icon: React.ElementType; color: string; bgColor: string; borderColor: string;
}) {
  return (
    <Card className={`border shadow-sm ${borderColor}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{name}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUp className="h-3 w-3 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">{change}</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Banner({ gradient, icon: Icon, date, greeting, body, action1, action2 }: {
  gradient: string; icon: React.ElementType; date: string; greeting: string; body: React.ReactNode;
  action1: { label: string; href: string }; action2: { label: string; href: string };
}) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  if (!visible) return null;
  return (
    <div className={`relative overflow-hidden rounded-2xl ${gradient} p-6 text-white shadow-xl`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-10 w-32 h-32 bg-white rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-20 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>
      <button onClick={() => setVisible(false)} className="absolute top-4 right-4 text-white/70 hover:text-white">
        <X className="h-5 w-5" />
      </button>
      <div className="flex items-start gap-4 relative">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-sm font-medium text-white/70 mb-1">{date}</div>
          <h2 className="text-xl font-bold mb-2">{greeting}</h2>
          <p className="text-white/80 text-sm max-w-2xl">{body}</p>
          <div className="flex gap-3 mt-4">
            <Button size="sm" className="bg-white text-gray-800 hover:bg-white/90 font-semibold" onClick={() => navigate(action1.href)}>
              {action1.label}
            </Button>
            <Button size="sm" variant="ghost" className="text-white border border-white/30 hover:bg-white/10" onClick={() => navigate(action2.href)}>
              {action2.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function useChartColors() {
  const { theme } = useTheme();
  return {
    grid: theme === "dark" ? "#334155" : "#e5e7eb",
    axis: theme === "dark" ? "#94a3b8" : "#6b7280",
    tooltip: { backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" },
  };
}

// ─── 1. ANGEL INVESTOR ────────────────────────────────────────────────────────

const angelKpis = [
  { name: "New Matches", value: "18", change: "+6 this week", icon: Sparkles, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
  { name: "Portfolio Companies", value: "7", change: "+1 new close", icon: BriefcaseBusiness, color: "text-violet-600", bgColor: "bg-violet-50 dark:bg-violet-900/20", borderColor: "border-violet-200 dark:border-violet-800" },
  { name: "Avg Check Size", value: "$75K", change: "Within your range", icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "border-emerald-200 dark:border-emerald-800" },
  { name: "Intros Sent", value: "12", change: "+3 this month", icon: GitMerge, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", borderColor: "border-amber-200 dark:border-amber-800" },
];

const angelDealStages = [
  { stage: "Pre-Seed", count: 28 }, { stage: "Seed", count: 42 }, { stage: "Series A", count: 15 },
];

const angelSectors = [
  { sector: "AI/ML", deals: 18, fill: "#6366f1" }, { sector: "FinTech", deals: 14, fill: "#8b5cf6" },
  { sector: "HealthTech", deals: 10, fill: "#10b981" }, { sector: "SaaS", deals: 8, fill: "#f59e0b" },
  { sector: "EdTech", deals: 5, fill: "#ec4899" },
];

const angelStartups = [
  { name: "NeuralScale AI", sector: "AI/ML", stage: "Seed", arr: "$480K", growth: "+340%", raise: "$1.5M", match: 94 },
  { name: "HealthBridge", sector: "HealthTech", stage: "Pre-Seed", arr: "$120K", growth: "+210%", raise: "$800K", match: 88 },
  { name: "FinFlow Pro", sector: "FinTech", stage: "Seed", arr: "$250K", growth: "+180%", raise: "$1.2M", match: 82 },
];

export function AngelDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const c = useChartColors();
  return (
    <div className="space-y-8">
      <Banner
        gradient="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600"
        icon={Sparkles}
        date="AI Weekly Digest — March 5, 2026"
        greeting={`Good morning, ${user?.firstName || "Angel"}! Here's your early-stage deal flow.`}
        body={<><strong>18 new startups</strong> match your angel thesis in AI/ML and FinTech. <strong>NeuralScale AI</strong> is trending — Seed round, $480K ARR, +340% growth. <strong>3 warm intros</strong> are waiting for your response.</>}
        action1={{ label: "View AI Matches", href: "/dashboard/ai-matching" }}
        action2={{ label: "Review Intros", href: "/dashboard/introductions" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {angelKpis.map((k) => <KPICard key={k.name} {...k} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Deal Flow by Stage</CardTitle>
              <Badge variant="secondary" className="text-xs bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">This month</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={angelDealStages}>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="stage" stroke={c.axis} tick={{ fontSize: 12 }} />
                <YAxis stroke={c.axis} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={c.tooltip} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Deals by Sector</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={angelSectors} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke={c.axis} tick={{ fontSize: 11 }} />
                <YAxis dataKey="sector" type="category" stroke={c.axis} tick={{ fontSize: 11 }} width={65} />
                <Tooltip contentStyle={c.tooltip} />
                <Bar dataKey="deals" radius={[0, 4, 4, 0]}>
                  {angelSectors.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Top Seed & Pre-Seed Matches</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600 text-xs" onClick={() => navigate("/dashboard/marketplace")}>
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {angelStartups.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer" onClick={() => navigate("/dashboard/marketplace")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">{s.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{s.name}</div>
                <div className="text-xs text-gray-500">{s.sector} · {s.stage} · Raising {s.raise}</div>
              </div>
              <div className="hidden md:flex gap-6 text-center text-xs">
                <div><div className="font-bold text-gray-900 dark:text-white">{s.arr}</div><div className="text-gray-400">ARR</div></div>
                <div><div className="font-bold text-emerald-600">{s.growth}</div><div className="text-gray-400">Growth</div></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">{s.match}%</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── 2. VENTURE CAPITAL ───────────────────────────────────────────────────────

const vcKpis = [
  { name: "Deal Pipeline", value: "24", change: "+5 this week", icon: TrendingUp, color: "text-violet-600", bgColor: "bg-violet-50 dark:bg-violet-900/20", borderColor: "border-violet-200 dark:border-violet-800" },
  { name: "Portfolio Companies", value: "18", change: "+2 new closes", icon: BriefcaseBusiness, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
  { name: "Fund Deployed", value: "$28M", change: "56% of $50M AUM", icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "border-emerald-200 dark:border-emerald-800" },
  { name: "DD Queue", value: "5", change: "2 urgent", icon: Target, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", borderColor: "border-amber-200 dark:border-amber-800" },
];

const vcFunnelData = [
  { month: "Sep", sourced: 22, dd: 8, closed: 2 }, { month: "Oct", sourced: 28, dd: 10, closed: 3 },
  { month: "Nov", sourced: 35, dd: 12, closed: 4 }, { month: "Dec", sourced: 30, dd: 9, closed: 3 },
  { month: "Jan", sourced: 42, dd: 15, closed: 5 }, { month: "Feb", sourced: 48, dd: 17, closed: 6 },
  { month: "Mar", sourced: 51, dd: 19, closed: 7 },
];

const vcAllocation = [
  { name: "AI/ML", value: 35, fill: "#6366f1" }, { name: "SaaS", value: 25, fill: "#8b5cf6" },
  { name: "FinTech", value: 20, fill: "#10b981" }, { name: "HealthTech", value: 12, fill: "#f59e0b" },
  { name: "Other", value: 8, fill: "#94a3b8" },
];

const vcPipeline = [
  { name: "NeuralScale AI", sector: "AI/ML", stage: "Series A", arr: "$2.4M", raise: "$8M", match: 94, status: "Due Diligence" },
  { name: "GreenGrid", sector: "CleanTech", stage: "Series A", arr: "$3.1M", raise: "$12M", match: 87, status: "Term Sheet" },
  { name: "PayStream", sector: "FinTech", stage: "Seed", arr: "$620K", raise: "$3M", match: 81, status: "First Call" },
];

export function VCDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const c = useChartColors();
  return (
    <div className="space-y-8">
      <Banner
        gradient="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600"
        icon={TrendingUp}
        date="VC Pipeline Briefing — March 5, 2026"
        greeting={`Good morning, ${user?.firstName || "Partner"}! Here's your fund pipeline summary.`}
        body={<><strong>24 opportunities</strong> in your active pipeline. <strong>NeuralScale AI</strong> is in due diligence — 94% thesis match. <strong>5 decisions</strong> pending this week. Fund deployment is at <strong>56%</strong> — on track.</>}
        action1={{ label: "View Pipeline", href: "/dashboard/marketplace" }}
        action2={{ label: "DD Queue", href: "/dashboard/ai-matching" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {vcKpis.map((k) => <KPICard key={k.name} {...k} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Deal Funnel</CardTitle>
              <Badge variant="secondary" className="text-xs bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">7 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={vcFunnelData}>
                <defs>
                  <linearGradient id="vcSourced" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} /><stop offset="95%" stopColor="#7c3aed" stopOpacity={0} /></linearGradient>
                  <linearGradient id="vcDD" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="month" stroke={c.axis} tick={{ fontSize: 12 }} />
                <YAxis stroke={c.axis} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={c.tooltip} />
                <Area type="monotone" dataKey="sourced" stroke="#7c3aed" fill="url(#vcSourced)" strokeWidth={2} name="Sourced" />
                <Area type="monotone" dataKey="dd" stroke="#10b981" fill="url(#vcDD)" strokeWidth={2} name="In DD" />
                <Area type="monotone" dataKey="closed" stroke="#f59e0b" strokeWidth={2} fill="none" name="Closed" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-2 justify-center text-xs text-gray-500">
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-violet-600" />Sourced</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500" />In DD</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500" />Closed</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Portfolio Allocation</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={vcAllocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {vcAllocation.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip contentStyle={c.tooltip} formatter={(v: any) => [`${v}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {vcAllocation.map((e) => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.fill }} />{e.name}</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{e.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Active Pipeline</CardTitle>
            <Button variant="ghost" size="sm" className="text-violet-600 text-xs" onClick={() => navigate("/dashboard/marketplace")}>See All <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {vcPipeline.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors cursor-pointer" onClick={() => navigate("/dashboard/marketplace")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{s.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{s.name}</div>
                <div className="text-xs text-gray-500">{s.sector} · {s.stage} · Raising {s.raise}</div>
              </div>
              <Badge className={`text-xs shrink-0 ${s.status === "Due Diligence" ? "bg-amber-100 text-amber-700" : s.status === "Term Sheet" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{s.status}</Badge>
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 flex items-center justify-center font-bold text-xs shrink-0">{s.match}%</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── 3. BANK ─────────────────────────────────────────────────────────────────

const bankKpis = [
  { name: "Loan Applications", value: "34", change: "+8 this week", icon: Building2, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20", borderColor: "border-blue-200 dark:border-blue-800" },
  { name: "Under Review", value: "8", change: "3 due today", icon: ShieldCheck, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
  { name: "Approved This Month", value: "6", change: "$14.4M disbursed", icon: CheckCircle, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "border-emerald-200 dark:border-emerald-800" },
  { name: "Avg Loan Size", value: "$2.4M", change: "+12% vs last mo.", icon: DollarSign, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", borderColor: "border-amber-200 dark:border-amber-800" },
];

const bankApplicationsTrend = [
  { month: "Sep", apps: 14, approved: 4 }, { month: "Oct", apps: 18, approved: 5 },
  { month: "Nov", apps: 24, approved: 7 }, { month: "Dec", apps: 20, approved: 6 },
  { month: "Jan", apps: 28, approved: 8 }, { month: "Feb", apps: 31, approved: 10 },
  { month: "Mar", apps: 34, approved: 6 },
];

const bankSectors = [
  { sector: "SaaS", apps: 12, fill: "#3b82f6" }, { sector: "FinTech", apps: 9, fill: "#6366f1" },
  { sector: "HealthTech", apps: 7, fill: "#10b981" }, { sector: "E-commerce", apps: 4, fill: "#f59e0b" },
  { sector: "Deep Tech", apps: 2, fill: "#8b5cf6" },
];

const bankOpportunities = [
  { name: "NeuralScale AI", sector: "AI/ML", revenue: "$2.4M ARR", loan: "$5M", runway: "18mo", credit: "A+" },
  { name: "GreenGrid", sector: "CleanTech", revenue: "$3.1M ARR", loan: "$8M", runway: "24mo", credit: "A" },
  { name: "FinFlow Pro", sector: "FinTech", revenue: "$620K ARR", loan: "$1.5M", runway: "14mo", credit: "B+" },
];

export function BankDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const c = useChartColors();
  return (
    <div className="space-y-8">
      <Banner
        gradient="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"
        icon={Building2}
        date="Lending Opportunities — March 5, 2026"
        greeting={`Good morning, ${user?.firstName || "Banker"}! Here's your lending pipeline.`}
        body={<><strong>34 loan applications</strong> match your lending criteria. <strong>NeuralScale AI</strong> is seeking $5M venture debt — A+ credit profile. <strong>3 credit assessments</strong> are due for your review today. Loan volume is up <strong>+22%</strong> this month.</>}
        action1={{ label: "Review Applications", href: "/dashboard/marketplace" }}
        action2={{ label: "Credit Assessments", href: "/dashboard/ai-matching" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {bankKpis.map((k) => <KPICard key={k.name} {...k} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Application Volume Trend</CardTitle>
              <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">7 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={bankApplicationsTrend}>
                <defs>
                  <linearGradient id="bankApps" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  <linearGradient id="bankApproved" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="month" stroke={c.axis} tick={{ fontSize: 12 }} />
                <YAxis stroke={c.axis} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={c.tooltip} />
                <Area type="monotone" dataKey="apps" stroke="#3b82f6" fill="url(#bankApps)" strokeWidth={2} name="Applications" />
                <Area type="monotone" dataKey="approved" stroke="#10b981" fill="url(#bankApproved)" strokeWidth={2} name="Approved" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-2 justify-center text-xs text-gray-500">
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500" />Applications</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500" />Approved</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Applications by Sector</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bankSectors} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke={c.axis} tick={{ fontSize: 11 }} />
                <YAxis dataKey="sector" type="category" stroke={c.axis} tick={{ fontSize: 11 }} width={70} />
                <Tooltip contentStyle={c.tooltip} />
                <Bar dataKey="apps" radius={[0, 4, 4, 0]}>{bankSectors.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Top Loan Opportunities</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 text-xs" onClick={() => navigate("/dashboard/marketplace")}>See All <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {bankOpportunities.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer" onClick={() => navigate("/dashboard/marketplace")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{s.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{s.name}</div>
                <div className="text-xs text-gray-500">{s.sector} · {s.revenue} · Runway {s.runway}</div>
              </div>
              <div className="hidden md:flex gap-6 text-center text-xs">
                <div><div className="font-bold text-gray-900 dark:text-white">{s.loan}</div><div className="text-gray-400">Requested</div></div>
              </div>
              <Badge className={`text-xs shrink-0 font-bold ${s.credit === "A+" ? "bg-emerald-100 text-emerald-700" : s.credit === "A" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{s.credit}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── 4. NBFC ─────────────────────────────────────────────────────────────────

const nbfcKpis = [
  { name: "Funding Requests", value: "28", change: "+6 this week", icon: Banknote, color: "text-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-900/20", borderColor: "border-cyan-200 dark:border-cyan-800" },
  { name: "Active Borrowers", value: "15", change: "+2 this month", icon: Users, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
  { name: "Disbursed (Month)", value: "$12M", change: "+18% vs last mo.", icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "border-emerald-200 dark:border-emerald-800" },
  { name: "Default Rate", value: "1.2%", change: "-0.3% improvement", icon: AlertTriangle, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", borderColor: "border-amber-200 dark:border-amber-800" },
];

const nbfcDisbursementTrend = [
  { month: "Sep", requests: 16, disbursed: 8 }, { month: "Oct", requests: 19, disbursed: 10 },
  { month: "Nov", requests: 22, disbursed: 12 }, { month: "Dec", requests: 18, disbursed: 9 },
  { month: "Jan", requests: 25, disbursed: 14 }, { month: "Feb", requests: 26, disbursed: 15 },
  { month: "Mar", requests: 28, disbursed: 12 },
];

const nbfcFundingTypes = [
  { type: "Revenue-Based", count: 12, fill: "#06b6d4" }, { type: "Debt Financing", count: 8, fill: "#6366f1" },
  { type: "Invoice Disc.", count: 5, fill: "#10b981" }, { type: "Growth Capital", count: 3, fill: "#f59e0b" },
];

const nbfcRequests = [
  { name: "FinFlow Pro", sector: "FinTech", type: "Revenue-Based", revenue: "$620K MRR", ask: "$1.5M", repayment: "18mo" },
  { name: "EduVerse", sector: "EdTech", type: "Growth Capital", revenue: "$840K MRR", ask: "$3M", repayment: "24mo" },
  { name: "ShopSmart", sector: "E-commerce", type: "Invoice Disc.", revenue: "$1.2M MRR", ask: "$800K", repayment: "12mo" },
];

export function NBFCDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const c = useChartColors();
  return (
    <div className="space-y-8">
      <Banner
        gradient="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600"
        icon={Banknote}
        date="NBFC Pipeline — March 5, 2026"
        greeting={`Good morning, ${user?.firstName || "Analyst"}! Here's your funding request summary.`}
        body={<><strong>28 funding requests</strong> match your NBFC criteria. <strong>FinFlow Pro</strong> is seeking $1.5M revenue-based financing — strong MRR growth. Default rate has improved to <strong>1.2%</strong> — best this year.</>}
        action1={{ label: "View Requests", href: "/dashboard/marketplace" }}
        action2={{ label: "Portfolio Health", href: "/dashboard/portfolio" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {nbfcKpis.map((k) => <KPICard key={k.name} {...k} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Requests vs Disbursements</CardTitle>
              <Badge variant="secondary" className="text-xs bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">7 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={nbfcDisbursementTrend}>
                <defs>
                  <linearGradient id="nbfcReq" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} /><stop offset="95%" stopColor="#06b6d4" stopOpacity={0} /></linearGradient>
                  <linearGradient id="nbfcDis" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="month" stroke={c.axis} tick={{ fontSize: 12 }} />
                <YAxis stroke={c.axis} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={c.tooltip} />
                <Area type="monotone" dataKey="requests" stroke="#06b6d4" fill="url(#nbfcReq)" strokeWidth={2} name="Requests" />
                <Area type="monotone" dataKey="disbursed" stroke="#10b981" fill="url(#nbfcDis)" strokeWidth={2} name="Disbursed" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">By Funding Type</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={nbfcFundingTypes} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke={c.axis} tick={{ fontSize: 11 }} />
                <YAxis dataKey="type" type="category" stroke={c.axis} tick={{ fontSize: 10 }} width={80} />
                <Tooltip contentStyle={c.tooltip} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>{nbfcFundingTypes.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Top Funding Requests</CardTitle>
            <Button variant="ghost" size="sm" className="text-cyan-600 text-xs" onClick={() => navigate("/dashboard/marketplace")}>See All <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {nbfcRequests.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors cursor-pointer" onClick={() => navigate("/dashboard/marketplace")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{s.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{s.name}</div>
                <div className="text-xs text-gray-500">{s.sector} · {s.revenue} · Repayment {s.repayment}</div>
              </div>
              <Badge className="text-xs bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 shrink-0">{s.type}</Badge>
              <div className="text-sm font-bold text-gray-900 dark:text-white shrink-0">{s.ask}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── 5. FAMILY OFFICE ─────────────────────────────────────────────────────────

const foKpis = [
  { name: "Portfolio Value", value: "$24M", change: "+18.4% YTD", icon: TrendingUp, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "border-emerald-200 dark:border-emerald-800" },
  { name: "Active Investments", value: "18", change: "+2 this year", icon: BriefcaseBusiness, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
  { name: "Co-investment Offers", value: "4", change: "2 expiring soon", icon: Users, color: "text-violet-600", bgColor: "bg-violet-50 dark:bg-violet-900/20", borderColor: "border-violet-200 dark:border-violet-800" },
  { name: "Curated Deals", value: "11", change: "+3 this week", icon: Star, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", borderColor: "border-amber-200 dark:border-amber-800" },
];

const foPortfolioGrowth = [
  { month: "Sep", value: 18.2 }, { month: "Oct", value: 19.1 }, { month: "Nov", value: 20.4 },
  { month: "Dec", value: 19.8 }, { month: "Jan", value: 21.6 }, { month: "Feb", value: 23.0 },
  { month: "Mar", value: 24.0 },
];

const foAssetAllocation = [
  { name: "AI/ML", value: 30, fill: "#10b981" }, { name: "HealthTech", value: 22, fill: "#6366f1" },
  { name: "CleanTech", value: 20, fill: "#3b82f6" }, { name: "Consumer", value: 15, fill: "#f59e0b" },
  { name: "Real Estate", value: 13, fill: "#8b5cf6" },
];

const foCuratedDeals = [
  { name: "NeuralScale AI", sector: "AI/ML", stage: "Series A", arr: "$2.4M", raise: "$8M", horizon: "5–7yr", esg: true },
  { name: "GreenGrid", sector: "CleanTech", stage: "Series A", arr: "$3.1M", raise: "$12M", horizon: "7–10yr", esg: true },
  { name: "HealthBridge", sector: "HealthTech", stage: "Seed", arr: "$480K", raise: "$3M", horizon: "4–6yr", esg: false },
];

export function FamilyOfficeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const c = useChartColors();
  return (
    <div className="space-y-8">
      <Banner
        gradient="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
        icon={Home}
        date="Portfolio Digest — March 5, 2026"
        greeting={`Good morning, ${user?.firstName || ""}! Here's your curated deal flow.`}
        body={<><strong>11 curated opportunities</strong> match your long-term mandate. Portfolio is up <strong>+18.4% YTD</strong>. <strong>4 co-investment offers</strong> are open — 2 expire this week. GreenGrid aligns with your <strong>ESG criteria</strong>.</>}
        action1={{ label: "View Curated Deals", href: "/dashboard/marketplace" }}
        action2={{ label: "Co-invest Opportunities", href: "/dashboard/introductions" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {foKpis.map((k) => <KPICard key={k.name} {...k} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Portfolio Growth ($M)</CardTitle>
              <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">7 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={foPortfolioGrowth}>
                <defs>
                  <linearGradient id="foValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="month" stroke={c.axis} tick={{ fontSize: 12 }} />
                <YAxis stroke={c.axis} tick={{ fontSize: 12 }} domain={[16, 26]} />
                <Tooltip contentStyle={c.tooltip} formatter={(v: any) => [`$${v}M`]} />
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#foValue)" strokeWidth={2} name="Portfolio Value" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Asset Allocation</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={foAssetAllocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {foAssetAllocation.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip contentStyle={c.tooltip} formatter={(v: any) => [`${v}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {foAssetAllocation.map((e) => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.fill }} />{e.name}</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{e.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Curated Long-Term Opportunities</CardTitle>
            <Button variant="ghost" size="sm" className="text-emerald-600 text-xs" onClick={() => navigate("/dashboard/marketplace")}>See All <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {foCuratedDeals.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer" onClick={() => navigate("/dashboard/marketplace")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0">{s.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{s.name}</span>
                  {s.esg && <Badge className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">ESG</Badge>}
                </div>
                <div className="text-xs text-gray-500">{s.sector} · {s.stage} · Horizon {s.horizon}</div>
              </div>
              <div className="hidden md:flex gap-6 text-center text-xs">
                <div><div className="font-bold text-gray-900 dark:text-white">{s.arr}</div><div className="text-gray-400">ARR</div></div>
                <div><div className="font-bold text-emerald-600">{s.raise}</div><div className="text-gray-400">Raising</div></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── 6. CORPORATE VENTURE CAPITAL (CVC) ──────────────────────────────────────

const cvcKpis = [
  { name: "Strategic Matches", value: "14", change: "+5 this week", icon: Target, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", borderColor: "border-amber-200 dark:border-amber-800" },
  { name: "Partnership Offers", value: "7", change: "3 in discussion", icon: GitMerge, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-900/20", borderColor: "border-orange-200 dark:border-orange-800" },
  { name: "Innovation Score", value: "87%", change: "+4pts this month", icon: Zap, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
  { name: "Active Pilots", value: "3", change: "1 new this month", icon: Rocket, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "border-emerald-200 dark:border-emerald-800" },
];

const cvcStrategicAlignment = [
  { month: "Sep", matches: 6, partnerships: 1 }, { month: "Oct", matches: 8, partnerships: 2 },
  { month: "Nov", matches: 11, partnerships: 3 }, { month: "Dec", matches: 9, partnerships: 2 },
  { month: "Jan", matches: 13, partnerships: 4 }, { month: "Feb", matches: 14, partnerships: 5 },
  { month: "Mar", matches: 14, partnerships: 7 },
];

const cvcInnovationFocus = [
  { area: "AI/ML", score: 42, fill: "#f59e0b" }, { area: "CyberSec", score: 28, fill: "#6366f1" },
  { area: "FinTech", score: 22, fill: "#10b981" }, { area: "LogTech", score: 14, fill: "#3b82f6" },
  { area: "CleanTech", score: 10, fill: "#8b5cf6" },
];

const cvcOpportunities = [
  { name: "NeuralScale AI", sector: "AI/ML", stage: "Series A", strategicFit: 94, partnershipType: "Tech Integration", raise: "$8M" },
  { name: "CyberShield", sector: "CyberSec", stage: "Seed", strategicFit: 88, partnershipType: "R&D Collab", raise: "$3M" },
  { name: "LogiNext", sector: "LogTech", stage: "Series B", strategicFit: 79, partnershipType: "Distribution", raise: "$15M" },
];

export function CVCDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const c = useChartColors();
  return (
    <div className="space-y-8">
      <Banner
        gradient="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
        icon={Zap}
        date="Strategic Innovation Digest — March 5, 2026"
        greeting={`Good morning, ${user?.firstName || ""}! Here's your strategic startup radar.`}
        body={<><strong>14 startups</strong> align with your innovation focus. <strong>NeuralScale AI</strong> is open to technology integration — 94% strategic fit. <strong>3 active pilots</strong> are running. AI sector disruption is at an <strong>all-time high</strong>.</>}
        action1={{ label: "Strategic Matches", href: "/dashboard/ai-matching" }}
        action2={{ label: "Partnership Intros", href: "/dashboard/introductions" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cvcKpis.map((k) => <KPICard key={k.name} {...k} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Strategic Matches & Partnerships</CardTitle>
              <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">7 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={cvcStrategicAlignment}>
                <defs>
                  <linearGradient id="cvcMatches" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                  <linearGradient id="cvcPart" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
                <XAxis dataKey="month" stroke={c.axis} tick={{ fontSize: 12 }} />
                <YAxis stroke={c.axis} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={c.tooltip} />
                <Area type="monotone" dataKey="matches" stroke="#f59e0b" fill="url(#cvcMatches)" strokeWidth={2} name="Strategic Matches" />
                <Area type="monotone" dataKey="partnerships" stroke="#6366f1" fill="url(#cvcPart)" strokeWidth={2} name="Partnerships" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Innovation Focus Areas</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={cvcInnovationFocus} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke={c.axis} tick={{ fontSize: 11 }} />
                <YAxis dataKey="area" type="category" stroke={c.axis} tick={{ fontSize: 11 }} width={65} />
                <Tooltip contentStyle={c.tooltip} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>{cvcInnovationFocus.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Top Strategic Opportunities</CardTitle>
            <Button variant="ghost" size="sm" className="text-amber-600 text-xs" onClick={() => navigate("/dashboard/marketplace")}>See All <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {cvcOpportunities.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors cursor-pointer" onClick={() => navigate("/dashboard/marketplace")}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">{s.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{s.name}</div>
                <div className="text-xs text-gray-500">{s.sector} · {s.stage} · Raising {s.raise}</div>
              </div>
              <Badge className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">{s.partnershipType}</Badge>
              <div className="w-12 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">{s.strategicFit}%</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── 7. IDEA STAGE FOUNDER ────────────────────────────────────────────────────

const ideaKpis = [
  { name: "Mentor Sessions", value: "3", change: "+1 scheduled", icon: Users, color: "text-violet-600", bgColor: "bg-violet-50 dark:bg-violet-900/20", borderColor: "border-violet-200 dark:border-violet-800" },
  { name: "Co-founder Matches", value: "8", change: "+3 new profiles", icon: GitMerge, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", borderColor: "border-indigo-200 dark:border-indigo-800" },
  { name: "Upcoming Events", value: "2", change: "Next: Mar 10", icon: Calendar, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", borderColor: "border-emerald-200 dark:border-emerald-800" },
  { name: "Resources Unlocked", value: "24", change: "6 new this week", icon: BookOpen, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", borderColor: "border-amber-200 dark:border-amber-800" },
];

const ideaMentors = [
  { name: "Priya Sharma", role: "Ex-Sequoia Partner", expertise: "FinTech, SaaS", available: true, sessions: 42 },
  { name: "Raj Mehta", role: "Serial Founder (3 exits)", expertise: "AI/ML, B2B", available: true, sessions: 89 },
  { name: "Aisha Cole", role: "YC Alumni, HealthTech", expertise: "HealthTech, GTM", available: false, sessions: 67 },
];

const ideaProgressSteps = [
  { label: "Idea Defined", done: true, desc: "Your idea is registered on the platform" },
  { label: "Problem Validated", done: true, desc: "At least 3 customer interviews completed" },
  { label: "Market Research", done: false, desc: "Identify TAM, SAM, SOM for your market" },
  { label: "MVP Plan", done: false, desc: "Define your MVP feature set" },
  { label: "First Mentor Call", done: false, desc: "Schedule and complete a mentor session" },
];

const ideaEvents = [
  { name: "Startup Weekend Mumbai", date: "Mar 10–12", type: "Hackathon", spots: 8 },
  { name: "Idea Stage Office Hours", date: "Mar 14", type: "Mentorship", spots: 3 },
  { name: "Co-founder Mixer", date: "Mar 18", type: "Networking", spots: 20 },
];

export function IdeaFounderDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bannerVisible, setBannerVisible] = useState(true);
  return (
    <div className="space-y-8">
      {bannerVisible && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-10 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-20 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>
          <button onClick={() => setBannerVisible(false)} className="absolute top-4 right-4 text-white/70 hover:text-white"><X className="h-5 w-5" /></button>
          <div className="flex items-start gap-4 relative">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white/70 mb-1">Idea Stage Hub — March 5, 2026</div>
              <h2 className="text-xl font-bold mb-2">Welcome, {user?.firstName || "Visionary"}! Let's build your idea into reality.</h2>
              <p className="text-white/80 text-sm max-w-2xl">
                <strong>8 co-founder profiles</strong> match your skill gaps. <strong>Mentor Priya Sharma</strong> has availability this week — FinTech & SaaS expert. Your next milestone is <strong>Market Research</strong>. Keep going!
              </p>
              <div className="flex gap-3 mt-4">
                <Button size="sm" className="bg-white text-violet-700 hover:bg-white/90 font-semibold" onClick={() => navigate("/dashboard/browse-investors")}>Find Co-founder</Button>
                <Button size="sm" variant="ghost" className="text-white border border-white/30 hover:bg-white/10" onClick={() => navigate("/dashboard/introductions")}>Book Mentor</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {ideaKpis.map((k) => <KPICard key={k.name} {...k} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Tracker */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-violet-600" />
              <CardTitle className="text-base font-semibold">Your Idea Journey</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {ideaProgressSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  step.done ? "bg-violet-600" : "border-2 border-gray-300 dark:border-slate-600"
                }`}>
                  {step.done ? <CheckCircle className="h-4 w-4 text-white" /> : <span className="text-xs text-gray-400 font-bold">{i + 1}</span>}
                </div>
                <div>
                  <div className={`text-sm font-semibold ${step.done ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>{step.label}</div>
                  <div className="text-xs text-gray-400">{step.desc}</div>
                </div>
                {!step.done && i === ideaProgressSteps.findIndex(s => !s.done) && (
                  <Badge className="ml-auto text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 shrink-0">Next</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base font-semibold">Upcoming Events</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">3 upcoming</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {ideaEvents.map((ev, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{ev.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Clock className="h-3 w-3" />{ev.date}
                    <span className="text-gray-300 dark:text-slate-600">·</span>
                    {ev.spots} spots left
                  </div>
                </div>
                <Badge className="text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 shrink-0">{ev.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Mentor Suggestions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-base font-semibold">Recommended Mentors</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-violet-600 text-xs" onClick={() => navigate("/dashboard/introductions")}>
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {ideaMentors.map((m, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">{m.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{m.name}</div>
                <div className="text-xs text-gray-500">{m.role} · {m.expertise}</div>
              </div>
              <div className="text-xs text-gray-400 shrink-0">{m.sessions} sessions</div>
              <Button
                size="sm"
                className={`text-xs shrink-0 ${m.available ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                disabled={!m.available}
                onClick={() => m.available && navigate("/dashboard/introductions")}
              >
                {m.available ? "Book" : "Busy"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
