"use client";

import { motion } from "framer-motion";
import { CheckCircle, PartyPopper } from "lucide-react";

export default function StepSuccess() {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-[#22C55E]/15 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-[#22C55E]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <PartyPopper className="w-6 h-6 text-[#8E8EDC]" />
          <h3 className="text-2xl font-bold text-white">Cadastro enviado!</h3>
        </div>
        <p className="text-white/50 max-w-sm mx-auto leading-relaxed">
          Recebemos suas informações com sucesso! Nossa equipe irá analisar seu perfil
          e entraremos em contato pelo WhatsApp em breve.
        </p>
      </motion.div>
    </div>
  );
}
