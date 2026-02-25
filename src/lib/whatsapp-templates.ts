import type { Prestador } from "@/types/prestador";

export interface WhatsAppTemplate {
  id: string;
  label: string;
  color: string;
}

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "analise",
    label: "Enviar para análise",
    color: "#F59E0B",
  },
  {
    id: "mais_info",
    label: "Solicitar mais info",
    color: "#8E8EDC",
  },
  {
    id: "aprovacao",
    label: "Informar aprovação",
    color: "#22C55E",
  },
  {
    id: "contratacao",
    label: "Iniciar contratação",
    color: "#3B82F6",
  },
];

export function getWhatsAppMessage(templateId: string, provider: Prestador): string {
  const nome = provider.nome.split(" ")[0];

  switch (templateId) {
    case "analise":
      return `Olá ${nome}! Aqui é da SegMob. Recebemos seu cadastro e gostaríamos de conversar sobre sua atuação na região de ${provider.cidade}/${provider.uf}. Podemos conversar?`;
    case "mais_info":
      return `Olá ${nome}! Precisamos de algumas informações adicionais sobre seu cadastro de prestador SegMob na região de ${provider.cidade}. Podemos conversar?`;
    case "aprovacao":
      return `Olá ${nome}! Temos uma ótima notícia: seu cadastro como prestador SegMob foi APROVADO! Vamos agendar sua integração? Equipe SegMob.`;
    case "contratacao":
      return `Olá ${nome}! Parabéns! Você foi selecionado para atuar como prestador SegMob na região de ${provider.cidade}/${provider.uf}. Vamos iniciar o processo de contratação!`;
    default:
      return `Olá ${nome}, aqui é da SegMob.`;
  }
}
