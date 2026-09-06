"use client";

import React, { useState } from "react";
import { QuickQuoteCalculator } from "@/components/calculator/QuickQuoteCalculator";
import { CourtSimulator3D } from "@/components/simulator/CourtSimulator3D";
import { SportModality } from "@/types/pricing";
import {
  Shield,
  Zap,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Star,
} from "lucide-react";

export default function HomePage() {
  const [selectedSport, setSelectedSport] = useState<SportModality>("futsal");
  const [courtWidth, setCourtWidth] = useState(15);
  const [courtLength, setCourtLength] = useState(28);

  const handleDimensionChange = (w: number, l: number) => {
    setCourtWidth(w);
    setCourtLength(l);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-altipisos-navy text-white pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-altipisos-cyan">
              <Sparkles className="w-3.5 h-3.5 text-altipisos-cyan" />
              <span>Chancela Oficial CBB • CBFS • LNF</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-[1.1]">
              Transforme seu espaço com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-altipisos-cyan to-altipisos-blue">
                Altipisos
              </span>
              , a inovação em pisos modulares!
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
              Pisos esportivos modulares em polipropileno 100% virgem com absorção de impacto superior a 35%. 
              Instalação rápida em até 48 horas, sem sujeira, sem cola e com garantia de fábrica de 10 anos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#calculadora"
                className="px-6 py-3.5 rounded-xl bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-sm font-heading font-bold uppercase tracking-wider shadow-lg hover:shadow-altipisos-blue/30 transition-all flex items-center gap-2"
              >
                <span>Calcular Meu Projeto Agora</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#simulador3d"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-heading font-semibold transition-all"
              >
                Abrir Montador 3D
              </a>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 border-t border-white/10 bg-black/20 backdrop-blur-sm py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-heading font-extrabold text-altipisos-cyan">
                27 Anos
              </div>
              <div className="text-xs text-gray-400 mt-0.5">De Pioneirismo no Brasil</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-heading font-extrabold text-white">
                +2.500
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Quadras Entregues</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-heading font-extrabold text-white">
                +2.800
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Clientes Atendidos</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-heading font-extrabold text-altipisos-green">
                +1.000.000 m²
              </div>
              <div className="text-xs text-gray-400 mt-0.5">De Pisos Instalados</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: SIMULADOR 3D INTERATIVO */}
      <section id="simulador3d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            Visualização em Tempo Real
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-altipisos-navy">
            Montador de Quadras 3D
          </h2>
          <p className="text-sm text-altipisos-navy-muted">
            Visualize as placas modulares em escala real, alterne as modalidades esportivas e teste combinações de cores oficiais.
          </p>
        </div>

        <CourtSimulator3D
          width={courtWidth}
          length={courtLength}
          sport={selectedSport}
        />
      </section>

      {/* 3. SECTION: CALCULADORA CRO B2B & ORÇAMENTO RÁPIDO */}
      <section id="calculadora" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-green-dark bg-altipisos-green-light px-3 py-1 rounded-full uppercase tracking-wider">
            <Shield className="w-4 h-4 text-altipisos-green" />
            Transparência & Engenharia de Precisão
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-altipisos-navy">
            Calculadora Rápida Direto de Fábrica
          </h2>
          <p className="text-sm text-altipisos-navy-muted">
            Insira as dimensões do seu espaço para calcular quantidade de placas modulares, rampas de borda e valor do frete rodoviário a partir da fábrica em Palhoça/SC.
          </p>
        </div>

        <QuickQuoteCalculator
          initialSport={selectedSport}
          onDimensionChange={handleDimensionChange}
        />
      </section>

      {/* 4. SECTION: LINHAS DE PRODUTOS */}
      <section id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-heading font-bold text-altipisos-navy">
            Pisos Modulares de Alta Performance
          </h2>
          <p className="text-sm text-altipisos-navy-muted">
            Polipropileno virgem com aditivos anti-UV, tecnologia de encaixe de engate rápido e amortecimento mecânico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sport Out */}
          <div className="bg-white rounded-2xl p-6 border border-altipisos-border shadow-tile hover:shadow-tile-hover transition-all space-y-4">
            <div className="h-44 rounded-xl bg-gradient-to-br from-blue-900 to-altipisos-blue flex items-center justify-center text-white font-heading font-bold text-xl p-4 text-center">
              Piso Modular Sport Out (Outdoor)
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-altipisos-blue uppercase tracking-wider">
                Vazado & Drenante
              </span>
              <h3 className="text-xl font-heading font-bold text-altipisos-navy">
                Sport Out 15mm/16mm
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ideal para quadras externas descobertas. A água da chuva escorre imediatamente pelas microperfurações geométricas. Secagem em até 10 minutos.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700 pt-2 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Resistência UV total (não desbota no sol)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Drenagem pluvial instantânea
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                16 cores oficiais disponíveis
              </li>
            </ul>
          </div>

          {/* Sport In */}
          <div className="bg-white rounded-2xl p-6 border border-altipisos-border shadow-tile hover:shadow-tile-hover transition-all space-y-4">
            <div className="h-44 rounded-xl bg-gradient-to-br from-emerald-900 to-altipisos-green flex items-center justify-center text-white font-heading font-bold text-xl p-4 text-center">
              Piso Modular Sport In (Indoor)
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-altipisos-green uppercase tracking-wider">
                Sólido & Antiderrapante
              </span>
              <h3 className="text-xl font-heading font-bold text-altipisos-navy">
                Sport In 12mm/15mm
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Desenvolvido para quadras internas, ginásios poliesportivos, salões comunitários e condomínios fechados. Alto coeficiente de atrito para paradas bruscas.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700 pt-2 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Absorção de impacto &gt; 35%
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Protege articulações e joelhos de atletas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Sem necessidade de cola ou tempo de cura
              </li>
            </ul>
          </div>

          {/* Play Soft */}
          <div className="bg-white rounded-2xl p-6 border border-altipisos-border shadow-tile hover:shadow-tile-hover transition-all space-y-4">
            <div className="h-44 rounded-xl bg-gradient-to-br from-amber-700 to-orange-500 flex items-center justify-center text-white font-heading font-bold text-xl p-4 text-center">
              Play Soft & Toy Floor (Recreação)
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-altipisos-clay uppercase tracking-wider">
                Segurança Infantil
              </span>
              <h3 className="text-xl font-heading font-bold text-altipisos-navy">
                Play Soft 16mm
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Especialmente projetado para playgrounds, brinquedotecas e áreas escolares. Amortecimento mecânico contra quedas, atóxico e lavável com água e sabão neutro.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700 pt-2 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Atóxico e 100% higienizável
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Amortecimento certificado para crianças
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-altipisos-green" />
                Cores vibrantes estimulantes
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. SECTION: EMBAIXADORES GLOBAIS DE AUTORIDADE */}
      <section id="embaixadores" className="bg-white py-16 border-y border-altipisos-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
              <Star className="w-4 h-4 fill-altipisos-blue" />
              A Escolha dos Campeões
            </div>
            <h2 className="text-3xl font-heading font-bold text-altipisos-navy">
              Embaixadores Oficiais Altipisos
            </h2>
            <p className="text-sm text-altipisos-navy-muted">
              As maiores lendas do esporte nacional e internacional jogam e recomendam os pisos modulares Altipisos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Falcão */}
            <div className="bg-altipisos-ice rounded-2xl p-5 border border-altipisos-border text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-altipisos-blue text-white font-heading font-bold text-2xl mx-auto flex items-center justify-center shadow-md">
                F12
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-altipisos-navy">Falcão</h4>
                <span className="text-[11px] font-semibold text-altipisos-blue">
                  Melhor Jogador de Futsal da História
                </span>
              </div>
              <p className="text-xs text-gray-600 italic">
                &ldquo;A qualidade e o amortecimento da Altipisos são incomparáveis. É o piso que protege o atleta e eleva o nível do jogo.&rdquo;
              </p>
            </div>

            {/* Amandinha */}
            <div className="bg-altipisos-ice rounded-2xl p-5 border border-altipisos-border text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-altipisos-green-dark text-white font-heading font-bold text-2xl mx-auto flex items-center justify-center shadow-md">
                A8
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-altipisos-navy">Amandinha</h4>
                <span className="text-[11px] font-semibold text-altipisos-green-dark">
                  8x Melhor Jogadora do Mundo
                </span>
              </div>
              <p className="text-xs text-gray-600 italic">
                &ldquo;Treinar e competir em uma quadra Altipisos dá uma segurança enorme nos movimentos e giros. Padrão mundial.&rdquo;
              </p>
            </div>

            {/* Bily */}
            <div className="bg-altipisos-ice rounded-2xl p-5 border border-altipisos-border text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-altipisos-navy text-white font-heading font-bold text-2xl mx-auto flex items-center justify-center shadow-md">
                BF
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-altipisos-navy">Bily</h4>
                <span className="text-[11px] font-semibold text-altipisos-navy">
                  Futsal & Freestyle Star
                </span>
              </div>
              <p className="text-xs text-gray-600 italic">
                &ldquo;A aderência das placas é perfeita para dribles rápidos e manobras. O piso responde exatamente ao comando do atleta.&rdquo;
              </p>
            </div>

            {/* Adonias */}
            <div className="bg-altipisos-ice rounded-2xl p-5 border border-altipisos-border text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-altipisos-clay text-white font-heading font-bold text-2xl mx-auto flex items-center justify-center shadow-md">
                AF
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-altipisos-navy">Adonias Fonseca</h4>
                <span className="text-[11px] font-semibold text-altipisos-clay">
                  Rei do Drible / Freestyle
                </span>
              </div>
              <p className="text-xs text-gray-600 italic">
                &ldquo;A tecnologia modular da Altipisos permite montar uma quadra de alto nível em qualquer lugar em menos de 48 horas.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
