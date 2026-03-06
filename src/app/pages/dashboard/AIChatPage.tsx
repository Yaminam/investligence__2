import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  Bot,
  Send,
  User,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  TrendingUp,
  BarChart2,
  Users,
  Lightbulb,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { cn } from "@/app/components/ui/utils";

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  liked?: boolean | null;
  timestamp: Date;
}

// ────────────────────────────────────────────────────────────────────────────
// Investor canned responses
// ────────────────────────────────────────────────────────────────────────────
const INVESTOR_CANNED: { patterns: string[]; reply: string }[] = [
  {
    patterns: ["top ai match", "ai match", "best match"],
    reply:
      "**Your Top 5 AI Matches this week:**\n\n1. **NeuralPay** — FinTech / B2B SaaS · $2M raise · 94% match\n2. **CarbonLedger** — ClimateTech · $5M series A · 91% match\n3. **HealthSync** — HealthTech · $3M raise · 88% match\n4. **FleetAI** — PropTech / Logistics · $1.5M raise · 85% match\n5. **DataNest** — Data Infrastructure · $4M series A · 83% match\n\nAll 5 align strongly with your FinTech + ClimateTech thesis. Would you like me to generate a detailed scorecard for any of these?",
  },
  {
    patterns: ["new startup", "startups this week", "new deal", "recent startup"],
    reply:
      "**14 new startups added this week across your focus sectors:**\n\n• **AI/ML** — 5 new companies (3 seed, 2 series A)\n• **FinTech** — 4 new companies (all raising $1M–$3M)\n• **ClimateTech** — 3 new companies (2 with notable traction)\n• **HealthTech** — 2 new companies\n\nHighlight: *NeuralPay* in FinTech crossed $500K ARR at launch and has 3 LOIs from enterprise clients. Want me to pull the full profile?",
  },
  {
    patterns: ["intro request", "warm intro", "pending intro"],
    reply:
      "**Your warm introduction queue:**\n\n• **3 pending** intro requests awaiting your response\n• **7 active** intros in progress via mutual connections\n• **2 intros** accepted this week — meetings scheduled\n\n**Highest priority:** CarbonLedger requested an intro through your advisor network. Their connector is a mutual LP. Recommended action: accept within 48 hrs.",
  },
  {
    patterns: ["sector", "deal activity", "which sector", "trending sector"],
    reply:
      "**Sector deal activity — last 30 days:**\n\n| Sector | Deals | Avg Check | YoY Growth |\n|---|---|---|---|\n| AI/ML | 38 | $4.2M | +62% |\n| FinTech | 24 | $3.8M | +28% |\n| ClimateTech | 18 | $6.1M | +51% |\n| HealthTech | 21 | $5.3M | +34% |\n| SaaS/B2B | 42 | $2.9M | +18% |\n\n**Trending up:** ClimateTech deal count surged 51% YoY. AI infrastructure is seeing the most series A activity. Want a deeper sector report?",
  },
  {
    patterns: ["portfolio", "moic", "performance", "portfolio performing"],
    reply:
      "**Portfolio intelligence snapshot:**\n\n• **12 companies** tracked in your portfolio\n• **Avg MOIC:** 2.4× across exited positions\n• **Top performer:** DataNest — 4.1× unrealised gain\n• **At-risk flag:** One company missed Q2 revenue targets by 22% — would you like a detailed review?\n• **3 companies** are approaching fundraise milestones and may need follow-on capital in the next 90 days.\n\nWant me to generate a full portfolio health report?",
  },
  {
    patterns: ["average deal size", "deal size", "check size"],
    reply:
      "**Average deal sizes by stage — current market:**\n\n• **Pre-seed:** $250K–$750K (angels + micro-VCs)\n• **Seed:** $1M–$3M (institutional seed rounds)\n• **Series A:** $5M–$15M (lead investor + syndicate)\n• **Series B:** $15M–$40M\n\nFor your typical check size ($250K–$1M), you are most competitive at **Seed stage** where you can lead or co-invest. In FinTech, median seed round is $2.1M this quarter.",
  },
  {
    patterns: ["match score", "scoring", "how is match calculated"],
    reply:
      "**AI Match Score methodology:**\n\nThe InvestLigence match engine scores startups against 6 dimensions:\n\n1. **Thesis alignment** (30%) — Sector, stage, geography\n2. **Traction signals** (20%) — Revenue, growth rate, user metrics\n3. **Team strength** (20%) — Founder track record, domain expertise\n4. **Market size** (15%) — TAM/SAM, competitive landscape\n5. **Deal terms** (10%) — Valuation vs comps, round structure\n6. **Network proximity** (5%) — Warm connections available\n\nScores above 85% are flagged as priority. Want to recalibrate your thesis weights?",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Founder canned responses
// ────────────────────────────────────────────────────────────────────────────
const FOUNDER_CANNED: { patterns: string[]; reply: string }[] = [
  {
    patterns: ["profile view", "who viewed", "viewed my profile", "profile this week"],
    reply:
      "**Your profile visibility this week:**\n\n• **138 investor profile views** (↑ 23% vs last week)\n• **24 investors bookmarked** your listing\n• **7 intro requests** received\n• **19 pitch deck downloads**\n\n**Top viewer firms:** Sequoia Scout, Andreessen Alumni Fund, Lightspeed India. Three of them have viewed your deck more than twice — high buying signals. Want me to suggest an outreach message?",
  },
  {
    patterns: ["which investor", "investor match", "investors match"],
    reply:
      "**Investors who best match your startup:**\n\n1. **Priya Kapoor** — Sequoia Scout · FinTech/B2B · $250K–$1M · 96% match\n2. **Marcus Webb** — Lightspeed India · SaaS · $500K–$2M · 93% match\n3. **Aiden Park** — Andreessen Alumni · AI/ML · $100K–$500K · 89% match\n4. **Sophie Laurent** — Climate First Fund · B2B SaaS · $1M–$3M · 85% match\n\nAll 4 are currently active on the platform and accepting intro requests. I recommend reaching out to Priya Kapoor first — her last 3 investments were in your exact category.",
  },
  {
    patterns: ["visibility", "improve visibility", "more views", "get more views"],
    reply:
      "**Tips to boost your listing visibility:**\n\n✅ **Upload your pitch deck** — profiles with decks get 3× more views\n✅ **Add a 60-second demo video** — increases bookmark rate by 58%\n✅ **Fill traction metrics** — investors filter by MRR/ARR, add yours\n⬜ **Earn Revenue Verified badge** — connect Stripe/QuickBooks for instant credibility\n⬜ **Complete founder bios** — all co-founders should have LinkedIn linked\n🔴 Your current profile is **68% complete** — closing remaining gaps could add ~40 views/week.",
  },
  {
    patterns: ["meeting request", "intro request", "investor meeting", "pending meeting"],
    reply:
      "**Your incoming meeting requests:**\n\n• **2 new requests** awaiting your response (respond within 48 hrs for best acceptance rates)\n• **3 meetings booked** this week\n• **1 request** from a VC whose firm invested in 2 of your competitors — high strategic value\n\n**Action recommended:** Accept the request from Marcus Webb at Lightspeed India — his sector focus and check size align perfectly with your current raise.",
  },
  {
    patterns: ["revenue verified", "verified badge", "earn badge", "trust badge"],
    reply:
      "**How to earn the Revenue Verified badge:**\n\n1. Connect your Stripe account **or** upload a CPA-signed revenue statement\n2. Your MRR must be ≥ $10,000 for the past 3 consecutive months\n3. InvestLigence will verify within 24 hrs\n\n**Why it matters:** Startups with this badge receive **2.1× more intro requests** and appear at the top of filtered searches when investors sort by 'Verified Only'.\n\nYour current MRR appears unverified. Connecting Stripe takes ~2 minutes.",
  },
  {
    patterns: ["pitch", "pitch deck", "deck feedback", "improve pitch"],
    reply:
      "**Pitch deck optimisation tips:**\n\n📌 **Slide order that converts:** Problem → Solution → Market → Traction → Business Model → Team → Ask\n\n**Common gaps in decks I'm seeing accepted:**\n• Clearly state the ask amount + use of funds\n• Add a 3-year financial projection (even rough is fine)\n• Show customer logos / quotes if available\n• Keep it to **12–15 slides** — investors skim first\n\n**Your deck:** 11 slides uploaded. Missing: use-of-funds breakdown and a competitive moat slide. Adding those 2 slides typically increases deck download-to-meeting conversion by 40%.",
  },
  {
    patterns: ["profile completion", "completion score", "profile score"],
    reply:
      "**Your profile completion score: 68%**\n\n| Section | Status |\n|---|---|\n| Company overview | ✅ Complete |\n| Founding team (all co-founders) | ⚠️ 1 co-founder missing bio |\n| Traction metrics (MRR/ARR) | ⚠️ Added but unverified |\n| Pitch deck | ✅ Uploaded |\n| Demo video | ❌ Missing |\n| Revenue Verified badge | ❌ Not earned |\n| LinkedIn links | ✅ Complete |\n\nCompleting the missing items is estimated to increase weekly investor views by **~55 views**.",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────
function generateReply(text: string, role: "investor" | "founder"): string {
  const lower = text.toLowerCase();
  const bank = role === "investor" ? INVESTOR_CANNED : FOUNDER_CANNED;
  for (const item of bank) {
    if (item.patterns.some((p) => lower.includes(p))) {
      return item.reply;
    }
  }
  if (role === "investor") {
    return `I'm on it. Searching InvestLigence deal flow data for: *"${text}"*\n\nI can help you with startup matching, sector intelligence, portfolio analysis, warm introductions, and investment thesis calibration. Try one of the suggestions below or ask a specific question about a company or sector.`;
  }
  return `Got it. Scanning InvestLigence investor database for: *"${text}"*\n\nI can help you with investor matching, profile optimisation, pitch deck feedback, intro request tips, and visibility improvements. Try one of the suggestions or ask me anything about your fundraise.`;
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/\n/g, "<br/>")
    .replace(/^/, '<p class="mt-0">')
    .replace(/$/, "</p>");
}

// ────────────────────────────────────────────────────────────────────────────
// Role-specific config
// ────────────────────────────────────────────────────────────────────────────
const INVESTOR_CONFIG = {
  welcome:
    "I'm your **InvestLigence AI** — your deal flow intelligence co-pilot.\n\nI have access to your investment thesis, AI match scores, warm intro queue, portfolio data, and real-time sector deal activity. Ask me anything about startups, deals, or your portfolio.",
  suggestions: [
    "Show my top AI matches",
    "New startups in AI/ML",
    "Pending warm intros",
    "Sector deal activity",
    "Portfolio performance",
    "Average deal sizes",
    "Trending sectors this week",
  ],
  placeholderMessages: [
    "Ask about deal flow, matching, or your portfolio…",
    "Try: 'Show my top AI matches'",
    "Try: 'What are trending sectors?'",
  ],
};

const FOUNDER_CONFIG = {
  welcome:
    "I'm your **InvestLigence AI** — your fundraising intelligence assistant.\n\nI have access to your profile views, investor match scores, intro requests, and listing analytics. I can help you raise smarter — ask me anything about your listing, investors, or pitch strategy.",
  suggestions: [
    "Who viewed my profile this week?",
    "Which investors match my startup?",
    "How to improve my visibility?",
    "Any pending meeting requests?",
    "How to earn Revenue Verified badge?",
    "Pitch deck tips",
    "What's my profile completion score?",
  ],
  placeholderMessages: [
    "Ask about investor interest, visibility, or your pitch…",
    "Try: 'Who viewed my profile this week?'",
    "Try: 'Which investors match my startup?'",
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────
export default function AIChatPage() {
  const { user } = useAuth();
  const role = user?.role === "founder" ? "founder" : "investor";
  const config = role === "investor" ? INVESTOR_CONFIG : FOUNDER_CONFIG;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: config.welcome,
      liked: null,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [placeholder] = useState(
    config.placeholderMessages[
      Math.floor(Math.random() * config.placeholderMessages.length)
    ]
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateReply(content, role);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        liked: null,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  }

  function handleLike(id: string, val: boolean) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, liked: m.liked === val ? null : val } : m
      )
    );
  }

  function copyText(content: string) {
    navigator.clipboard.writeText(content).catch(() => {});
  }

  function clearChat() {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: config.welcome,
        liked: null,
        timestamp: new Date(),
      },
    ]);
  }

  const investorStats = [
    { icon: TrendingUp, label: "AI Matches", value: "14 new" },
    { icon: BarChart2, label: "Deal Activity", value: "+18% this week" },
    { icon: Users, label: "Intro Queue", value: "3 pending" },
  ];

  const founderStats = [
    { icon: Users, label: "Profile Views", value: "138 this week" },
    { icon: TrendingUp, label: "Bookmarks", value: "24 investors" },
    { icon: Lightbulb, label: "Intro Requests", value: "7 pending" },
  ];

  const stats = role === "investor" ? investorStats : founderStats;

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)] gap-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Ask AI
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {role === "investor"
                ? "Deal flow intelligence assistant"
                : "Fundraising intelligence assistant"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="hidden sm:flex gap-1 border-indigo-200 text-indigo-600 dark:border-indigo-800 dark:text-indigo-400"
          >
            <Sparkles className="w-3 h-3" />
            Capital Connect AI
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stat pills */}
      <div className="flex gap-3 flex-shrink-0 overflow-x-auto pb-1">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <CardContent className="flex items-center gap-2 px-3 py-2">
              <s.icon className="w-4 h-4 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                  {s.label}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                  {s.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Messages */}
      <Card className="flex-1 overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm min-h-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" && "flex-row-reverse"
                )}
              >
                <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                  {msg.role === "assistant" ? (
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <div
                  className={cn(
                    "flex flex-col gap-1 max-w-[75%]",
                    msg.role === "user" && "items-end"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "assistant"
                        ? "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-sm border border-gray-100 dark:border-gray-700"
                        : "bg-indigo-600 text-white rounded-tr-sm"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(msg.content),
                        }}
                        className="prose prose-sm dark:prose-invert max-w-none"
                      />
                    ) : (
                      msg.content
                    )}
                  </div>

                  {msg.role === "assistant" && msg.id !== "welcome" && (
                    <div className="flex items-center gap-1 pl-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleLike(msg.id, true)}
                      >
                        <ThumbsUp
                          className={cn(
                            "w-3 h-3",
                            msg.liked === true
                              ? "text-green-500 fill-green-500"
                              : "text-gray-400"
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleLike(msg.id, false)}
                      >
                        <ThumbsDown
                          className={cn(
                            "w-3 h-3",
                            msg.liked === false
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400"
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyText(msg.content)}
                      >
                        <Copy className="w-3 h-3 text-gray-400" />
                      </Button>
                      <span className="text-xs text-gray-400 ml-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Suggestion chips */}
      <div className="flex gap-2 flex-wrap flex-shrink-0">
        {config.suggestions.slice(0, 4).map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="px-3 py-1.5 text-xs rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 flex-shrink-0">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
        />
        <Button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
