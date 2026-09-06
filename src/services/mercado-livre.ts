import { MeliOrder, MeliInvoiceDataPayload } from "@/types/fiscal";

export class MercadoLivreService {
  private accessToken: string;
  private baseUrl: string;

  constructor() {
    this.accessToken = process.env.MERCADO_LIVRE_ACCESS_TOKEN || "mock_meli_access_token";
    this.baseUrl = "https://api.mercadolibre.com";
  }

  /**
   * Obtém os detalhes completos do pedido pelo ID
   */
  public async getOrderDetails(orderId: number | string): Promise<MeliOrder> {
    if (this.accessToken.startsWith("mock_")) {
      console.log(`[MercadoLivreService] MOCK: Buscando detalhes do pedido ${orderId}`);
      return {
        id: Number(orderId),
        status: "paid",
        date_created: new Date().toISOString(),
        total_amount: 1450.0,
        shipping: {
          id: 9988776655,
          status: "ready_to_ship",
          substatus: "ready_to_print",
        },
        buyer: {
          id: 11223344,
          nickname: "COMPRADOR_QUADRAS",
          email: "comprador@esporteclube.com.br",
          first_name: "Carlos",
          last_name: "Silva",
          billing_info: {
            doc_type: "CPF",
            doc_number: "123.456.789-00",
          },
        },
        order_items: [
          {
            item: {
              id: "MLB123456789",
              title: "Piso Modular Esportivo Sport Out - 10m² - Azul",
              seller_sku: "ALTI-SPO-AZUL-KIT10",
            },
            quantity: 1,
            unit_price: 1400.0,
            full_unit_price: 1400.0,
          },
        ],
      };
    }

    const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`[MercadoLivreService] Erro ao buscar pedido ${orderId}: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Envia a Chave de Acesso e o XML da NFe para o Mercado Livre.
   * Isso cumpre a exigência fiscal e destrava imediatamente a etiqueta do Mercado Envios.
   * Endpoint oficial: POST /shipments/{shipment_id}/invoice_data
   */
  public async attachInvoiceToShipment(
    shipmentId: number | string,
    invoiceData: MeliInvoiceDataPayload
  ): Promise<{ success: boolean; message: string }> {
    if (this.accessToken.startsWith("mock_")) {
      console.log(
        `[MercadoLivreService] MOCK: Vinculando NFe ao Envio ${shipmentId}. Chave: ${invoiceData.fiscal_key}`
      );
      return {
        success: true,
        message: `NFe ${invoiceData.fiscal_key} vinculada com sucesso ao envio ${shipmentId} em modo simulação. Etiqueta liberada!`,
      };
    }

    const response = await fetch(`${this.baseUrl}/shipments/${shipmentId}/invoice_data`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(
        `[MercadoLivreService] Falha ao enviar NFe para o envio ${shipmentId}: ${errText}`
      );
    }

    return {
      success: true,
      message: `NFe vinculada com sucesso ao envio ${shipmentId}. Etiqueta liberada no Mercado Envios.`,
    };
  }
}
