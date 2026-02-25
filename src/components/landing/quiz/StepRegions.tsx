"use client";

import { Globe } from "lucide-react";
import { REGIOES } from "@/lib/constants";

interface StepRegionsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function StepRegions({ value, onChange }: StepRegionsProps) {
  const toggle = (region: string) => {
    if (value.includes(region)) {
      onChange(value.filter((r) => r !== region));
    } else {
      onChange([...value, region]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <Globe className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Quais regiões você atende?</h3>
          <p className="text-sm text-white/40">Selecione todas que se aplicam</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {REGIOES.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => toggle(region)}
            className={`chip text-center ${value.includes(region) ? "chip-active" : ""}`}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
