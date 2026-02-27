import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Footer from "@/components/sections/Footer";
import { PRICING_PLANS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – AprixOS",
  description:
    "Start for free. Upgrade only when you need more. No per-seat pricing, ever.",
};

export default function PricingPage() {
  return (
    <main>
      {/* Header */}
      <section className="px-6 pt-14 pb-10 md:px-12 lg:px-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-ph-orange/10 text-ph-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            Transparent, usage-based pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-ph-dark tracking-tight mb-4">
            Start free.{" "}
            <span className="text-ph-orange">Pay as you grow.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            No per-seat pricing. No surprise invoices. Generous free tier
            forever — upgrade only when you need more.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col p-6 rounded-xl border transition-all ${
                  plan.highlight
                    ? "border-ph-orange bg-ph-orange/5 shadow-lg shadow-ph-orange/10"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ph-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                {/* Plan name */}
                <h2 className="font-bold text-ph-dark text-xl mb-1">
                  {plan.name}
                </h2>
                <p className="text-gray-500 text-sm mb-5">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-ph-dark">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    {plan.period}
                  </span>
                </div>

                {/* CTA */}
                <Button
                  href={plan.ctaHref}
                  variant={plan.highlight ? "primary" : "outline"}
                  className="w-full justify-center mb-6"
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        className="mt-0.5 flex-shrink-0 text-ph-orange"
                      />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Usage note */}
          <p className="text-center text-sm text-gray-400 mt-8">
            All plans include unlimited tracked users. Usage above free limits
            billed at transparent per-unit rates.{" "}
            <a href="/pricing/calculator" className="text-ph-orange hover:underline">
              Estimate your bill →
            </a>
          </p>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="px-6 py-16 md:px-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-ph-dark mb-3">
            Questions? We have answers.
          </h2>
          <p className="text-gray-500 mb-6">
            Our pricing is designed to be transparent. If something is unclear,
            reach out — we respond fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/docs/billing" variant="outline">
              Read the billing docs
            </Button>
            <Button href="/questions" variant="ghost">
              Ask the community
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
