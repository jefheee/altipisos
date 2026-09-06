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
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  PhoneCall,
  Sparkles,
  Building2,
  HelpCircle,
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

  // Estado do Formulário de Desbloqueio (Gated B2B Offer)
  const [leadName, setLeadName] = useState("");
  const [leadWhatsapp, setLeadWhatsapp] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any>(null);

  // Recálculo Reativo das Métricas Físicas
  const quote = useMemo(() => {
    return calculateQuote({
      widthMeters: width,
      lengthMeters: length,
      productLine,
      serviceType,
      distanceKm: 180,
    });
  }, [width, length, productLine, serviceType]);

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

  const handleUnlockQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail || `${leadWhatsapp.replace(/\D/g, "")}@whatsapp.lead`,
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
      setIsUnlocked(true);
    } catch (err) {
      console.error("Erro ao registrar lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 max-w-5xl mx-auto">
      {/* Cabeçalho da Ferramenta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-altipisos-blue text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Engenharia Comercial B2B
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#0A212D]">
            Estimativa Rápida de Metragem & Placas
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Simule o quantitativo técnico de placas modulares e rampas perimetrais para o seu projeto esportivo.
          </p>
        </div>

        {/* Faixa Base de Referência (Evita Ancoragem Negativa Bruta) */}
        <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-right">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-medium">
            Referência de Fábrica
          </span>
          <span className="text-sm md:text-base font-bold text-[#0A212D]">
            A partir de <span className="text-altipisos-blue">R$ 140/m²</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Coluna 1: Parâmetros e Dimensões (7 Colunas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Modalidade Esportiva */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0A212D] mb-2.5">
              1. Selecione a Modalidade Esportiva
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.values(SPORT_PRESETS).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSportChange(p.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    sport === p.id
                      ? "border-altipisos-blue bg-blue-50/60 text-altipisos-blue shadow-sm ring-1 ring-altipisos-blue"
                      : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div className="font-semibold text-xs text-[#0A212D]">{p.name}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {p.defaultLength}m × {p.defaultWidth}m ({p.defaultLength * p.defaultWidth}m²)
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dimensões Paramétricas */}
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A212D]">
                2. Ajuste de Medidas da Área
              </span>
              <span className="text-sm font-bold text-altipisos-blue bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                {quote.totalAreaM2} m² totais
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium text-gray-600">
                  <span>Comprimento: <strong>{length}m</strong></span>
                  <span className="text-gray-400">Máx 60m</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="0.5"
                  value={length}
                  onChange={(e) => handleLengthChange(parseFloat(e.target.value))}
                  className="w-full accent-altipisos-blue cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium text-gray-600">
                  <span>Largura: <strong>{width}m</strong></span>
                  <span className="text-gray-400">Máx 40m</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="40"
                  step="0.5"
                  value={width}
                  onChange={(e) => handleWidthChange(parseFloat(e.target.value))}
                  className="w-full accent-altipisos-blue cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* 3. Linha de Produto */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0A212D] mb-2.5">
              3. Tipo de Piso Modular
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["sport-out", "sport-in", "play-soft"] as ProductLine[]).map((key) => {
                const item = PRODUCT_LINE_DETAILS[key];
                return (
                  <div
                    key={key}
                    onClick={() => handleProductSelect(key)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      productLine === key
                        ? "border-altipisos-blue bg-white shadow-sm ring-2 ring-altipisos-blue/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0A212D]">{item.name}</div>
                    <div className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.surface}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Modalidade de Execução */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0A212D] mb-2.5">
              4. Modalidade de Fornecimento
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServiceType("supply-only")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  serviceType === "supply-only"
                    ? "border-altipisos-blue bg-blue-50/50 text-altipisos-blue font-bold shadow-sm"
                    : "border-gray-200 text-gray-700 bg-white"
                }`}
              >
                <div className="text-xs font-bold text-[#0A212D]">Apenas Fornecimento</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Placas paletizadas prontas para montagem rápida DIY
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceType("supply-and-install")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  serviceType === "supply-and-install"
                    ? "border-altipisos-blue bg-blue-50/50 text-altipisos-blue font-bold shadow-sm"
                    : "border-gray-200 text-gray-700 bg-white"
                }`}
              >
                <div className="text-xs font-bold text-[#0A212D]">Fornecimento + Instalação</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Equipe Altipisos monta a quadra em até 48 horas
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Coluna 2: Estimativa Física Aberta & Painel Financeiro Bloqueado (5 Colunas) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card de Quantitativo de Materiais (ABERTO E TRANSPARENTE) */}
          <div className="bg-[#0A212D] text-white p-6 rounded-2xl shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-altipisos-blue">
                Quantitativo Técnico de Materiais
              </span>
              <Layers className="w-4 h-4 text-altipisos-blue" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-gray-300 block uppercase font-medium">
                  Placas Modulares
                </span>
                <span className="text-2xl font-bold font-heading text-white">
                  {quote.totalTiles.toLocaleString("pt-BR")}
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  Peças (16 placas/m²)
                </span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-gray-300 block uppercase font-medium">
                  Rampas de Borda
                </span>
                <span className="text-2xl font-bold font-heading text-white">
                  {quote.rampPieces}
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {quote.perimeterMeters}m lineares de contorno
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-gray-300 border-t border-white/10">
              <span>Peso Estimado da Carga:</span>
              <span className="font-semibold text-white">~{quote.estimatedWeightKg} kg</span>
            </div>
          </div>

          {/* PAINEL FINANCEIRO B2B: BLOQUEADO (GATED OFFER COM BLUR) */}
          {!isUnlocked ? (
            <div className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm p-6 space-y-5">
              {/* Conteúdo com Blur de Fundo */}
              <div className="space-y-3 filter blur-[5px] select-none pointer-events-none opacity-40">
                <div className="flex justify-between text-xs">
                  <span>Custo do Piso Modular (Fábrica):</span>
                  <span className="font-bold">R$ 28.000,00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Frete Rodoviário Fabril (Palhoça/SC):</span>
                  <span className="font-bold">R$ 1.840,00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Mão de Obra Especializada (48h):</span>
                  <span className="font-bold">R$ 5.600,00</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm font-bold">
                  <span>Total com 15% OFF (CNPJ):</span>
                  <span className="text-green-700">R$ 30.124,00</span>
                </div>
              </div>

              {/* Camada de Bloqueio com Formulário de Captura */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] p-6 flex flex-col justify-center space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-altipisos-blue mx-auto flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-heading font-bold text-[#0A212D]">
                    Desbloquear Relatório Financeiro Completo
                  </h4>
                  <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed">
                    Receba o Custo Total de Propriedade (TCO) detalhado com aplicação de <strong>15% de desconto de fábrica</strong> para faturamento B2B/CNPJ.
                  </p>
                </div>

                <form onSubmit={handleUnlockQuote} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome Completo"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-altipisos-blue bg-white"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp com DDD (ex: 48 99999-9999)"
                    value={leadWhatsapp}
                    onChange={(e) => setLeadWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-altipisos-blue bg-white"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Empresa / Clube / Condomínio"
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-altipisos-blue bg-white"
                    />
                    <input
                      type="email"
                      placeholder="E-mail (opcional)"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-altipisos-blue bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Calculando Proposta..."
                    ) : (
                      <>
                        <span>Desbloquear Orçamento de Fábrica</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* PAINEL LIBERADO APÓS PREENCHIMENTO DO LEAD */
            <div className="p-6 rounded-2xl bg-white border border-green-200 shadow-sm space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                <h4 className="font-heading font-bold text-sm">
                  Orçamento Oficial Desbloqueado!
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Área Total da Quadra:</span>
                  <span className="font-semibold text-gray-900">{quote.totalAreaM2} m²</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total de Placas ({quote.totalTiles} un):</span>
                  <span className="font-semibold text-gray-900">
                    R$ {quote.baseMaterialCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {quote.installationCost > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Instalação Especializada (48h):</span>
                    <span className="font-semibold text-gray-900">
                      R$ {quote.installationCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Frete Rodoviário (Palhoça/SC):</span>
                  <span className="font-semibold text-gray-900">
                    R$ {quote.freightCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-medium">
                      Total com 15% OFF de Fábrica:
                    </span>
                    <span className="text-xl font-heading font-extrabold text-green-700">
                      R$ {quote.b2bDiscountedTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded">
                    CNPJ / À Vista
                  </span>
                </div>
              </div>

              {submittedResult?.whatsappDirectUrl && (
                <a
                  href={submittedResult.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Falar com o Consultor no WhatsApp</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
