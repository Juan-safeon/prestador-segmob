"use client";

import { useState } from "react";
import usePrestadores from "@/hooks/usePrestadores";
import StatsCards from "@/components/admin/StatsCards";
import FilterBar from "@/components/admin/FilterBar";
import PrestadoresTable from "@/components/admin/PrestadoresTable";
import ProviderSidePanel from "@/components/admin/ProviderSidePanel";
import type { Prestador, PrestadorStatus } from "@/types/prestador";

export default function AdminDashboard() {
  const {
    prestadores,
    stats,
    filters,
    setFilters,
    loading,
    updateStatus,
  } = usePrestadores();

  const [selectedProvider, setSelectedProvider] = useState<Prestador | null>(null);

  const handleStatusChange = async (id: string, status: PrestadorStatus) => {
    await updateStatus(id, status);
    if (selectedProvider?.id === id) {
      setSelectedProvider((prev) => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Gerencie os prestadores cadastrados</p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} loading={loading} />

      {/* Filters */}
      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* Table */}
      <PrestadoresTable
        prestadores={prestadores}
        loading={loading}
        onSelect={setSelectedProvider}
        onStatusChange={handleStatusChange}
      />

      {/* Side panel */}
      <ProviderSidePanel
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
