import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { TinyErpService } from "@/services/tiny-erp";

const tinyService = new TinyErpService();

export async function POST(req: NextRequest) {
  try {
    const event = req.headers.get("x-linkedstore-event") || "unknown";
    const body = await req.json();

    console.log(`[Webhook Nuvemshop] Evento recebido: ${event}`);

    // 1. Sincronização de catálogo com ISR On-Demand
    if (event.startsWith("product/")) {
      console.log(`[Webhook Nuvemshop] Revalidando cache de produtos para evento: ${event}`);
      try {
        revalidateTag("nuvemshop-products");
      } catch (e) {
        console.warn("[Webhook Nuvemshop] Revalidação estática acionada.");
      }
      return NextResponse.json({ revalidated: true, event });
    }

    // 2. Pedido Pago na Nuvemshop -> Disparo Fiscal no Tiny ERP
    if (event === "order/paid" || body.status === "paid") {
      const order = body;
      console.log(`[Webhook Nuvemshop] Processando faturamento do pedido Nuvemshop #${order.id}`);

      const customer = {
        nome: order.customer?.name || "Cliente Nuvemshop",
        tipo_pessoa: (order.customer?.identification?.length > 11 ? "J" : "F") as "F" | "J",
        cpf_cnpj: order.customer?.identification?.replace(/\D/g, "") || "00000000000",
        email: order.customer?.email || "contato@altipisos.com.br",
      };

      const orderItems = (order.products || []).map((p: any) => ({
        item: {
          codigo: p.sku || String(p.id),
          descricao: p.name,
          unidade: "UN",
          quantidade: p.quantity,
          valor_unitario: parseFloat(p.price),
        },
      }));

      const { idPedido } = await tinyService.createSalesOrder({
        pedido: {
          cliente: customer,
          itens: orderItems,
          numero_ordem_compra: `NUVEM-${order.id}`,
          obs: `Pedido Nuvemshop #${order.id}`,
        },
      });

      const { idNotaFiscal } = await tinyService.generateInvoiceFromOrder(idPedido);
      const fiscalResult = await tinyService.issueAndAuthorizeInvoice(idNotaFiscal);

      return NextResponse.json({
        success: true,
        orderId: order.id,
        tinyPedidoId: idPedido,
        chaveAcesso: fiscalResult.chaveAcesso,
      });
    }

    return NextResponse.json({ received: true, event });
  } catch (error: any) {
    console.error("[Webhook Nuvemshop] Erro no processamento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
