import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  ClipboardList, Check, Clock, X, Upload, ChevronRight,
  Building2, DollarSign, Users, TrendingUp, Globe, Sparkles,
  AlertCircle, CheckCircle, Info
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const steps = [
  { label: "Company Info", icon: Building2 },
  { label: "Traction & Metrics", icon: TrendingUp },
  { label: "Funding Details", icon: DollarSign },
  { label: "Team & Advisors", icon: Users },
  { label: "Pitch & Deck", icon: Sparkles },
];

const reviewCriteria = [
  { label: "Product-market fit evidence", met: true },
  { label: "Minimum $50K ARR or 1,000 active users", met: true },
  { label: "Incorporated company (any jurisdiction)", met: true },
  { label: "No fraud or legal issues", met: true },
  { label: "Clear fundraising plan", met: false },
  { label: "Full team profile submitted", met: false },
];

export function StartupApplicationPage() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [applicationStatus] = useState<"draft" | "under_review" | "approved" | "rejected">("under_review");

  // Form data
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    sector: "",
    stage: "",
    tagline: "",
    description: "",
    arr: "",
    users: "",
    growth: "",
    founded: "",
    teamSize: "",
    raise: "",
    useOfFunds: "",
    location: "",
    linkedinFounder: "",
    founderName: user ? `${user.firstName} ${user.lastName}`.trim() : "",
    founderEmail: user?.email || "",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  if (applicationStatus === "under_review") {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-indigo-600" />
            Startup Application
          </h1>
        </div>

        {/* Status Card */}
        <Card className="border-0 shadow-sm border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-bold text-gray-900 dark:text-white">Application Under Review</h2>
                  <Badge className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Under Review</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Your application for <strong>NeuralBridge Technologies</strong> was submitted on <strong>Feb 28, 2026</strong>.
                  Our curation team reviews each application within <strong>3–5 business days</strong>.
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <Info className="h-3.5 w-3.5" />
                  You'll receive an email notification at <strong>{user?.email}</strong> once reviewed.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Review Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewCriteria.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.met ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400 dark:bg-slate-700"}`}>
                    {c.met ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                  </div>
                  <span className={`text-sm ${c.met ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}>
                    {c.label}
                  </span>
                  {!c.met && (
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 ml-auto">
                      Pending
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white" size="sm">
              Complete Missing Information
            </Button>
          </CardContent>
        </Card>

        {/* What happens next */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">What Happens After Approval?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { step: "1", title: "Profile Goes Live", desc: "Your startup becomes visible to 500+ verified investors on InvestLigence.", color: "bg-indigo-100 text-indigo-600" },
                { step: "2", title: "AI Matching Begins", desc: "Our AI immediately matches your profile to investors aligned with your sector, stage, and metrics.", color: "bg-violet-100 text-violet-600" },
                { step: "3", title: "Warm Intros Enabled", desc: "Investors can request warm introductions through mutual connections or shared advisors.", color: "bg-emerald-100 text-emerald-600" },
                { step: "4", title: "Verified Badges", desc: "Submit revenue verification to unlock trusted badges that boost investor confidence.", color: "bg-amber-100 text-amber-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${item.color}`}>
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-indigo-600" />
          Apply for Listing
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          InvestLigence is invite-only for investors. Startups must apply and pass our curation review.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium ${
              i === currentStep ? "bg-indigo-600 text-white"
                : i < currentStep ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-gray-100 dark:bg-slate-800 text-gray-500"
            }`}>
              {i < currentStep ? <Check className="h-3 w-3" /> : <step.icon className="h-3 w-3" />}
              {step.label}
            </div>
            {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />}
          </div>
        ))}
      </div>

      {/* Form */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-4">
          {currentStep === 0 && (
            <>
              <h3 className="font-semibold text-gray-900 dark:text-white">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label className="text-sm mb-1.5 block">Company Name *</Label><Input placeholder="e.g. NeuralScale AI" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Website *</Label><Input placeholder="https://" value={form.website} onChange={(e) => update("website", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Sector *</Label>
                  <select className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" value={form.sector} onChange={(e) => update("sector", e.target.value)}>
                    <option value="">Select sector...</option>
                    {["AI/ML", "FinTech", "HealthTech", "SaaS", "CleanTech", "EdTech", "Web3", "Consumer", "AgTech"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><Label className="text-sm mb-1.5 block">Stage *</Label>
                  <select className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800" value={form.stage} onChange={(e) => update("stage", e.target.value)}>
                    <option value="">Select stage...</option>
                    {["Pre-Seed", "Seed", "Series A", "Series B"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2"><Label className="text-sm mb-1.5 block">One-line tagline *</Label><Input placeholder="e.g. AI infrastructure that scales ML 10x faster" value={form.tagline} onChange={(e) => update("tagline", e.target.value)} /></div>
                <div className="md:col-span-2">
                  <Label className="text-sm mb-1.5 block">Company Description *</Label>
                  <textarea className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="What does your company do? What problem are you solving?" value={form.description} onChange={(e) => update("description", e.target.value)} />
                </div>
              </div>
            </>
          )}
          {currentStep === 1 && (
            <>
              <h3 className="font-semibold text-gray-900 dark:text-white">Traction & Metrics</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 flex gap-2 text-xs text-blue-700 dark:text-blue-400">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                Investors use these metrics to make quick decisions. Be accurate — we verify key metrics.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label className="text-sm mb-1.5 block">Monthly ARR</Label><Input placeholder="e.g. $150K" value={form.arr} onChange={(e) => update("arr", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Monthly MoM Growth</Label><Input placeholder="e.g. +25%" value={form.growth} onChange={(e) => update("growth", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Active Users / Customers</Label><Input placeholder="e.g. 2,400" value={form.users} onChange={(e) => update("users", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Founded Year</Label><Input placeholder="e.g. 2024" value={form.founded} onChange={(e) => update("founded", e.target.value)} /></div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h3 className="font-semibold text-gray-900 dark:text-white">Funding Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label className="text-sm mb-1.5 block">Amount Raising *</Label><Input placeholder="e.g. $2M" value={form.raise} onChange={(e) => update("raise", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Previous Funding Raised</Label><Input placeholder="e.g. $500K or None" /></div>
                <div className="md:col-span-2"><Label className="text-sm mb-1.5 block">Use of Funds *</Label>
                  <textarea className="w-full text-sm border border-gray-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 60% engineering, 25% sales, 15% operations" value={form.useOfFunds} onChange={(e) => update("useOfFunds", e.target.value)} />
                </div>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <h3 className="font-semibold text-gray-900 dark:text-white">Team & Advisors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label className="text-sm mb-1.5 block">Founder Name *</Label><Input value={form.founderName} onChange={(e) => update("founderName", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Founder Email *</Label><Input value={form.founderEmail} onChange={(e) => update("founderEmail", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">LinkedIn Profile</Label><Input placeholder="https://linkedin.com/in/..." value={form.linkedinFounder} onChange={(e) => update("linkedinFounder", e.target.value)} /></div>
                <div><Label className="text-sm mb-1.5 block">Team Size</Label><Input placeholder="e.g. 8" value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)} /></div>
              </div>
            </>
          )}
          {currentStep === 4 && (
            <>
              <h3 className="font-semibold text-gray-900 dark:text-white">Pitch & Deck</h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Pitch Deck</p>
                <p className="text-xs text-gray-500 mt-1">PDF or PowerPoint, max 25MB</p>
                <Button size="sm" variant="outline" className="mt-4">Choose File</Button>
              </div>
              <div>
                <Label className="text-sm mb-1.5 block">Pitch Video URL (optional)</Label>
                <Input placeholder="YouTube or Loom link" />
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 flex gap-2 text-xs text-amber-700 dark:text-amber-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                By submitting, you confirm all information is accurate. False information will result in permanent removal.
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 gap-2"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 gap-2"
            onClick={() => setSubmitted(true)}
          >
            <CheckCircle className="h-4 w-4" /> Submit Application
          </Button>
        )}
      </div>
    </div>
  );
}
