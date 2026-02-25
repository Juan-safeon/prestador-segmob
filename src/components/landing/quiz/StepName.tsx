"use client";

import { User } from "lucide-react";

interface StepNameProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StepName({ value, onChange }: StepNameProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <User className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Qual seu nome completo?</h3>
          <p className="text-sm text-white/40">Como você é conhecido profissionalmente</p>
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex: João Silva dos Santos"
        className="quiz-input"
      />
    </div>
  );
}
