import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Check, Building2, User, Target, DollarSign, Globe, Sparkles,
  PartyPopper, TrendingUp, Rocket, BriefcaseBusiness, Users,
  ChevronRight, Shield, BarChart3, Zap
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

type Role = "investor" | "founder";

const investorSteps = [
  { label: "Your Role", icon: User },
  { label: "Profile", icon: Building2 },
  { label: "Investment Thesis", icon: Target },
  { label: "Check Size", icon: DollarSign },
  { label: "Sectors", icon: BarChart3 },
  { label: "Geography", icon: Globe },
  { label: "Ready!", icon: PartyPopper },
];

const founderSteps = [
  { label: "Your Role", icon: User },
  { label: "Profile", icon: Building2 },
  { label: "Company", icon: Rocket },
  { label: "Traction", icon: TrendingUp },
  { label: "Fundraising", icon: DollarSign },
  { label: "Ready!", icon: PartyPopper },
];

const sectors = ["AI/ML", "FinTech", "HealthTech", "SaaS", "CleanTech", "EdTech", "Web3", "Consumer", "AgTech", "BioTech", "CyberSec", "Logistics"];
const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series B+", "Growth"];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { completeOnboarding, user } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState(0);

  // Investor fields
  const [firmName, setFirmName] = useState(user?.company || "");
  const [title, setTitle] = useState("");
  const [thesisNote, setThesisNote] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>(["AI/ML"]);
  const [selectedStages, setSelectedStages] = useState<string[]>(["Seed", "Series A"]);
  const [checkMin, setCheckMin] = useState("$500K");
  const [checkMax, setCheckMax] = useState("$3M");
  const [geography, setGeography] = useState<string[]>(["USA"]);

  // Founder fields
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");
  const [arr, setArr] = useState("");
  const [growth, setGrowth] = useState("");
  const [raise, setRaise] = useState("");

  const steps = role === "investor" ? investorSteps : founderSteps;
  const totalSteps = steps.length;

  const toggleSector = (s: string) =>
    setSelectedSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleStage = (s: string) =>
    setSelectedStages((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleGeo = (g: string) =>
    setGeography((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const handleFinish = () => {
    completeOnboarding(role || "investor");
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    // Step 0: Role Selection
    if (step === 0) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to InvestLigence</h2>
            <p className="text-gray-500 dark:text-gray-400">The AI-powered deal flow platform. How are you joining?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => { setRole("investor"); setStep(1); }}
              className="group p-6 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left"
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors">
                <BriefcaseBusiness className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">I am an Investor</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Angels, VCs, Family Offices, CVCs, Syndicates</p>
              <div className="space-y-1">
                {["Access curated deal flow", "AI-matched startup recommendations", "Warm introductions", "VIP early access"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Check className="h-3.5 w-3.5 text-indigo-500" />{f}
                  </div>
                ))}
              </div>
              <Badge className="mt-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">VIP Access</Badge>
            </button>

            <button
              onClick={() => { setRole("founder"); setStep(1); }}
              className="group p-6 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all text-left"
            >
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors">
                <Rocket className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">I am a Founder</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Startup founders seeking institutional investment</p>
              <div className="space-y-1">
                {["Apply for marketplace listing", "Curated investor matching", "Traction metrics showcase", "Warm intro requests"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />{f}
                  </div>
                ))}
              </div>
              <Badge className="mt-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Apply Required</Badge>
            </button>
          </div>
        </div>
      );
    }

    // INVESTOR steps
    if (role === "investor") {
      if (step === 1) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
          <p className="text-gray-500 text-sm">This information is shown to founders who receive your intro requests.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="text-sm mb-1.5 block">First Name</Label><Input value={user?.firstName || ""} disabled className="bg-gray-50" /></div>
            <div><Label className="text-sm mb-1.5 block">Last Name</Label><Input value={user?.lastName || ""} disabled className="bg-gray-50" /></div>
            <div><Label className="text-sm mb-1.5 block">Firm / Organization *</Label><Input placeholder="e.g. Sequoia Capital / Angel" value={firmName} onChange={(e) => setFirmName(e.target.value)} /></div>
            <div><Label className="text-sm mb-1.5 block">Title / Role</Label><Input placeholder="e.g. Partner, Angel Investor" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          </div>
        </div>
      );

      if (step === 2) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Investment Thesis</h2>
          <p className="text-gray-500 text-sm">Describe your investment focus. Our AI uses this to match you with the right startups.</p>
          <textarea
            className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white resize-none h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. I invest in early-stage B2B SaaS and AI companies with strong product-market fit, typically at Seed to Series A. I look for $100K+ ARR and clear enterprise go-to-market..."
            value={thesisNote}
            onChange={(e) => setThesisNote(e.target.value)}
          />
          <div>
            <Label className="text-sm mb-2 block">Investment Stage(s)</Label>
            <div className="flex flex-wrap gap-2">
              {stages.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleStage(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedStages.includes(s) ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"}`}
                >
                  {selectedStages.includes(s) && <Check className="inline h-3 w-3 mr-1" />}{s}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

      if (step === 3) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Check Size</h2>
          <p className="text-gray-500 text-sm">Startups outside your check size range won't appear in your deal flow.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="text-sm mb-1.5 block">Minimum Check</Label><Input placeholder="e.g. $100K" value={checkMin} onChange={(e) => setCheckMin(e.target.value)} /></div>
            <div><Label className="text-sm mb-1.5 block">Maximum Check</Label><Input placeholder="e.g. $5M" value={checkMax} onChange={(e) => setCheckMax(e.target.value)} /></div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 text-sm text-indigo-700 dark:text-indigo-400 flex gap-2">
            <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
            Our AI uses this to filter startups raising amounts that fit your typical participation range.
          </div>
        </div>
      );

      if (step === 4) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Target Sectors</h2>
          <p className="text-gray-500 text-sm">Select all sectors you actively invest in. You can change these anytime.</p>
          <div className="flex flex-wrap gap-2">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => toggleSector(s)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${selectedSectors.includes(s) ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"}`}
              >
                {selectedSectors.includes(s) && <Check className="inline h-3.5 w-3.5 mr-1" />}{s}
              </button>
            ))}
          </div>
        </div>
      );

      if (step === 5) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Geographic Focus</h2>
          <p className="text-gray-500 text-sm">Filter deal flow to your preferred geographies.</p>
          <div className="flex flex-wrap gap-2">
            {["USA", "Europe", "Southeast Asia", "India", "Latin America", "Africa", "Middle East", "Global"].map((g) => (
              <button
                key={g}
                onClick={() => toggleGeo(g)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${geography.includes(g) ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"}`}
              >
                {geography.includes(g) && <Check className="h-3.5 w-3.5" />}{g}
              </button>
            ))}
          </div>
        </div>
      );

      if (step === 6) return (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <PartyPopper className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're all set, {user?.firstName}!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Your investor profile is ready. Your AI-powered deal flow feed is live with {selectedSectors.length} sectors and {selectedStages.length} stages configured.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { label: "Sectors Watching", value: String(selectedSectors.length), color: "text-indigo-600" },
              { label: "Curated Startups", value: "247", color: "text-violet-600" },
              { label: "AI Matches Ready", value: "18", color: "text-emerald-600" },
              { label: "Active Investors", value: "625", color: "text-amber-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <Button
            className="w-full max-w-sm bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 text-base font-semibold py-6 gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-900"
            onClick={handleFinish}
          >
            <Zap className="h-5 w-5" />
            Enter Deal Flow Dashboard
          </Button>
        </div>
      );
    }

    // FOUNDER steps
    if (role === "founder") {
      if (step === 1) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
          <p className="text-gray-500 text-sm">Investors will see your profile when you apply for listing.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="text-sm mb-1.5 block">First Name</Label><Input value={user?.firstName || ""} disabled className="bg-gray-50" /></div>
            <div><Label className="text-sm mb-1.5 block">Last Name</Label><Input value={user?.lastName || ""} disabled className="bg-gray-50" /></div>
          </div>
        </div>
      );

      if (step === 2) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="text-sm mb-1.5 block">Company Name *</Label><Input placeholder="e.g. NeuralScale AI" value={companyName} onChange={(e) => setCompanyName(e.target.value)} /></div>
            <div><Label className="text-sm mb-1.5 block">Sector *</Label>
              <select className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" value={sector} onChange={(e) => setSector(e.target.value)}>
                <option value="">Select...</option>
                {sectors.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div><Label className="text-sm mb-1.5 block">Stage *</Label>
              <select className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" value={stage} onChange={(e) => setStage(e.target.value)}>
                <option value="">Select...</option>
                {stages.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      );

      if (step === 3) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Traction Metrics</h2>
          <p className="text-gray-500 text-sm">Investors make quick decisions based on metrics. Be accurate.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="text-sm mb-1.5 block">Monthly ARR</Label><Input placeholder="e.g. $150K" value={arr} onChange={(e) => setArr(e.target.value)} /></div>
            <div><Label className="text-sm mb-1.5 block">MoM Growth</Label><Input placeholder="e.g. +25%" value={growth} onChange={(e) => setGrowth(e.target.value)} /></div>
          </div>
        </div>
      );

      if (step === 4) return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fundraising</h2>
          <div><Label className="text-sm mb-1.5 block">Amount Raising *</Label><Input placeholder="e.g. $2M" value={raise} onChange={(e) => setRaise(e.target.value)} /></div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
            After setup, you'll submit a full application. Our team reviews all applications within 3–5 days before your startup goes live to investors.
          </div>
        </div>
      );

      if (step === 5) return (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <PartyPopper className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Almost there, {user?.firstName}!</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Your profile is set up. Complete your startup application to be reviewed by our curation team and go live to <strong>500+ verified investors</strong>.
            </p>
          </div>
          <Button
            className="w-full max-w-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 text-base font-semibold py-6 gap-2 shadow-lg shadow-emerald-200 dark:shadow-emerald-900"
            onClick={handleFinish}
          >
            <Rocket className="h-5 w-5" />
            Go to Founder Dashboard
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        {role && step > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? "bg-indigo-600 text-white"
                      : i === step ? "bg-white border-2 border-indigo-600 text-indigo-600"
                      : "bg-gray-200 dark:bg-slate-700 text-gray-400"
                  }`}>
                    {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 min-w-[8px] transition-all ${i < step ? "bg-indigo-600" : "bg-gray-200 dark:bg-slate-700"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {steps.map((s, i) => (
                <span key={i} className={`text-xs ${i === step ? "text-indigo-600 font-medium" : "text-gray-400"}`}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-slate-800">
          {renderStepContent()}

          {/* Nav buttons (not for role selection step or final step) */}
          {role && step > 0 && step < totalSteps - 1 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="text-gray-500"
              >
                Back
              </Button>
              <Button
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 gap-2"
                onClick={() => setStep(step + 1)}
              >
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
