import { z } from "zod";

// Schema do Webhook do Mercado Livre
export const MeliWebhookNotificationSchema = z.object({
  _id: z.string().optional(),
  topic: z.string(), // "orders_v2" ou "shipments"
  resource: z.string(), // "/orders/1234567890" ou "/shipments/9876543210"
  user_id: z.number().optional(),
  application_id: z.number().optional(),
  sent: z.string().optional(),
  attempts: z.number().optional(),
  received: z.string().optional(),
});

export type MeliWebhookNotification = z.infer<typeof MeliWebhookNotificationSchema>;

// Dados do Pedido do Mercado Livre
export interface MeliOrder {
  id: number;
  status: "paid" | "confirmed" | "payment_required" | "cancelled";
  date_created: string;
  total_amount: number;
  shipping: {
    id: number;
    substatus?: string;
    status?: string;
  };
  buyer: {
    id: number;
    nickname: string;
    email: string;
    first_name?: string;
    last_name?: string;
    billing_info?: {
      doc_type: "CPF" | "CNPJ";
      doc_number: string;
      tax_payer_type?: string;
      state_tax_id?: string; // IE
    };
  };
  order_items: Array<{
    item: {
      id: string;
      title: string;
      seller_sku?: string;
    };
    quantity: number;
    unit_price: number;
    full_unit_price: number;
  }>;
}

// Schemas e Contratos do Tiny ERP (API v3 / v2)
export interface TinyCustomer {
  nome: string;
  tipo_pessoa: "F" | "J";
  cpf_cnpj: string;
  ie?: string;
  email: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
}

export interface TinyOrderItem {
  item: {
    codigo: string;
    descricao: string;
    unidade: string;
    quantidade: number;
    valor_unitario: number;
  };
}

export interface TinyOrderPayload {
  pedido: {
    cliente: TinyCustomer;
    itens: TinyOrderItem[];
    forma_pagamento?: string;
    numero_ordem_compra?: string;
    obs?: string;
  };
}

export interface TinyFiscalInvoiceResult {
  idNotaFiscal: number;
  numero: string;
  serie: string;
  chaveAcesso: string; // 44 dígitos
  status: "autorizada" | "rejeitada" | "pendente";
  xmlUrl?: string;
  xmlBase64?: string;
  motivoStatus?: string;
}

// Payload exigido pelo Mercado Livre para vincular a NFe ao Envio
export interface MeliInvoiceDataPayload {
  fiscal_key: string; // Chave de acesso de 44 dígitos
  xml: string; // XML da NFe em string ou base64
  invoice_number?: string;
  invoice_series?: string;
}
