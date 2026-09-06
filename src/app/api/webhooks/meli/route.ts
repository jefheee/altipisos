import { NextRequest, NextResponse } from "next/server";
import { MeliWebhookNotificationSchema } from "@/types/fiscal";
import { TinyErpService } from "@/services/tiny-erp";
import { MercadoLivreService } from "@/services/mercado-livre";

const tinyService = new TinyErpService();
const meliService = new MercadoLivreService();

// Set de idempotência em memória para evitar reprocessamento de webhooks repetidos
const processedOrders = new Set<string>();

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const rawBody = await req.json();
    const parseResult = MeliWebhookNotificationSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Payload de webhook inválido", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const notification = parseResult.data;
    console.log(`[Webhook Meli] Evento recebido: topic=${notification.topic} resource=${notification.resource}`);

    // Filtra apenas tópicos de pedidos e envios
    if (notification.topic !== "orders_v2" && notification.topic !== "orders") {
      return NextResponse.json({ message: "Evento ignorado (não é orders_v2)", topic: notification.topic });
    }

    // Extrai o ID do pedido do resource (ex: "/orders/123456789")
    const orderIdMatch = notification.resource.match(/\/orders\/(\d+)/);
    if (!orderIdMatch) {
      return NextResponse.json({ message: "Resource não contém orderId válido" }, { status: 200 });
    }

    const orderId = orderIdMatch[1];

    // Checagem de Idempotência
    if (processedOrders.has(orderId)) {
      return NextResponse.json({ message: `Pedido ${orderId} já processado anteriormente.` }, { status: 200 });
    }

    // 1. Busca os detalhes do pedido no Mercado Livre
    const meliOrder = await meliService.getOrderDetails(orderId);

    if (meliOrder.status !== "paid") {
      return NextResponse.json({
        message: `Pedido ${orderId} ainda não está aprovado/pago (status: ${meliOrder.status}).`,
      });
    }

    console.log(`[Webhook Meli] Pedido ${orderId} aprovado! Iniciando automação fiscal no Tiny ERP...`);

    // 2. Prepara dados do comprador e itens para o Tiny ERP
    const customer = tinyService.prepareCustomerFromMeli(meliOrder);
    const orderItems = meliOrder.order_items.map((item) => ({
      item: {
        codigo: item.item.seller_sku || item.item.id,
        descricao: item.item.title,
        unidade: "UN",
        quantidade: item.quantity,
        valor_unitario: item.unit_price,
      },
    }));

    // 3. Cria Pedido de Venda no Tiny ERP
    const { idPedido } = await tinyService.createSalesOrder({
      pedido: {
        cliente: customer,
        itens: orderItems,
        numero_ordem_compra: `MELI-${orderId}`,
        obs: `Pedido gerado automaticamente pelo Webhook Mercado Livre #${orderId}`,
      },
    });

    // 4. Gera Nota Fiscal no Tiny ERP
    const { idNotaFiscal } = await tinyService.generateInvoiceFromOrder(idPedido);

    // 5. Emite e Autoriza na SEFAZ
    const fiscalResult = await tinyService.issueAndAuthorizeInvoice(idNotaFiscal);

    if (fiscalResult.status !== "autorizada" || !fiscalResult.chaveAcesso) {
      throw new Error(`Falha na autorização SEFAZ da NFe: ${fiscalResult.motivoStatus || "Sem chave"}`);
    }

    // 6. Vincula Chave de Acesso e XML ao Envio do Mercado Livre
    const shipmentId = meliOrder.shipping.id;
    const meliAttachResult = await meliService.attachInvoiceToShipment(shipmentId, {
      fiscal_key: fiscalResult.chaveAcesso,
      xml: fiscalResult.xmlBase64 || "",
      invoice_number: fiscalResult.numero,
      invoice_series: fiscalResult.serie,
    });

    // Marca como processado
    processedOrders.add(orderId);

    const elapsedMs = Date.now() - startTime;
    console.log(
      `[Webhook Meli] SUCESSO TOTAL! NFe ${fiscalResult.chaveAcesso} emitida e vinculada em ${elapsedMs}ms (< ${Math.round(elapsedMs / 1000)}s)!`
    );

    return NextResponse.json({
      success: true,
      orderId,
      tinyPedidoId: idPedido,
      tinyNfeId: idNotaFiscal,
      chaveAcesso: fiscalResult.chaveAcesso,
      shipmentId,
      meliResult: meliAttachResult,
      executionTimeMs: elapsedMs,
      slaStatus: elapsedMs < 300000 ? "DENTRO_DO_SLA_5MIN" : "ACIMA_DO_SLA",
    });
  } catch (error: any) {
    console.error("[Webhook Meli] Erro no processamento fiscal:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erro desconhecido no processamento fiscal",
        executionTimeMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
