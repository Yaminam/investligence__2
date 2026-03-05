import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";

// Auth pages
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import { EmailVerificationPage } from "./pages/auth/EmailVerificationPage";

// Onboarding
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";

// Dashboard pages
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { StartupMarketplacePage } from "./pages/dashboard/StartupMarketplacePage";
import { AIMatchingPage } from "./pages/dashboard/AIMatchingPage";
import { SectorAnalyticsPage } from "./pages/dashboard/SectorAnalyticsPage";
import { WarmIntroductionsPage } from "./pages/dashboard/WarmIntroductionsPage";
import { PortfolioPage } from "./pages/dashboard/PortfolioPage";
import { InvestorProfilePage } from "./pages/dashboard/InvestorProfilePage";
import { StartupApplicationPage } from "./pages/dashboard/StartupApplicationPage";
import { MyListingPage } from "./pages/dashboard/MyListingPage";
import { BrowseInvestorsPage } from "./pages/dashboard/BrowseInvestorsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import AIChatPage from "./pages/dashboard/AIChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "verify-email", element: <EmailVerificationPage /> },
    ],
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "marketplace", element: <StartupMarketplacePage /> },
      { path: "ai-matching", element: <AIMatchingPage /> },
      { path: "sectors", element: <SectorAnalyticsPage /> },
      { path: "introductions", element: <WarmIntroductionsPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "investor-profile", element: <InvestorProfilePage /> },
      { path: "application", element: <StartupApplicationPage /> },
      { path: "my-listing", element: <MyListingPage /> },
      { path: "browse-investors", element: <BrowseInvestorsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "ask-ai", element: <AIChatPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
