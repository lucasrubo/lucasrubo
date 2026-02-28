"use client";

import { Check, Zap } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { useAprix } from "@/contexts/AprixContext";

export default function PricingApp() {
  const { toggleChat } = useAprix();
  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <div className="px-10 pt-10 pb-8 border-b border-gray-100 bg-gradient-to-b from-ph-cream/40 to-white">
        <div className="inline-flex items-center gap-2 bg-ph-orange/10 text-ph-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Zap size={11} />
          Transparent, usage-based pricing
        </div>
        <h1 className="text-3xl font-bold text-ph-dark tracking-tight mb-2">
          Start free.{" "}
          <span className="text-ph-orange">Pay as you grow.</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-lg">
          No per-seat pricing. No surprise invoices. Generous free tier forever
          — upgrade only when you need more.
        </p>
      </div>

      {/* Plans */}
      <div className="px-10 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-5 rounded-xl border transition-all ${
                plan.highlight
                  ? "border-ph-orange bg-ph-orange/5 shadow-md shadow-ph-orange/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ph-orange text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
                  Most popular
                </span>
              )}

              <h2 className="font-bold text-ph-dark text-lg">{plan.name}</h2>
              <p className="text-gray-400 text-xs mt-0.5 mb-4">
                {plan.description}
              </p>

              <div className="mb-5">
                <span className="text-3xl font-bold text-ph-dark">
                  {plan.price}
                </span>
                <span className="text-gray-400 text-xs ml-1">{plan.period}</span>
              </div>

              <button
                onClick={plan.cta === "Talk to Aprix" ? toggleChat : undefined}
                className={`w-full py-2 rounded-md text-sm font-semibold mb-5 transition-colors ${
                  plan.highlight
                    ? "bg-ph-orange text-white hover:bg-[#d94400]"
                    : "border border-gray-300 text-ph-dark hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      size={13}
                      className="mt-0.5 flex-shrink-0 text-ph-orange"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          All plans include unlimited tracked users. Usage above free limits
          billed at transparent per-unit rates.
        </p>
      </div>

      {/* FAQ */}
      <div className="px-10 py-8 border-t border-gray-100 bg-gray-50/50">
        <h2 className="text-base font-bold text-ph-dark mb-4">
          Frequently asked questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["Do you offer a free plan?", "Yes! Our free tier includes 1M events, 5K session recordings, and 1M feature flag requests per month — forever."],
            ["Is there per-seat pricing?", "No. All plans include unlimited team members and tracked users. You only pay for usage."],
            ["Can I self-host AprixOS?", "Yes! AprixOS is open-source. You can self-host for free or use our cloud offering."],
            ["How does billing work?", "You're billed monthly based on usage. No upfront commitments. Cancel anytime."],
          ].map(([q, a]) => (
            <div key={q}>
              <p className="text-sm font-semibold text-ph-dark mb-1">{q}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
