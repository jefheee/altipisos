"use client";

import React, { useState, useMemo } from "react";
import {
  calculateQuote,
  SPORT_PRESETS,
  PRODUCT_LINE_DETAILS,
} from "@/lib/pricing-engine";
import { ProductLine, ServiceType, SportModality } from "@/types/pricing";
import {
  Calculator,
  ShieldCheck,
  Zap,
  Truck,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  PhoneCall,
  Sparkles,
} from "lucide-react";

interface QuickQuoteCalculatorProps {
  initialSport?: SportModality;
  onDimensionChange?: (width: number, length: number) => void;
  onProductChange?: (product: ProductLine) => void;
}

export const QuickQuoteCalculator: React.FC<QuickQuoteCalculatorProps> = ({
  initialSport = "futsal",
  onDimensionChange,
  onProductChange,
}) => {
  const [sport, setSport] = useState<SportModality>(initialSport);
  const [width, setWidth] = useState<number>(SPORT_PRESETS[initialSport].defaultWidth);
  const [length, setLength] = useState<number>(SPORT_PRESETS[initialSport].defaultLength);
  const [productLine, setProductLine] = useState<ProductLine>("sport-out");
  const [serviceType, setServiceType] = useState<ServiceType>("supply-only");
  const [distanceKm, setDistanceKm] = useState<number>(150);
  const [cep, setCep] = useState<string>("");

  // Estado do Formulário de Lead (Value-before-Commitment)
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadWhatsapp, setLeadWhatsapp] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any>(null);

  // Recálculo Reativo em Tempo Real
  const quote = useMemo(() => {
    return calculateQuote({
      widthMeters: width,
      lengthMeters: length,
      productLine,
      serviceType,
      distanceKm,
    });
  }, [width, length, productLine, serviceType, distanceKm]);

  // Handler para troca de modalidade esportiva
  const handleSportChange = (newSport: SportModality) => {
    setSport(newSport);
    const preset = SPORT_PRESETS[newSport];
    setWidth(preset.defaultWidth);
    setLength(preset.defaultLength);
    if (onDimensionChange) onDimensionChange(preset.defaultWidth, preset.defaultLength);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (onDimensionChange) onDimensionChange(val, length);
  };

  const handleLengthChange = (val: number) => {
    setLength(val);
    if (onDimensionChange) onDimensionChange(width, val);
  };

  const handleProductSelect = (p: ProductLine) => {
    setProductLine(p);
    if (onProductChange) onProductChange(p);
  };

  // Envio do Lead Travado
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          whatsapp: leadWhatsapp,
          companyOrClub: leadCompany,
          sport,
          productLine,
          serviceType,
          areaM2: quote.totalAreaM2,
          totalCost: quote.totalCost,
          b2bDiscountedTotal: quote.b2bDiscountedTotal,
        }),
      });

      const data = await res.json();
      setSubmittedResult(data);
    } catch (err) {
      console.error("Erro ao enviar lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-tile border border-altipisos-border p-6 md:p-8 max-w-5xl mx-auto">
      {/* Cabeçalho da Ferramenta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-altipisos-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-altipisos-blue-light text-altipisos-blue text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Calculadora Técnica de Quadras
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-altipisos-navy">
            Simulador de Metragem & Estimativa B2B
          </h3>
          <p className="text-sm text-altipisos-navy-muted">
            Calcule instantaneamente o número de placas modulares, rampas perimetrais e investimento estimado direto de fábrica.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-altipisos-green-light px-3.5 py-2 rounded-xl text-altipisos-green-dark text-xs font-semibold">
          <Zap className="w-4 h-4 text-altipisos-green" />
          <span>Fábrica Própria em Palhoça/SC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Coluna da Esquerda: Controles e Parâmetros (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Modalidade Esportiva */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-altipisos-navy mb-2">
              1. Modalidade Esportiva (Preset Oficial)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(SPORT_PRESETS).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSportChange(p.id)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                    sport === p.id
                      ? "border-altipisos-blue bg-altipisos-blue-light text-altipisos-blue font-bold shadow-sm"
                      : "border-altipisos-border hover:border-gray-300 text-gray-700 bg-gray-50"
                  }`}
                >
                  <span className="block font-semibold">{p.name}</span>
                  <span className="text-[10px] text-gray-500">
                    {p.defaultLength}m × {p.defaultWidth}m
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dimensões Personalizadas */}
          <div className="p-4 rounded-xl bg-altipisos-ice border border-altipisos-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-altipisos-navy">
                2. Dimensões da Quadra
              </span>
              <span className="text-sm font-bold text-altipisos-blue bg-white px-2.5 py-1 rounded-md border border-altipisos-border">
                {quote.totalAreaM2} m² totais
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-gray-600">
                  <span>Comprimento: {length}m</span>
                  <span>(1 a 60m)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="0.5"
                  value={length}
                  onChange={(e) => handleLengthChange(parseFloat(e.target.value))}
                  className="w-full accent-altipisos-blue cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-gray-600">
                  <span>Largura: {width}m</span>
                  <span>(1 a 40m)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="0.5"
                  value={width}
                  onChange={(e) => handleWidthChange(parseFloat(e.target.value))}
                  className="w-full accent-altipisos-blue cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. Linha de Produto */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-altipisos-navy mb-2">
              3. Linha de Piso Modular
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["sport-out", "sport-in", "play-soft"] as ProductLine[]).map((key) => {
                const item = PRODUCT_LINE_DETAILS[key];
                return (
                  <div
                    key={key}
                    onClick={() => handleProductSelect(key)}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                      productLine === key
                        ? "border-altipisos-blue bg-white shadow-tile-hover ring-2 ring-altipisos-blue/20"
                        : "border-altipisos-border bg-gray-50/50 hover:bg-white"
                    }`}
                  >
                    <div className="text-xs font-bold text-altipisos-navy">{item.name}</div>
                    <div className="text-[11px] text-gray-500 mt-1 line-clamp-2">{item.surface}</div>
                    <div className="mt-2 text-xs font-semibold text-altipisos-blue">
                      R$ {item.basePricePerM2.toFixed(2)}/m²
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Modalidade de Serviço */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-altipisos-navy mb-2">
              4. Modalidade de Execução
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServiceType("supply-only")}
                className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                  serviceType === "supply-only"
                    ? "border-altipisos-blue bg-altipisos-blue-light text-altipisos-blue font-bold"
                    : "border-altipisos-border text-gray-600 bg-white"
                }`}
              >
                <div className="font-semibold">Apenas Fornecimento</div>
                <div className="text-[11px] text-gray-500 font-normal">
                  Placas paletizadas com manual de engate rápido DIY
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceType("supply-and-install")}
                className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                  serviceType === "supply-and-install"
                    ? "border-altipisos-blue bg-altipisos-blue-light text-altipisos-blue font-bold"
                    : "border-altipisos-border text-gray-600 bg-white"
                }`}
              >
                <div className="font-semibold">Fornecimento + Instalação</div>
                <div className="text-[11px] text-gray-500 font-normal">
                  Equipe técnica Altipisos monta em até 48 horas
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Painel de Resultados & Trava de Lead CRO (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Card de Métricas Físicas e Engenharia */}
          <div className="bg-altipisos-navy text-white p-5 rounded-2xl shadow-tile space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-altipisos-blue-light">
                Especificação dos Materiais
              </span>
              <Layers className="w-4 h-4 text-altipisos-blue-light" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-gray-300 block uppercase">Placas Modulares</span>
                <span className="text-xl font-bold font-heading text-altipisos-cyan">
                  {quote.totalTiles.toLocaleString("pt-BR")} un
                </span>
                <span className="text-[9px] text-gray-400 block">16 peças por m²</span>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-gray-300 block uppercase">Rampas de Borda</span>
                <span className="text-xl font-bold font-heading text-altipisos-cyan">
                  {quote.rampPieces} un
                </span>
                <span className="text-[9px] text-gray-400 block">{quote.perimeterMeters}m lineares</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-gray-300">Peso Estimado da Carga:</span>
              <span className="font-semibold text-white">~{quote.estimatedWeightKg} kg</span>
            </div>
          </div>

          {/* Card de Precificação Transparente */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-altipisos-border space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Material Base:</span>
              <span className="font-semibold text-altipisos-navy">
                R$ {quote.baseMaterialCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>

            {quote.installationCost > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Serviço de Instalação (48h):</span>
                <span className="font-semibold text-altipisos-navy">
                  R$ {quote.installationCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-altipisos-blue" />
                Frete Rodoviário Estimado:
              </span>
              <span className="font-semibold text-altipisos-navy">
                R$ {quote.freightCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-300 pt-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-gray-500 block">Total Estimado:</span>
                  <span className="text-2xl font-bold font-heading text-altipisos-navy">
                    R$ {quote.totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block">Ou em 12x no cartão de</span>
                  <span className="text-sm font-bold text-altipisos-blue">
                    12x R$ {quote.installment12x.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Banner de Condição Direto de Fábrica (15% OFF) */}
            <div className="bg-altipisos-green-light border border-altipisos-green/30 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-altipisos-green-dark block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-altipisos-green" />
                  Preço Direto de Fábrica (15% OFF CNPJ):
                </span>
                <span className="text-lg font-extrabold text-altipisos-green-dark font-heading">
                  R$ {quote.b2bDiscountedTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-altipisos-green-dark/80 bg-white/70 px-2 py-1 rounded">
                À vista
              </span>
            </div>
          </div>

          {/* Trava de Lead CRO (Value-before-commitment) */}
          {!submittedResult ? (
            <form
              onSubmit={handleSubmitLead}
              className="p-5 rounded-2xl bg-altipisos-ice border border-altipisos-blue/30 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-altipisos-navy">
                <Lock className="w-4 h-4 text-altipisos-blue" />
                <span>Bloquear Desconto & Receber Book Técnico em PDF</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Receba imediatamente o layout 3D oficial em escala com garantia de fábrica de 10 anos.
              </p>

              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Seu Nome Completo"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-altipisos-blue bg-white"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp com DDD"
                    value={leadWhatsapp}
                    onChange={(e) => setLeadWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-altipisos-blue bg-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Seu Melhor E-mail"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-altipisos-blue bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Processando Projeto..."
                ) : (
                  <>
                    <span>Garantir Condição de Fábrica</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-5 rounded-2xl bg-altipisos-green-light border border-altipisos-green text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-altipisos-green mx-auto" />
              <h4 className="font-heading font-bold text-altipisos-green-dark text-base">
                Proposta & Book Técnico Liberados!
              </h4>
              <p className="text-xs text-altipisos-navy">
                Seu orçamento para <strong>{quote.totalAreaM2}m²</strong> foi registrado com prioridade de fábrica.
              </p>
              {submittedResult.whatsappDirectUrl && (
                <a
                  href={submittedResult.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-altipisos-green text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-90"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Abrir WhatsApp com o Consultor Técnico
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
