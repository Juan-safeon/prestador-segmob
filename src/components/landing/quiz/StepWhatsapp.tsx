"use client";

import { MessageCircle } from "lucide-react";
import { formatPhoneInput } from "@/lib/utils";

interface StepWhatsappProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StepWhatsapp({ value, onChange }: StepWhatsappProps) {
  const handleChange = (raw: string) => {
    onChange(formatPhoneInput(raw));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-[#22C55E]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Seu WhatsApp</h3>
          <p className="text-sm text-white/40">Número para contato direto</p>
        </div>
      </div>
      <input
        type="tel"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="(11) 99999-9999"
        className="quiz-input"
      />
    </div>
  );
}
