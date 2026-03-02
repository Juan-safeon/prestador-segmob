"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, Save, Loader2, User, MapPin, Phone, Mail,
  Building2, Car, Landmark, CreditCard, FileText, Clock,
  Calendar, Globe, Trash2
} from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { STATUS_CONFIG, ESTADOS_BR, DIAS_SEMANA, HORARIOS, REGIOES } from "@/lib/constants";
import { formatPhoneDisplay } from "@/lib/utils";
import type { Prestador, PrestadorStatus } from "@/types/prestador";

export default function EditPrestador({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [prestador, setPrestador] = useState<Prestador | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"geral" | "juridico" | "financeiro" | "observacoes">("geral");
  const [form, setForm] = useState<Partial<Prestador>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/prestadores/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPrestador(data);
        setForm(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/prestadores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setPrestador(updated);
        setForm(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este prestador?")) return;
    try {
      await fetch(`/api/prestadores/${id}`, { method: "DELETE" });
      router.push("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 text-[#6E3DF7] animate-spin" />
      </div>
    );
  }

  if (!prestador) {
    return (
      <div className="p-8 text-center text-white/40">Prestador não encontrado</div>
    );
  }

  const tabs = [
    { key: "geral" as const, label: "Dados Gerais", icon: User },
    { key: "juridico" as const, label: "Jurídico", icon: FileText },
    { key: "financeiro" as const, label: "Financeiro", icon: Landmark },
    { key: "observacoes" as const, label: "Observações", icon: FileText },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin")}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{prestador.nome}</h1>
            <div className="flex items-center gap-3 mt-1">
              <StatusBadge status={prestador.status} size="sm" />
              <span className="text-xs text-white/30">
                Cadastrado em {new Date(prestador.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          <button
            onClick={handleDelete}
            className="px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Excluir</span>
          </button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="gradient-btn px-4 sm:px-5 py-2.5 text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? "Salvo!" : "Salvar"}
          </motion.button>
        </div>
      </div>

      {/* Status buttons */}
      <div className="mb-6">
        <h4 className="text-xs text-white/40 font-medium uppercase tracking-wider mb-3">Status</h4>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(STATUS_CONFIG) as [PrestadorStatus, typeof STATUS_CONFIG[PrestadorStatus]][]).map(
            ([key, config]) => (
              <button
                key={key}
                onClick={() => updateField("status", key)}
                className="px-4 py-2 rounded-xl text-xs font-medium border transition-all"
                style={{
                  borderColor: form.status === key ? config.color : config.color + "30",
                  color: config.color,
                  background: form.status === key ? config.bg : "transparent",
                }}
              >
                {config.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 mb-6">
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 w-fit min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.key
                  ? "bg-[#6E3DF7]/20 text-white"
                  : "text-white/40 hover:text-white/70"
                }`}
            >
              <tab.icon className="w-4 h-4 flex-shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-[#2D1660] bg-[#1A0A3E]/60 p-4 sm:p-6"
      >
        {activeTab === "geral" && (
          <div className="space-y-6">
            <SectionTitle icon={User} title="Informações Pessoais" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Nome do Responsável" value={form.nome || ""} onChange={(v) => updateField("nome", v)} icon={User} />
              <InputField label="Nome da Empresa" value={form.empresa || ""} onChange={(v) => updateField("empresa", v)} icon={Building2} />
              <InputField label="E-mail" value={form.email || ""} onChange={(v) => updateField("email", v)} icon={Mail} type="email" />
              <InputField label="WhatsApp" value={form.whatsapp || ""} onChange={(v) => updateField("whatsapp", v)} icon={Phone} />
              <SelectField
                label="UF"
                value={form.uf || ""}
                onChange={(v) => updateField("uf", v)}
                options={ESTADOS_BR.map((e) => ({ value: e.uf, label: `${e.uf} - ${e.nome}` }))}
                icon={MapPin}
              />
              <InputField label="Cidade" value={form.cidade || ""} onChange={(v) => updateField("cidade", v)} icon={MapPin} />
              <InputField label="Ramo / Especialização" value={form.especializacao || ""} onChange={(v) => updateField("especializacao", v)} icon={Globe} />
              <SelectField
                label="Tipo de atendimento"
                value={form.ponto_fixo ? "fixo" : "movel"}
                onChange={(v) => updateField("ponto_fixo", v === "fixo")}
                options={[
                  { value: "fixo", label: "Posto Fixo" },
                  { value: "movel", label: "Atendimento Móvel" },
                ]}
                icon={form.ponto_fixo ? Building2 : Car}
              />
            </div>

            <div>
              <label className="block text-sm text-white/50 mb-2 font-medium">Segmentos atendidos</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "leves", label: "Veículos Leves" },
                  { value: "pesados", label: "Veículos Pesados" },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => {
                      const current = form.segmentos || [];
                      updateField("segmentos", current.includes(s.value) ? current.filter((x) => x !== s.value) : [...current, s.value]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${(form.segmentos || []).includes(s.value)
                        ? "bg-[#6E3DF7]/15 text-[#8E8EDC] border-[#6E3DF7]/30"
                        : "text-white/30 border-white/10 hover:border-white/20"
                      }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {form.ponto_fixo && (
              <InputField label="Endereço do posto" value={form.endereco || ""} onChange={(v) => updateField("endereco", v)} icon={MapPin} />
            )}

            <SectionTitle icon={Globe} title="Cobertura e Disponibilidade" />
            <div>
              <label className="block text-sm text-white/50 mb-2 font-medium">Regiões atendidas</label>
              <div className="flex flex-wrap gap-2">
                {REGIOES.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      const current = form.regioes || [];
                      updateField("regioes", current.includes(r) ? current.filter((x) => x !== r) : [...current, r]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${(form.regioes || []).includes(r)
                        ? "bg-[#6E3DF7]/15 text-[#8E8EDC] border-[#6E3DF7]/30"
                        : "text-white/30 border-white/10 hover:border-white/20"
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/50 mb-2 font-medium">Dias disponíveis</label>
                <div className="flex flex-wrap gap-2">
                  {DIAS_SEMANA.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => {
                        const current = form.dias || [];
                        updateField("dias", current.includes(d.value) ? current.filter((x) => x !== d.value) : [...current, d.value]);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${(form.dias || []).includes(d.value)
                          ? "bg-[#6E3DF7]/15 text-[#8E8EDC] border-[#6E3DF7]/30"
                          : "text-white/30 border-white/10 hover:border-white/20"
                        }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <SelectField
                label="Horário"
                value={form.horario || ""}
                onChange={(v) => updateField("horario", v)}
                options={HORARIOS.map((h) => ({ value: h.value, label: h.label }))}
                icon={Clock}
              />
            </div>
          </div>
        )}

        {activeTab === "juridico" && (
          <div className="space-y-6">
            <SectionTitle icon={FileText} title="Dados Jurídicos" />
            <SelectField
              label="Tipo de pessoa"
              value={form.tipo_pessoa || ""}
              onChange={(v) => updateField("tipo_pessoa", v || null)}
              options={[
                { value: "", label: "Não informado" },
                { value: "fisica", label: "Pessoa Física" },
                { value: "juridica", label: "Pessoa Jurídica" },
              ]}
              icon={FileText}
            />

            {form.tipo_pessoa === "fisica" && (
              <InputField label="CPF" value={form.cpf || ""} onChange={(v) => updateField("cpf", v)} icon={FileText} placeholder="000.000.000-00" />
            )}

            {form.tipo_pessoa === "juridica" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="CNPJ" value={form.cnpj || ""} onChange={(v) => updateField("cnpj", v)} icon={FileText} placeholder="00.000.000/0000-00" />
                <InputField label="Razão Social" value={form.razao_social || ""} onChange={(v) => updateField("razao_social", v)} icon={Building2} />
                <InputField label="Inscrição Estadual" value={form.inscricao_estadual || ""} onChange={(v) => updateField("inscricao_estadual", v)} icon={FileText} placeholder="Opcional" />
              </div>
            )}

            {!form.tipo_pessoa && (
              <p className="text-sm text-white/20 py-4">Selecione o tipo de pessoa para preencher os dados jurídicos.</p>
            )}
          </div>
        )}

        {activeTab === "financeiro" && (
          <div className="space-y-6">
            <SectionTitle icon={Landmark} title="Dados Bancários" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Banco" value={form.banco || ""} onChange={(v) => updateField("banco", v)} icon={Landmark} placeholder="Ex: Nubank, Bradesco" />
              <InputField label="Agência" value={form.agencia || ""} onChange={(v) => updateField("agencia", v)} icon={CreditCard} placeholder="0000" />
              <InputField label="Conta" value={form.conta || ""} onChange={(v) => updateField("conta", v)} icon={CreditCard} placeholder="00000-0" />
              <SelectField
                label="Tipo de conta"
                value={form.tipo_conta || ""}
                onChange={(v) => updateField("tipo_conta", v || null)}
                options={[
                  { value: "", label: "Não informado" },
                  { value: "corrente", label: "Conta Corrente" },
                  { value: "poupanca", label: "Conta Poupança" },
                ]}
                icon={CreditCard}
              />
            </div>

            <SectionTitle icon={CreditCard} title="PIX" />
            <InputField label="Chave PIX" value={form.pix || ""} onChange={(v) => updateField("pix", v)} icon={CreditCard} placeholder="CPF, CNPJ, e-mail, telefone ou aleatória" />
          </div>
        )}

        {activeTab === "observacoes" && (
          <div className="space-y-6">
            <SectionTitle icon={FileText} title="Observações e Anotações" />
            <div>
              <label className="block text-sm text-white/50 mb-2 font-medium">Observações internas</label>
              <textarea
                value={form.observacoes || ""}
                onChange={(e) => updateField("observacoes", e.target.value)}
                rows={6}
                placeholder="Adicione notas sobre este prestador..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#6E3DF7]/50 focus:bg-white/[0.07] transition-all resize-none"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Reusable components

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-[#2D1660]">
      <Icon className="w-4 h-4 text-[#8E8EDC]" />
      <h3 className="text-sm font-semibold text-white/70">{title}</h3>
    </div>
  );
}

function InputField({
  label, value, onChange, icon: Icon, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; icon: React.ElementType; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-white/50 mb-2 font-medium">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#6E3DF7]/50 focus:bg-white/[0.07] transition-all"
        />
      </div>
    </div>
  );
}

function SelectField({
  label, value, onChange, options, icon: Icon,
}: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; icon: React.ElementType;
}) {
  return (
    <div>
      <label className="block text-sm text-white/50 mb-2 font-medium">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#6E3DF7]/50 focus:bg-white/[0.07] transition-all appearance-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#1A0A3E] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
