"use client";

import { Clock } from "lucide-react";
import { HORARIOS } from "@/lib/constants";

interface StepHoursProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StepHours({ value, onChange }: StepHoursProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <Clock className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Horários de atendimento</h3>
          <p className="text-sm text-white/40">Qual período você está disponível?</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {HORARIOS.map((horario) => (
          <button
            key={horario.value}
            type="button"
            onClick={() => onChange(horario.value)}
            className={`chip text-center py-4 ${value === horario.value ? "chip-active" : ""}`}
          >
            {horario.label}
          </button>
        ))}
      </div>
    </div>
  );
}
