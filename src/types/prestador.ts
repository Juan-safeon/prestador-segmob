export type PrestadorStatus = 'em_analise' | 'aprovado' | 'contratado' | 'arquivado';

export interface Prestador {
  id: string;
  nome: string;
  cidade: string;
  uf: string;
  ponto_fixo: boolean;
  endereco: string | null;
  regioes: string[];
  dias: string[];
  horario: string;
  whatsapp: string;
  email: string;
  status: PrestadorStatus;
  created_at: string;
  updated_at: string;
  // Dados jurídicos
  cpf?: string | null;
  cnpj?: string | null;
  razao_social?: string | null;
  inscricao_estadual?: string | null;
  tipo_pessoa?: 'fisica' | 'juridica' | null;
  // Dados financeiros
  banco?: string | null;
  agencia?: string | null;
  conta?: string | null;
  tipo_conta?: 'corrente' | 'poupanca' | null;
  pix?: string | null;
  // Dados complementares
  observacoes?: string | null;
}

export interface PrestadorFormData {
  nome: string;
  cidade: string;
  uf: string;
  pontoFixo: boolean | null;
  endereco: string;
  regioes: string[];
  dias: string[];
  horario: string;
  whatsapp: string;
  email: string;
}

export interface PrestadorFilters {
  uf: string;
  cidade: string;
  tipo: 'todos' | 'fixo' | 'movel';
  status: PrestadorStatus | 'todos';
  dataInicio: string;
  dataFim: string;
}

export interface DashboardStats {
  total: number;
  porEstado: Record<string, number>;
  fixo: number;
  movel: number;
  novosSemana: number;
}
