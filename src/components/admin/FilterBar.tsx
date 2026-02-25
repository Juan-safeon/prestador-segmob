"use client";

import { Search, CalendarDays } from "lucide-react";
import { ESTADOS_BR, STATUS_CONFIG } from "@/lib/constants";
import type { PrestadorFilters, PrestadorStatus } from "@/types/prestador";

interface FilterBarProps {
  filters: PrestadorFilters;
  onFilterChange: (partial: Partial<PrestadorFilters>) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Row 1: Search + UF */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={filters.cidade}
            onChange={(e) => onFilterChange({ cidade: e.target.value })}
            placeholder="Buscar por nome ou cidade..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A0A3E] border border-[#2D1660] text-white text-sm placeholder:text-white/30 focus:border-[#6E3DF7] focus:outline-none transition-colors"
          />
        </div>
        <select
          value={filters.uf}
          onChange={(e) => onFilterChange({ uf: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-[#1A0A3E] border border-[#2D1660] text-white text-sm focus:border-[#6E3DF7] focus:outline-none cursor-pointer appearance-none flex-shrink-0"
        >
          <option value="todos">Todos UFs</option>
          {ESTADOS_BR.map((e) => (
            <option key={e.uf} value={e.uf}>
              {e.uf}
            </option>
          ))}
        </select>
      </div>

      {/* Row 2: Type + Status */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type */}
        <div className="flex rounded-xl border border-[#2D1660] overflow-hidden">
          {(["todos", "fixo", "movel"] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => onFilterChange({ tipo })}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors ${
                filters.tipo === tipo
                  ? "bg-[#6E3DF7]/20 text-white"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {tipo === "todos" ? "Todos" : tipo === "fixo" ? "Fixo" : "Móvel"}
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => onFilterChange({ status: "todos" })}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filters.status === "todos"
                ? "bg-white/10 text-white"
                : "text-white/30 hover:text-white/60"
            }`}
          >
            Todos
          </button>
          {(Object.entries(STATUS_CONFIG) as [PrestadorStatus, typeof STATUS_CONFIG[PrestadorStatus]][]).map(
            ([key, config]) => (
              <button
                key={key}
                onClick={() => onFilterChange({ status: key })}
                className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  background: filters.status === key ? config.bg : "transparent",
                  color: filters.status === key ? config.color : "rgba(255,255,255,0.3)",
                }}
              >
                {config.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Row 3: Date range */}
      <div className="flex flex-wrap items-center gap-2">
        <CalendarDays className="w-4 h-4 text-white/30 flex-shrink-0" />
        <input
          type="date"
          value={filters.dataInicio}
          onChange={(e) => onFilterChange({ dataInicio: e.target.value })}
          className="flex-1 min-w-[130px] max-w-[160px] px-3 py-2 rounded-xl bg-[#1A0A3E] border border-[#2D1660] text-white text-sm focus:border-[#6E3DF7] focus:outline-none transition-colors [color-scheme:dark]"
          title="Data início"
        />
        <span className="text-white/20 text-xs">até</span>
        <input
          type="date"
          value={filters.dataFim}
          onChange={(e) => onFilterChange({ dataFim: e.target.value })}
          className="flex-1 min-w-[130px] max-w-[160px] px-3 py-2 rounded-xl bg-[#1A0A3E] border border-[#2D1660] text-white text-sm focus:border-[#6E3DF7] focus:outline-none transition-colors [color-scheme:dark]"
          title="Data fim"
        />
        {(filters.dataInicio || filters.dataFim) && (
          <button
            onClick={() => onFilterChange({ dataInicio: "", dataFim: "" })}
            className="px-2 py-1.5 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
            title="Limpar datas"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
