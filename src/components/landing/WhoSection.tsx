"use client";

import { Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const requirements = [
  {
    title: "Instaladores de rastreador",
    description: "Profissionais com experiência em instalação de rastreadores e bloqueadores veiculares.",
  },
  {
    title: "Técnicos automotivos",
    description: "Técnicos com conhecimento em sistemas elétricos e eletrônicos de veículos.",
  },
  {
    title: "Profissionais com ou sem posto fixo",
    description: "Atendemos tanto profissionais com oficina própria quanto os que atuam com atendimento móvel.",
  },
  {
    title: "Atendimento móvel",
    description: "Profissionais que se deslocam até o cliente para realizar instalações e manutenções.",
  },
  {
    title: "Experiência com elétrica automotiva",
    description: "Conhecimento em leitura de diagramas elétricos, uso de multímetro e ferramentas de diagnóstico.",
  },
];

export default function WhoSection() {
  return (
    <section id="perfil" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#22C55E]/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#8E8EDC] mb-4">
              Perfil ideal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 glow-text">
              Quem estamos <span className="purple-gradient-text">buscando</span>?
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg">
              Confira o perfil dos profissionais que procuramos para integrar nossa rede.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {requirements.map((req, i) => (
            <ScrollReveal key={req.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="glass-card card-shine glass-card-hover p-6 flex items-start gap-5 transition-all duration-500 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mt-0.5 group-hover:scale-110 group-hover:bg-[#22C55E]/15 transition-all duration-300">
                  <Check className="w-5 h-5 text-[#22C55E]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1.5">
                    {req.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-[15px]">
                    {req.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
