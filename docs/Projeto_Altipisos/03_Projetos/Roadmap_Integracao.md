# Roadmap de Integração e Modernização Altipisos

## Fases de Execução

### Fase 1: Arquitetura, Design System & Extração do Legado (Concluído)
- [x] Extração de telas e tokens do Stitch Design System (Modern Altipisos Design System #14925109977080884848).
- [x] Engenharia reversa das regras de precificação e frete do repositório legado (`Sistema--Altipisos`).
- [x] Estruturação da governança Docs as Code (.agents/ e docs/Projeto_Altipisos/).

### Fase 2: Automação Backoffice & Estancamento da Reputação Mercado Livre (Em Execução)
- [x] Criação de Webhook Service para recepção de eventos `order_approved`.
- [x] Integração com API v3 do Tiny ERP para validação cadastral, criação de pedido e emissão fiscal.
- [x] Service de retorno de chave e XML para API do Mercado Livre (`/shipments/{id}/invoice_data`) em < 5 minutos.

### Fase 3: Front-End Headless & Calculadora CRO (Em Execução)
- [x] Setup do projeto Next.js 14+ App Router com Tailwind CSS integrado aos tokens Altipisos.
- [x] Implementação do componente de Calculadora Rápida CRO com value-before-commitment e trava de lead para CRM.
- [x] Implementação do Simulador 3D de Quadras em WebGL (React Three Fiber) com demarcações esportivas regulamentares.

### Fase 4: Homologação e Entrada em Produção
- [ ] Conexão das credenciais reais de produção do Tiny ERP, Nuvemshop e Mercado Livre.
- [ ] Teste de carga de emissão fiscal com simulação de 50 pedidos concorrentes.
- [ ] Cutover de DNS do domínio principal unificado.
