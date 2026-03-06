import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  Home,
  Zap,
  TrendingUp,
  BarChart3,
  Sparkles,
  Users,
  BriefcaseBusiness,
  Settings,
  Menu,
  Search,
  User,
  HelpCircle,
  LogOut,
  GitMerge,
  Bot,
  Bell,
  ClipboardList,
  LayoutDashboard,
  Upload,
  DollarSign,
  AlertTriangle,
  Target,
  Globe,
  Star,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Toaster } from "../components/ui/sonner";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { NotificationCenter } from "../components/NotificationCenter";
import { useNotification } from "../context/NotificationContext";
import { Badge } from "../components/ui/badge";
import { investorTypeConfigs, investorTypeDashboardItems } from "../lib/investorTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const investorNavigation = [
  { name: "Deal Flow", href: "/dashboard", icon: Home },
  { name: "Startup Marketplace", href: "/dashboard/marketplace", icon: Zap },
  { name: "AI Matching", href: "/dashboard/ai-matching", icon: Sparkles },
  { name: "Sector Intelligence", href: "/dashboard/sectors", icon: BarChart3 },
  { name: "Warm Introductions", href: "/dashboard/introductions", icon: GitMerge },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: BriefcaseBusiness },
  { name: "Investor Profile", href: "/dashboard/investor-profile", icon: Users },
  { name: "Ask AI", href: "/dashboard/ask-ai", icon: Bot },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const founderNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Listing", href: "/dashboard/my-listing", icon: LayoutDashboard },
  { name: "My Application", href: "/dashboard/application", icon: ClipboardList },
  { name: "Browse Investors", href: "/dashboard/browse-investors", icon: Users },
  { name: "Warm Introductions", href: "/dashboard/introductions", icon: GitMerge },
  { name: "Sector Intelligence", href: "/dashboard/sectors", icon: BarChart3 },
  { name: "Ask AI", href: "/dashboard/ask-ai", icon: Bot },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { notifications } = useNotification();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const isFounder = user?.role === "founder";
  
  // Icon mapping for investor type dashboard items
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Sparkles, TrendingUp, BarChart3, Users, BriefcaseBusiness, Settings,
      Home, Zap, Bot, GitMerge, Upload, Menu, DollarSign, AlertTriangle,
      Target, Globe, Star, ClipboardList, LayoutDashboard,
    };
    return iconMap[iconName] || Home;
  };
  
  // Get navigation based on investor type or default for founders
  let navigation: Array<{ name: string; href: string; icon: typeof Home }> = [];
  
  if (isFounder) {
    navigation = founderNavigation;
  } else if (user?.investorType && investorTypeDashboardItems[user.investorType]) {
    // Use investor type specific navigation
    const typeNav = investorTypeDashboardItems[user.investorType];
    navigation = typeNav.map((item) => ({
      name: item.label,
      href: item.route,
      icon: getIconComponent(item.icon),
    }));
    // Always add settings at the end if not present
    if (!navigation.find(n => n.name.toLowerCase() === 'settings')) {
      navigation.push({ name: 'Settings', href: '/dashboard/settings', icon: Settings });
    }
  } else {
    navigation = investorNavigation;
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex grow flex-col gap-y-5 overflow-y-auto px-6 py-4 ${mobile ? "bg-white dark:bg-slate-950" : "bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800"}`}>
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">InvestLigence</div>
            <div className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
              {isFounder ? "Founder Portal" : "Deal Flow Intelligence"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-1">
        <Badge
          className={`text-xs px-2.5 py-1 ${
            isFounder
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
          }`}
          variant="secondary"
        >
          {isFounder ? "Founder" : "Investor"}
        </Badge>
        {!isFounder && user?.investorType && investorTypeConfigs[user.investorType] && (
          <Badge 
            className={`text-xs px-2.5 py-1 ${investorTypeConfigs[user.investorType].badge}`}
            variant="secondary"
          >
            {investorTypeConfigs[user.investorType].label}
          </Badge>
        )}
        {!isFounder && !user?.investorType && (
          <Badge className="text-xs px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" variant="secondary">
            VIP Access
          </Badge>
        )}
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => mobile && setSidebarOpen(false)}
                  className={`group flex gap-x-3 rounded-lg p-3 text-sm transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!isFounder && (
        <div className="border-t border-gray-200 dark:border-slate-800 pt-4 pb-2 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Quick Stats</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-indigo-600">247</div>
              <div className="text-xs text-gray-500">Startups</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-emerald-600">18</div>
              <div className="text-xs text-gray-500">Matches</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Toaster position="top-right" richColors />
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
          <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </button>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
              <form className="relative flex flex-1 max-w-2xl items-center" action="#" method="GET">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search startups, sectors, investors..."
                  className="pl-10 h-9 border-0 bg-gray-50 dark:bg-slate-800 rounded-full text-sm"
                />
              </form>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <div className="relative" ref={notifRef}>
                <button
                  className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  onClick={() => setNotifOpen(!notifOpen)}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border dark:border-slate-700 overflow-hidden">
                    <NotificationCenter />
                  </div>
                )}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <HelpCircle className="h-5 w-5" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user ? `${user.firstName} ${user.lastName}`.trim() || "User" : "User"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ""}</div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-medium">{user ? `${user.firstName} ${user.lastName}`.trim() : "User"}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                    <div className="text-xs text-indigo-500 mt-0.5 capitalize">{user?.role || "investor"}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard/investor-profile")}>
                    <User className="mr-2 h-4 w-4" />
                    {isFounder ? "My Profile" : "Investor Profile"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      {sidebarOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-gray-900/80"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800">
            <SidebarContent mobile />
          </aside>
        </div>
      )}
    </div>
  );
}
