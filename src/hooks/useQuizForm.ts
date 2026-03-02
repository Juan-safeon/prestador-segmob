"use client";

import { useState, useCallback, useMemo } from "react";
import { isValidEmail, isValidPhone, cleanPhone } from "@/lib/utils";
import type { PrestadorFormData } from "@/types/prestador";

const TOTAL_STEPS = 9; // 8 data steps + 1 success

const initialData: PrestadorFormData = {
  empresa: "",
  nome: "",
  whatsapp: "",
  email: "",
  cidade: "",
  uf: "",
  especializacao: "",
  segmentos: [],
};

export default function useQuizForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PrestadorFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => {
    return Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);
  }, [step]);

  const updateField = useCallback(<K extends keyof PrestadorFormData>(
    field: K,
    value: PrestadorFormData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const canAdvance = useMemo(() => {
    switch (step) {
      case 1: return data.empresa.trim().length >= 3;
      case 2: return data.nome.trim().length >= 3;
      case 3: return isValidPhone(data.whatsapp);
      case 4: return isValidEmail(data.email);
      case 5: return data.cidade.trim().length >= 2;
      case 6: return data.uf.length === 2;
      case 7: return data.especializacao !== "";
      case 8: return data.segmentos.length > 0;
      default: return false;
    }
  }, [step, data]);

  const nextStep = useCallback(() => {
    if (!canAdvance) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  }, [canAdvance, step]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }, [step]);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        empresa: data.empresa.trim(),
        nome: data.nome.trim(),
        whatsapp: cleanPhone(data.whatsapp),
        email: data.email.trim().toLowerCase(),
        cidade: data.cidade.trim(),
        uf: data.uf,
        especializacao: data.especializacao,
        segmentos: data.segmentos,
      };

      const res = await fetch("/api/prestadores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erro ao enviar cadastro");
      }

      setIsComplete(true);
      setStep(TOTAL_STEPS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setIsSubmitting(false);
    }
  }, [data]);

  return {
    step,
    totalSteps: TOTAL_STEPS,
    data,
    progress,
    isSubmitting,
    isComplete,
    error,
    updateField,
    nextStep,
    prevStep,
    canAdvance,
    submit,
  };
}
