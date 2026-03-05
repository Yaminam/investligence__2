import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Search, Shield, CheckCircle, Award, Eye, DollarSign, Users,
  TrendingUp, Globe, BarChart2, Zap, Filter, Grid, List
} from "lucide-react";

const startups = [
  { name: "NeuralScale AI", sector: "AI/ML", stage: "Series A", arr: "$2.4M", growth: "+340%", raise: "$8M", team: 28, users: "14K", founded: 2023, location: "SF, USA", desc: "Enterprise-grade AI infrastructure for scaling ML workloads 10x faster.", trust: ["Verified", "Revenue Verified", "Top Startup"] },
  { name: "HealthBridge", sector: "HealthTech", stage: "Seed", arr: "$480K", growth: "+210%", raise: "$3M", team: 12, users: "8K", founded: 2024, location: "Boston, USA", desc: "AI-powered remote patient monitoring—connecting patients to doctors in real-time.", trust: ["Verified"] },
  { name: "FinFlow Pro", sector: "FinTech", stage: "Pre-Seed", arr: "$120K", growth: "+180%", raise: "$1.5M", team: 6, users: "2.1K", founded: 2024, location: "NYC, USA", desc: "Automated cash flow forecasting and financial intelligence for SMEs.", trust: ["Verified"] },
  { name: "GreenGrid", sector: "CleanTech", stage: "Series A", arr: "$3.1M", growth: "+290%", raise: "$12M", team: 34, users: "22K", founded: 2022, location: "Seattle, USA", desc: "Smart energy grid management platform reducing industrial carbon emissions.", trust: ["Verified", "Revenue Verified", "Top Startup"] },
  { name: "EduVerse", sector: "EdTech", stage: "Seed", arr: "$840K", growth: "+165%", raise: "$4M", team: 18, users: "31K", founded: 2023, location: "Austin, USA", desc: "Adaptive learning platform personalizing education for K-12 students globally.", trust: ["Verified", "Top Startup"] },
  { name: "DataVault", sector: "SaaS", stage: "Series A", arr: "$5.2M", growth: "+120%", raise: "$18M", team: 45, users: "3.8K", founded: 2021, location: "Chicago, USA", desc: "Zero-trust data governance and compliance automation for enterprises.", trust: ["Verified", "Revenue Verified"] },
  { name: "MediScan AI", sector: "HealthTech", stage: "Series A", arr: "$1.8M", growth: "+275%", raise: "$6M", team: 22, users: "9K", founded: 2023, location: "San Diego, USA", desc: "AI diagnostic tool detecting diseases from medical imaging with 97% accuracy.", trust: ["Verified", "Revenue Verified", "Top Startup"] },
  { name: "CodeMentor AI", sector: "EdTech", stage: "Pre-Seed", arr: "$60K", growth: "+240%", raise: "$1M", team: 4, users: "5.2K", founded: 2025, location: "Remote", desc: "AI pair programmer and code mentor helping developers 3x their productivity.", trust: ["Verified"] },
  { name: "ClimateOS", sector: "CleanTech", stage: "Seed", arr: "$320K", growth: "+195%", raise: "$2.5M", team: 9, users: "1.4K", founded: 2024, location: "London, UK", desc: "Operating system for corporate net-zero programs—tracking, reporting, offsetting.", trust: ["Verified"] },
  { name: "PayStream", sector: "FinTech", stage: "Seed", arr: "$650K", growth: "+150%", raise: "$2.5M", team: 14, users: "6.7K", founded: 2023, location: "Miami, USA", desc: "Real-time B2B payment rails with embedded financing for emerging markets.", trust: ["Verified"] },
  { name: "AgriBot", sector: "AgTech", stage: "Pre-Seed", arr: "$40K", growth: "+320%", raise: "$800K", team: 5, users: "800", founded: 2025, location: "Iowa, USA", desc: "Autonomous crop monitoring robots + AI-driven yield optimization platform.", trust: ["Verified"] },
  { name: "VoiceAI", sector: "AI/ML", stage: "Seed", arr: "$920K", growth: "+400%", raise: "$5M", team: 16, users: "18K", founded: 2024, location: "London, UK", desc: "Real-time voice cloning and synthesis API powering the next generation of voice apps.", trust: ["Verified", "Revenue Verified"] },
];

const trustBadgeColors: Record<string, string> = {
  "Verified": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Revenue Verified": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Top Startup": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};
const trustBadgeIcons: Record<string, React.ElementType> = {
  "Verified": Shield, "Revenue Verified": CheckCircle, "Top Startup": Award,
};

const sectorColors: Record<string, string> = {
  "AI/ML": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "FinTech": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "HealthTech": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "SaaS": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  "CleanTech": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "EdTech": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "AgTech": "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400",
};

export function StartupMarketplacePage() {
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("All");
  const [filterStage, setFilterStage] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = startups.filter((s) => {
    const q = search.toLowerCase();
    return (
      (s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) &&
      (filterSector === "All" || s.sector === filterSector) &&
      (filterStage === "All" || s.stage === filterStage)
    );
  });

  const uniqueSectors = ["All", ...Array.from(new Set(startups.map((s) => s.sector)))];
  const uniqueStages = ["All", "Pre-Seed", "Seed", "Series A", "Series B+"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Zap className="h-6 w-6 text-indigo-600" />
          Startup Marketplace
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          {startups.length} curated, application-approved startups actively seeking investment
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search startups, sectors, descriptions..."
            className="pl-9 h-10 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
        >
          {uniqueSectors.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          className="text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
        >
          {uniqueStages.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2.5 ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 text-gray-500"}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2.5 ${viewMode === "list" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 text-gray-500"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sector Pills */}
      <div className="flex gap-2 flex-wrap">
        {uniqueSectors.map((s) => (
          <button
            key={s}
            onClick={() => setFilterSector(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterSector === s
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Result count */}
      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Showing {filtered.length} of {startups.length} startups
      </div>

      {/* Grid / List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((s, i) => (
            <Card key={i} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{s.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${sectorColors[s.sector] || "bg-gray-100 text-gray-600"}`}>
                          {s.sector}
                        </span>
                        <span className="text-xs text-gray-500">{s.stage}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{s.desc}</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{s.arr}</div>
                    <div className="text-xs text-gray-400">ARR</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-emerald-600">{s.growth}</div>
                    <div className="text-xs text-gray-400">Growth</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-indigo-600">{s.raise}</div>
                    <div className="text-xs text-gray-400">Raising</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-wrap gap-1">
                    {s.trust.map((t) => {
                      const Icon = trustBadgeIcons[t];
                      return (
                        <span key={t} className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${trustBadgeColors[t]}`}>
                          <Icon className="h-3 w-3" />
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <Globe className="h-3 w-3" />{s.location}
                  <span>·</span>
                  <Users className="h-3 w-3" />{s.team} team
                  <span>·</span>
                  Founded {s.founded}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 text-xs bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700">
                    Request Intro
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s, i) => (
            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{s.name}</h3>
                      <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${sectorColors[s.sector] || "bg-gray-100 text-gray-600"}`}>{s.sector}</span>
                      <span className="text-xs text-gray-500">{s.stage}</span>
                      {s.trust.slice(0, 2).map((t) => {
                        const Icon = trustBadgeIcons[t];
                        return (
                          <span key={t} className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${trustBadgeColors[t]}`}>
                            <Icon className="h-3 w-3" />{t}
                          </span>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{s.desc}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-6 shrink-0">
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{s.arr}</div>
                      <div className="text-xs text-gray-400">ARR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-emerald-600">{s.growth}</div>
                      <div className="text-xs text-gray-400">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-indigo-600">{s.raise}</div>
                      <div className="text-xs text-gray-400">Raising</div>
                    </div>
                  </div>
                  <Button size="sm" className="text-xs bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shrink-0">
                    Intro
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
