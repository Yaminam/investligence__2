import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  TrendingUp, Search, Filter, Eye, DollarSign, Users, ArrowUp,
  Shield, CheckCircle, Award, ChevronRight, Star, Zap, Clock,
  BarChart3, Globe, Bookmark, SlidersHorizontal
} from "lucide-react";

const stages = ["All Stages", "Pre-Seed", "Seed", "Series A", "Series B+"];
const sectors = ["All Sectors", "AI/ML", "FinTech", "HealthTech", "SaaS", "CleanTech", "EdTech", "Web3", "Consumer"];
const sortOptions = ["Newest", "Most Viewed", "Fastest Growing", "Recently Funded", "Highest Match"];

const allStartups = [
  { name: "NeuralScale AI", sector: "AI/ML", stage: "Series A", arr: "$2.4M", growth: "+340%", raise: "$8M", team: 28, location: "San Francisco", match: 94, views: 1240, trust: ["Verified", "Revenue Verified"], trending: true, funded: false, bookmarked: false },
  { name: "HealthBridge", sector: "HealthTech", stage: "Seed", arr: "$480K", growth: "+210%", raise: "$3M", team: 12, location: "Boston", match: 88, views: 890, trust: ["Verified"], trending: true, funded: false, bookmarked: false },
  { name: "FinFlow Pro", sector: "FinTech", stage: "Pre-Seed", arr: "$120K", growth: "+180%", raise: "$1.5M", team: 6, location: "New York", match: 82, views: 670, trust: ["Verified"], trending: false, funded: false, bookmarked: false },
  { name: "EduVerse", sector: "EdTech", stage: "Seed", arr: "$840K", growth: "+165%", raise: "$4M", team: 18, location: "Austin", match: 79, views: 590, trust: ["Verified", "Top Startup"], trending: false, funded: false, bookmarked: false },
  { name: "GreenGrid", sector: "CleanTech", stage: "Series A", arr: "$3.1M", growth: "+290%", raise: "$12M", team: 34, location: "Seattle", match: 75, views: 1050, trust: ["Verified", "Revenue Verified", "Top Startup"], trending: true, funded: true, bookmarked: false },
  { name: "CodeMentor AI", sector: "EdTech", stage: "Pre-Seed", arr: "$60K", growth: "+240%", raise: "$1M", team: 4, location: "Remote", match: 71, views: 430, trust: ["Verified"], trending: false, funded: false, bookmarked: false },
  { name: "DataVault", sector: "SaaS", stage: "Series A", arr: "$5.2M", growth: "+120%", raise: "$18M", team: 45, location: "Chicago", match: 68, views: 1380, trust: ["Verified", "Revenue Verified"], trending: false, funded: false, bookmarked: false },
  { name: "ClimateOS", sector: "CleanTech", stage: "Seed", arr: "$320K", growth: "+195%", raise: "$2.5M", team: 9, location: "London", match: 65, views: 520, trust: ["Verified"], trending: false, funded: false, bookmarked: false },
  { name: "MediScan AI", sector: "HealthTech", stage: "Series A", arr: "$1.8M", growth: "+275%", raise: "$6M", team: 22, location: "San Diego", match: 91, views: 980, trust: ["Verified", "Revenue Verified", "Top Startup"], trending: true, funded: true, bookmarked: false },
  { name: "PayStream", sector: "FinTech", stage: "Seed", arr: "$650K", growth: "+150%", raise: "$2.5M", team: 14, location: "Miami", match: 86, views: 740, trust: ["Verified"], trending: false, funded: true, bookmarked: false },
];

const trustBadgeColors: Record<string, string> = {
  "Verified": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Revenue Verified": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Top Startup": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};
const trustBadgeIcons: Record<string, React.ElementType> = {
  "Verified": Shield, "Revenue Verified": CheckCircle, "Top Startup": Award,
};

export function DealFlowPage() {
  const [activeStage, setActiveStage] = useState("All Stages");
  const [activeSector, setActiveSector] = useState("All Sectors");
  const [activeSort, setActiveSort] = useState("Newest");
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<"all" | "trending" | "funded" | "recommended">("all");

  const filtered = allStartups.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.sector.toLowerCase().includes(search.toLowerCase());
    const matchStage = activeStage === "All Stages" || s.stage === activeStage;
    const matchSector = activeSector === "All Sectors" || s.sector === activeSector;
    const matchTab = activeTab === "all" ? true : activeTab === "trending" ? s.trending : activeTab === "funded" ? s.funded : s.match >= 80;
    return matchSearch && matchStage && matchSector && matchTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
            Deal Flow Feed
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Curated, verified startups matching your investment thesis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Advanced Filters
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700">
            <Star className="h-4 w-4" />
            Save Search
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Curated", value: "247", icon: Zap, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" },
          { label: "Currently Raising", value: "47", icon: DollarSign, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Trending Now", value: "18", icon: TrendingUp, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
          { label: "New This Week", value: "12", icon: Clock, color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "all", label: "All Startups" },
          { key: "trending", label: "Trending" },
          { key: "funded", label: "Recently Funded" },
          { key: "recommended", label: "AI Recommended" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search startups, sectors..."
                className="pl-9 h-9 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                className="text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                value={activeStage}
                onChange={(e) => setActiveStage(e.target.value)}
              >
                {stages.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                className="text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                value={activeSector}
                onChange={(e) => setActiveSector(e.target.value)}
              >
                {sectors.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                className="text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
              >
                {sortOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Startup List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Filter className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No startups match your filters</p>
            <p className="text-sm mt-1">Try adjusting your search criteria</p>
          </div>
        )}
        {filtered.map((startup, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-sm">
                    {startup.name.charAt(0)}
                  </div>
                  {startup.trending && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{startup.name}</h3>
                    {startup.trust.map((t) => {
                      const Icon = trustBadgeIcons[t];
                      return (
                        <span key={t} className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${trustBadgeColors[t]}`}>
                          <Icon className="h-3 w-3" />{t}
                        </span>
                      );
                    })}
                    {startup.funded && (
                      <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        Funded
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full font-medium">{startup.sector}</span>
                    <span>{startup.stage}</span>
                    <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{startup.location}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{startup.team} people</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{startup.views} views</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {[
                      { label: "ARR", value: startup.arr, color: "text-gray-900 dark:text-white" },
                      { label: "MoM Growth", value: startup.growth, color: "text-emerald-600" },
                      { label: "Raising", value: startup.raise, color: "text-indigo-600" },
                    ].map((metric) => (
                      <div key={metric.label} className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-2 text-center">
                        <div className={`text-sm font-bold ${metric.color}`}>{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold text-sm ${
                    startup.match >= 90 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : startup.match >= 80 ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                  }`}>
                    <span>{startup.match}%</span>
                    <span className="text-[9px] font-normal">Match</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setBookmarked((prev) => ({ ...prev, [i]: !prev[i] })); }}
                    className={`p-1.5 rounded-lg ${bookmarked[i] ? "text-indigo-600 bg-indigo-50" : "text-gray-400 hover:text-indigo-500"}`}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 gap-1.5 text-xs flex-1 sm:flex-none">
                  <Zap className="h-3.5 w-3.5" /> Request Intro
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs flex-1 sm:flex-none">
                  <Eye className="h-3.5 w-3.5" /> View Profile
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5 text-xs flex-1 sm:flex-none">
                  <BarChart3 className="h-3.5 w-3.5" /> Traction
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
