import { Car, Truck } from "lucide-react";

const SEGMENTOS_OPTIONS = [
  { value: "leves", label: "Veículos Leves", icon: Car },
  { value: "pesados", label: "Veículos Pesados", icon: Truck },
];

interface StepSegmentsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function StepSegments({ value, onChange }: StepSegmentsProps) {
  const toggleSegmento = (segmento: string) => {
    if (value.includes(segmento)) {
      onChange(value.filter((s) => s !== segmento));
    } else {
      onChange([...value, segmento]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#6E3DF7]/15 flex items-center justify-center">
          <Car className="w-5 h-5 text-[#8E8EDC]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Quais segmentos você atende?</h3>
          <p className="text-sm text-white/40">Selecione todos que se aplicam.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {SEGMENTOS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleSegmento(option.value)}
            className={`chip flex flex-col items-center justify-center gap-3 py-6 ${value.includes(option.value) ? "chip-active" : ""
              }`}
          >
            <option.icon className="w-8 h-8" />
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}