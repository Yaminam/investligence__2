import {
  AngelDashboard, VCDashboard, BankDashboard, NBFCDashboard,
  FamilyOfficeDashboard, CVCDashboard, IdeaFounderDashboard,
} from "./InvestorTypeDashboards";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  ArrowUp, ArrowDown, TrendingUp, Sparkles, BriefcaseBusiness,
  GitMerge, Eye, Rocket, DollarSign, Users, Clock,
  ChevronRight, CheckCircle, Shield, Award, X, FileText,
  Send, Target, BarChart2, AlertCircle, Zap, Share2, Download, Mail
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const kpiData = [
  {
    name: "New Startups This Week",
    value: "12",
    change: "+4 vs last week",
    trend: "up",
    icon: Rocket,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
  {
    name: "AI Matches For You",
    value: "18",
    change: "+6 new matches",
    trend: "up",
    icon: Sparkles,
    color: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    borderColor: "border-violet-200 dark:border-violet-800",
  },
  {
    name: "Active Raises",
    value: "47",
    change: "Currently fundraising",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    name: "Warm Intros Pending",
    value: "5",
    change: "2 new requests",
    trend: "up",
    icon: GitMerge,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
];

const dealFlowTrend = [
  { month: "Sep", startups: 18, funded: 4 },
  { month: "Oct", startups: 24, funded: 6 },
  { month: "Nov", startups: 31, funded: 9 },
  { month: "Dec", startups: 27, funded: 7 },
  { month: "Jan", startups: 38, funded: 11 },
  { month: "Feb", startups: 42, funded: 14 },
  { month: "Mar", startups: 47, funded: 12 },
];

const sectorActivity = [
  { sector: "AI/ML", deals: 34, fill: "#6366f1" },
  { sector: "FinTech", deals: 28, fill: "#8b5cf6" },
  { sector: "HealthTech", deals: 22, fill: "#10b981" },
  { sector: "SaaS", deals: 19, fill: "#f59e0b" },
  { sector: "CleanTech", deals: 15, fill: "#3b82f6" },
  { sector: "EdTech", deals: 11, fill: "#ec4899" },
];

const trendingStartups = [
  {
    name: "NeuralScale AI",
    sector: "AI/ML",
    stage: "Series A",
    arr: "$2.4M",
    growth: "+340%",
    raise: "$8M",
    matchScore: 94,
    trust: ["Verified", "Revenue Verified"],
    views: 1240,
    trending: true,
  },
  {
    name: "HealthBridge",
    sector: "HealthTech",
    stage: "Seed",
    arr: "$480K",
    growth: "+210%",
    raise: "$3M",
    matchScore: 88,
    trust: ["Verified"],
    views: 890,
    trending: true,
  },
  {
    name: "FinFlow Pro",
    sector: "FinTech",
    stage: "Pre-Seed",
    arr: "$120K",
    growth: "+180%",
    raise: "$1.5M",
    matchScore: 82,
    trust: ["Verified"],
    views: 670,
    trending: false,
  },
  {
    name: "EduVerse",
    sector: "EdTech",
    stage: "Seed",
    arr: "$840K",
    growth: "+165%",
    raise: "$4M",
    matchScore: 79,
    trust: ["Verified", "Top Startup"],
    views: 590,
    trending: false,
  },
  {
    name: "GreenGrid",
    sector: "CleanTech",
    stage: "Series A",
    arr: "$3.1M",
    growth: "+290%",
    raise: "$12M",
    matchScore: 75,
    trust: ["Verified", "Revenue Verified", "Top Startup"],
    views: 1050,
    trending: true,
  },
];

const recentlyFunded = [
  { name: "CloudCore", amount: "$15M", round: "Series B", sector: "SaaS", days: 3 },
  { name: "MediScan AI", amount: "$6M", round: "Series A", sector: "HealthTech", days: 7 },
  { name: "PayStream", amount: "$2.5M", round: "Seed", sector: "FinTech", days: 12 },
];

const trustBadgeColors: Record<string, string> = {
  "Verified": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Revenue Verified": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Top Startup": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const trustBadgeIcons: Record<string, React.ElementType> = {
  "Verified": Shield,
  "Revenue Verified": CheckCircle,
  "Top Startup": Award,
};

// ─── Founder-specific data ───────────────────────────────────────────────────

const founderKpiData = [
  {
    name: "Investor Profile Views",
    value: "138",
    change: "+22 this week",
    trend: "up",
    icon: Eye,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
  {
    name: "Intro Requests Received",
    value: "7",
    change: "+3 new",
    trend: "up",
    icon: GitMerge,
    color: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    borderColor: "border-violet-200 dark:border-violet-800",
  },
  {
    name: "Investors Bookmarked You",
    value: "24",
    change: "+8 this month",
    trend: "up",
    icon: Target,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    name: "Pitch Deck Downloads",
    value: "19",
    change: "+5 since update",
    trend: "up",
    icon: FileText,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
];

const profileViewsTrend = [
  { month: "Sep", views: 8, bookmarks: 2 },
  { month: "Oct", views: 14, bookmarks: 4 },
  { month: "Nov", views: 22, bookmarks: 7 },
  { month: "Dec", views: 19, bookmarks: 5 },
  { month: "Jan", views: 31, bookmarks: 10 },
  { month: "Feb", views: 38, bookmarks: 14 },
  { month: "Mar", views: 47, bookmarks: 18 },
];

const interestedInvestorSectors = [
  { sector: "AI/ML", investors: 42, fill: "#6366f1" },
  { sector: "FinTech", investors: 35, fill: "#8b5cf6" },
  { sector: "SaaS", investors: 28, fill: "#10b981" },
  { sector: "HealthTech", investors: 21, fill: "#f59e0b" },
  { sector: "CleanTech", investors: 17, fill: "#3b82f6" },
];

const recentInvestorActivity = [
  { name: "Sequoia Scout", action: "Viewed your profile", time: "2h ago", avatar: "S", color: "bg-indigo-500" },
  { name: "Andreessen Horowitz", action: "Downloaded pitch deck", time: "5h ago", avatar: "A", color: "bg-violet-500" },
  { name: "Y Combinator", action: "Bookmarked your startup", time: "1d ago", avatar: "Y", color: "bg-amber-500" },
  { name: "Accel Partners", action: "Requested warm intro", time: "2d ago", avatar: "A", color: "bg-emerald-500" },
];

const applicationChecklist = [
  { label: "Company profile completed", done: true },
  { label: "Traction metrics submitted", done: true },
  { label: "Pitch deck uploaded", done: true },
  { label: "Team bios added", done: false },
  { label: "Revenue verification pending", done: false },
];

function FounderDashboard() {
  const [tipVisible, setTipVisible] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [emailShare, setEmailShare] = useState("");
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const chartGrid = theme === "dark" ? "#334155" : "#e5e7eb";
  const chartAxis = theme === "dark" ? "#94a3b8" : "#6b7280";

  const handleExportPDF = () => {
    toast.success("Profile exported as PDF");
    setShareDialogOpen(false);
  };

  const handleExportCSV = () => {
    toast.success("Data exported as CSV");
    setShareDialogOpen(false);
  };

  const handleShareEmail = () => {
    if (!emailShare.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Profile shared with ${emailShare}`);
    setEmailShare("");
    setShareDialogOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://capitalconnect.ai/founder/${user?.id || "profile"}`);
    toast.success("Profile link copied to clipboard");
  };

  return (
    <div className="space-y-8">
      {/* Share & Export Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShareDialogOpen(true)}
          variant="outline"
          className="gap-2 border-gray-200 dark:border-slate-700"
        >
          <Share2 className="h-4 w-4" /> Share & Export
        </Button>
      </div>

      {/* Founder Tip Banner */}
      {tipVisible && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-10 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-20 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>
          <button onClick={() => setTipVisible(false)} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-start gap-4 relative">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white/70 mb-1">Founder Insights — March 5, 2026</div>
              <h2 className="text-xl font-bold mb-2">
                Welcome back, {user?.firstName || "Founder"}! Your startup is gaining traction.
              </h2>
              <p className="text-white/80 text-sm max-w-2xl">
                <strong>138 investors</strong> viewed your profile this month — up 22 this week.
                <strong> 7 warm intro requests</strong> are waiting for your response.
                Complete your <strong>team bios</strong> to unlock Revenue Verified badge and boost visibility by ~35%.
              </p>
              <div className="flex gap-3 mt-4">
                <Button size="sm" className="bg-white text-violet-700 hover:bg-white/90 font-semibold" onClick={() => navigate("/dashboard/application")}>
                  Complete Profile
                </Button>
                <Button size="sm" variant="ghost" className="text-white border border-white/30 hover:bg-white/10" onClick={() => navigate("/dashboard/application")}>
                  View Intros
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {founderKpiData.map((kpi) => (
          <Card key={kpi.name} className={`border shadow-sm ${kpi.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{kpi.name}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === "up" ? <ArrowUp className="h-3 w-3 text-emerald-500" /> : <ArrowDown className="h-3 w-3 text-red-500" />}
                    <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>{kpi.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Views Trend */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Investor Interest Over Time</CardTitle>
              <Badge variant="secondary" className="text-xs bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">Last 7 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={profileViewsTrend}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bookmarksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="month" stroke={chartAxis} tick={{ fontSize: 12 }} />
                <YAxis stroke={chartAxis} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="views" stroke="#7c3aed" fill="url(#viewsGrad)" strokeWidth={2} name="Profile Views" />
                <Area type="monotone" dataKey="bookmarks" stroke="#10b981" fill="url(#bookmarksGrad)" strokeWidth={2} name="Bookmarks" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-2 justify-center">
              <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 rounded-full bg-violet-600" /> Profile Views</div>
              <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Bookmarks</div>
            </div>
          </CardContent>
        </Card>

        {/* Investor Sectors Bar */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Investors by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={interestedInvestorSectors} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke={chartAxis} tick={{ fontSize: 11 }} />
                <YAxis dataKey="sector" type="category" stroke={chartAxis} tick={{ fontSize: 11 }} width={65} />
                <Tooltip contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="investors" radius={[0, 4, 4, 0]}>
                  {interestedInvestorSectors.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Recent Activity + Application Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investor Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-violet-600" />
                <CardTitle className="text-base font-semibold">Recent Investor Activity</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvestorActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-slate-800 last:border-0">
                  <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.action}</div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                    <Clock className="h-3 w-3" />{item.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Status */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-base font-semibold">Listing Application Status</CardTitle>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> Under Review
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {applicationChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-slate-600 shrink-0" />
                  )}
                  <span className={`text-sm ${item.done ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}>{item.label}</span>
                  {!item.done && <Badge variant="secondary" className="text-xs ml-auto">Pending</Badge>}
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
              size="sm"
              onClick={() => navigate("/dashboard/application")}
            >
              Complete Your Application
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Share & Export Dialog - Founder */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share & Export Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Export Options</h3>
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Download className="h-4 w-4" /> Export as PDF
              </Button>
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Download className="h-4 w-4" /> Export Metrics as CSV
              </Button>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h3 className="font-semibold text-sm">Share Profile</h3>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Share2 className="h-4 w-4" /> Copy Profile Link
              </Button>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Label className="text-sm font-semibold">Share via Email</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="investor@example.com"
                  value={emailShare}
                  onChange={(e) => setEmailShare(e.target.value)}
                />
                <Button
                  onClick={handleShareEmail}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function DashboardHome() {
  const { user } = useAuth();
  if (user?.role === "founder") {
    if (user?.onboardingData?.founderType === "idea") return <IdeaFounderDashboard />;
    return <FounderDashboard />;
  }
  switch (user?.investorType) {
    case "angel": return <AngelDashboard />;
    case "venture-capital": return <VCDashboard />;
    case "bank": return <BankDashboard />;
    case "nbfc": return <NBFCDashboard />;
    case "family-office": return <FamilyOfficeDashboard />;
    case "corporate-venture": return <CVCDashboard />;
    default: return <InvestorDashboard />;
  }
}

function InvestorDashboard() {
  const [briefingVisible, setBriefingVisible] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [emailShare, setEmailShare] = useState("");
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const chartGrid = theme === "dark" ? "#334155" : "#e5e7eb";
  const chartAxis = theme === "dark" ? "#94a3b8" : "#6b7280";

  const handleExportPDF = () => {
    toast.success("Portfolio exported as PDF");
    setShareDialogOpen(false);
  };

  const handleExportCSV = () => {
    toast.success("Investment data exported as CSV");
    setShareDialogOpen(false);
  };

  const handleShareEmail = () => {
    if (!emailShare.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Profile shared with ${emailShare}`);
    setEmailShare("");
    setShareDialogOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://investligence.com/investor/${user?.id || "profile"}`);
    toast.success("Profile link copied to clipboard");
  };

  return (
    <div className="space-y-8">
      {/* Share & Export Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShareDialogOpen(true)}
          variant="outline"
          className="gap-2 border-gray-200 dark:border-slate-700"
        >
          <Share2 className="h-4 w-4" /> Share & Export
        </Button>
      </div>

      {/* AI Briefing Banner */}
      {briefingVisible && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 text-white shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-10 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-20 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>
          <button
            onClick={() => setBriefingVisible(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-start gap-4 relative">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white/70 mb-1">AI Weekly Digest — March 5, 2026</div>
              <h2 className="text-xl font-bold mb-2">
                Good morning, {user?.firstName || "Investor"}!{" "}
                {user?.investorType === 'angel' && "Here's your angel deal flow summary."}
                {user?.investorType === 'venture-capital' && "Here's your VC pipeline summary."}
                {user?.investorType === 'bank' && "Here's your lending opportunities summary."}
                {user?.investorType === 'nbfc' && "Here's your NBFC funding requests summary."}
                {user?.investorType === 'family-office' && "Here's your curated deal flow summary."}
                {user?.investorType === 'corporate-venture' && "Here's your strategic innovation summary."}
                {!user?.investorType && "Here's your deal flow summary."}
              </h2>
              <p className="text-white/80 text-sm max-w-2xl">
                {(user?.investorType === 'bank' || user?.investorType === 'nbfc') ? (
                  <><strong>8 new startups</strong> match your lending criteria in FinTech and SaaS. <strong>NeuralScale AI</strong> is seeking $5M debt financing. <strong>3 credit assessments</strong> are pending your review. Startup loan requests rose <strong>+22%</strong> this week.</>
                ) : user?.investorType === 'corporate-venture' ? (
                  <><strong>7 strategic startups</strong> align with your innovation focus in AI/ML. <strong>NeuralScale AI</strong> is open to corporate partnerships — 94% strategic fit. <strong>4 partnership intros</strong> are waiting. The AI sector saw <strong>+28% deal activity</strong> this week.</>
                ) : (
                  <><strong>12 new startups</strong> match your thesis in AI/ML and FinTech. <strong>NeuralScale AI</strong> is trending with 94% match score — currently raising $8M Series A. <strong>5 warm introductions</strong> are waiting for your response. The AI sector saw <strong>+28% deal activity</strong> this week.</>
                )}
              </p>
              <div className="flex gap-3 mt-4">
                <Button
                  size="sm"
                  className="bg-white text-indigo-700 hover:bg-white/90 font-semibold"
                  onClick={() => navigate("/dashboard/ai-matching")}
                >
                  View AI Matches
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white border border-white/30 hover:bg-white/10"
                  onClick={() => navigate("/dashboard/introductions")}
                >
                  Review Intros
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.name} className={`border shadow-sm ${kpi.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{kpi.name}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === "up" ? (
                      <ArrowUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deal Flow Trend */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Deal Flow Trend</CardTitle>
              <Badge variant="secondary" className="text-xs bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                Last 7 months
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={dealFlowTrend}>
                <defs>
                  <linearGradient id="startupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fundedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="month" stroke={chartAxis} tick={{ fontSize: 12 }} />
                <YAxis stroke={chartAxis} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="startups" stroke="#6366f1" fill="url(#startupGrad)" strokeWidth={2} name="New Startups" />
                <Area type="monotone" dataKey="funded" stroke="#10b981" fill="url(#fundedGrad)" strokeWidth={2} name="Funded" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-2 justify-center">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 rounded-full bg-indigo-500" /> New Startups
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 rounded-full bg-emerald-500" /> Funding Closed
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Hot Sectors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sectorActivity} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke={chartAxis} tick={{ fontSize: 11 }} />
                <YAxis dataKey="sector" type="category" stroke={chartAxis} tick={{ fontSize: 11 }} width={60} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="deals" radius={[0, 4, 4, 0]}>
                  {sectorActivity.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trending Startups Feed */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Recommended For You</CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">AI-matched to your investment thesis</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-600 hover:text-indigo-700 text-xs font-medium"
              onClick={() => navigate("/dashboard/marketplace")}
            >
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingStartups.map((startup, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer group"
                onClick={() => navigate("/dashboard/marketplace")}
              >
                {/* Avatar and trending */}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {startup.name.charAt(0)}
                  </div>
                  {startup.trending && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{startup.name}</span>
                    {startup.trust.map((t) => {
                      const Icon = trustBadgeIcons[t];
                      return (
                        <span key={t} className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${trustBadgeColors[t]}`}>
                          <Icon className="h-3 w-3" />
                          {t}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{startup.sector}</span>
                    <span>{startup.stage}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{startup.views}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="hidden md:grid grid-cols-3 gap-4 text-center shrink-0">
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{startup.arr}</div>
                    <div className="text-xs text-gray-400">ARR</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-600">{startup.growth}</div>
                    <div className="text-xs text-gray-400">Growth</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-indigo-600">{startup.raise}</div>
                    <div className="text-xs text-gray-400">Raising</div>
                  </div>
                </div>

                {/* Match score */}
                <div className="shrink-0 text-center hidden lg:block">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                    startup.matchScore >= 90
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : startup.matchScore >= 80
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                  }`}>
                    {startup.matchScore}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Match</div>
                </div>

                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Funded */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-base font-semibold">Recently Funded</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentlyFunded.map((co, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 font-bold text-xs">
                      {co.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{co.name}</div>
                      <div className="text-xs text-gray-500">{co.sector} · {co.round}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-600">{co.amount}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                      <Clock className="h-3 w-3" />{co.days}d ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investor Controls */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-base font-semibold">Your Deal Flow Controls</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Deal Flow Status", value: "Active", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20", desc: "Receiving startup pitches" },
                { label: "Sectors Watching", value: "AI/ML, FinTech, SaaS", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20", desc: "Based on your thesis" },
                { label: "Deal Inbox Limit", value: "20 / month", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20", desc: "12 received this month" },
                { label: "Stage Preference", value: "Seed → Series A", color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20", desc: "Filtered automatically" },
              ].map((ctrl, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-800 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{ctrl.label}</div>
                    <div className="text-xs text-gray-400">{ctrl.desc}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ctrl.color}`}>
                    {ctrl.value}
                  </span>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700"
              size="sm"
              onClick={() => navigate("/dashboard/investor-profile")}
            >
              Manage Your Thesis & Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Share & Export Dialog - Investor */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share & Export Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Export Options</h3>
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Download className="h-4 w-4" /> Export as PDF
              </Button>
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Download className="h-4 w-4" /> Export Portfolio as CSV
              </Button>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h3 className="font-semibold text-sm">Share Profile</h3>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Share2 className="h-4 w-4" /> Copy Profile Link
              </Button>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Label className="text-sm font-semibold">Share via Email</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="founder@example.com"
                  value={emailShare}
                  onChange={(e) => setEmailShare(e.target.value)}
                />
                <Button
                  onClick={handleShareEmail}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
