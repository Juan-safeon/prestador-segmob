import { motion } from "framer-motion";
import { type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-3.5 text-base",
  lg: "px-10 py-4 text-lg",
};

export default function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: GradientButtonProps) {
  const baseClass =
    variant === "primary"
      ? "gradient-btn"
      : variant === "white"
        ? "white-btn"
        : "gradient-btn-outline";

  const content = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClass} ${sizeClasses[size]} ${className} inline-flex items-center justify-center cursor-pointer`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClass} ${sizeClasses[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
