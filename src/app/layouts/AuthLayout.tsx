import { Outlet } from "react-router";
import { CapitalConnectLogo } from "../components/CapitalConnectLogo";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <CapitalConnectLogo size={64} />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Capital Connect</h1>
          <p className="text-gray-600">AI-Powered Deal Flow Intelligence</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
