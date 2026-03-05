import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Eye, TrendingUp, Bookmark, GitMerge, Edit3, CheckCircle,
  Shield, Award, AlertCircle, Star, BarChart2, DollarSign,
  Users, ArrowUp, Clock, Lock, Upload, Globe, Zap
} from "lucide-react";
import { useNavigate } from "react-router";

const weeklyStats = [
  { day: "Mon", views: 14 },
  { day: "Tue", views: 22 },
  { day: "Wed", views: 18 },
  { day: "Thu", views: 31 },
  { day: "Fri", views: 27 },
  { day: "Sat", views: 11 },
  { day: "Sun", views: 15 },
];

const maxViews = Math.max(...weeklyStats.map((d) => d.views));

const activityFeed = [
  { icon: Eye, text: "Andreessen Horowitz viewed your profile", time: "2h ago", color: "text-indigo-500" },
  { icon: Bookmark, text: "Sequoia Scout bookmarked your listing", time: "5h ago", color: "text-violet-500" },
  { icon: GitMerge, text: "Accel Partners requested a warm intro", time: "1d ago", color: "text-emerald-500" },
  { icon: Eye, text: "Y Combinator downloaded your pitch deck", time: "1d ago", color: "text-amber-500" },
  { icon: Star, text: "You were added to 3 investor watchlists", time: "2d ago", color: "text-rose-500" },
];

export function MyListingPage() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [tagline, setTagline] = useState("AI-powered revenue intelligence for B2B SaaS teams");
  const [draftTagline, setDraftTagline] = useState(tagline);

  const badges = [
    { label: "Verified", icon: Shield, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", earned: true },
    { label: "Revenue Verified", icon: CheckCircle, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", earned: false },
    { label: "Top Startup", icon: Award, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", earned: false },
  ];

  const kpis = [
    { label: "Profile Views", value: "138", change: "+22 this week", icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-200 dark:border-indigo-800" },
    { label: "Bookmarked By", value: "24", change: "+8 investors", icon: Bookmark, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20", border: "border-violet-200 dark:border-violet-800" },
    { label: "Intro Requests", value: "7", change: "3 pending reply", icon: GitMerge, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800" },
    { label: "Deck Downloads", value: "19", change: "+5 this week", icon: BarChart2, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800" },
  ];

  const completionItems = [
    { label: "Company overview", done: true },
    { label: "Traction metrics (ARR, growth)", done: true },
    { label: "Pitch deck uploaded", done: true },
    { label: "Team bios & LinkedIn links", done: false, cta: true },
    { label: "Revenue verification", done: false },
    { label: "Demo video / product screenshots", done: false },
  ];

  const completionPct = Math.round(
    (completionItems.filter((c) => c.done).length / completionItems.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Listing</h1>
          <p className="text-sm text-gray-500 mt-1">
            How investors see your startup on InvestLigence
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
            <Edit3 className="h-4 w-4 mr-1.5" /> Edit Listing
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700" onClick={() => navigate("/dashboard/application")}>
            Update Application
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className={`border shadow-sm ${k.border}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{k.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{k.value}</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-0.5 mt-1">
                    <ArrowUp className="h-3 w-3" />{k.change}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center`}>
                  <k.icon className={`h-5 w-5 ${k.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listing Preview Card */}
        <div className="lg:col-span-2 space-y-5">

          {/* Visual Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4 text-indigo-500" /> Public Listing Preview
                </CardTitle>
                <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  <AlertCircle className="h-3 w-3 mr-1" /> Under Review
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-5 bg-gray-50 dark:bg-slate-800/50 space-y-4">
                {/* Startup header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                    Y
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 dark:text-white text-lg">Your Startup</span>
                      {badges.filter((b) => b.earned).map((b) => (
                        <span key={b.label} className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium ${b.color}`}>
                          <b.icon className="h-3 w-3" />{b.label}
                        </span>
                      ))}
                    </div>
                    {editing ? (
                      <div className="mt-1 flex gap-2">
                        <Input
                          value={draftTagline}
                          onChange={(e) => setDraftTagline(e.target.value)}
                          className="text-sm h-8 flex-1"
                        />
                        <Button size="sm" className="h-8 text-xs" onClick={() => { setTagline(draftTagline); setEditing(false); }}>Save</Button>
                        <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={() => setEditing(false)}>Cancel</Button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-0.5">{tagline}</p>
                    )}
                  </div>
                </div>

                {/* Traction metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "ARR", value: "$480K", icon: DollarSign, color: "text-emerald-600" },
                    { label: "Growth", value: "+210% YoY", icon: TrendingUp, color: "text-indigo-600" },
                    { label: "Team", value: "8 people", icon: Users, color: "text-violet-600" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white dark:bg-slate-900 rounded-xl p-3 text-center border border-gray-100 dark:border-slate-700">
                      <m.icon className={`h-4 w-4 ${m.color} mx-auto mb-1`} />
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{m.value}</div>
                      <div className="text-xs text-gray-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stage + raise */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full font-medium">Seed</span>
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">Raising $3M</span>
                  <span className="px-2.5 py-1 bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full">HealthTech</span>
                  <span className="px-2.5 py-1 bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full">San Francisco, CA</span>
                </div>

                {/* Locked sections note */}
                <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-dashed border-gray-200 dark:border-slate-700 pt-3">
                  <Lock className="h-3.5 w-3.5" />
                  Pitch deck & team info visible to verified investors only after approval
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges status */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Trust Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {badges.map((b) => (
                  <div key={b.label} className={`flex items-center justify-between p-3 rounded-xl border ${b.earned ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10" : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50"}`}>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-lg ${b.color}`}>
                        <b.icon className="h-4 w-4" />{b.label}
                      </span>
                    </div>
                    {b.earned ? (
                      <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> Earned
                      </span>
                    ) : (
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => navigate("/dashboard/application")}>
                        Complete steps
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly views mini chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Views This Week</CardTitle>
                <span className="text-sm font-bold text-indigo-600">138 total</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-20">
                {weeklyStats.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-indigo-500 rounded-t-sm transition-all"
                      style={{ height: `${(d.views / maxViews) * 64}px`, minHeight: "4px" }}
                    />
                    <span className="text-xs text-gray-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Profile completion */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Profile Completion</CardTitle>
                <span className="text-sm font-bold text-indigo-600">{completionPct}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {completionItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {item.done ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-slate-600 shrink-0" />
                    )}
                    <span className={`text-xs flex-1 ${item.done ? "text-gray-600 dark:text-gray-300" : "text-gray-400"}`}>{item.label}</span>
                    {item.cta && !item.done && (
                      <Button size="sm" className="h-6 text-xs px-2 bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => navigate("/dashboard/application")}>
                        Add
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Boost Your Visibility</span>
              </div>
              {[
                "Add team bios to earn Revenue Verified badge (+35% views)",
                "Upload a demo video — listings with video get 2× more intros",
                "Respond to intro requests within 24h to maintain High response rate",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{i + 1}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {activityFeed.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <a.icon className={`h-4 w-4 ${a.color} shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{a.text}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />{a.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pitch deck upload */}
          <Card className="border-0 shadow-sm border-dashed border-2 border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-5 text-center">
              <Upload className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Pitch Deck</p>
              <p className="text-xs text-gray-400 mt-1">PDF · Max 20MB</p>
              <Button size="sm" variant="outline" className="mt-3 text-xs border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                Upload New Version
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
