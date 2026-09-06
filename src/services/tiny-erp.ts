import {
  TinyCustomer,
  TinyOrderPayload,
  TinyFiscalInvoiceResult,
  MeliOrder,
} from "@/types/fiscal";

export class TinyErpService {
  private apiToken: string;
  private baseUrl: string;

  constructor() {
    this.apiToken = process.env.TINY_ERP_API_TOKEN || "mock_tiny_token_altipisos";
    this.baseUrl = "https://api.tiny.com.br/api2";
  }

  /**
   * 1. Valida e formata os dados cadastrais do comprador para o Tiny ERP
   */
  public prepareCustomerFromMeli(meliOrder: MeliOrder): TinyCustomer {
    const billing = meliOrder.buyer.billing_info;
    const docNumber = billing?.doc_number?.replace(/\D/g, "") || "";
    const isCnpj = docNumber.length > 11;

    return {
      nome: `${meliOrder.buyer.first_name || ""} ${meliOrder.buyer.last_name || meliOrder.buyer.nickname}`.trim(),
      tipo_pessoa: isCnpj ? "J" : "F",
      cpf_cnpj: docNumber || "00000000000",
      ie: billing?.state_tax_id || "ISENTO",
      email: meliOrder.buyer.email,
    };
  }

  /**
   * 2. Cria o Pedido de Venda no Tiny ERP
   */
  public async createSalesOrder(orderPayload: TinyOrderPayload): Promise<{ idPedido: number }> {
    // Modo Mock/Simulação se o token for mock
    if (this.apiToken.startsWith("mock_")) {
      console.log("[TinyErpService] MOCK: Criando pedido no Tiny ERP:", orderPayload.pedido.cliente.nome);
      return { idPedido: Math.floor(100000 + Math.random() * 900000) };
    }

    const params = new URLSearchParams({
      token: this.apiToken,
      formato: "json",
      pedido: JSON.stringify(orderPayload),
    });

    const response = await fetch(`${this.baseUrl}/pedido.incluir.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();
    if (data.retorno.status !== "OK") {
      throw new Error(`[TinyErpService] Erro ao criar pedido: ${JSON.stringify(data.retorno.erros)}`);
    }

    return { idPedido: parseInt(data.retorno.registros.registro.id, 10) };
  }

  /**
   * 3. Gera a Nota Fiscal a partir do Pedido de Venda
   */
  public async generateInvoiceFromOrder(idPedido: number): Promise<{ idNotaFiscal: number }> {
    if (this.apiToken.startsWith("mock_")) {
      console.log("[TinyErpService] MOCK: Gerando Nota Fiscal para Pedido:", idPedido);
      return { idNotaFiscal: idPedido + 1000 };
    }

    const params = new URLSearchParams({
      token: this.apiToken,
      formato: "json",
      idPedido: idPedido.toString(),
    });

    const response = await fetch(`${this.baseUrl}/nota.fiscal.gerar.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();
    if (data.retorno.status !== "OK") {
      throw new Error(`[TinyErpService] Erro ao gerar NFe: ${JSON.stringify(data.retorno.erros)}`);
    }

    return { idNotaFiscal: parseInt(data.retorno.registros.registro.id, 10) };
  }

  /**
   * 4. Transmite e Autoriza a NFe na SEFAZ, retornando Chave de Acesso (44 dígitos) e XML
   */
  public async issueAndAuthorizeInvoice(idNotaFiscal: number): Promise<TinyFiscalInvoiceResult> {
    if (this.apiToken.startsWith("mock_")) {
      // Gera uma chave de acesso NFe de 44 dígitos realista para Santa Catarina (código UF 42)
      const mockKey = `422609058140000188550010000${idNotaFiscal.toString().padStart(8, "0")}1009876543`;
      const mockXml = `<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00"><NFe><infNFe Id="NFe${mockKey}"><ide><cUF>42</cUF><nNF>${idNotaFiscal}</nNF><serie>1</serie></ide><emit><CNPJ>05814000000188</CNPJ><xNome>ALTIPISOS INDUSTRIA E COMERCIO</xNome></emit></infNFe></NFe><protNFe><infProt><chNFe>${mockKey}</chNFe><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt></protNFe></nfeProc>`;

      console.log("[TinyErpService] MOCK: NFe Autorizada na SEFAZ com Chave:", mockKey);
      return {
        idNotaFiscal,
        numero: idNotaFiscal.toString(),
        serie: "1",
        chaveAcesso: mockKey,
        status: "autorizada",
        xmlBase64: Buffer.from(mockXml).toString("base64"),
      };
    }

    // 1. Comando de emissão na SEFAZ
    const emitirParams = new URLSearchParams({
      token: this.apiToken,
      formato: "json",
      id: idNotaFiscal.toString(),
      enviarEmail: "0",
    });

    const emitirRes = await fetch(`${this.baseUrl}/nota.fiscal.emitir.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: emitirParams.toString(),
    });

    const emitirData = await emitirRes.json();
    if (emitirData.retorno.status !== "OK") {
      throw new Error(`[TinyErpService] Erro ao emitir NFe na SEFAZ: ${JSON.stringify(emitirData.retorno.erros)}`);
    }

    // 2. Consulta NFe para obter Chave e XML
    const obterParams = new URLSearchParams({
      token: this.apiToken,
      formato: "json",
      id: idNotaFiscal.toString(),
    });

    const obterRes = await fetch(`${this.baseUrl}/nota.fiscal.obter.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: obterParams.toString(),
    });

    const obterData = await obterRes.json();
    const nf = obterData.retorno.nota_fiscal;

    if (nf.situacao !== "autorizada" && nf.situacao !== "emitida") {
      throw new Error(`[TinyErpService] NFe não autorizada. Situação: ${nf.situacao} - ${nf.motivo}`);
    }

    return {
      idNotaFiscal,
      numero: nf.numero,
      serie: nf.serie,
      chaveAcesso: nf.chave_acesso,
      status: "autorizada",
      xmlUrl: nf.xml_url,
    };
  }
}
