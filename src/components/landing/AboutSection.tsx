"use client";

import { Activity, Globe, Radio, Brain, Headphones } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  {
    icon: Activity,
    number: "+50.000",
    label: "serviços/mês",
    description: "Alta demanda recorrente de serviços técnicos em todo o Brasil",
  },
  {
    icon: Globe,
    number: "Nacional",
    label: "cobertura",
    description: "Rede de atendimento presente em todos os estados brasileiros",
  },
  {
    icon: Radio,
    number: "LoRa + LTE",
    label: "tecnologia",
    description: "Tecnologias multi-frequência homologadas pela Anatel",
  },
  {
    icon: Brain,
    number: "Machine Learning",
    label: "prevenção",
    description: "Inteligência artificial aplicada à prevenção e recuperação",
  },
  {
    icon: Headphones,
    number: "24/7",
    label: "suporte",
    description: "Assistência e central de monitoramento ininterruptos",
  },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#6E3DF7]/5 blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#8E8EDC] mb-4">
              Sobre nós
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 glow-text">
              Quem é a <span className="purple-gradient-text">SegMob</span>?
            </h2>
            <p className="text-white/45 max-w-2xl mx-auto text-lg leading-relaxed">
              A SegMob é referência nacional em tecnologia para segurança veicular e
              gestão de frotas, atendendo seguradoras, bancos e empresas de transporte
              em todo o Brasil.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass-card card-shine glass-card-hover p-6 h-full text-center group transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6E3DF7]/20 to-[#8E8EDC]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-[#8E8EDC]" />
                </div>
                <div className="text-2xl font-bold text-white mb-1 glow-text">{stat.number}</div>
                <div className="text-[11px] text-[#8E8EDC] font-semibold uppercase tracking-[0.15em] mb-3">
                  {stat.label}
                </div>
                <p className="text-sm text-white/35 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
