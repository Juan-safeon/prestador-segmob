"use client";

import { Building2, Car } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface StepFixedLocationProps {
  value: boolean | null;
  endereco: string;
  onChange: (value: boolean) => void;
  onEnderecoChange: (value: string) => void;
}

export default function StepFixedLocation({
  value,
  endereco,
  onChange,
  onEnderecoChange,
}: StepFixedLocationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">Você possui posto fixo?</h3>
        <p className="text-sm text-white/40">Oficina ou local de atendimento próprio</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`chip flex flex-col items-center gap-3 py-6 ${value === true ? "chip-active" : ""}`}
        >
          <Building2 className="w-8 h-8" />
          <span className="font-medium">Sim, tenho posto fixo</span>
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`chip flex flex-col items-center gap-3 py-6 ${value === false ? "chip-active" : ""}`}
        >
          <Car className="w-8 h-8" />
          <span className="font-medium">Não, atendimento móvel</span>
        </button>
      </div>

      <AnimatePresence>
        {value === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm text-white/60 mb-2">Endereço do posto</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => onEnderecoChange(e.target.value)}
              placeholder="Rua, número, bairro"
              className="quiz-input"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
