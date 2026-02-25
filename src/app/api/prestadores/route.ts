import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { getMockPrestadores, addMockPrestador } from "@/lib/mock-data";

const isDevMode = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return !url || url.includes('SEU_PROJETO');
};

// POST - Public form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, cidade, uf, ponto_fixo, endereco, regioes, dias, horario, whatsapp, email } = body;

    if (!nome || !cidade || !uf || !horario || !whatsapp || !email) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }
    if (typeof nome !== "string" || nome.trim().length < 3) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }
    const cleanPhone = whatsapp.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return NextResponse.json({ error: "WhatsApp inválido" }, { status: 400 });
    }

    if (isDevMode()) {
      const created = addMockPrestador({
        nome: nome.trim(),
        cidade: cidade.trim(),
        uf: uf.toUpperCase(),
        ponto_fixo: ponto_fixo ?? false,
        endereco: ponto_fixo ? (endereco?.trim() || null) : null,
        regioes: regioes || [],
        dias: dias || [],
        horario,
        whatsapp: cleanPhone,
        email: email.trim().toLowerCase(),
      });
      return NextResponse.json(created, { status: 201 });
    }

    const supabase = await getSupabaseServer();
    const { data, error } = await supabase
      .from("prestadores")
      .insert({
        nome: nome.trim(), cidade: cidade.trim(), uf: uf.toUpperCase(),
        ponto_fixo: ponto_fixo ?? false,
        endereco: ponto_fixo ? (endereco?.trim() || null) : null,
        regioes: regioes || [], dias: dias || [], horario,
        whatsapp: cleanPhone, email: email.trim().toLowerCase(), status: "em_analise",
      })
      .select().single();

    if (error) {
      console.error("Supabase INSERT error:", error);
      return NextResponse.json({ error: error.message || "Erro ao salvar cadastro" }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("POST /api/prestadores error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erro interno do servidor" }, { status: 500 });
  }
}

// GET - List prestadores (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uf = searchParams.get("uf");
    const status = searchParams.get("status");
    const tipo = searchParams.get("tipo");
    const search = searchParams.get("search");

    if (isDevMode()) {
      let data = getMockPrestadores();
      if (uf && uf !== "todos") data = data.filter((p) => p.uf === uf.toUpperCase());
      if (status && status !== "todos") data = data.filter((p) => p.status === status);
      if (tipo === "fixo") data = data.filter((p) => p.ponto_fixo);
      else if (tipo === "movel") data = data.filter((p) => !p.ponto_fixo);
      if (search) {
        const q = search.toLowerCase();
        data = data.filter((p) => p.nome.toLowerCase().includes(q) || p.cidade.toLowerCase().includes(q));
      }
      return NextResponse.json(data);
    }

    const supabase = await getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    let query = supabase.from("prestadores").select("*").order("created_at", { ascending: false });
    if (uf && uf !== "todos") query = query.eq("uf", uf.toUpperCase());
    if (status && status !== "todos") query = query.eq("status", status);
    if (tipo === "fixo") query = query.eq("ponto_fixo", true);
    else if (tipo === "movel") query = query.eq("ponto_fixo", false);
    if (search) query = query.or(`nome.ilike.%${search}%,cidade.ilike.%${search}%`);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/prestadores error:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
