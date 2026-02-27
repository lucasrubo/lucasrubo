import Link from "next/link";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const textColor = light ? "text-white" : "text-ph-dark";

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AprixOS logo"
      >
        {/* Body */}
        <ellipse cx="15" cy="20" rx="11" ry="8" fill="#f54e00" />
        {/* Spines */}
        <path
          d="M7 15 Q10 9 13 14 Q15 7 17 14 Q19 8 22 14"
          stroke="#1d1b17"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Face */}
        <ellipse cx="20" cy="19" rx="5" ry="4.5" fill="#fcd5b1" />
        {/* Eye */}
        <circle cx="22" cy="17.5" r="1.5" fill="#1d1b17" />
        <circle cx="22.6" cy="17" r="0.5" fill="white" />
        {/* Nose */}
        <ellipse cx="24.5" cy="20" rx="1.5" ry="1" fill="#1d1b17" />
      </svg>
      <span className={`font-bold text-[17px] tracking-tight ${textColor}`}>
        AprixOS
      </span>
    </Link>
  );
}
