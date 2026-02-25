"use client";

import { Map } from "lucide-react";
import { ESTADOS_BR } from "@/lib/constants";

interface StepStateProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StepState({ value, onChange }: StepStateProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <Map className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Qual seu estado (UF)?</h3>
          <p className="text-sm text-white/40">Selecione o estado onde atua</p>
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="quiz-input appearance-none cursor-pointer"
      >
        <option value="" className="bg-[#180049]">Selecione seu estado</option>
        {ESTADOS_BR.map((estado) => (
          <option key={estado.uf} value={estado.uf} className="bg-[#180049]">
            {estado.uf} - {estado.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
