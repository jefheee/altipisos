# Documentação de Credenciais e Autenticação: Nuvemshop API

## 1. Fluxo de Autenticação OAuth2 / App Privado

Para interagir com o backend headless, a aplicação Altipisos utiliza um token de acesso permanente de aplicativo privado ou o fluxo OAuth 2.0.

### 1.1 Variáveis de Ambiente Necessárias
Configuradas no arquivo `.env.local`:

```env
# Nuvemshop API
NUVEMSHOP_STORE_ID="1234567"
NUVEMSHOP_ACCESS_TOKEN="mock_nuvemshop_bearer_token"
NUVEMSHOP_CLIENT_ID="app_altipisos_headless"
NUVEMSHOP_CLIENT_SECRET="mock_nuvemshop_secret"
NUVEMSHOP_WEBHOOK_SECRET="mock_webhook_hmac_secret"
```

## 2. Escopos de Permissão Exigidos (Scopes)
Para operação completa do headless e sincronização de pedidos:
- `read_products`: Leitura do catálogo, preços, estoque e fotos.
- `write_products`: Atualização de estoque após cotações confirmadas.
- `read_orders`: Consulta do status de pagamentos.
- `write_orders`: Criação de checkouts e pedidos de acessórios.
- `read_customers` / `write_customers`: Sincronização de leads e compradores.
