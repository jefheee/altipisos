# Manual Operacional & Técnico do Administrador (Altipisos E-commerce)

Este manual orienta a equipe operacional da Altipisos sobre como gerenciar o catálogo, os pedidos faturados e o monitoramento de reputação dos marketplaces.

## 1. Gestão Unificada do Catálogo
- O cadastro de produtos continua sendo realizado no painel da **Nuvemshop** ou no **Tiny ERP**.
- Assim que um produto, variação de cor ou estoque é salvo no painel, a Nuvemshop emite um webhook para o nosso storefront Headless, atualizando o cache estático instantaneamente (On-demand Revalidation).

## 2. Operação de Faturamento Automatizado (Zero Delay)
- **Mercado Livre:**
  - Quando o cliente conclui a compra no Meli, o webhook `order_approved` cai imediatamente no nosso microsserviço.
  - O sistema comunica com o Tiny ERP, emite a NFe na SEFAZ e devolve o XML para o Meli em menos de 90 segundos.
  - A equipe de expedição só precisa entrar no painel do Mercado Livre e imprimir as etiquetas de frete já liberadas (prontas para coleta ou despacho).
- **Tratamento de Alertas e Exceções:**
  - Caso o cliente cadastre um CPF/CNPJ com pendência na SEFAZ ou erro de Inscrição Estadual, o sistema dispara um aviso imediato com o link do pedido para ajuste manual.

## 3. Gestão de Leads da Calculadora e Simulador 3D
- Todas as simulações em que o lead insere contato caem automaticamente no CRM integrado (HubSpot / RD Station) com a tag `LEAD_ALTI_3D` ou `LEAD_ALTI_CALC`, separando por porte ($m^2 < 100$ vs $m^2 \ge 100$).
