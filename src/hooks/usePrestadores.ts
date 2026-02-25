"use client";

import { useState, useEffect, useCallback } from "react";
import type { Prestador, PrestadorFilters, PrestadorStatus, DashboardStats } from "@/types/prestador";

const defaultFilters: PrestadorFilters = {
  uf: "todos",
  cidade: "",
  tipo: "todos",
  status: "todos",
  dataInicio: "",
  dataFim: "",
};

export default function usePrestadores() {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    porEstado: {},
    fixo: 0,
    movel: 0,
    novosSemana: 0,
  });
  const [filters, setFiltersState] = useState<PrestadorFilters>(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrestadores = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.uf !== "todos") params.set("uf", filters.uf);
      if (filters.status !== "todos") params.set("status", filters.status);
      if (filters.tipo !== "todos") params.set("tipo", filters.tipo);
      if (filters.cidade) params.set("search", filters.cidade);

      const [prestRes, statsRes] = await Promise.all([
        fetch(`/api/prestadores?${params.toString()}`),
        fetch("/api/stats"),
      ]);

      if (!prestRes.ok || !statsRes.ok) {
        throw new Error("Erro ao carregar dados");
      }

      const [prestData, statsData] = await Promise.all([
        prestRes.json(),
        statsRes.json(),
      ]);

      // Client-side date filtering
      let filtered = prestData;
      if (filters.dataInicio) {
        const start = new Date(filters.dataInicio);
        start.setHours(0, 0, 0, 0);
        filtered = filtered.filter((p: Prestador) => new Date(p.created_at) >= start);
      }
      if (filters.dataFim) {
        const end = new Date(filters.dataFim);
        end.setHours(23, 59, 59, 999);
        filtered = filtered.filter((p: Prestador) => new Date(p.created_at) <= end);
      }

      setPrestadores(filtered);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPrestadores();
  }, [fetchPrestadores]);

  const setFilters = useCallback((partial: Partial<PrestadorFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateStatus = useCallback(async (id: string, status: PrestadorStatus) => {
    try {
      const res = await fetch(`/api/prestadores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar status");

      const updated = await res.json();
      setPrestadores((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (err) {
      console.error("Update status error:", err);
      throw err;
    }
  }, []);

  const deletePrestador = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/prestadores/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");

      setPrestadores((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      throw err;
    }
  }, []);

  return {
    prestadores,
    stats,
    filters,
    setFilters,
    loading,
    error,
    updateStatus,
    deletePrestador,
    refresh: fetchPrestadores,
  };
}
