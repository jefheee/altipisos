# Regras de Engenharia & Governança - Altipisos

1. **Docs as Code**: Qualquer decisão arquitetural, novo endpoint, componente ou alteração de regras de negócio deve ser documentada em `docs/Projeto_Altipisos/`.
2. **Zero Hardcoded Secrets**: Credenciais de API (Nuvemshop, Tiny ERP, Mercado Livre) residem estritamente em variáveis de ambiente (`.env.local`).
3. **Idempotência em Webhooks**: Todo webhook (Meli, Nuvemshop, Tiny) deve verificar duplicidade de requisição através do ID de evento ou hash para evitar emissão duplicada de NFe.
4. **SLA Fiscal Estrito**: O pipeline de autorização e envio da NFe de volta para o Mercado Livre deve rodar em menos de 5 minutos (alvo de engenharia: sub-90s) para manter a reputação verde.
5. **Tipagem Estrita**: Todo schema de dados externo deve ser validado em tempo de execução com Zod e tipado em TypeScript.
