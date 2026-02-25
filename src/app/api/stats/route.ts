import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { getMockPrestadores } from "@/lib/mock-data";

const isDevMode = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return !url || url.includes('SEU_PROJETO');
};

export async function GET() {
  try {
    let prestadores;

    if (isDevMode()) {
      prestadores = getMockPrestadores();
    } else {
      const supabase = await getSupabaseServer();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

      const { data, error } = await supabase
        .from("prestadores").select("*").order("created_at", { ascending: false });
      if (error) return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
      prestadores = data;
    }

    const total = prestadores.length;
    const fixo = prestadores.filter((p) => p.ponto_fixo).length;
    const movel = total - fixo;

    const porEstado: Record<string, number> = {};
    prestadores.forEach((p) => {
      porEstado[p.uf] = (porEstado[p.uf] || 0) + 1;
    });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const novosSemana = prestadores.filter(
      (p) => new Date(p.created_at) >= oneWeekAgo
    ).length;

    return NextResponse.json({ total, fixo, movel, porEstado, novosSemana });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
