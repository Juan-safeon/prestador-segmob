"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";
import useQuizForm from "@/hooks/useQuizForm";
import StepName from "./quiz/StepName";
import StepCity from "./quiz/StepCity";
import StepState from "./quiz/StepState";
import StepFixedLocation from "./quiz/StepFixedLocation";
import StepRegions from "./quiz/StepRegions";
import StepDays from "./quiz/StepDays";
import StepHours from "./quiz/StepHours";
import StepWhatsapp from "./quiz/StepWhatsapp";
import StepEmail from "./quiz/StepEmail";
import StepSuccess from "./quiz/StepSuccess";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function QuizForm() {
  const {
    step,
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
  } = useQuizForm();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canAdvance && step < 10) {
      e.preventDefault();
      if (step === 9) {
        submit();
      } else {
        nextStep();
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepName value={data.nome} onChange={(v) => updateField("nome", v)} />;
      case 2:
        return <StepCity value={data.cidade} onChange={(v) => updateField("cidade", v)} />;
      case 3:
        return <StepState value={data.uf} onChange={(v) => updateField("uf", v)} />;
      case 4:
        return (
          <StepFixedLocation
            value={data.pontoFixo}
            endereco={data.endereco}
            onChange={(v) => updateField("pontoFixo", v)}
            onEnderecoChange={(v) => updateField("endereco", v)}
          />
        );
      case 5:
        return <StepRegions value={data.regioes} onChange={(v) => updateField("regioes", v)} />;
      case 6:
        return <StepDays value={data.dias} onChange={(v) => updateField("dias", v)} />;
      case 7:
        return <StepHours value={data.horario} onChange={(v) => updateField("horario", v)} />;
      case 8:
        return <StepWhatsapp value={data.whatsapp} onChange={(v) => updateField("whatsapp", v)} />;
      case 9:
        return <StepEmail value={data.email} onChange={(v) => updateField("email", v)} />;
      case 10:
        return <StepSuccess />;
      default:
        return null;
    }
  };

  return (
    <section id="cadastro" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6E3DF7]/8 to-transparent pointer-events-none" />

      <div className="relative max-w-xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="purple-gradient-text">Cadastre-se</span> agora
            </h2>
            <p className="text-white/50">
              Preencha o formulário e faça parte da nossa rede nacional.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="glass-card p-6 sm:p-8" onKeyDown={handleKeyDown}>
            {/* Progress bar */}
            {!isComplete && (
              <div className="mb-8">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Etapa {step} de 9</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="progress-bar h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Step content */}
            <div className="min-h-[250px] flex items-center">
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Navigation buttons */}
            {!isComplete && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>

                {step === 9 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={submit}
                    disabled={!canAdvance || isSubmitting}
                    className="gradient-btn px-8 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Finalizar Cadastro
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={nextStep}
                    disabled={!canAdvance}
                    className="gradient-btn px-8 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
