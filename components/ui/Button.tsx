import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ph-orange text-white font-semibold hover:bg-[#d94400] border border-ph-orange",
  outline:
    "bg-transparent text-ph-dark border border-ph-dark/30 hover:border-ph-dark hover:bg-ph-dark/5",
  ghost: "bg-transparent text-ph-dark hover:bg-ph-dark/5 border border-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-1.5 rounded",
  md: "text-sm px-5 py-2.5 rounded-md",
  lg: "text-base px-6 py-3 rounded-md font-medium",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center transition-colors cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
