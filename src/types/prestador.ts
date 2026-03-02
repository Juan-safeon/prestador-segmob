export type PrestadorStatus = 'em_analise' | 'aprovado' | 'contratado' | 'arquivado';

export interface Prestador {
  id: string;
  empresa: string;
  nome: string;
  cidade: string;
  uf: string;
  especializacao: string;
  segmentos: string[];
  ponto_fixo?: boolean;
  endereco?: string | null;
  regioes?: string[];
  dias?: string[];
  horario?: string;
  whatsapp: string;
  email: string;
  status: PrestadorStatus;
  created_at: string;
  updated_at: string;

  // Juridical / Financial / Extra (Used in Admin)
  tipo_pessoa?: 'fisica' | 'juridica' | null;
  cpf?: string | null;
  cnpj?: string | null;
  razao_social?: string | null;
  inscricao_estadual?: string | null;
  banco?: string | null;
  agencia?: string | null;
  conta?: string | null;
  tipo_conta?: 'corrente' | 'poupanca' | null;
  pix?: string | null;
  observacoes?: string | null;
}

export interface PrestadorFormData {
  empresa: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  uf: string;
  especializacao: string;
  segmentos: string[];
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
