"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Eye, Pencil } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import WhatsAppActions from "./WhatsAppActions";
import { STATUS_CONFIG } from "@/lib/constants";
import type { Prestador, PrestadorStatus } from "@/types/prestador";

interface PrestadoresTableProps {
  prestadores: Prestador[];
  loading: boolean;
  onSelect: (provider: Prestador) => void;
  onStatusChange: (id: string, status: PrestadorStatus) => void;
}

const PAGE_SIZE = 15;

export default function PrestadoresTable({
  prestadores,
  loading,
  onSelect,
  onStatusChange,
}: PrestadoresTableProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(prestadores.length / PAGE_SIZE);
  const paginated = prestadores.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#2D1660] bg-[#1A0A3E] overflow-hidden">
        <div className="p-8 text-center text-white/30">Carregando...</div>
      </div>
    );
  }

  if (prestadores.length === 0) {
    return (
      <div className="rounded-2xl border border-[#2D1660] bg-[#1A0A3E] overflow-hidden">
        <div className="p-8 text-center text-white/30">Nenhum prestador encontrado</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#2D1660] bg-[#1A0A3E] overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2D1660]">
              <th className="text-left text-xs text-white/40 font-medium uppercase tracking-wider px-5 py-3">
                Nome
              </th>
              <th className="text-left text-xs text-white/40 font-medium uppercase tracking-wider px-5 py-3">
                Cidade / UF
              </th>
              <th className="text-left text-xs text-white/40 font-medium uppercase tracking-wider px-5 py-3">
                Tipo
              </th>
              <th className="text-left text-xs text-white/40 font-medium uppercase tracking-wider px-5 py-3">
                Disponibilidade
              </th>
              <th className="text-left text-xs text-white/40 font-medium uppercase tracking-wider px-5 py-3">
                Status
              </th>
              <th className="text-right text-xs text-white/40 font-medium uppercase tracking-wider px-5 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[#2D1660]/50 hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => onSelect(p)}
              >
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-white">{p.nome}</div>
                  <div className="text-xs text-white/30">{p.email}</div>
                </td>
                <td className="px-5 py-4 text-sm text-white/60">
                  {p.cidade} / {p.uf}
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    p.ponto_fixo ? "bg-[#3B82F6]/10 text-[#3B82F6]" : "bg-[#F59E0B]/10 text-[#F59E0B]"
                  }`}>
                    {p.ponto_fixo ? "Fixo" : "Móvel"}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-white/40">
                  {p.dias.join(", ")} &middot; {p.horario}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={p.status} size="sm" />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <WhatsAppActions provider={p} compact />
                    <button
                      onClick={() => onSelect(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Ver
                    </button>
                    <button
                      onClick={() => router.push(`/admin/prestador/${p.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6E3DF7]/10 text-[#8E8EDC] text-xs hover:bg-[#6E3DF7]/20 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-[#2D1660]/50">
        {paginated.map((p) => (
          <div
            key={p.id}
            className="p-4 hover:bg-white/[0.02] transition-colors"
          >
            <div onClick={() => onSelect(p)} className="cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-white">{p.nome}</div>
                  <div className="text-xs text-white/40">{p.cidade} / {p.uf}</div>
                </div>
                <StatusBadge status={p.status} size="sm" />
              </div>
              <div className="flex items-center gap-3 text-xs text-white/30">
                <span>{p.ponto_fixo ? "Fixo" : "Móvel"}</span>
                <span>&middot;</span>
                <span>{p.horario}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#2D1660]/30">
              <WhatsAppActions provider={p} compact />
              <button
                onClick={() => onSelect(p)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs hover:text-white hover:bg-white/10 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Ver
              </button>
              <button
                onClick={() => router.push(`/admin/prestador/${p.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6E3DF7]/10 text-[#8E8EDC] text-xs hover:bg-[#6E3DF7]/20 transition-colors ml-auto"
              >
                <Pencil className="w-3.5 h-3.5" />
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#2D1660]">
          <span className="text-xs text-white/30">
            {prestadores.length} prestador{prestadores.length !== 1 ? "es" : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/40">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
