import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Separator } from "@/app/components/ui/separator";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  TrendingUp,
  Building2,
  Rocket,
  Check,
  AlertTriangle,
  Eye,
  EyeOff,
  Globe,
  Lock,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

// ────────────────────────────────────────────────────────────────────────────
// Investor Settings
// ────────────────────────────────────────────────────────────────────────────
function InvestorSettings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    firstName: user?.firstName ?? "Alex",
    lastName: user?.lastName ?? "Morgan",
    email: user?.email ?? "alex@venturecap.com",
    firm: user?.company ?? "Venture Capital Partners",
    title: "General Partner",
    bio: "Focused on early-stage investments in FinTech, AI/ML, and ClimateTech. Previously invested in 40+ companies with 3 exits.",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/alexmorgan",
    website: "https://venturecap.com",
  });

  const [thesis, setThesis] = useState({
    sectors: "FinTech, AI/ML, ClimateTech",
    stages: "Seed, Series A",
    checkMin: "250000",
    checkMax: "1000000",
    geography: "North America, Europe",
    coInvestOpen: true,
    leadRounds: false,
  });

  const [notifications, setNotifications] = useState({
    newAIMatches: true,
    warmIntroRequests: true,
    newFundedRounds: true,
    weeklyDigest: true,
    portfolioUpdates: true,
    sectorReports: false,
    newStartupsInThesis: true,
    marketingEmails: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
    profileVisibility: "investors-only",
    showCheckSize: true,
    showPortfolio: true,
  });

  const [passwordMsg, setPasswordMsg] = useState("");

  function handlePasswordChange() {
    if (!security.newPassword || security.newPassword !== security.confirmPassword) {
      setPasswordMsg("Passwords do not match.");
      return;
    }
    setPasswordMsg("Password updated successfully.");
    setSecurity((p) => ({ ...p, currentPassword: "", newPassword: "", confirmPassword: "" }));
  }

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList className="flex-wrap h-auto gap-1">
        <TabsTrigger value="profile" className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="thesis" className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          Investment Thesis
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Privacy & Security
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5" />
          Billing
        </TabsTrigger>
      </TabsList>

      {/* Profile */}
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              Investor Profile
            </CardTitle>
            <CardDescription>
              Your public-facing profile seen by founders on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Firm / Fund Name</Label>
                <Input value={profile.firm} onChange={(e) => setProfile((p) => ({ ...p, firm: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={profile.title} onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                placeholder="Describe your investment focus and experience…"
              />
              <p className="text-xs text-gray-500">{profile.bio.length}/500 characters</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={profile.location} onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input value={profile.linkedin} onChange={(e) => setProfile((p) => ({ ...p, linkedin: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input value={profile.website} onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))} />
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Check className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Thesis */}
      <TabsContent value="thesis">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Investment Thesis
            </CardTitle>
            <CardDescription>
              These preferences drive your AI match scores and deal flow recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Target Sectors</Label>
              <Input
                value={thesis.sectors}
                onChange={(e) => setThesis((p) => ({ ...p, sectors: e.target.value }))}
                placeholder="e.g. FinTech, AI/ML, ClimateTech"
              />
              <p className="text-xs text-gray-500">Comma-separated sectors. The AI will prioritise startups in these areas.</p>
            </div>
            <div className="space-y-2">
              <Label>Preferred Stages</Label>
              <Input
                value={thesis.stages}
                onChange={(e) => setThesis((p) => ({ ...p, stages: e.target.value }))}
                placeholder="e.g. Seed, Series A"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Check Size (USD)</Label>
                <Input
                  type="number"
                  value={thesis.checkMin}
                  onChange={(e) => setThesis((p) => ({ ...p, checkMin: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Check Size (USD)</Label>
                <Input
                  type="number"
                  value={thesis.checkMax}
                  onChange={(e) => setThesis((p) => ({ ...p, checkMax: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Geography</Label>
              <Input
                value={thesis.geography}
                onChange={(e) => setThesis((p) => ({ ...p, geography: e.target.value }))}
                placeholder="e.g. North America, Europe, Global"
              />
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Open to co-investing</p>
                  <p className="text-xs text-gray-500">Allow other investors to see your co-invest interest</p>
                </div>
                <Switch
                  checked={thesis.coInvestOpen}
                  onCheckedChange={(v) => setThesis((p) => ({ ...p, coInvestOpen: v }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Willing to lead rounds</p>
                  <p className="text-xs text-gray-500">Show as a potential lead investor to founders</p>
                </div>
                <Switch
                  checked={thesis.leadRounds}
                  onCheckedChange={(v) => setThesis((p) => ({ ...p, leadRounds: v }))}
                />
              </div>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Check className="w-4 h-4 mr-2" />
              Save Thesis
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-500" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose which alerts and digests you want to receive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {([
              { key: "newAIMatches", label: "New AI-matched startups", desc: "Notified when high-score matches enter the platform" },
              { key: "warmIntroRequests", label: "Warm intro requests", desc: "When a startup requests an introduction through your network" },
              { key: "newFundedRounds", label: "New funded rounds in thesis", desc: "Alerts when startups in your sectors close rounds" },
              { key: "weeklyDigest", label: "Weekly deal flow digest", desc: "Every Monday: top deals, sector highlights, AI picks" },
              { key: "portfolioUpdates", label: "Portfolio company updates", desc: "Milestone notifications from tracked companies" },
              { key: "sectorReports", label: "Monthly sector reports", desc: "Deep-dive reports on your focus sectors" },
              { key: "newStartupsInThesis", label: "New startups matching thesis", desc: "Instant alert for new profiles that match your investment thesis" },
              { key: "marketingEmails", label: "Platform news & announcements", desc: "Product updates and InvestLigence news" },
            ] as { key: keyof typeof notifications; label: string; desc: string }[]).map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <Switch
                  checked={notifications[key]}
                  onCheckedChange={(v) => setNotifications((p) => ({ ...p, [key]: v }))}
                />
              </div>
            ))}
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white mt-2">
              <Check className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security */}
      <TabsContent value="security">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-500" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" value={security.currentPassword} onChange={(e) => setSecurity((p) => ({ ...p, currentPassword: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" value={security.newPassword} onChange={(e) => setSecurity((p) => ({ ...p, newPassword: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" value={security.confirmPassword} onChange={(e) => setSecurity((p) => ({ ...p, confirmPassword: e.target.value }))} />
              </div>
              {passwordMsg && (
                <p className={`text-sm ${passwordMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>
                  {passwordMsg}
                </p>
              )}
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handlePasswordChange}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Enable 2FA</p>
                <p className="text-xs text-gray-500">Use an authenticator app on every sign-in</p>
              </div>
              <Switch
                checked={security.twoFactor}
                onCheckedChange={(v) => setSecurity((p) => ({ ...p, twoFactor: v }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                Profile Visibility
              </CardTitle>
              <CardDescription>Control who can see your investor profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Who can view your profile</Label>
                <Select value={security.profileVisibility} onValueChange={(v) => setSecurity((p) => ({ ...p, profileVisibility: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public — anyone on InvestLigence</SelectItem>
                    <SelectItem value="investors-only">Verified investors only</SelectItem>
                    <SelectItem value="private">Private — hidden from searches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Show check size publicly</p>
                  <p className="text-xs text-gray-500">Founders can see your investment range</p>
                </div>
                <Switch checked={security.showCheckSize} onCheckedChange={(v) => setSecurity((p) => ({ ...p, showCheckSize: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Show portfolio companies</p>
                  <p className="text-xs text-gray-500">Display past investments on your profile</p>
                </div>
                <Switch checked={security.showPortfolio} onCheckedChange={(v) => setSecurity((p) => ({ ...p, showPortfolio: v }))} />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Check className="w-4 h-4 mr-2" />
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Billing */}
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-500" />
              Billing & Subscription
            </CardTitle>
            <CardDescription>Manage your InvestLigence Pro plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100 dark:border-indigo-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900 dark:text-white text-lg">InvestLigence Pro</p>
                  <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">Active</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Full AI match engine · Unlimited warm intros · Sector intelligence reports</p>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">$299 / month · Renews Jan 15, 2026</p>
              </div>
            </div>

            <div>
              <p className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">Plan includes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Unlimited AI-matched deal flow",
                  "Priority access to new listings",
                  "Warm intro queue (unlimited)",
                  "Sector intelligence reports",
                  "Portfolio tracking & MOIC analytics",
                  "Investor network access",
                  "AI co-pilot (Ask AI)",
                  "Verified investor badge",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="font-medium text-sm">Payment method</p>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">•••• •••• •••• 4242 — Visa</span>
                <Badge variant="outline" className="ml-auto text-xs">Default</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Update Payment Method</Button>
              <Button variant="outline">Download Invoices</Button>
              <Button variant="destructive" className="ml-auto">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Founder Settings
// ────────────────────────────────────────────────────────────────────────────
function FounderSettings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    firstName: user?.firstName ?? "Jordan",
    lastName: user?.lastName ?? "Lee",
    email: user?.email ?? "jordan@teslatech.com",
    company: user?.company ?? "TeslaTech",
    title: "Co-founder & CEO",
    website: "https://teslatech.io",
    linkedin: "https://linkedin.com/in/jordanlee",
  });

  const [startupInfo, setStartupInfo] = useState({
    tagline: "AI-powered fleet management for logistics companies",
    description:
      "We help mid-market logistics companies cut fuel costs by 28% using AI-driven route optimisation and predictive maintenance.",
    sector: "AI/ML",
    stage: "seed",
    raising: "2000000",
    mrr: "42000",
    founded: "2022",
    teamSize: "8",
  });

  const [notifications, setNotifications] = useState({
    investorViewsProfile: true,
    investorBookmarks: true,
    introRequests: true,
    deckDownloads: true,
    weeklyVisibilityReport: true,
    newMatchedInvestors: true,
    sectorIntelligence: false,
    platformUpdates: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
    listingVisibility: "public",
    showRevenue: false,
  });

  const [passwordMsg, setPasswordMsg] = useState("");

  function handlePasswordChange() {
    if (!security.newPassword || security.newPassword !== security.confirmPassword) {
      setPasswordMsg("Passwords do not match.");
      return;
    }
    setPasswordMsg("Password updated successfully.");
    setSecurity((p) => ({ ...p, currentPassword: "", newPassword: "", confirmPassword: "" }));
  }

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList className="flex-wrap h-auto gap-1">
        <TabsTrigger value="profile" className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="startup" className="flex items-center gap-1.5">
          <Rocket className="w-3.5 h-3.5" />
          Startup Info
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Privacy & Security
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5" />
          Billing
        </TabsTrigger>
      </TabsList>

      {/* Profile */}
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              Founder Profile
            </CardTitle>
            <CardDescription>Your personal details shown to investors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input value={profile.company} onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Your Title</Label>
                <Input value={profile.title} onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={profile.website} onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input value={profile.linkedin} onChange={(e) => setProfile((p) => ({ ...p, linkedin: e.target.value }))} />
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Check className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Startup Info */}
      <TabsContent value="startup">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-emerald-500" />
              Startup Information
            </CardTitle>
            <CardDescription>
              These details populate your investor-facing listing and drive AI matching.
              <span className="text-emerald-600 dark:text-emerald-400 font-medium ml-1">
                Full editing available in My Listing.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>One-line Tagline</Label>
              <Input
                value={startupInfo.tagline}
                onChange={(e) => setStartupInfo((p) => ({ ...p, tagline: e.target.value }))}
                placeholder="What does your startup do in one sentence?"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={startupInfo.description}
                onChange={(e) => setStartupInfo((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe your product, customer, and key traction…"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Sector</Label>
                <Select value={startupInfo.sector} onValueChange={(v) => setStartupInfo((p) => ({ ...p, sector: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI/ML">AI / ML</SelectItem>
                    <SelectItem value="FinTech">FinTech</SelectItem>
                    <SelectItem value="HealthTech">HealthTech</SelectItem>
                    <SelectItem value="ClimateTech">ClimateTech</SelectItem>
                    <SelectItem value="SaaS">B2B SaaS</SelectItem>
                    <SelectItem value="PropTech">PropTech</SelectItem>
                    <SelectItem value="EdTech">EdTech</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Current Stage</Label>
                <Select value={startupInfo.stage} onValueChange={(v) => setStartupInfo((p) => ({ ...p, stage: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Raising (USD)</Label>
                <Input type="number" value={startupInfo.raising} onChange={(e) => setStartupInfo((p) => ({ ...p, raising: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Current MRR (USD)</Label>
                <Input type="number" value={startupInfo.mrr} onChange={(e) => setStartupInfo((p) => ({ ...p, mrr: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Team Size</Label>
                <Input type="number" value={startupInfo.teamSize} onChange={(e) => setStartupInfo((p) => ({ ...p, teamSize: e.target.value }))} />
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Check className="w-4 h-4 mr-2" />
              Save Startup Info
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-500" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Control which investor activity alerts you receive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {([
              { key: "investorViewsProfile", label: "Investor views your profile", desc: "Instant alert when an investor opens your listing" },
              { key: "investorBookmarks", label: "Investor bookmarks your startup", desc: "High-intent signal — get notified immediately" },
              { key: "introRequests", label: "Warm intro requests", desc: "When an investor requests a meeting through InvestLigence" },
              { key: "deckDownloads", label: "Pitch deck downloads", desc: "Alert each time your deck is downloaded" },
              { key: "weeklyVisibilityReport", label: "Weekly visibility report", desc: "Every Monday: views, bookmarks, intro stats" },
              { key: "newMatchedInvestors", label: "New investors matching your thesis", desc: "When new investors join who align with your sector/stage" },
              { key: "sectorIntelligence", label: "Sector intelligence updates", desc: "Market trends and funding news in your sector" },
              { key: "platformUpdates", label: "Platform news & announcements", desc: "InvestLigence product updates" },
            ] as { key: keyof typeof notifications; label: string; desc: string }[]).map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <Switch
                  checked={notifications[key]}
                  onCheckedChange={(v) => setNotifications((p) => ({ ...p, [key]: v }))}
                />
              </div>
            ))}
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mt-2">
              <Check className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security */}
      <TabsContent value="security">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-500" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" value={security.currentPassword} onChange={(e) => setSecurity((p) => ({ ...p, currentPassword: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" value={security.newPassword} onChange={(e) => setSecurity((p) => ({ ...p, newPassword: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" value={security.confirmPassword} onChange={(e) => setSecurity((p) => ({ ...p, confirmPassword: e.target.value }))} />
              </div>
              {passwordMsg && (
                <p className={`text-sm ${passwordMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>
                  {passwordMsg}
                </p>
              )}
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handlePasswordChange}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Enable 2FA</p>
                <p className="text-xs text-gray-500">Protect your account with an authenticator app</p>
              </div>
              <Switch
                checked={security.twoFactor}
                onCheckedChange={(v) => setSecurity((p) => ({ ...p, twoFactor: v }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-500" />
                Listing Visibility
              </CardTitle>
              <CardDescription>Control who can discover your startup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Who can view your listing</Label>
                <Select value={security.listingVisibility} onValueChange={(v) => setSecurity((p) => ({ ...p, listingVisibility: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public — all verified investors</SelectItem>
                    <SelectItem value="invite-only">Invite only — shared link access</SelectItem>
                    <SelectItem value="hidden">Hidden — remove from all searches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Show revenue metrics</p>
                  <p className="text-xs text-gray-500">Display MRR/ARR figures publicly on your listing</p>
                </div>
                <Switch
                  checked={security.showRevenue}
                  onCheckedChange={(v) => setSecurity((p) => ({ ...p, showRevenue: v }))}
                />
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Check className="w-4 h-4 mr-2" />
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Billing */}
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-500" />
              Billing & Subscription
            </CardTitle>
            <CardDescription>Manage your InvestLigence Founder plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-100 dark:border-emerald-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900 dark:text-white text-lg">InvestLigence Founder Pro</p>
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">Active</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Verified listing · Unlimited intro requests · AI fundraising assistant</p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">$99 / month · Renews Jan 15, 2026</p>
              </div>
            </div>

            <div>
              <p className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">Plan includes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Verified startup listing",
                  "Unlimited investor browsing",
                  "AI match scoring (investor fit)",
                  "Warm intro requests (unlimited)",
                  "Revenue Verified badge eligibility",
                  "Listing analytics & viewer insights",
                  "AI fundraising co-pilot (Ask AI)",
                  "Priority in investor search results",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="font-medium text-sm">Payment method</p>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">•••• •••• •••• 5678 — Mastercard</span>
                <Badge variant="outline" className="ml-auto text-xs">Default</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Update Payment Method</Button>
              <Button variant="outline">Download Invoices</Button>
              <Button variant="destructive" className="ml-auto">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Page wrapper
// ────────────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { user } = useAuth();
  const role = user?.role === "founder" ? "founder" : "investor";

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${role === "investor" ? "bg-gradient-to-br from-indigo-500 to-violet-600" : "bg-gradient-to-br from-emerald-500 to-teal-600"}`}>
          {role === "investor" ? (
            <Building2 className="w-5 h-5 text-white" />
          ) : (
            <Rocket className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role === "investor"
              ? "Manage your investor account, thesis, and preferences"
              : "Manage your founder account, listing, and preferences"}
          </p>
        </div>
        <Badge
          className={`ml-auto ${role === "investor" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"}`}
        >
          {role === "investor" ? "Investor" : "Founder"}
        </Badge>
      </div>

      {role === "investor" ? <InvestorSettings /> : <FounderSettings />}
    </div>
  );
}
