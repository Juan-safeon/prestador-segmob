"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Top divider */}
      <div className="section-divider" />

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div>
              <div className="mb-3">
                <Image
                  src="/logosegmob.png"
                  alt="SegMob"
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-white/30 max-w-xs leading-relaxed">
                Referência nacional em tecnologia para segurança veicular e gestão de frotas.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-6 text-sm text-white/30">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8E8EDC]" />
                <span>Brasil - Cobertura Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8E8EDC]" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8E8EDC]" />
                <span>contato@segmob.com.br</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} SegMob do Brasil. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/15">
              <span>Segurança Veicular</span>
              <span>&middot;</span>
              <span>Rastreamento</span>
              <span>&middot;</span>
              <span>Gestão de Frotas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
