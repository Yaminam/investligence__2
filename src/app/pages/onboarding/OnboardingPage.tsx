import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Check, Building2, User, Target, DollarSign, Globe, Sparkles,
  PartyPopper, TrendingUp, Rocket, BriefcaseBusiness, Users,
  ChevronRight, BarChart3, Zap, Banknote, Home, Building, AlertTriangle, ArrowLeft,
  Lightbulb, Star
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { InvestorType, investorTypeConfigs, investorTypeOnboarding, OnboardingFieldConfig } from "../../lib/investorTypes";

type Role = "investor" | "founder";
type FounderType = "active" | "idea" | null;

// Fixed 5-step flow for all investor types: Role → Type → Profile → Focus → Details → Ready!
const INVESTOR_STEP_LABELS = ["Investor Type", "Profile", "Focus", "Details", "Ready!"];
const ACTIVE_FOUNDER_STEPS = ["Founder Type", "Profile", "Company", "Traction", "Fundraising", "Ready!"];
const IDEA_FOUNDER_STEPS   = ["Founder Type", "Profile", "Your Idea", "Vision", "Support Needed", "Ready!"];

const sectors = ["AI/ML", "FinTech", "HealthTech", "SaaS", "CleanTech", "EdTech", "Web3", "Consumer", "AgTech", "BioTech", "CyberSec", "Logistics"];
const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series B+", "Growth"];
const ideaStages = ["Brainstorming", "Market Research", "Prototype", "MVP Built"];
const supportOptions = ["Pre-seed Investment", "Mentorship", "Co-founder Match", "Advisory Board", "Accelerator", "Community & Network"];

const iconMap: Record<string, any> = {
  Sparkles, TrendingUp, Building2, Banknote, Home, Building, AlertTriangle,
  Target, DollarSign, Globe, BarChart3, PartyPopper, User, Rocket, BriefcaseBusiness, Users
};

export function OnboardingPage() {
  const navigate = useNavigate();
  const { completeOnboarding, user } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [investorType, setInvestorType] = useState<InvestorType | null>(null);
  const [founderType, setFounderType] = useState<FounderType>(null);
  // step: 0=role, 1=type-select, 2=profile, 3=step3, 4=step4, 5=step5, 6=ready
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Active founder fields
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");
  const [arr, setArr] = useState("");
  const [growth, setGrowth] = useState("");
  const [raise, setRaise] = useState("");
  // Idea stage founder fields
  const [ideaTitle, setIdeaTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [ideaSector, setIdeaSector] = useState("");
  const [ideaStage, setIdeaStage] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);

  const toggleSupport = (val: string) =>
    setSelectedSupport((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );

  // Max content step before ready screen
  // investor: steps 1-5, founder: steps 1-6

  const toggleMultiSelect = (fieldName: string, value: string) =>
    setFormData((prev) => {
      const arr = prev[fieldName] || [];
      return {
        ...prev,
        [fieldName]: arr.includes(value) ? arr.filter((x: string) => x !== value) : [...arr, value],
      };
    });

  const handleFinish = () => {
    const finalData = role === "founder" ? { ...formData, founderType } : formData;
    completeOnboarding(role || "investor", investorType || undefined, finalData);
    navigate("/dashboard");
  };

  // Renders a single field
  const renderField = (field: OnboardingFieldConfig) => {
    const common = "w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors";

    if (field.type === 'text') {
      return (
        <Input
          key={field.field}
          placeholder={field.placeholder}
          value={formData[field.field] || ""}
          onChange={(e) => setFormData({ ...formData, [field.field]: e.target.value })}
          className="h-11"
        />
      );
    }
    if (field.type === 'number') {
      return (
        <Input
          key={field.field}
          type="number"
          placeholder={field.placeholder}
          value={formData[field.field] || ""}
          onChange={(e) => setFormData({ ...formData, [field.field]: e.target.value })}
          className="h-11"
        />
      );
    }
    if (field.type === 'textarea') {
      return (
        <textarea
          key={field.field}
          className={`${common} resize-none h-28`}
          placeholder={field.placeholder}
          value={formData[field.field] || ""}
          onChange={(e) => setFormData({ ...formData, [field.field]: e.target.value })}
        />
      );
    }
    if (field.type === 'select' && field.options) {
      return (
        <select
          key={field.field}
          className={`${common} h-11 appearance-none cursor-pointer`}
          value={formData[field.field] || ""}
          onChange={(e) => setFormData({ ...formData, [field.field]: e.target.value })}
        >
          <option value="">Select...</option>
          {field.options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
      );
    }
    if (field.type === 'multiselect' && field.options) {
      return (
        <div key={field.field} className="flex flex-wrap gap-2">
          {field.options.map((opt: string) => {
            const selected = (formData[field.field] || []).includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleMultiSelect(field.field, opt)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  selected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-indigo-400"
                }`}
              >
                {selected && <Check className="inline h-3 w-3 mr-1 -mt-0.5" />}
                {opt}
              </button>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // Renders a group of fields (profile, focus, or details step)
  const renderFieldGroup = (groupIndex: number) => {
    if (!investorType) return null;
    const groups = investorTypeOnboarding[investorType];
    const group = groups[groupIndex];
    if (!group) return null;

    // Split fields into paired halves and full-width
    const rows: OnboardingFieldConfig[][] = [];
    let i = 0;
    while (i < group.fields.length) {
      const f = group.fields[i];
      if (f.half && i + 1 < group.fields.length && group.fields[i + 1].half) {
        rows.push([f, group.fields[i + 1]]);
        i += 2;
      } else {
        rows.push([f]);
        i++;
      }
    }

    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{group.title}</h2>
          {group.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{group.subtitle}</p>}
        </div>
        <div className="space-y-4">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className={row.length === 2 ? "grid grid-cols-2 gap-3" : ""}>
              {row.map((field) => (
                <div key={field.field} className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInvestorTypeSelector = () => {
    const investorTypes: InvestorType[] = ['angel', 'venture-capital', 'bank', 'nbfc', 'family-office', 'corporate-venture'];
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">What type of investor are you?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select the option that best describes your investment profile</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {investorTypes.map((type) => {
            const config = investorTypeConfigs[type];
            const IconComponent = iconMap[config.icon] || Sparkles;
            const isSelected = investorType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => { setInvestorType(type); setFormData({}); }}
                className={`group p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-gray-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "bg-indigo-600" : "bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200"
                  }`}>
                    <IconComponent className={`h-4.5 w-4.5 ${isSelected ? "text-white" : "text-indigo-600"}`} style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold leading-tight ${isSelected ? "text-indigo-700 dark:text-indigo-400" : "text-gray-900 dark:text-white"}`}>
                      {config.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{config.description}</div>
                  </div>
                  {isSelected && (
                    <div className="ml-auto shrink-0">
                      <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderInvestorStepContent = () => {
    if (step === 1) return renderInvestorTypeSelector();
    // Steps 2, 3, 4 → group indices 0, 1, 2
    if (step >= 2 && step <= 4) return renderFieldGroup(step - 2);
    // Step 5 = Ready
    if (step === 5) {
      return (
        <div className="text-center space-y-6 py-4">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40">
            <PartyPopper className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're all set{user?.firstName ? `, ${user.firstName}` : ""}!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
              {investorType && `Your ${investorTypeConfigs[investorType].label} profile is live. `}
              Your AI-powered deal flow feed is ready with curated matches.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "Curated Startups", value: "247", color: "text-indigo-600" },
              { label: "AI Matches Ready", value: "18", color: "text-violet-600" },
              { label: "Active Raises", value: "47", color: "text-emerald-600" },
              { label: "Verified Investors", value: "625", color: "text-amber-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
          <Button
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 text-base font-semibold py-6 gap-2 shadow-lg shadow-indigo-200 dark:shadow-indigo-900"
            onClick={handleFinish}
          >
            <Zap className="h-5 w-5" />
            Enter Deal Flow Dashboard
          </Button>
        </div>
      );
    }
    return null;
  };

  const canProceedFromTypeStep = step === 1 && role === "investor" && investorType !== null;
  const isLastInvestorStep = role === "investor" && step === 4;

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to InvestLigence</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">The AI-powered deal flow platform. How are you joining?</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => { setRole("investor"); setStep(1); }}
              className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors shrink-0">
                  <BriefcaseBusiness className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">I am an Investor</h3>
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs">VIP Access</Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Angels, VCs, Banks, NBFCs, Family Offices, CVCs</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
            </button>
            <button
              type="button"
              onClick={() => { setRole("founder"); setStep(1); }}
              className="group p-5 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors shrink-0">
                  <Rocket className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">I am a Founder</h3>
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">Apply Required</Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Startup founders seeking institutional investment</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (role === "investor") return renderInvestorStepContent();

    // FOUNDER steps
    if (role === "founder") {
      const selectClass = "w-full h-11 text-sm border border-gray-200 dark:border-slate-700 rounded-xl px-3.5 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500";

      // Step 1 — Founder Type selector
      if (step === 1) return (
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What stage are you at?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This shapes your entire experience on the platform.</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {([
              {
                type: "active" as const,
                icon: Rocket,
                color: "emerald",
                title: "Active Startup",
                badge: "Apply Required",
                badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                desc: "I have a registered company, am building a product, and seeking investment.",
                border: "hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
                activeBorder: "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
                iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
                iconColor: "text-emerald-600",
                checkBg: "bg-emerald-600",
              },
              {
                type: "idea" as const,
                icon: Lightbulb,
                color: "violet",
                title: "Idea Stage",
                badge: "Early Access",
                badgeClass: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
                desc: "I have a business idea and am looking for mentorship, a co-founder, or pre-seed support.",
                border: "hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20",
                activeBorder: "border-violet-500 bg-violet-50 dark:bg-violet-900/20",
                iconBg: "bg-violet-100 dark:bg-violet-900/30",
                iconColor: "text-violet-600",
                checkBg: "bg-violet-600",
              },
            ] as const).map((opt) => {
              const isSelected = founderType === opt.type;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setFounderType(opt.type)}
                  className={`group p-5 rounded-2xl border-2 transition-all text-left ${
                    isSelected ? opt.activeBorder : `border-gray-200 dark:border-slate-700 ${opt.border}`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${opt.iconBg}`}>
                      <Icon className={`h-6 w-6 ${opt.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">{opt.title}</h3>
                        <Badge className={`text-xs ${opt.badgeClass}`}>{opt.badge}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{opt.desc}</p>
                    </div>
                    {isSelected && (
                      <div className={`w-6 h-6 ${opt.checkBg} rounded-full flex items-center justify-center shrink-0`}>
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );

      // Step 2 — Profile (same for both types)
      if (step === 2) return (
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Investors will see this on your listing.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label className="text-sm font-medium">First Name</Label><Input value={user?.firstName || ""} disabled className="bg-gray-50 dark:bg-slate-800/60 h-11" /></div>
            <div className="space-y-1.5"><Label className="text-sm font-medium">Last Name</Label><Input value={user?.lastName || ""} disabled className="bg-gray-50 dark:bg-slate-800/60 h-11" /></div>
          </div>
        </div>
      );

      // ── ACTIVE STARTUP path ──────────────────────────────────────
      if (founderType === "active") {
        if (step === 3) return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Company</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5"><Label className="text-sm font-medium">Company Name <span className="text-red-400">*</span></Label><Input placeholder="e.g. NeuralScale AI" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="h-11" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-sm font-medium">Sector <span className="text-red-400">*</span></Label>
                  <select className={selectClass} value={sector} onChange={(e) => setSector(e.target.value)}>
                    <option value="">Select...</option>{sectors.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5"><Label className="text-sm font-medium">Stage <span className="text-red-400">*</span></Label>
                  <select className={selectClass} value={stage} onChange={(e) => setStage(e.target.value)}>
                    <option value="">Select...</option>{stages.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
        if (step === 4) return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Traction Metrics</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Investors make quick decisions based on metrics. Be accurate.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label className="text-sm font-medium">Monthly ARR</Label><Input placeholder="e.g. $150K" value={arr} onChange={(e) => setArr(e.target.value)} className="h-11" /></div>
              <div className="space-y-1.5"><Label className="text-sm font-medium">MoM Growth</Label><Input placeholder="e.g. +25%" value={growth} onChange={(e) => setGrowth(e.target.value)} className="h-11" /></div>
            </div>
          </div>
        );
        if (step === 5) return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fundraising</h2>
            </div>
            <div className="space-y-1.5"><Label className="text-sm font-medium">Amount Raising <span className="text-red-400">*</span></Label><Input placeholder="e.g. $2M" value={raise} onChange={(e) => setRaise(e.target.value)} className="h-11" /></div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
              After setup, you'll submit a full application. Our team reviews within 3–5 days.
            </div>
          </div>
        );
      }

      // ── IDEA STAGE path ──────────────────────────────────────────
      if (founderType === "idea") {
        if (step === 3) return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tell Us Your Idea</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Don't worry — it doesn't need to be perfect yet.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Idea Title <span className="text-red-400">*</span></Label>
                <Input placeholder="e.g. AI-powered hiring platform for SMEs" value={ideaTitle} onChange={(e) => setIdeaTitle(e.target.value)} className="h-11" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-sm font-medium">Domain / Sector <span className="text-red-400">*</span></Label>
                  <select className={selectClass} value={ideaSector} onChange={(e) => setIdeaSector(e.target.value)}>
                    <option value="">Select...</option>{sectors.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5"><Label className="text-sm font-medium">Current Stage <span className="text-red-400">*</span></Label>
                  <select className={selectClass} value={ideaStage} onChange={(e) => setIdeaStage(e.target.value)}>
                    <option value="">Select...</option>{ideaStages.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Problem You're Solving</Label>
                <textarea
                  className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white resize-none h-24 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="What pain point does your idea address? Who faces this problem?"
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        if (step === 4) return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Vision</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Help us understand who you're building this for.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Target Market / Customer</Label>
                <Input placeholder="e.g. Small businesses in India, 1–50 employees" value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} className="h-11" />
              </div>
              <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-violet-600" />
                  <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">Idea Stage Perks</span>
                </div>
                <ul className="space-y-1 text-xs text-violet-600 dark:text-violet-400">
                  <li>• Access to mentors & domain experts</li>
                  <li>• Co-founder matching network</li>
                  <li>• Pre-seed investor introductions</li>
                  <li>• Startup community & workshops</li>
                </ul>
              </div>
            </div>
          </div>
        );
        if (step === 5) return (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">What Support Do You Need?</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select all that apply — we'll connect you to the right people.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {supportOptions.map((opt) => {
                const selected = selectedSupport.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleSupport(opt)}
                    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all border ${
                      selected
                        ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                        : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-violet-400"
                    }`}
                  >
                    {selected && <Check className="inline h-3 w-3 mr-1 -mt-0.5" />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // Step 6 — Ready (both types)
      if (step === 6) {
        const isIdea = founderType === "idea";
        return (
          <div className="text-center space-y-6 py-4">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl ${
              isIdea
                ? "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-200 dark:shadow-violet-900/40"
                : "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-200 dark:shadow-emerald-900/40"
            }`}>
              {isIdea ? <Lightbulb className="w-10 h-10 text-white" /> : <PartyPopper className="w-10 h-10 text-white" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isIdea ? `Welcome, ${user?.firstName || "Visionary"}!` : `Almost there${user?.firstName ? `, ${user.firstName}` : ""}!`}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
                {isIdea
                  ? "Your idea stage profile is live. We'll start matching you with mentors, co-founders, and early-stage investors."
                  : "Complete your startup application to be reviewed by our curation team and go live to 500+ verified investors."}
              </p>
            </div>
            {isIdea ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Mentors Available", value: "120+", color: "text-violet-600" },
                  { label: "Co-founder Matches", value: "84", color: "text-purple-600" },
                  { label: "Pre-seed Investors", value: "47", color: "text-indigo-600" },
                  { label: "Active Communities", value: "12", color: "text-pink-600" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
            <Button
              className={`w-full text-white text-base font-semibold py-6 gap-2 shadow-lg ${
                isIdea
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-violet-200 dark:shadow-violet-900"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              }`}
              onClick={handleFinish}
            >
              {isIdea ? <Lightbulb className="h-5 w-5" /> : <Rocket className="h-5 w-5" />}
              {isIdea ? "Explore Idea Stage Dashboard" : "Go to Founder Dashboard"}
            </Button>
          </div>
        );
      }
    }
    return null;
  };

  // Progress bar data
  const progressLabels =
    role === "investor"
      ? INVESTOR_STEP_LABELS
      : founderType === "idea"
      ? IDEA_FOUNDER_STEPS
      : ACTIVE_FOUNDER_STEPS;
  const currentProgressStep = step - 1; // step 0 is role screen (no bar)
  const totalProgressSteps = progressLabels.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Top wordmark */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">InvestLigence</span>
        </div>

        {/* Progress indicator (only when past role selection) */}
        {role && step > 0 && step < 7 && (
          <div className="mb-6">
            {/* Step dots */}
            <div className="flex items-center justify-center gap-0 mb-3">
              {progressLabels.map((label, i) => {
                const isDone = i < currentProgressStep;
                const isCurrent = i === currentProgressStep;
                return (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 ${
                        isDone
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : isCurrent
                          ? "bg-white dark:bg-slate-900 border-indigo-600 text-indigo-600"
                          : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-400"
                      }`}>
                        {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                    </div>
                    {i < totalProgressSteps - 1 && (
                      <div className={`h-0.5 w-8 transition-all duration-300 mx-0.5 ${i < currentProgressStep ? "bg-indigo-600" : "bg-gray-200 dark:bg-slate-700"}`} />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Label row */}
            <div className="flex items-start justify-center gap-0">
              {progressLabels.map((label, i) => {
                const isCurrent = i === currentProgressStep;
                return (
                  <div key={i} className="flex-shrink-0 text-center" style={{ width: i < totalProgressSteps - 1 ? 'calc(32px + 34px)' : '32px' }}>
                    <span className={`text-[10px] leading-tight block truncate ${isCurrent ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-gray-200/60 dark:shadow-black/30 p-7 border border-gray-100 dark:border-slate-800">
          {renderStepContent()}

          {/* Nav buttons */}
          {role && step > 0 && step < (role === "investor" ? 5 : 6) && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (step === 1) { setRole(null); setFounderType(null); setStep(0); }
                  else setStep(step - 1);
                }}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <Button
                className={`text-white gap-2 px-6 ${
                  founderType === "idea"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                }`}
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && role === "investor" && !investorType) ||
                  (step === 1 && role === "founder" && !founderType)
                }
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
