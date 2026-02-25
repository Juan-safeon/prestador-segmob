import type { Prestador } from "@/types/prestador";

// Mock data for development without Supabase
let mockPrestadores: Prestador[] = [
  {
    id: "mock-1",
    nome: "Carlos Eduardo Silva",
    cidade: "São Paulo",
    uf: "SP",
    ponto_fixo: true,
    endereco: "Rua Augusta, 1200 - Consolação",
    regioes: ["Centro", "Zona Sul", "Zona Oeste"],
    dias: ["seg", "ter", "qua", "qui", "sex"],
    horario: "integral",
    whatsapp: "11999887766",
    email: "carlos.silva@email.com",
    status: "aprovado",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    tipo_pessoa: "fisica",
    cpf: "123.456.789-01",
    cnpj: null,
    razao_social: null,
    inscricao_estadual: null,
    banco: "Nubank",
    agencia: "0001",
    conta: "1234567-8",
    tipo_conta: "corrente",
    pix: "carlos.silva@email.com",
    observacoes: "Técnico experiente com 5 anos na área de rastreamento.",
  },
  {
    id: "mock-2",
    nome: "Rafael Oliveira Santos",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    ponto_fixo: false,
    endereco: null,
    regioes: ["Zona Norte", "Zona Oeste", "Região Metropolitana"],
    dias: ["seg", "ter", "qua", "qui", "sex", "sab"],
    horario: "manha",
    whatsapp: "21988776655",
    email: "rafael.oliveira@email.com",
    status: "em_analise",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "mock-3",
    nome: "Marcos Antônio Ferreira",
    cidade: "Belo Horizonte",
    uf: "MG",
    ponto_fixo: true,
    endereco: "Av. Afonso Pena, 3500 - Funcionários",
    regioes: ["Centro", "Região Metropolitana"],
    dias: ["seg", "ter", "qua", "qui", "sex"],
    horario: "integral",
    whatsapp: "31977665544",
    email: "marcos.ferreira@email.com",
    status: "contratado",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    tipo_pessoa: "juridica",
    cpf: null,
    cnpj: "12.345.678/0001-90",
    razao_social: "Ferreira Instalações LTDA",
    inscricao_estadual: "123456789",
    banco: "Bradesco",
    agencia: "1234",
    conta: "56789-0",
    tipo_conta: "corrente",
    pix: "12345678000190",
    observacoes: "Empresa com equipe de 3 técnicos. Atende BH e região metropolitana.",
  },
  {
    id: "mock-4",
    nome: "Lucas Pereira Lima",
    cidade: "Curitiba",
    uf: "PR",
    ponto_fixo: false,
    endereco: null,
    regioes: ["Centro", "Zona Sul"],
    dias: ["seg", "qua", "sex"],
    horario: "tarde",
    whatsapp: "41966554433",
    email: "lucas.lima@email.com",
    status: "em_analise",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-5",
    nome: "André Souza Costa",
    cidade: "Salvador",
    uf: "BA",
    ponto_fixo: true,
    endereco: "Rua da Graça, 450 - Graça",
    regioes: ["Centro", "Zona Norte", "Região Metropolitana"],
    dias: ["seg", "ter", "qua", "qui", "sex", "sab"],
    horario: "integral",
    whatsapp: "71955443322",
    email: "andre.costa@email.com",
    status: "aprovado",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "mock-6",
    nome: "Pedro Henrique Alves",
    cidade: "Recife",
    uf: "PE",
    ponto_fixo: false,
    endereco: null,
    regioes: ["Zona Sul", "Zona Oeste", "Interior"],
    dias: ["seg", "ter", "qua", "qui", "sex"],
    horario: "manha",
    whatsapp: "81944332211",
    email: "pedro.alves@email.com",
    status: "arquivado",
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: "mock-7",
    nome: "Fernando Rodrigues",
    cidade: "Campinas",
    uf: "SP",
    ponto_fixo: true,
    endereco: "Rua Barão de Jaguara, 800",
    regioes: ["Centro", "Interior"],
    dias: ["seg", "ter", "qua", "qui", "sex"],
    horario: "integral",
    whatsapp: "19933221100",
    email: "fernando.rodrigues@email.com",
    status: "em_analise",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "mock-8",
    nome: "Thiago Mendes",
    cidade: "Goiânia",
    uf: "GO",
    ponto_fixo: false,
    endereco: null,
    regioes: ["Centro", "Zona Leste", "Região Metropolitana"],
    dias: ["ter", "qua", "qui", "sex", "sab"],
    horario: "tarde",
    whatsapp: "62922110099",
    email: "thiago.mendes@email.com",
    status: "aprovado",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

export function getMockPrestadores() {
  return [...mockPrestadores];
}

export function addMockPrestador(data: Omit<Prestador, "id" | "created_at" | "updated_at" | "status">): Prestador {
  const newPrestador: Prestador = {
    ...data,
    id: `mock-${Date.now()}`,
    status: "em_analise",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockPrestadores.unshift(newPrestador);
  return newPrestador;
}

export function updateMockPrestador(id: string, updates: Partial<Prestador>): Prestador | null {
  const index = mockPrestadores.findIndex((p) => p.id === id);
  if (index === -1) return null;
  mockPrestadores[index] = {
    ...mockPrestadores[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return mockPrestadores[index];
}

export function deleteMockPrestador(id: string): boolean {
  const len = mockPrestadores.length;
  mockPrestadores = mockPrestadores.filter((p) => p.id !== id);
  return mockPrestadores.length < len;
}
