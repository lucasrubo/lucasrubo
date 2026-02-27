"use client";

export default function SignupApp() {
  return (
    <div className="min-h-full bg-white flex flex-col items-center justify-center px-10 py-12">
      <div className="w-full max-w-sm">
        {/* Hedgehog mini */}
        <div className="text-center mb-6">
          <span className="text-5xl">🦔</span>
          <h1 className="text-2xl font-bold text-ph-dark mt-3">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Free forever. No credit card required.
          </p>
        </div>

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Work email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ph-orange/40 focus:border-ph-orange"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ph-orange/40 focus:border-ph-orange"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-ph-orange text-white font-semibold py-2.5 rounded-md text-sm hover:bg-[#d94400] transition-colors"
          >
            Create free account
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          By signing up you agree to our{" "}
          <span className="text-ph-orange cursor-pointer">Terms</span> and{" "}
          <span className="text-ph-orange cursor-pointer">Privacy Policy</span>.
        </p>

        <div className="mt-5 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{" "}
            <span className="text-ph-orange font-semibold cursor-pointer">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
