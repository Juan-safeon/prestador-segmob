"use client";

import { Calendar } from "lucide-react";
import { DIAS_SEMANA } from "@/lib/constants";

interface StepDaysProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function StepDays({ value, onChange }: StepDaysProps) {
  const toggle = (day: string) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  const selectAll = () => {
    if (value.length === DIAS_SEMANA.length) {
      onChange([]);
    } else {
      onChange(DIAS_SEMANA.map((d) => d.value));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Dias disponíveis</h3>
          <p className="text-sm text-white/40">Selecione os dias que você pode atender</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {DIAS_SEMANA.map((dia) => (
          <button
            key={dia.value}
            type="button"
            onClick={() => toggle(dia.value)}
            className={`chip min-w-[60px] text-center ${value.includes(dia.value) ? "chip-active" : ""}`}
          >
            {dia.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={selectAll}
        className="text-sm text-[#8E8EDC] hover:text-white transition-colors"
      >
        {value.length === DIAS_SEMANA.length ? "Desmarcar todos" : "Selecionar todos"}
      </button>
    </div>
  );
}
