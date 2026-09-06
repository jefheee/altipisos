# Contratos de Integração: Nuvemshop REST API v1

Este documento define os contratos de dados e endpoints consumidos pelo storefront headless da Altipisos via API oficial da Nuvemshop (Tiendanube).

## 1. Configurações Base
- **Base URL:** `https://api.tiendanube.com/v1/{store_id}`
- **Autenticação:** Header `Authentication: bearer {access_token}`
- **Content-Type:** `application/json`
- **User-Agent:** `AltipisosHeadless/1.0 (dev@altipisos.com.br)`

## 2. Endpoints Críticos

### 2.1 Listagem de Produtos (com paginação e filtros)
- **Método:** `GET /v1/{store_id}/products`
- **Query Params:** `page`, `per_page` (max 200), `category_id`, `published=true`
- **Resposta:**
```json
[
  {
    "id": 12345678,
    "name": { "pt": "Piso Modular Sport Out - Placa 25x25cm" },
    "description": { "pt": "Piso modular vazado drenante para quadras externas..." },
    "handle": { "pt": "piso-modular-sport-out" },
    "variants": [
      {
        "id": 98765432,
        "product_id": 12345678,
        "price": "140.00",
        "promotional_price": null,
        "stock": 4500,
        "sku": "ALTI-SPO-AZUL",
        "values": [{ "pt": "Azul Royal" }]
      }
    ],
    "images": [
      {
        "id": 554433,
        "src": "https://images.tiendanube.com/...",
        "position": 1
      }
    ]
  }
]
```

### 2.2 Criação e Sincronização de Carrinho / Checkout
- **Método:** `POST /v1/{store_id}/checkouts`
- **Payload:**
```json
{
  "products": [
    {
      "variant_id": 98765432,
      "quantity": 1600
    }
  ],
  "contact_email": "cliente@quadra.com.br"
}
```

### 2.3 Webhooks de Sincronização
Endpoints registrados na Nuvemshop para acionar ISR no Next.js:
- `product/created` -> `POST /api/webhooks/nuvemshop`
- `product/updated` -> `POST /api/webhooks/nuvemshop`
- `order/paid` -> `POST /api/webhooks/nuvemshop` (Dispara fluxo fiscal no Tiny ERP)
