import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  GitMerge, Users, Linkedin, Check, X, Clock, MessageSquare,
  Star, Zap, ArrowRight, Shield, CheckCircle, HandshakeIcon,
  Building2, DollarSign, Calendar
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

type Intro = {
  startup: string;
  sector: string;
  raise: string;
  arr: string;
  connector: string;
  connectorRole: string;
  connectionType: "mutual" | "advisor" | "linkedin";
  message: string;
  status: "pending" | "accepted" | "declined";
  matchScore: number;
  requested: string;
};

const introRequests: Intro[] = [
  {
    startup: "NeuralScale AI",
    sector: "AI/ML",
    raise: "$8M Series A",
    arr: "$2.4M",
    connector: "Sarah Chen",
    connectorRole: "Partner at a16z",
    connectionType: "mutual",
    message: "Hi! I've been following NeuralScale AI for 6 months. Sarah and I co-invested in DataVault together—she thinks there's strong alignment with your thesis.",
    status: "pending",
    matchScore: 94,
    requested: "2 hours ago",
  },
  {
    startup: "MediScan AI",
    sector: "HealthTech",
    raise: "$6M Series A",
    arr: "$1.8M",
    connector: "Dr. James Park",
    connectorRole: "Advisor & Board Member",
    connectionType: "advisor",
    message: "Dr. Park is on my advisory board and is also an advisor to InvestLigence. He thinks you'd be a great investor for our Series A.",
    status: "pending",
    matchScore: 91,
    requested: "1 day ago",
  },
  {
    startup: "HealthBridge",
    sector: "HealthTech",
    raise: "$3M Seed",
    arr: "$480K",
    connector: "LinkedIn Connection",
    connectorRole: "2nd degree via John Smith",
    connectionType: "linkedin",
    message: "We're connected through John Smith who you've worked with at Google Ventures. I'm raising $3M Seed and believe my HealthTech focus aligns with your portfolio.",
    status: "accepted",
    matchScore: 88,
    requested: "3 days ago",
  },
  {
    startup: "GreenGrid",
    sector: "CleanTech",
    raise: "$12M Series A",
    arr: "$3.1M",
    connector: "Michael Torres",
    connectorRole: "GP at Sequoia",
    connectionType: "mutual",
    message: "Michael co-led GreenGrid's seed round and thinks you'd be the perfect Series A co-investor given your experience in infrastructure plays.",
    status: "declined",
    matchScore: 75,
    requested: "1 week ago",
  },
];

const connectionIcons: Record<string, React.ElementType> = {
  mutual: Users,
  advisor: Star,
  linkedin: Linkedin,
};
const connectionLabels: Record<string, string> = {
  mutual: "Mutual Connection",
  advisor: "Shared Advisor",
  linkedin: "LinkedIn Network",
};
const connectionColors: Record<string, string> = {
  mutual: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  advisor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  linkedin: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

// ─── Founder-side intro data ─────────────────────────────────────────────────

type InvestorIntro = {
  id: number;
  investor: string;
  firm: string;
  title: string;
  avatar: string;
  avatarColor: string;
  connector: string;
  connectorRole: string;
  connectionType: "mutual" | "advisor" | "linkedin";
  message: string;
  status: "pending" | "accepted" | "declined";
  checkSize: string;
  sectors: string[];
  time: string;
  matchScore: number;
};

const investorIntros: InvestorIntro[] = [
  {
    id: 1,
    investor: "Sarah Chen",
    firm: "Andreessen Horowitz",
    title: "General Partner",
    avatar: "SC",
    avatarColor: "bg-indigo-500",
    connector: "James Park",
    connectorRole: "Your advisor & a16z scout",
    connectionType: "advisor",
    message: "Hi! I've been tracking your space closely and James spoke highly of your team. I'd love a 30-min call to learn more about your roadmap and discuss potential fit for our portfolio.",
    status: "pending",
    checkSize: "$500K – $5M",
    sectors: ["AI/ML", "SaaS", "HealthTech"],
    time: "2 hours ago",
    matchScore: 94,
  },
  {
    id: 2,
    investor: "Marcus Johnson",
    firm: "Sequoia Capital",
    title: "Partner",
    avatar: "MJ",
    avatarColor: "bg-violet-500",
    connector: "Rachel Kim",
    connectorRole: "Mutual — co-founder of DataVault",
    connectionType: "mutual",
    message: "Rachel mentioned you're raising your Seed round. Sequoia has been quietly building conviction in this space — happy to hop on a call if you're open to it.",
    status: "pending",
    checkSize: "$2M – $15M",
    sectors: ["FinTech", "HealthTech"],
    time: "1 day ago",
    matchScore: 87,
  },
  {
    id: 3,
    investor: "Priya Patel",
    firm: "Y Combinator",
    title: "Group Partner",
    avatar: "PP",
    avatarColor: "bg-amber-500",
    connector: "LinkedIn",
    connectorRole: "2nd degree via John Smith (YC W21)",
    connectionType: "linkedin",
    message: "Came across your listing through John — your early traction at this stage is impressive. Would love to understand more about the go-to-market motion.",
    status: "accepted",
    checkSize: "$125K – $500K",
    sectors: ["SaaS", "EdTech"],
    time: "2 days ago",
    matchScore: 82,
  },
  {
    id: 4,
    investor: "David Okafor",
    firm: "First Round Capital",
    title: "Partner",
    avatar: "DO",
    avatarColor: "bg-sky-500",
    connector: "Mike Torres",
    connectorRole: "Mutual — former colleague at Stanford",
    connectionType: "mutual",
    message: "Mike sent me your deck last week and I finally had a chance to review it. The market timing looks right — interested to hear your perspective on the competitive landscape.",
    status: "declined",
    checkSize: "$250K – $3M",
    sectors: ["Deep Tech", "CleanTech"],
    time: "4 days ago",
    matchScore: 71,
  },
];

function FounderWarmIntros() {
  const [intros, setIntros] = useState(investorIntros);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "accepted" | "declined">("all");

  const filtered = intros.filter((i) => activeTab === "all" || i.status === activeTab);
  const stats = {
    pending: intros.filter((i) => i.status === "pending").length,
    accepted: intros.filter((i) => i.status === "accepted").length,
    declined: intros.filter((i) => i.status === "declined").length,
  };

  const handleAction = (id: number, action: "accepted" | "declined") => {
    setIntros((prev) => prev.map((item) => item.id === id ? { ...item, status: action } : item));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <GitMerge className="h-6 w-6 text-violet-600" />
          Warm Introductions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Investors who want to connect with you — routed through trusted mutual connections
        </p>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-violet-100 dark:border-violet-800">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/50 rounded-xl flex items-center justify-center shrink-0">
            <HandshakeIcon className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">How Warm Intros Work for Founders</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Investors who are interested in your startup request an intro through a mutual connection. 
              You decide who to meet. <strong>Accepting takes 30 seconds</strong> — the connector handles the warm handoff.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Awaiting Reply", value: stats.pending, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Meetings Booked", value: stats.accepted, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Passed", value: stats.declined, color: "text-gray-500 bg-gray-50 dark:bg-slate-800" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className={`p-4 text-center ${stat.color} rounded-xl`}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs font-medium mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "accepted", "declined"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50"
            }`}
          >
            {tab} {tab !== "all" && `(${stats[tab as keyof typeof stats]})`}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((intro) => {
          const ConnIcon = connectionIcons[intro.connectionType];
          return (
            <Card key={intro.id} className={`border-0 shadow-sm ${intro.status === "accepted" ? "ring-1 ring-emerald-200 dark:ring-emerald-800" : ""}`}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    {/* Investor header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl ${intro.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                        {intro.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900 dark:text-white">{intro.investor}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            intro.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : intro.status === "accepted" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400"
                          }`}>
                            {intro.status === "pending" ? "Awaiting Reply" : intro.status === "accepted" ? "Meeting Booked" : "Passed"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <Building2 className="h-3 w-3" />
                          {intro.title} · {intro.firm}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-emerald-500" /> Writes {intro.checkSize} checks · {intro.sectors.join(", ")}
                        </div>
                      </div>
                    </div>

                    {/* Via connector */}
                    <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium mb-3 ${connectionColors[intro.connectionType]}`}>
                      <ConnIcon className="h-3 w-3" />
                      Via {connectionLabels[intro.connectionType]}: <strong>{intro.connector}</strong> — {intro.connectorRole}
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                        <MessageSquare className="h-3.5 w-3.5" /> Investor Message
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">"{intro.message}"</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <Clock className="h-3.5 w-3.5" /> {intro.time}
                      <span>·</span>
                      <span className={`font-semibold ${intro.matchScore >= 90 ? "text-emerald-600" : intro.matchScore >= 80 ? "text-indigo-600" : "text-gray-500"}`}>
                        {intro.matchScore}% AI match
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 sm:gap-3 shrink-0">
                    {intro.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="flex-1 sm:flex-none bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 gap-1.5 text-xs"
                          onClick={() => handleAction(intro.id, "accepted")}
                        >
                          <Check className="h-3.5 w-3.5" /> Accept Meeting
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none text-xs gap-1.5 text-red-500 hover:bg-red-50 border-red-200"
                          onClick={() => handleAction(intro.id, "declined")}
                        >
                          <X className="h-3.5 w-3.5" /> Pass
                        </Button>
                      </>
                    )}
                    {intro.status === "accepted" && (
                      <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700 gap-1.5 text-xs shrink-0">
                        <Calendar className="h-3.5 w-3.5" /> Schedule Call
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function WarmIntroductionsPage() {
  const { user } = useAuth();
  if (user?.role === "founder") return <FounderWarmIntros />;
  return <InvestorWarmIntros />;
}

function InvestorWarmIntros() {
  const [intros, setIntros] = useState(introRequests);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "accepted" | "declined">("all");

  const filtered = intros.filter((i) => activeTab === "all" || i.status === activeTab);

  const handleAction = (idx: number, action: "accepted" | "declined") => {
    setIntros((prev) => prev.map((item, i) => i === idx ? { ...item, status: action } : item));
  };

  const stats = {
    pending: intros.filter((i) => i.status === "pending").length,
    accepted: intros.filter((i) => i.status === "accepted").length,
    declined: intros.filter((i) => i.status === "declined").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <GitMerge className="h-6 w-6 text-indigo-600" />
          Warm Introductions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Founder intro requests routed through mutual connections, shared advisors, or your LinkedIn network
        </p>
      </div>

      {/* Why Warm Intros Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center shrink-0">
            <HandshakeIcon className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Why Warm Introductions?</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Cold messages have {'<'}3% response rates. Warm intros through mutual connections have <strong>40–60% response rates</strong>.
              InvestLigence routes every intro through a trusted connector — ensuring quality and context before you invest your time.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", value: stats.pending, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Accepted", value: stats.accepted, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Declined", value: stats.declined, color: "text-gray-500 bg-gray-50 dark:bg-slate-800" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className={`p-4 text-center ${stat.color} rounded-xl`}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs font-medium mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["all", "pending", "accepted", "declined"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50"
            }`}
          >
            {tab} {tab !== "all" && `(${stats[tab as keyof typeof stats]})`}
          </button>
        ))}
      </div>

      {/* Intro Cards */}
      <div className="space-y-4">
        {filtered.map((intro, i) => {
          const ConnIcon = connectionIcons[intro.connectionType];
          const actualIdx = intros.findIndex((x) => x.startup === intro.startup);
          return (
            <Card key={i} className={`border-0 shadow-sm ${intro.status === "accepted" ? "ring-1 ring-emerald-200 dark:ring-emerald-800" : ""}`}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Startup Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                        {intro.startup.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">{intro.startup}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            intro.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : intro.status === "accepted" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400"
                          }`}>
                            {intro.status.charAt(0).toUpperCase() + intro.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">{intro.sector} · {intro.raise} · ARR: {intro.arr}</div>
                      </div>
                    </div>

                    {/* Via connector */}
                    <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium mb-3 ${connectionColors[intro.connectionType]}`}>
                      <ConnIcon className="h-3 w-3" />
                      Via {connectionLabels[intro.connectionType]}: <strong>{intro.connector}</strong> ({intro.connectorRole})
                    </div>

                    {/* Founder message */}
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Founder Message
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">"{intro.message}"</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      {intro.requested}
                      <span>·</span>
                      <span className={`font-semibold ${
                        intro.matchScore >= 90 ? "text-emerald-600"
                          : intro.matchScore >= 80 ? "text-indigo-600"
                          : "text-gray-500"
                      }`}>
                        {intro.matchScore}% AI match
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {intro.status === "pending" && (
                    <div className="flex sm:flex-col gap-2 sm:gap-3 shrink-0">
                      <Button
                        size="sm"
                        className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 gap-1.5 text-xs"
                        onClick={() => handleAction(actualIdx, "accepted")}
                      >
                        <Check className="h-3.5 w-3.5" /> Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none text-xs gap-1.5 text-red-500 hover:bg-red-50 border-red-200"
                        onClick={() => handleAction(actualIdx, "declined")}
                      >
                        <X className="h-3.5 w-3.5" /> Decline
                      </Button>
                    </div>
                  )}
                  {intro.status === "accepted" && (
                    <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700 gap-1.5 text-xs shrink-0">
                      <Zap className="h-3.5 w-3.5" /> Start Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
