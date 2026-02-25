"use client";

import { TrendingUp, MapPin, Cpu, Smartphone, Rocket, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const benefits = [
  {
    icon: TrendingUp,
    title: "Demanda recorrente",
    description: "Mais de 50 mil serviços por mês garantem fluxo constante de trabalho para prestadores ativos.",
    accent: "#22C55E",
  },
  {
    icon: MapPin,
    title: "Atuação regional estratégica",
    description: "Você atende na sua região com base na demanda local, sem deslocamentos desnecessários.",
    accent: "#3B82F6",
  },
  {
    icon: Cpu,
    title: "Tecnologia homologada Anatel",
    description: "Trabalhe com equipamentos de última geração: LoRa, LTE e soluções multi-tecnologia.",
    accent: "#8E8EDC",
  },
  {
    icon: Smartphone,
    title: "Sistema organizado",
    description: "Receba chamados de forma profissional, com sistema digital de despacho e acompanhamento.",
    accent: "#F59E0B",
  },
  {
    icon: Rocket,
    title: "Crescimento profissional",
    description: "Faça parte de uma rede em expansão e evolua junto com a maior empresa de segurança veicular.",
    accent: "#EC4899",
  },
  {
    icon: ShieldCheck,
    title: "Parceria consolidada",
    description: "A SegMob atende seguradoras, bancos e transportadoras — solidez e credibilidade no mercado.",
    accent: "#6E3DF7",
  },
];

export default function WhyJoinSection() {
  return (
    <section id="beneficios" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#6E3DF7]/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#8E8EDC] mb-4">
              Benefícios
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 glow-text">
              Por que <span className="purple-gradient-text">fazer parte</span> da nossa rede?
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg">
              Conheça os benefícios de atuar como prestador técnico SegMob.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 0.08}>
              <div className="glass-card card-shine glass-card-hover p-7 h-full group transition-all duration-500">
                {/* Top accent line */}
                <div
                  className="w-10 h-1 rounded-full mb-6 transition-all duration-300 group-hover:w-16"
                  style={{ background: benefit.accent }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${benefit.accent}15` }}
                >
                  <benefit.icon className="w-7 h-7" style={{ color: benefit.accent }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/40 leading-relaxed text-[15px]">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
