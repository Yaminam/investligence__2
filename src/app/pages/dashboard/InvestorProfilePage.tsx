import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Users, DollarSign, Globe, TrendingUp, Target, BriefcaseBusiness,
  Shield, Award, Check, Plus, X, Pause, EyeOff, Settings2, Building2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const sectors = ["AI/ML", "FinTech", "HealthTech", "SaaS", "CleanTech", "EdTech", "Web3", "Consumer", "AgTech", "BioTech", "CyberSec", "Logistics"];
const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series B+", "Growth"];
const portfolioCompanies = [
  { name: "DataVault", sector: "SaaS", stage: "Series B", invested: "$2M", year: 2022, status: "Active" },
  { name: "HealthBridge", sector: "HealthTech", stage: "Seed", invested: "$500K", year: 2024, status: "Active" },
  { name: "CloudCore", sector: "SaaS", stage: "Series B", invested: "$3M", year: 2021, status: "Exited" },
  { name: "FinFlow Pro", sector: "FinTech", stage: "Pre-Seed", invested: "$250K", year: 2024, status: "Active" },
];

export function InvestorProfilePage() {
  const { user } = useAuth();
  const [selectedSectors, setSelectedSectors] = useState(["AI/ML", "FinTech", "SaaS"]);
  const [selectedStages, setSelectedStages] = useState(["Seed", "Series A"]);
  const [dealFlowPaused, setDealFlowPaused] = useState(false);
  const [hiddenSectors, setHiddenSectors] = useState<string[]>(["Web3"]);
  const [dealLimit, setDealLimit] = useState(20);
  const [checkMin, setCheckMin] = useState("$500K");
  const [checkMax, setCheckMax] = useState("$3M");
  const [thesis, setThesis] = useState("We invest in early-stage B2B technology companies with strong product-market fit and repeatable revenue. Our focus is AI/ML and FinTech infrastructure plays with $100K+ ARR at Seed stage and $1M+ ARR at Series A.");
  const [saving, setSaving] = useState(false);

  const toggleSector = (s: string) => {
    setSelectedSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };
  const toggleStage = (s: string) => {
    setSelectedStages((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };
  const toggleHidden = (s: string) => {
    setHiddenSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-600" />
            Investor Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Your public profile seen by founders + your private deal flow settings
          </p>
        </div>
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1.5">
          VIP Investor
        </Badge>
      </div>

      {/* Profile Overview */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shrink-0">
              {user?.firstName?.charAt(0) || "I"}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user ? `${user.firstName} ${user.lastName}`.trim() || "Investor" : "Investor"}
                </h2>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 gap-1">
                  <Shield className="h-3 w-3" /> Verified Investor
                </Badge>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 gap-1">
                  <Award className="h-3 w-3" /> Top Investor
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{user?.company || "Investment Firm"} · Partner</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Portfolio Companies", value: "12" },
                  { label: "Total Deployed", value: "$24M" },
                  { label: "Avg Check Size", value: "$2M" },
                  { label: "Active Since", value: "2019" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                    <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Thesis */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-600" />
            Investment Thesis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Thesis Statement (visible to founders)</Label>
            <textarea
              className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white resize-none h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Target Sectors</Label>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSector(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedSectors.includes(s)
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {selectedSectors.includes(s) && <Check className="inline h-3 w-3 mr-1" />}
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Investment Stages</Label>
            <div className="flex flex-wrap gap-2">
              {stages.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleStage(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedStages.includes(s)
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {selectedStages.includes(s) && <Check className="inline h-3 w-3 mr-1" />}
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Min Check Size</Label>
              <Input value={checkMin} onChange={(e) => setCheckMin(e.target.value)} className="text-sm" placeholder="e.g. $250K" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Max Check Size</Label>
              <Input value={checkMax} onChange={(e) => setCheckMax(e.target.value)} className="text-sm" placeholder="e.g. $5M" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Flow Controls */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-indigo-600" />
            Deal Flow Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Pause toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dealFlowPaused ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                {dealFlowPaused ? <Pause className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">Deal Flow Status</div>
                <div className="text-xs text-gray-500">{dealFlowPaused ? "Paused — not receiving pitches" : "Active — receiving curated startup pitches"}</div>
              </div>
            </div>
            <button
              onClick={() => setDealFlowPaused(!dealFlowPaused)}
              className={`relative w-12 h-6 rounded-full transition-colors ${dealFlowPaused ? "bg-red-400" : "bg-emerald-500"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${dealFlowPaused ? "translate-x-0.5" : "translate-x-6"}`} />
            </button>
          </div>

          {/* Monthly limit */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100 text-amber-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">Monthly Submission Limit</div>
                <div className="text-xs text-gray-500">12 received this month</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDealLimit(Math.max(5, dealLimit - 5))} className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-slate-700 text-sm font-bold">-</button>
              <span className="w-10 text-center font-bold text-gray-900 dark:text-white">{dealLimit}</span>
              <button onClick={() => setDealLimit(Math.min(50, dealLimit + 5))} className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-slate-700 text-sm font-bold">+</button>
            </div>
          </div>

          {/* Hidden sectors */}
          <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <EyeOff className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900 dark:text-white text-sm">Hidden Sectors</span>
              <span className="text-xs text-gray-500">(you won't receive pitches from these)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleHidden(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                    hiddenSectors.includes(s)
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50"
                  }`}
                >
                  {hiddenSectors.includes(s) && <X className="h-3 w-3" />}
                  {s}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Companies */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-indigo-600" />
              Portfolio Companies
            </CardTitle>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" /> Add Company
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {portfolioCompanies.map((co, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-bold text-sm">
                    {co.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{co.name}</div>
                    <div className="text-xs text-gray-500">{co.sector} · {co.stage} · {co.year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-indigo-600">{co.invested}</div>
                    <div className="text-xs text-gray-400">Invested</div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${co.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400"}`}
                  >
                    {co.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button
          className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 px-8"
          onClick={handleSave}
        >
          {saving ? "Saving..." : "Save Profile"}
        </Button>
        <Button variant="outline">Preview Public Profile</Button>
      </div>
    </div>
  );
}
