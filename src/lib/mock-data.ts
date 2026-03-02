import type { Prestador } from "@/types/prestador";

// Mock data for development without Supabase
let mockPrestadores: Prestador[] = [
  {
    id: "mock-1",
    empresa: "Silva Rastreadores",
    nome: "Carlos Eduardo Silva",
    cidade: "São Paulo",
    uf: "SP",
    especializacao: "Serviços de instalação e manutenção de rastreadores",
    segmentos: ["leves"],
    whatsapp: "11999887766",
    email: "carlos.silva@email.com",
    status: "aprovado",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "mock-2",
    empresa: "Oliveira Mobile",
    nome: "Rafael Oliveira Santos",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    especializacao: "Serviços de instalação e manutenção de rastreadores",
    segmentos: ["leves", "pesados"],
    whatsapp: "21988776655",
    email: "rafael.oliveira@email.com",
    status: "em_analise",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "mock-3",
    empresa: "Ferreira Instalações LTDA",
    nome: "Marcos Antônio Ferreira",
    cidade: "Belo Horizonte",
    uf: "MG",
    especializacao: "Serviços de instalação e manutenção de rastreadores",
    segmentos: ["pesados"],
    whatsapp: "31977665544",
    email: "marcos.ferreira@email.com",
    status: "contratado",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "mock-4",
    empresa: "L.P.L Sistemas",
    nome: "Lucas Pereira Lima",
    cidade: "Curitiba",
    uf: "PR",
    especializacao: "Serviços de instalação e manutenção de rastreadores",
    segmentos: ["leves"],
    whatsapp: "41966554433",
    email: "lucas.lima@email.com",
    status: "em_analise",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
