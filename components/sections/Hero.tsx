import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative px-6 pt-16 pb-12 md:px-12 lg:px-20 lg:pt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* YC badge */}
            <div className="inline-flex items-center gap-2 bg-ph-orange/10 text-ph-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-ph-orange rounded-full animate-pulse" />
              Backed by Y Combinator · 100,000+ companies
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-ph-dark leading-[1.1] tracking-tight mb-5">
              The only all-in-one{" "}
              <span className="text-ph-orange">platform</span>
              <br className="hidden lg:block" /> built for developers
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Product analytics, session replay, feature flags, A/B testing,
              surveys, and data warehouse — all on one platform. No more
              stitching tools together.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button href="/signup" variant="primary" size="lg">
                Talk to Aprix
              </Button>
              <Button href="/demo" variant="outline" size="lg">
                Book a demo
              </Button>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              No credit card required · Self-hosted or cloud · Cancel anytime
            </p>
          </div>

          {/* Right: Hedgehog mascot */}
          <div className="flex-shrink-0 lg:w-72 xl:w-80">
            <HedgehogMax />
          </div>
        </div>

        {/* Social proof logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest font-medium">
            Trusted by engineers at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
            {["Airbus", "Hasura", "Vendasta", "Pry", "Contra", "Ycombinator"].map(
              (company) => (
                <span
                  key={company}
                  className="text-gray-500 font-semibold text-lg tracking-tight"
                >
                  {company}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HedgehogMax() {
  return (
    <svg
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs mx-auto drop-shadow-xl"
    >
      {/* Shadow */}
      <ellipse cx="160" cy="340" rx="100" ry="14" fill="#1d1b17" opacity="0.07" />

      {/* Body */}
      <ellipse cx="160" cy="240" rx="120" ry="90" fill="#f54e00" />

      {/* Belly */}
      <ellipse cx="175" cy="258" rx="72" ry="58" fill="#fcd5b1" />

      {/* Spines */}
      <path d="M70 185 Q88 135 115 178" stroke="#1d1b17" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M105 162 Q128 105 152 158" stroke="#1d1b17" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M142 148 Q165 88 185 148" stroke="#1d1b17" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M180 152 Q202 92 220 158" stroke="#1d1b17" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M215 165 Q236 112 248 178" stroke="#1d1b17" strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* Head */}
      <ellipse cx="220" cy="222" rx="48" ry="44" fill="#fcd5b1" />

      {/* Eye */}
      <circle cx="237" cy="210" r="9" fill="white" />
      <circle cx="239" cy="210" r="5.5" fill="#1d1b17" />
      <circle cx="241" cy="207" r="1.8" fill="white" />

      {/* Nose */}
      <ellipse cx="257" cy="228" rx="10" ry="7" fill="#1d1b17" />
      <circle cx="252" cy="225" r="2.5" fill="white" opacity="0.45" />

      {/* Smile */}
      <path
        d="M250 238 Q260 245 268 238"
        stroke="#1d1b17"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left arm */}
      <ellipse
        cx="110"
        cy="278"
        rx="18"
        ry="30"
        fill="#f54e00"
        transform="rotate(-15 110 278)"
      />
      {/* Right arm */}
      <ellipse
        cx="248"
        cy="288"
        rx="18"
        ry="30"
        fill="#f54e00"
        transform="rotate(12 248 288)"
      />

      {/* Feet */}
      <ellipse cx="128" cy="323" rx="26" ry="12" fill="#1d1b17" />
      <ellipse cx="196" cy="323" rx="26" ry="12" fill="#1d1b17" />
    </svg>
  );
}
