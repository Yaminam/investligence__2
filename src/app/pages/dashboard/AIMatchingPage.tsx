import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Sparkles, Shield, CheckCircle, Award, TrendingUp, DollarSign,
  Users, Globe, Zap, ChevronDown, ChevronUp, Brain, Target,
  BarChart3, MapPin, CheckSquare
} from "lucide-react";

const thesis = {
  sectors: ["AI/ML", "FinTech", "SaaS"],
  stages: ["Seed", "Series A"],
  checkSize: "$500K - $3M",
  locations: ["USA", "Europe"],
  minRevenue: "$100K ARR",
};

const matches = [
  {
    name: "NeuralScale AI",
    sector: "AI/ML",
    stage: "Series A",
    arr: "$2.4M",
    growth: "+340%",
    raise: "$8M",
    team: 28,
    location: "SF, USA",
    matchScore: 94,
    matchReasons: [
      { reason: "Sector match: AI/ML is your top thesis sector", strength: "strong" },
      { reason: "Stage match: Series A is within your range", strength: "strong" },
      { reason: "Check size: $8M raise fits your $500K–$3M participation range", strength: "strong" },
      { reason: "Location: USA matches your geographic preference", strength: "strong" },
      { reason: "Traction: $2.4M ARR exceeds your $100K minimum", strength: "strong" },
    ],
    trust: ["Verified", "Revenue Verified", "Top Startup"],
    trending: true,
  },
  {
    name: "MediScan AI",
    sector: "HealthTech",
    stage: "Series A",
    arr: "$1.8M",
    growth: "+275%",
    raise: "$6M",
    team: 22,
    location: "San Diego, USA",
    matchScore: 91,
    matchReasons: [
      { reason: "Stage match: Series A is within your range", strength: "strong" },
      { reason: "Location: USA matches your geographic preference", strength: "strong" },
      { reason: "Traction: $1.8M ARR exceeds your minimum", strength: "strong" },
      { reason: "Sector: HealthTech adjacent to your SaaS interest", strength: "moderate" },
      { reason: "Check size: $6M raise fits your participation range", strength: "strong" },
    ],
    trust: ["Verified", "Revenue Verified", "Top Startup"],
    trending: true,
  },
  {
    name: "HealthBridge",
    sector: "HealthTech",
    stage: "Seed",
    arr: "$480K",
    growth: "+210%",
    raise: "$3M",
    team: 12,
    location: "Boston, USA",
    matchScore: 88,
    matchReasons: [
      { reason: "Stage match: Seed is within your preferred stages", strength: "strong" },
      { reason: "Check size: $3M raise aligns with your range", strength: "strong" },
      { reason: "Location: USA matches your geographic preference", strength: "strong" },
      { reason: "Growth: +210% MoM is exceptional early signal", strength: "strong" },
      { reason: "Sector: HealthTech partial overlap with SaaS tools", strength: "moderate" },
    ],
    trust: ["Verified"],
    trending: false,
  },
  {
    name: "PayStream",
    sector: "FinTech",
    stage: "Seed",
    arr: "$650K",
    growth: "+150%",
    raise: "$2.5M",
    team: 14,
    location: "Miami, USA",
    matchScore: 86,
    matchReasons: [
      { reason: "Sector match: FinTech is your high-priority sector", strength: "strong" },
      { reason: "Stage match: Seed is within your preference", strength: "strong" },
      { reason: "Traction: $650K ARR exceeds minimum threshold", strength: "strong" },
      { reason: "Check size: $2.5M total raise fits participation range", strength: "strong" },
      { reason: "Location: Miami tech ecosystem is high-growth", strength: "moderate" },
    ],
    trust: ["Verified"],
    trending: false,
  },
  {
    name: "FinFlow Pro",
    sector: "FinTech",
    stage: "Pre-Seed",
    arr: "$120K",
    growth: "+180%",
    raise: "$1.5M",
    team: 6,
    location: "NYC, USA",
    matchScore: 82,
    matchReasons: [
      { reason: "Sector match: FinTech is your high-priority sector", strength: "strong" },
      { reason: "Location: NYC, USA matches your preference", strength: "strong" },
      { reason: "Growth: +180% is strong early traction", strength: "strong" },
      { reason: "Stage: Pre-Seed is below your Seed preference", strength: "weak" },
      { reason: "Traction: $120K ARR is above minimum threshold", strength: "moderate" },
    ],
    trust: ["Verified"],
    trending: false,
  },
];

const trustBadgeColors: Record<string, string> = {
  "Verified": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Revenue Verified": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Top Startup": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};
const trustBadgeIcons: Record<string, React.ElementType> = {
  "Verified": Shield, "Revenue Verified": CheckCircle, "Top Startup": Award,
};

const strengthColors: Record<string, string> = {
  strong: "text-emerald-600",
  moderate: "text-amber-500",
  weak: "text-red-400",
};
const strengthIcons: Record<string, string> = {
  strong: "✓✓", moderate: "✓", weak: "~",
};

export function AIMatchingPage() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [editThesis, setEditThesis] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-violet-600" />
            AI Matching Engine
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            AI-powered matches based on your investment thesis — updated daily
          </p>
        </div>
        <Button
          onClick={() => setEditThesis(!editThesis)}
          variant="outline"
          className="gap-2 text-sm"
        >
          <Brain className="h-4 w-4" />
          {editThesis ? "Close Editor" : "Edit Thesis"}
        </Button>
      </div>

      {/* Thesis Panel */}
      {editThesis && (
        <Card className="border-indigo-200 dark:border-indigo-800 shadow-sm bg-indigo-50/50 dark:bg-indigo-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-600" />
              Your Investment Thesis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Target Sectors", value: thesis.sectors.join(", "), icon: BarChart3 },
                { label: "Investment Stages", value: thesis.stages.join(", "), icon: TrendingUp },
                { label: "Check Size", value: thesis.checkSize, icon: DollarSign },
                { label: "Geography", value: thesis.locations.join(", "), icon: MapPin },
                { label: "Min Revenue", value: thesis.minRevenue, icon: CheckSquare },
              ].map((field) => (
                <div key={field.label} className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                    <field.icon className="h-3.5 w-3.5" />
                    {field.label}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{field.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                Update Thesis
              </Button>
              <Button size="sm" variant="outline">
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Match Score Legend */}
      <div className="flex flex-wrap gap-4 items-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Match Score:</span>
        {[
          { range: "90-100%", label: "Excellent", color: "bg-emerald-100 text-emerald-700" },
          { range: "80-89%", label: "Strong", color: "bg-indigo-100 text-indigo-700" },
          { range: "70-79%", label: "Good", color: "bg-amber-100 text-amber-700" },
          { range: "<70%", label: "Partial", color: "bg-gray-100 text-gray-600" },
        ].map((item) => (
          <div key={item.range} className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.color}`}>{item.range}</span>
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
        <div className="ml-auto text-sm text-gray-500">
          <strong className="text-gray-900 dark:text-white">{matches.length}</strong> matches found
        </div>
      </div>

      {/* Match Cards */}
      <div className="space-y-4">
        {matches.map((m, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
                  {m.name.charAt(0)}
                </div>

                {/* Main */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{m.name}</h3>
                    {m.trending && (
                      <Badge className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        Trending
                      </Badge>
                    )}
                    {m.trust.map((t) => {
                      const Icon = trustBadgeIcons[t];
                      return (
                        <span key={t} className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${trustBadgeColors[t]}`}>
                          <Icon className="h-3 w-3" />{t}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">{m.sector}</span>
                    <span>{m.stage}</span>
                    <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{m.location}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{m.team} team</span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[
                      { label: "ARR", value: m.arr, color: "text-gray-900 dark:text-white" },
                      { label: "Growth", value: m.growth, color: "text-emerald-600" },
                      { label: "Raising", value: m.raise, color: "text-indigo-600" },
                    ].map((metric) => (
                      <div key={metric.label} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2 text-center">
                        <div className={`text-sm font-bold ${metric.color}`}>{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Match Reasons Accordion */}
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    <Brain className="h-3.5 w-3.5" />
                    Why this match?
                    {expanded === i ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {expanded === i && (
                    <div className="mt-3 space-y-2 bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4">
                      {m.matchReasons.map((r, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className={`text-xs font-bold shrink-0 ${strengthColors[r.strength]}`}>
                            {strengthIcons[r.strength]}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-300">{r.reason}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Match Score */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold ${
                    m.matchScore >= 90
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-2 ring-emerald-400"
                      : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 ring-2 ring-indigo-300"
                  }`}>
                    <span className="text-lg">{m.matchScore}%</span>
                    <span className="text-[9px] font-normal text-gray-500">match</span>
                  </div>
                  <Button size="sm" className="text-xs bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 px-3">
                    <Zap className="h-3 w-3 mr-1" />
                    Intro
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
