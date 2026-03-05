import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  BriefcaseBusiness, TrendingUp, DollarSign, BarChart3, ArrowUp, ArrowDown,
  Globe, Users, Calendar, Plus, ChevronRight
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const portfolio = [
  { name: "DataVault", sector: "SaaS", stage: "Series B", invested: "$2M", currentValue: "$8.4M", moic: "4.2x", irr: "+62%", invested_year: 2022, team: 45, arr: "$5.2M", status: "Active", growth: "+120%", color: "#8b5cf6" },
  { name: "HealthBridge", sector: "HealthTech", stage: "Seed", invested: "$500K", currentValue: "$1.1M", moic: "2.2x", irr: "+48%", invested_year: 2024, team: 12, arr: "$480K", status: "Active", growth: "+210%", color: "#10b981" },
  { name: "CloudCore", sector: "SaaS", stage: "Exited (Series C)", invested: "$3M", currentValue: "$21M", moic: "7.0x", irr: "+88%", invested_year: 2021, team: 120, arr: "$18M", status: "Exited", growth: "+85%", color: "#6366f1" },
  { name: "FinFlow Pro", sector: "FinTech", stage: "Pre-Seed", invested: "$250K", currentValue: "$320K", moic: "1.3x", irr: "+28%", invested_year: 2024, team: 6, arr: "$120K", status: "Active", growth: "+180%", color: "#f59e0b" },
];

const portfolioValueTrend = [
  { month: "Mar 25", value: 3.2 },
  { month: "Jun 25", value: 4.8 },
  { month: "Sep 25", value: 6.1 },
  { month: "Dec 25", value: 8.9 },
  { month: "Jan 26", value: 9.4 },
  { month: "Feb 26", value: 10.2 },
  { month: "Mar 26", value: 10.82 },
];

const sectorAllocation = [
  { name: "SaaS", value: 42, color: "#8b5cf6" },
  { name: "HealthTech", value: 18, color: "#10b981" },
  { name: "FinTech", value: 25, color: "#f59e0b" },
  { name: "Other", value: 15, color: "#94a3b8" },
];

export function PortfolioPage() {
  const { theme } = useTheme();
  const chartGrid = theme === "dark" ? "#334155" : "#e5e7eb";
  const chartAxis = theme === "dark" ? "#94a3b8" : "#6b7280";

  const totalInvested = "$5.75M";
  const totalCurrent = "$30.82M";
  const totalMOIC = "5.3x";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BriefcaseBusiness className="h-6 w-6 text-indigo-600" />
            Portfolio
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Track all your investments and performance metrics</p>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white gap-2">
          <Plus className="h-4 w-4" /> Add Investment
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invested", value: totalInvested, icon: DollarSign, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" },
          { label: "Portfolio Value", value: totalCurrent, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Overall MOIC", value: totalMOIC, icon: BarChart3, color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
          { label: "Companies", value: String(portfolio.length), icon: BriefcaseBusiness, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</div>
                <div className="text-xs text-gray-500">{kpi.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Portfolio Value Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={portfolioValueTrend}>
                <defs>
                  <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="month" stroke={chartAxis} tick={{ fontSize: 11 }} />
                <YAxis stroke={chartAxis} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(v: number) => [`$${v}M`, "Portfolio Value"]}
                  contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" fill="url(#portfolioGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Sector Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={sectorAllocation} cx="50%" cy="45%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {sectorAllocation.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, "Allocation"]} contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {portfolio.map((co, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${co.color}, ${co.color}88)` }}>
                      {co.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{co.name}</div>
                      <div className="text-xs text-gray-500">{co.sector} · {co.stage} · Since {co.invested_year}</div>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:ml-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{co.invested}</div>
                      <div className="text-xs text-gray-400">Invested</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-emerald-600">{co.currentValue}</div>
                      <div className="text-xs text-gray-400">Current Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-indigo-600">{co.moic}</div>
                      <div className="text-xs text-gray-400">MOIC</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-violet-600">{co.irr}</div>
                      <div className="text-xs text-gray-400">IRR</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${co.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400"}`}
                    >
                      {co.status}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
