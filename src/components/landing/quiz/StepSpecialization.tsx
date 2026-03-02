"use client";

import { Wrench } from "lucide-react";

interface StepSpecializationProps {
    value: string;
    onChange: (value: string) => void;
}

const SPECIALIZATIONS = [
    "Serviços de instalação e manutenção de rastreadores",
];

export default function StepSpecialization({ value, onChange }: StepSpecializationProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-[#8E8EDC]" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">Ramo que atua / Especialização</h3>
                    <p className="text-sm text-white/40">Confirme sua principal área de atuação</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {SPECIALIZATIONS.map((spec) => (
                    <button
                        key={spec}
                        type="button"
                        onClick={() => onChange(spec)}
                        className={`chip text-left py-4 px-6 ${value === spec ? "chip-active" : ""}`}
                    >
                        {spec}
                    </button>
                ))}
            </div>
        </div>
    );
}
