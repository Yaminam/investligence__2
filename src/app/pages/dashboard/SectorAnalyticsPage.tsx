import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  BarChart3, TrendingUp, DollarSign, Users, Globe, ArrowUp, ArrowDown, Zap
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from "recharts";

const sectors = [
  { name: "AI/ML", deals: 34, avgDeal: "$4.2M", activeInvestors: 142, growth: "+28%", trend: "up", color: "#6366f1", yoy: "+45%", totalDeployed: "$142M" },
  { name: "FinTech", deals: 28, avgDeal: "$3.8M", activeInvestors: 118, growth: "+19%", trend: "up", color: "#8b5cf6", yoy: "+32%", totalDeployed: "$106M" },
  { name: "HealthTech", deals: 22, avgDeal: "$5.1M", activeInvestors: 95, growth: "+15%", trend: "up", color: "#10b981", yoy: "+28%", totalDeployed: "$112M" },
  { name: "SaaS", deals: 19, avgDeal: "$6.4M", activeInvestors: 84, growth: "+8%", trend: "up", color: "#f59e0b", yoy: "+12%", totalDeployed: "$122M" },
  { name: "CleanTech", deals: 15, avgDeal: "$8.2M", activeInvestors: 67, growth: "+35%", trend: "up", color: "#06b6d4", yoy: "+62%", totalDeployed: "$123M" },
  { name: "EdTech", deals: 11, avgDeal: "$2.6M", activeInvestors: 52, growth: "-5%", trend: "down", color: "#ec4899", yoy: "-8%", totalDeployed: "$29M" },
  { name: "Web3", deals: 8, avgDeal: "$3.4M", activeInvestors: 38, growth: "-12%", trend: "down", color: "#f97316", yoy: "-22%", totalDeployed: "$27M" },
  { name: "Consumer", deals: 6, avgDeal: "$2.1M", activeInvestors: 29, growth: "+6%", trend: "up", color: "#84cc16", yoy: "+9%", totalDeployed: "$13M" },
];

const trendData = [
  { month: "Sep", "AI/ML": 18, FinTech: 14, HealthTech: 10, SaaS: 12, CleanTech: 7 },
  { month: "Oct", "AI/ML": 22, FinTech: 17, HealthTech: 13, SaaS: 14, CleanTech: 9 },
  { month: "Nov", "AI/ML": 26, FinTech: 20, HealthTech: 15, SaaS: 15, CleanTech: 11 },
  { month: "Dec", "AI/ML": 24, FinTech: 22, HealthTech: 17, SaaS: 16, CleanTech: 12 },
  { month: "Jan", "AI/ML": 29, FinTech: 24, HealthTech: 19, SaaS: 17, CleanTech: 14 },
  { month: "Feb", "AI/ML": 32, FinTech: 26, HealthTech: 21, SaaS: 18, CleanTech: 13 },
  { month: "Mar", "AI/ML": 34, FinTech: 28, HealthTech: 22, SaaS: 19, CleanTech: 15 },
];

const avgInvestmentData = sectors.map((s) => ({
  name: s.name,
  value: parseFloat(s.avgDeal.replace("$", "").replace("M", "")),
  fill: s.color,
}));

const topInvestors = [
  { name: "Sequoia Capital", sectors: ["AI/ML", "SaaS"], deals: 12, deployed: "$48M" },
  { name: "a16z", sectors: ["AI/ML", "FinTech", "Web3"], deals: 10, deployed: "$42M" },
  { name: "Lightspeed", sectors: ["SaaS", "HealthTech"], deals: 8, deployed: "$38M" },
  { name: "Bessemer", sectors: ["SaaS", "AI/ML"], deals: 7, deployed: "$28M" },
  { name: "NEA Partners", sectors: ["HealthTech", "CleanTech"], deals: 6, deployed: "$36M" },
];

export function SectorAnalyticsPage() {
  const { theme } = useTheme();
  const chartGrid = theme === "dark" ? "#334155" : "#e5e7eb";
  const chartAxis = theme === "dark" ? "#94a3b8" : "#6b7280";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-indigo-600" />
          Sector Intelligence
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Live market insights — active investors, deal activity, and investment trends by sector
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Deals (Q1 2026)", value: "143", change: "+24%", icon: Zap, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" },
          { label: "Active Investors", value: "625", change: "+18%", icon: Users, color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
          { label: "Avg Deal Size", value: "$4.1M", change: "+12%", icon: DollarSign, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Total Deployed", value: "$674M", change: "+31%", icon: TrendingUp, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</div>
                <div className="text-xs text-gray-500">{kpi.label}</div>
                <div className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
                  <ArrowUp className="h-3 w-3" />{kpi.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal trend by sector */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Deal Activity by Sector (7 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="month" stroke={chartAxis} tick={{ fontSize: 11 }} />
                <YAxis stroke={chartAxis} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                {["AI/ML", "FinTech", "HealthTech", "SaaS", "CleanTech"].map((s, i) => {
                  const colors = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#06b6d4"];
                  return <Line key={s} type="monotone" dataKey={s} stroke={colors[i]} strokeWidth={2} dot={false} />;
                })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Avg investment by sector */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Average Investment Size ($M)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={avgInvestmentData} margin={{ left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="name" stroke={chartAxis} tick={{ fontSize: 10 }} />
                <YAxis stroke={chartAxis} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v: number) => [`$${v}M`, "Avg Deal"]}
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {avgInvestmentData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sector Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Sector Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  {["Sector", "Deals (Q1)", "Avg Deal Size", "Active Investors", "Total Deployed", "YoY Growth", "Trend"].map((h) => (
                    <th key={h} className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectors.map((s, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                        <span className="font-semibold text-gray-900 dark:text-white">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-medium">{s.deals}</td>
                    <td className="py-3 pr-4 font-medium">{s.avgDeal}</td>
                    <td className="py-3 pr-4 font-medium">{s.activeInvestors}</td>
                    <td className="py-3 pr-4 font-medium">{s.totalDeployed}</td>
                    <td className="py-3 pr-4">
                      <span className={`flex items-center gap-1 font-semibold text-xs ${s.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                        {s.trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {s.yoy}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${s.trend === "up" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}
                      >
                        {s.trend === "up" ? "Hot" : "Cooling"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Most Active Investors */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            Most Active Investors This Quarter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topInvestors.map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    {inv.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{inv.name}</div>
                    <div className="flex gap-1.5 mt-0.5 flex-wrap">
                      {inv.sectors.map((s) => (
                        <span key={s} className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-md">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{inv.deals}</div>
                    <div className="text-xs text-gray-400">Deals</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-600">{inv.deployed}</div>
                    <div className="text-xs text-gray-400">Deployed</div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">View Profile</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
