"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_TEMPLATES, getWhatsAppMessage } from "@/lib/whatsapp-templates";
import { formatWhatsAppUrl } from "@/lib/utils";
import type { Prestador } from "@/types/prestador";

interface WhatsAppActionsProps {
  provider: Prestador;
  compact?: boolean;
}

export default function WhatsAppActions({ provider, compact = false }: WhatsAppActionsProps) {
  const sendMessage = (templateId: string) => {
    const message = getWhatsAppMessage(templateId, provider);
    const url = formatWhatsAppUrl(provider.whatsapp, message);
    window.open(url, "_blank");
  };

  if (compact) {
    return (
      <button
        onClick={() => sendMessage("analise")}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22C55E]/10 text-[#22C55E] text-xs font-medium hover:bg-[#22C55E]/20 transition-colors"
        title="Enviar WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        WhatsApp
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="text-xs text-white/40 font-medium uppercase tracking-wider mb-3">
        Ações WhatsApp
      </h4>
      {WHATSAPP_TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => sendMessage(template.id)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#2D1660] hover:border-[#4A2A8A] bg-[#1A0A3E] text-sm text-white/70 hover:text-white transition-all"
        >
          <MessageCircle className="w-4 h-4" style={{ color: template.color }} />
          {template.label}
        </button>
      ))}
    </div>
  );
}
