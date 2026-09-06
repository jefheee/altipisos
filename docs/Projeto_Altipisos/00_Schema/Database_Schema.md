# Modelagem de Dados & Schemas de Estado (Headless + CRM + Cache)

Este documento define as entidades de dados do ecossistema Altipisos para o carrinho local, sessões de cotação 3D e leads gerados via calculadora CRO.

## 1. Entidade: Carrinho Local / Checkout Session (`CartSession`)

```typescript
export interface CartItem {
  variantId: string;
  productId: string;
  sku: string;
  name: string;
  colorName: string;
  hexColor: string;
  unitPrice: number;
  quantity: number; // Quantidade de placas ou rampas
  areaM2?: number;
  type: 'TILE' | 'RAMP' | 'CORNER' | 'ACCESSORY';
}

export interface CartSession {
  id: string;
  items: CartItem[];
  subtotal: number;
  freightCost: number;
  installationCost: number;
  total: number;
  shippingAddress?: {
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    distanceKm: number;
  };
  nuvemshopCheckoutUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 2. Entidade: Cotação do Simulador 3D / Calculadora CRO (`LeadQuote`)

```typescript
export interface LeadQuote {
  id: string;
  sport: 'FUTSAL' | 'BASKETBALL' | 'VOLLEYBALL' | 'PICKLEBALL' | 'TENNIS' | 'CUSTOM';
  dimensions: {
    widthMeters: number;
    lengthMeters: number;
    totalAreaM2: number;
  };
  productLine: 'SPORT_IN' | 'SPORT_OUT' | 'PLAY_SOFT';
  colors: {
    courtAreaHex: string;
    outerAreaHex: string;
    linesHex: string;
  };
  bom: {
    totalTiles: number;       // totalAreaM2 * 16
    perimeterMeters: number;  // 2 * (w + l)
    rampPieces: number;       // perimeterMeters * 4
    cornerPieces: number;     // 4 cantos
    estimatedWeightKg: number;// totalTiles * 0.250kg
  };
  pricing: {
    materialCost: number;
    freightCost: number;
    installationCost: number;
    totalCost: number;
    installment12x: number;
    discountedB2BCost: number; // 15% off à vista/faturamento
  };
  leadInfo: {
    name: string;
    email: string;
    whatsapp: string;
    companyName?: string;
    cnpjOrCpf?: string;
    cityState: string;
    leadScore: 'B2B_HIGH' | 'B2C_STANDARD';
  };
  renderSnapshotBase64?: string;
  status: 'ESTIMATED' | 'LOCKED_IN_CRM' | 'SALES_CONTACTED';
  createdAt: string;
}
```

## 3. Entidade: Pipeline Fiscal & Despacho Meli (`FiscalDispatchJob`)

```typescript
export interface FiscalDispatchJob {
  orderId: string;
  marketplace: 'MERCADO_LIVRE' | 'NUVEMSHOP';
  externalOrderId: string;
  shipmentId: string;
  customer: {
    docType: 'CPF' | 'CNPJ';
    docNumber: string;
    name: string;
    ie?: string;
    email: string;
  };
  tinyOrderId?: number;
  tinyInvoiceId?: number;
  nfeKey?: string;         // Chave de acesso de 44 dígitos
  nfeNumber?: string;
  nfeSeries?: string;
  xmlBase64?: string;
  meliStatus: 'PENDING_NFE' | 'NFE_ATTACHED' | 'LABEL_PRINTED';
  retryCount: number;
  lastError?: string;
  createdAt: string;
  authorizedAt?: string;
}
```
