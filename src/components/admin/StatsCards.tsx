"use client";

import { Users, MapPin, Building2, Car, TrendingUp } from "lucide-react";
import type { DashboardStats } from "@/types/prestador";

interface StatsCardsProps {
  stats: DashboardStats;
  loading: boolean;
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  const topState = Object.entries(stats.porEstado).sort((a, b) => b[1] - a[1])[0];

  const cards = [
    {
      icon: Users,
      label: "Total de Cadastros",
      value: stats.total,
      color: "#6E3DF7",
    },
    {
      icon: MapPin,
      label: "Estados Ativos",
      value: Object.keys(stats.porEstado).length,
      sublabel: topState ? `Top: ${topState[0]} (${topState[1]})` : undefined,
      color: "#8E8EDC",
    },
    {
      icon: Building2,
      label: "Posto Fixo",
      value: stats.fixo,
      color: "#3B82F6",
    },
    {
      icon: Car,
      label: "Atend. Móvel",
      value: stats.movel,
      color: "#F59E0B",
    },
    {
      icon: TrendingUp,
      label: "Novos (7 dias)",
      value: stats.novosSemana,
      color: "#22C55E",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-[#2D1660] bg-[#1A0A3E] p-5 transition-all hover:border-[#4A2A8A]"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${card.color}15` }}
            >
              <card.icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {loading ? (
              <div className="h-8 w-16 rounded-lg bg-white/5 animate-pulse" />
            ) : (
              card.value
            )}
          </div>
          <div className="text-xs text-white/40 mt-1">{card.label}</div>
          {card.sublabel && (
            <div className="text-xs text-[#8E8EDC] mt-1">{card.sublabel}</div>
          )}
        </div>
      ))}
    </div>
  );
}
