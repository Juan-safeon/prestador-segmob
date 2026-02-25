"use client";

import {
  Shield,
  Radar,
  Truck,
  Headphones,
  MapPin,
  Wifi,
  Lock,
  Radio,
  Navigation,
  Siren,
  Wrench,
  Satellite,
} from "lucide-react";

const items = [
  { icon: Shield, label: "Segurança Veicular" },
  { icon: Radar, label: "Rastreamento" },
  { icon: Truck, label: "Gestão de Frotas" },
  { icon: Headphones, label: "Assistência 24h" },
  { icon: MapPin, label: "Recuperação de Ativos" },
  { icon: Siren, label: "Central de Alto Risco" },
  { icon: Wifi, label: "Tecnologia LoRa" },
  { icon: Lock, label: "Bloqueio Remoto" },
  { icon: Radio, label: "Multi-Tecnologia" },
  { icon: Navigation, label: "Cobertura Nacional" },
  { icon: Wrench, label: "Instalação Técnica" },
  { icon: Satellite, label: "Monitoramento 24/7" },
];

export default function MarqueeBanner() {
  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-[#6E3DF7] py-4">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#6E3DF7] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#6E3DF7] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee">
        {allItems.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2.5 px-8 shrink-0"
          >
            <item.icon className="w-4 h-4 text-white/70" />
            <span className="text-sm font-medium text-white/90 whitespace-nowrap">
              {item.label}
            </span>
            <span className="text-white/30 ml-4">&#x2022;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
