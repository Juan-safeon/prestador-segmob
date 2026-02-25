import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { getMockPrestadores, updateMockPrestador, deleteMockPrestador } from "@/lib/mock-data";

const isDevMode = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return !url || url.includes('SEU_PROJETO');
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isDevMode()) {
      const found = getMockPrestadores().find((p) => p.id === id);
      if (!found) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
      return NextResponse.json(found);
    }

    const supabase = await getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { data, error } = await supabase.from("prestadores").select("*").eq("id", id).single();
    if (error || !data) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/prestadores/[id] error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validStatuses = ["em_analise", "aprovado", "contratado", "arquivado"];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 });
    }

    // Build update object with allowed fields
    const allowedFields = [
      "nome", "cidade", "uf", "ponto_fixo", "endereco", "regioes", "dias",
      "horario", "whatsapp", "email", "status",
      "cpf", "cnpj", "razao_social", "inscricao_estadual", "tipo_pessoa",
      "banco", "agencia", "conta", "tipo_conta", "pix",
      "observacoes",
    ];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field];
    }

    if (isDevMode()) {
      const updated = updateMockPrestador(id, updates);
      if (!updated) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
      return NextResponse.json(updated);
    }

    const supabase = await getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { data, error } = await supabase
      .from("prestadores").update(updates).eq("id", id).select().single();
    if (error) return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT /api/prestadores/[id] error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isDevMode()) {
      deleteMockPrestador(id);
      return new NextResponse(null, { status: 204 });
    }

    const supabase = await getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const { error } = await supabase.from("prestadores").delete().eq("id", id);
    if (error) return NextResponse.json({ error: "Erro ao excluir" }, { status: 500 });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/prestadores/[id] error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
