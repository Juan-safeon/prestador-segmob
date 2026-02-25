"use client";

import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div className={`glass-card ${hover ? "glass-card-hover" : ""} transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
