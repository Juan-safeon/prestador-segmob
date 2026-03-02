import { Building2 } from "lucide-react";

interface StepCompanyNameProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StepCompanyName({ value, onChange }: StepCompanyNameProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Qual o nome da sua empresa?</h3>
          <p className="text-sm text-white/40">Se não tiver, pode ser seu nome fantasia.</p>
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex: Silva Instalações"
        className="quiz-input"
        autoFocus
      />
    </div>
  );
}