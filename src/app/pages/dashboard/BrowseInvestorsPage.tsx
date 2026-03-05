import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Search, DollarSign, MapPin, TrendingUp, Users, Star,
  ChevronRight, Briefcase, Linkedin, Globe, Mail, Filter,
  Building2, CheckCircle, Zap, GitMerge
} from "lucide-react";

type Investor = {
  id: number;
  name: string;
  firm: string;
  title: string;
  location: string;
  avatar: string;
  avatarColor: string;
  sectors: string[];
  stages: string[];
  checkSize: string;
  portfolio: number;
  thesis: string;
  recentInvestments: string[];
  verified: boolean;
  responseRate: string;
  activelyInvesting: boolean;
  linkedIn: boolean;
  matchScore: number;
  bio: string;
};

const investors: Investor[] = [
  {
    id: 1,
    name: "Sarah Chen",
    firm: "Andreessen Horowitz",
    title: "General Partner",
    location: "San Francisco, CA",
    avatar: "SC",
    avatarColor: "bg-indigo-500",
    sectors: ["AI/ML", "SaaS", "FinTech"],
    stages: ["Seed", "Series A"],
    checkSize: "$500K – $5M",
    portfolio: 34,
    thesis:
      "Backing contrarian founders building category-defining companies using AI. Particularly excited about vertical AI applications in regulated industries.",
    recentInvestments: ["NeuralScale AI", "DataVault", "LegalMind"],
    verified: true,
    responseRate: "High",
    activelyInvesting: true,
    linkedIn: true,
    matchScore: 94,
    bio: "Former CTO at Scale AI. 12 years investing in early-stage B2B software.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    firm: "Sequoia Capital",
    title: "Partner",
    location: "Menlo Park, CA",
    avatar: "MJ",
    avatarColor: "bg-violet-500",
    sectors: ["FinTech", "HealthTech", "CleanTech"],
    stages: ["Series A", "Series B"],
    checkSize: "$2M – $15M",
    portfolio: 28,
    thesis:
      "Focused on companies solving trillion-dollar problems in healthcare and climate. Strong preference for founders with domain expertise.",
    recentInvestments: ["MediScan AI", "GreenGrid", "PayStream"],
    verified: true,
    responseRate: "Medium",
    activelyInvesting: true,
    linkedIn: true,
    matchScore: 87,
    bio: "Ex-Goldman Sachs. Led investments in 3 unicorns. Board at HealthBridge.",
  },
  {
    id: 3,
    name: "Priya Patel",
    firm: "Y Combinator",
    title: "Group Partner",
    location: "San Francisco, CA",
    avatar: "PP",
    avatarColor: "bg-amber-500",
    sectors: ["EdTech", "SaaS", "AI/ML"],
    stages: ["Pre-Seed", "Seed"],
    checkSize: "$125K – $500K",
    portfolio: 62,
    thesis:
      "Early believer in mission-driven founders tackling education and workforce development. Love seeing traction at early stages—even $10K MRR is meaningful.",
    recentInvestments: ["EduVerse", "SkillPath", "TutorBot"],
    verified: true,
    responseRate: "High",
    activelyInvesting: true,
    linkedIn: true,
    matchScore: 82,
    bio: "YC alum (W14). Backed 60+ companies. Previously founder of LearnLoop.",
  },
  {
    id: 4,
    name: "James Park",
    firm: "Accel Partners",
    title: "Managing Director",
    location: "New York, NY",
    avatar: "JP",
    avatarColor: "bg-emerald-500",
    sectors: ["HealthTech", "BioTech", "AI/ML"],
    stages: ["Seed", "Series A", "Series B"],
    checkSize: "$1M – $10M",
    portfolio: 41,
    thesis:
      "Healthcare is the most important problem of our generation. Looking for digital health and diagnostic companies with strong clinical evidence and clear path to reimbursement.",
    recentInvestments: ["HealthBridge", "BioScan", "ClinIQ"],
    verified: true,
    responseRate: "Medium",
    activelyInvesting: true,
    linkedIn: true,
    matchScore: 78,
    bio: "MD/MBA. Former director at Cleveland Clinic Ventures. Advisor to 15 startups.",
  },
  {
    id: 5,
    name: "Rachel Kim",
    firm: "Tiger Global",
    title: "VP Investments",
    location: "New York, NY",
    avatar: "RK",
    avatarColor: "bg-rose-500",
    sectors: ["SaaS", "Marketplace", "FinTech"],
    stages: ["Series B", "Series C"],
    checkSize: "$10M – $50M",
    portfolio: 19,
    thesis:
      "Growth-stage investor focused on capital-efficient SaaS businesses with >$5M ARR and >120% NRR. Very data-driven—come with the numbers.",
    recentInvestments: ["CloudCore", "SalesMax", "InvoiceAI"],
    verified: true,
    responseRate: "Low",
    activelyInvesting: false,
    linkedIn: false,
    matchScore: 61,
    bio: "10 years growth equity. Led 3 IPO-track rounds. Forbes 30 Under 30.",
  },
  {
    id: 6,
    name: "David Okafor",
    firm: "First Round Capital",
    title: "Partner",
    location: "San Francisco, CA",
    avatar: "DO",
    avatarColor: "bg-sky-500",
    sectors: ["AgTech", "CleanTech", "Deep Tech"],
    stages: ["Pre-Seed", "Seed"],
    checkSize: "$250K – $3M",
    portfolio: 23,
    thesis:
      "Deeply convinced that the next 10 years belong to startups that combine hardware and software to solve physical-world problems—food, energy, manufacturing.",
    recentInvestments: ["FarmOS", "SolarMesh", "RoboHarvest"],
    verified: true,
    responseRate: "High",
    activelyInvesting: true,
    linkedIn: true,
    matchScore: 71,
    bio: "Engineer turned investor. MIT PhD in robotics. Backed FarmOS at idea stage.",
  },
];

const sectorFilters = ["All", "AI/ML", "FinTech", "HealthTech", "SaaS", "CleanTech", "EdTech", "AgTech", "Deep Tech"];
const stageFilters = ["All Stages", "Pre-Seed", "Seed", "Series A", "Series B"];

const responseRateColor: Record<string, string> = {
  High: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function BrowseInvestorsPage() {
  const [search, setSearch] = useState("");
  const [activeSector, setActiveSector] = useState("All");
  const [activeStage, setActiveStage] = useState("All Stages");
  const [requestedIds, setRequestedIds] = useState<number[]>([]);

  const filtered = investors.filter((inv) => {
    const matchesSearch =
      !search ||
      inv.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.firm.toLowerCase().includes(search.toLowerCase()) ||
      inv.sectors.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesSector =
      activeSector === "All" || inv.sectors.includes(activeSector);
    const matchesStage =
      activeStage === "All Stages" || inv.stages.includes(activeStage);
    return matchesSearch && matchesSector && matchesStage;
  });

  const requestIntro = (id: number) => {
    setRequestedIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Investors</h1>
          <p className="text-sm text-gray-500 mt-1">
            Discover investors aligned with your sector, stage, and check size. Request a warm introduction directly.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <Users className="h-4 w-4 text-indigo-500" />
          <span><strong className="text-indigo-700 dark:text-indigo-400">{investors.length}</strong> verified investors</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, firm, or sector..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {sectorFilters.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSector(s)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                  activeSector === s
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-indigo-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Filter className="h-4 w-4 text-gray-400 mt-1.5 shrink-0" />
            {stageFilters.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStage(s)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                  activeStage === s
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-violet-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investor cards */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> investors
      </div>

      <div className="space-y-4">
        {filtered.map((inv) => (
          <Card key={inv.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: avatar + identity */}
                <div className="flex items-start gap-4 lg:w-64 shrink-0">
                  <div className={`w-14 h-14 rounded-2xl ${inv.avatarColor} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}>
                    {inv.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900 dark:text-white">{inv.name}</span>
                      {inv.verified && <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{inv.title}</div>
                    <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                      <Building2 className="h-3.5 w-3.5" /> {inv.firm}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <MapPin className="h-3 w-3" /> {inv.location}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${responseRateColor[inv.responseRate]}`}>
                        {inv.responseRate} response
                      </span>
                      {inv.activelyInvesting && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1">
                          <Zap className="h-2.5 w-2.5" /> Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle: thesis + tags */}
                <div className="flex-1 min-w-0 space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{inv.thesis}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {inv.sectors.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {s}
                      </Badge>
                    ))}
                    {inv.stages.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-emerald-500" /> {inv.checkSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-indigo-500" /> {inv.portfolio} portfolio companies
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Recent: {inv.recentInvestments.join(" · ")}
                  </div>
                </div>

                {/* Right: match score + CTA */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-4 shrink-0">
                  <div className="text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm mx-auto ${
                      inv.matchScore >= 90
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : inv.matchScore >= 80
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                        : inv.matchScore >= 70
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                    }`}>
                      {inv.matchScore}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">AI Match</div>
                  </div>
                  {requestedIds.includes(inv.id) ? (
                    <Button size="sm" variant="outline" className="border-emerald-500 text-emerald-600 text-xs" disabled>
                      <CheckCircle className="h-3.5 w-3.5 mr-1" /> Requested
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 text-xs"
                      onClick={() => requestIntro(inv.id)}
                    >
                      <GitMerge className="h-3.5 w-3.5 mr-1" /> Request Intro
                    </Button>
                  )}
                  {inv.linkedIn && (
                    <Button size="sm" variant="ghost" className="text-xs text-blue-600 hover:text-blue-700">
                      <Linkedin className="h-3.5 w-3.5 mr-1" /> LinkedIn
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No investors match your filters</p>
            <p className="text-sm mt-1">Try adjusting your sector or stage filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
