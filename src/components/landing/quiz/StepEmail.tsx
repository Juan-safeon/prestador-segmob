"use client";

import { Mail } from "lucide-react";

interface StepEmailProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StepEmail({ value, onChange }: StepEmailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <Mail className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Seu e-mail</h3>
          <p className="text-sm text-white/40">Para envio de comunicações e atualizações</p>
        </div>
      </div>
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="seu@email.com"
        className="quiz-input"
      />
    </div>
  );
}
