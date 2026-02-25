"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Phone, Mail, Calendar, Clock, Building2, Car, Globe, Pencil } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import WhatsAppActions from "./WhatsAppActions";
import { STATUS_CONFIG } from "@/lib/constants";
import { formatPhoneDisplay } from "@/lib/utils";
import type { Prestador, PrestadorStatus } from "@/types/prestador";

interface ProviderSidePanelProps {
  provider: Prestador | null;
  onClose: () => void;
  onStatusChange: (id: string, status: PrestadorStatus) => void;
}

export default function ProviderSidePanel({ provider, onClose, onStatusChange }: ProviderSidePanelProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {provider && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#0F0024] border-l border-[#2D1660] shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0F0024]/95 backdrop-blur-lg border-b border-[#2D1660] p-5 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-semibold text-white">{provider.nome}</h3>
                <StatusBadge status={provider.status} size="sm" />
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-4 h-4 text-[#8E8EDC]" />
                  <span>{provider.cidade} / {provider.uf}</span>
                </div>

                <div className="flex items-center gap-3 text-white/60">
                  {provider.ponto_fixo ? (
                    <Building2 className="w-4 h-4 text-[#3B82F6]" />
                  ) : (
                    <Car className="w-4 h-4 text-[#F59E0B]" />
                  )}
                  <span>{provider.ponto_fixo ? "Posto fixo" : "Atendimento móvel"}</span>
                </div>

                {provider.endereco && (
                  <div className="text-sm text-white/40 pl-7">{provider.endereco}</div>
                )}

                <div className="flex items-center gap-3 text-white/60">
                  <Phone className="w-4 h-4 text-[#22C55E]" />
                  <span>{formatPhoneDisplay(provider.whatsapp)}</span>
                </div>

                <div className="flex items-center gap-3 text-white/60">
                  <Mail className="w-4 h-4 text-[#8E8EDC]" />
                  <span>{provider.email}</span>
                </div>

                <div className="flex items-start gap-3 text-white/60">
                  <Globe className="w-4 h-4 text-[#8E8EDC] mt-0.5" />
                  <div className="flex flex-wrap gap-1.5">
                    {provider.regioes.map((r) => (
                      <span key={r} className="px-2 py-0.5 rounded-md bg-white/5 text-xs">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/60">
                  <Calendar className="w-4 h-4 text-[#8E8EDC]" />
                  <span className="text-sm">{provider.dias.join(", ")}</span>
                </div>

                <div className="flex items-center gap-3 text-white/60">
                  <Clock className="w-4 h-4 text-[#8E8EDC]" />
                  <span className="capitalize">{provider.horario}</span>
                </div>
              </div>

              {/* Status change */}
              <div>
                <h4 className="text-xs text-white/40 font-medium uppercase tracking-wider mb-3">
                  Alterar Status
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(STATUS_CONFIG) as [PrestadorStatus, typeof STATUS_CONFIG[PrestadorStatus]][]).map(
                    ([key, config]) => (
                      <button
                        key={key}
                        onClick={() => onStatusChange(provider.id, key)}
                        disabled={provider.status === key}
                        className="px-3 py-2 rounded-xl text-xs font-medium border transition-all disabled:opacity-30"
                        style={{
                          borderColor: config.color + "30",
                          color: config.color,
                          background: provider.status === key ? config.bg : "transparent",
                        }}
                      >
                        {config.label}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Edit button */}
              <button
                onClick={() => { onClose(); router.push(`/admin/prestador/${provider.id}`); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#6E3DF7]/15 text-[#8E8EDC] text-sm font-medium border border-[#6E3DF7]/30 hover:bg-[#6E3DF7]/25 transition-all"
              >
                <Pencil className="w-4 h-4" />
                Editar cadastro completo
              </button>

              {/* WhatsApp */}
              <WhatsAppActions provider={provider} />

              {/* Meta */}
              <div className="text-xs text-white/20 pt-4 border-t border-[#2D1660]">
                <p>Cadastrado em: {new Date(provider.created_at).toLocaleDateString("pt-BR")}</p>
                <p>Atualizado em: {new Date(provider.updated_at).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
