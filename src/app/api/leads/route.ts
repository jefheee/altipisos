import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(9, "WhatsApp é obrigatório"),
  companyOrClub: z.string().optional(),
  cityState: z.string().optional(),
  sport: z.string(),
  productLine: z.string(),
  serviceType: z.string(),
  areaM2: z.number(),
  totalCost: z.number(),
  b2bDiscountedTotal: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead = LeadSchema.parse(body);

    const leadScore =
      lead.areaM2 >= 150 || (lead.companyOrClub && lead.companyOrClub.length > 2)
        ? "B2B_HIGH_PRIORITY"
        : "B2C_STANDARD";

    console.log("[Lead API] Novo Lead CRO Registrado:", {
      leadScore,
      name: lead.name,
      whatsapp: lead.whatsapp,
      areaM2: lead.areaM2,
      totalCost: lead.totalCost,
      b2bDiscountedTotal: lead.b2bDiscountedTotal,
    });

    // Mensagem amigável para abertura opcional de WhatsApp direto com vendedor da fábrica
    const cleanPhone = lead.whatsapp.replace(/\D/g, "");
    const whatsappMsg = encodeURIComponent(
      `Olá ${lead.name}, recebemos sua simulação para ${lead.areaM2}m² de piso ${lead.productLine}. O valor direto de fábrica ficou em R$ ${lead.b2bDiscountedTotal.toLocaleString("pt-BR")}. Segue seu projeto técnico!`
    );
    const whatsappDirectUrl = `https://wa.me/554861365993?text=${encodeURIComponent(
      `Olá equipe Altipisos! Meu nome é ${lead.name}. Acabei de simular uma quadra de ${lead.areaM2}m² de ${lead.productLine} no site (Orçamento estimado: R$ ${lead.b2bDiscountedTotal.toLocaleString("pt-BR")}). Gostaria de receber o projeto técnico oficial.`
    )}`;

    return NextResponse.json({
      success: true,
      leadId: `LEAD-${Date.now()}`,
      leadScore,
      whatsappDirectUrl,
      message: "Orçamento travado com sucesso! Proposta enviada para o WhatsApp.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Dados inválidos", details: error.errors || error.message },
      { status: 400 }
    );
  }
}
