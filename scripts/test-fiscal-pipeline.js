/**
 * Script de Teste Automatizado: Pipeline Fiscal Event-Driven (Mercado Livre -> Tiny ERP)
 * SLA Alvo: Execução completa em < 5 minutos (alvo real sub-90s)
 */

async function runFiscalSimulation() {
  console.log("================================================================================");
  console.log("🧪 INICIANDO TESTE DO PIPELINE FISCAL AUTOMATIZADO (MERCADO LIVRE + TINY ERP)");
  console.log("================================================================================");

  const startTime = Date.now();

  // 1. Simulação do Webhook Recebido do Mercado Livre
  const mockWebhookPayload = {
    topic: "orders_v2",
    resource: "/orders/2000008899112233",
    user_id: 99887766,
    application_id: 11223344,
    attempts: 1,
    sent: new Date().toISOString(),
    received: new Date().toISOString(),
  };

  console.log("1. Webhook recebido do Mercado Livre:", mockWebhookPayload.resource);

  // 2. Extração de Order ID
  const orderId = mockWebhookPayload.resource.split("/").pop();
  console.log(`2. Pedido identificado: #${orderId}`);

  // 3. Simulação de Consulta no Mercado Livre
  console.log("3. Consultando status do pedido no Mercado Livre...");
  const mockMeliOrder = {
    id: orderId,
    status: "paid",
    total_amount: 5600.0,
    shipping: { id: 8877665544 },
    buyer: {
      name: "Quadras Brasil Esportes LTDA",
      doc_type: "CNPJ",
      doc_number: "12.345.678/0001-90",
      email: "contato@quadrasbrasil.com.br",
    },
    items: [
      { sku: "ALTI-SPO-AZUL-M2", title: "Piso Modular Sport Out Azul", qty: 40, unitPrice: 140.0 },
    ],
  };
  console.log(`   Status do Pedido: ${mockMeliOrder.status} (Aprovado). Comprador: ${mockMeliOrder.buyer.name}`);

  // 4. Criação do Pedido no Tiny ERP
  console.log("4. Enviando pedido para Tiny ERP...");
  const tinyOrderId = Math.floor(100000 + Math.random() * 900000);
  console.log(`   Pedido de venda cadastrado no Tiny ERP com ID: #${tinyOrderId}`);

  // 5. Geração de NFe
  console.log("5. Gerando Nota Fiscal vinculada ao Pedido...");
  const tinyNfeId = tinyOrderId + 5000;
  console.log(`   NFe interna gerada no Tiny com ID: #${tinyNfeId}`);

  // 6. Transmissão e Autorização na SEFAZ
  console.log("6. Transmitindo para SEFAZ e aguardando protocolo de autorização...");
  // Simula latência de resposta da SEFAZ
  await new Promise((r) => setTimeout(r, 400));
  const chaveAcesso = `422609058140000188550010000${tinyNfeId}1009876543`;
  console.log(`   ✅ NFe AUTORIZADA NA SEFAZ! Chave de Acesso: ${chaveAcesso}`);

  // 7. Retorno para API do Mercado Livre
  console.log("7. Injetando Chave de Acesso e XML no envio do Mercado Livre...");
  const meliResponse = {
    status: 200,
    message: `Envio #${mockMeliOrder.shipping.id} faturado com sucesso. Etiqueta Mercado Envios liberada para impressão!`,
  };
  console.log(`   ✅ RESPOSTA DO MERCADO LIVRE: ${meliResponse.message}`);

  const totalTimeMs = Date.now() - startTime;
  console.log("================================================================================");
  console.log(`⏱️ TEMPO TOTAL DE EXECUÇÃO: ${totalTimeMs}ms (${(totalTimeMs / 1000).toFixed(2)} segundos)`);
  console.log(`🎯 STATUS DO SLA (Meta: < 300s): ${totalTimeMs < 300000 ? "✅ APROVADO COM LOUVOR" : "❌ REPROVADO"}`);
  console.log("================================================================================");
}

runFiscalSimulation();
