import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{background: 'linear-gradient(135deg, #6366f1, #7c3aed)'}}>
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">InvestLigence</h1>
          <p className="text-gray-600">AI-Powered Deal Flow Intelligence</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
