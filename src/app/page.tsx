"use client";

import React, { useState } from "react";
import { QuickQuoteCalculator } from "@/components/calculator/QuickQuoteCalculator";
import { CourtSimulator3D } from "@/components/simulator/CourtSimulator3D";
import { AnimatedMetrics } from "@/components/common/AnimatedMetrics";
import { SportModality } from "@/types/pricing";
import {
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Star,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [selectedSport, setSelectedSport] = useState<SportModality>("futsal");
  const [courtWidth, setCourtWidth] = useState(15);
  const [courtLength, setCourtLength] = useState(28);

  const handleDimensionChange = (w: number, l: number) => {
    setCourtWidth(w);
    setCourtLength(l);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION (Flat B2B Clean Design) */}
      <section className="bg-[#0A212D] text-white pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-altipisos-blue tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-altipisos-blue" />
              <span>Chancelas Oficiais: CBB • CBFS • LNF</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.12]">
              Transforme seu espaço com Altipisos, a inovação em pisos modulares!
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl">
              Pisos esportivos modulares em polipropileno 100% virgem com absorção de impacto superior a 35%. 
              Instalação técnica rápida em até 48 horas, sem cola e com garantia de fábrica de 10 anos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#calculadora"
                className="px-7 py-4 rounded-xl bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
              >
                <span>Calcular Meu Projeto</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#simulador3d"
                className="px-7 py-4 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs sm:text-sm font-heading font-semibold transition-all"
              >
                Abrir Montador 3D
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROVA SOCIAL ANIMADA (Counters com Intersection Observer - TASK 4) */}
      <AnimatedMetrics />

      {/* 3. SIMULADOR 3D INTERATIVO */}
      <section id="simulador3d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            Visualizador Paramétrico Oficial
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0A212D]">
            Montador de Quadras 3D
          </h2>
          <p className="text-sm text-gray-500">
            Alterne as modalidades esportivas com demarcações regulamentares e personalize as cores das placas modulares.
          </p>
        </div>

        <CourtSimulator3D
          width={courtWidth}
          length={courtLength}
          sport={selectedSport}
        />
      </section>

      {/* 4. CALCULADORA CRO B2B (Estratégia Híbrida com Gated Offer - TASK 5) */}
      <section id="calculadora" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
            <Shield className="w-4 h-4 text-green-700" />
            Engenharia Direto de Fábrica (Palhoça/SC)
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0A212D]">
            Calculadora Técnica de Materiais
          </h2>
          <p className="text-sm text-gray-500">
            Defina o tamanho do espaço para calcular a quantidade exata de placas modulares e rampas perimetrais.
          </p>
        </div>

        <QuickQuoteCalculator
          initialSport={selectedSport}
          onDimensionChange={handleDimensionChange}
        />
      </section>

      {/* 5. LINHAS DE PRODUTOS (Design Flat B2B Limpo - Sem Gradientes de IA) */}
      <section id="produtos" className="bg-gray-50 py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-heading font-bold text-[#0A212D]">
              Pisos Modulares Altipisos
            </h2>
            <p className="text-sm text-gray-500">
              Polipropileno 100% virgem com aditivos anti-UV e absorção mecânica de impacto superior a 35%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sport Out */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-altipisos-blue flex items-center justify-center font-heading font-bold text-lg">
                  OUT
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-altipisos-blue tracking-wider">
                    Vazado & Drenante
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#0A212D] mt-1">
                    Sport Out (15mm/16mm)
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Piso modular vazado para quadras externas descobertas. A água pluvial escorre imediatamente pelas microperfurações geométricas. Secagem em até 10 minutos após a chuva.
                </p>
                <ul className="space-y-2 text-xs text-gray-700 pt-3 border-t border-gray-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Proteção UV contra desbotamento solar
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Drenagem pluvial de alta vazão
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    16 cores oficiais disponíveis
                  </li>
                </ul>
              </div>

              <a
                href="#calculadora"
                className="w-full py-3 text-center rounded-xl bg-[#0A212D] hover:bg-black text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
              >
                Simular Sport Out
              </a>
            </div>

            {/* Sport In */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-heading font-bold text-lg">
                  IN
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-green-700 tracking-wider">
                    Sólido & Antiderrapante
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#0A212D] mt-1">
                    Sport In (12mm/15mm)
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Piso fechado com textura fosca antiderrapante para ginásios cobertos, escolas e condomínios. Protege as articulações dos atletas e elimina juntas de dilatação.
                </p>
                <ul className="space-y-2 text-xs text-gray-700 pt-3 border-t border-gray-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Absorção de impacto &gt; 35%
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Sem necessidade de cola ou tempo de cura
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Manutenção zero com lavagem simples
                  </li>
                </ul>
              </div>

              <a
                href="#calculadora"
                className="w-full py-3 text-center rounded-xl bg-[#0A212D] hover:bg-black text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
              >
                Simular Sport In
              </a>
            </div>

            {/* Play Soft */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-heading font-bold text-lg">
                  PLAY
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-orange-600 tracking-wider">
                    Amortecimento Infantil
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#0A212D] mt-1">
                    Play Soft (16mm)
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pisos modulares com amortecimento reforçado para playgrounds, áreas escolares e brinquedotecas. Superfície atóxica, lavável e resistente a intempéries.
                </p>
                <ul className="space-y-2 text-xs text-gray-700 pt-3 border-t border-gray-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Amortecimento contra quedas infantis
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Atóxico e 100% higienizável
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    Cores estimulantes para recreação
                  </li>
                </ul>
              </div>

              <a
                href="#calculadora"
                className="w-full py-3 text-center rounded-xl bg-[#0A212D] hover:bg-black text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
              >
                Simular Play Soft
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EMBAIXADORES GLOBAIS DE AUTORIDADE */}
      <section id="embaixadores" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
            <Star className="w-4 h-4 fill-altipisos-blue" />
            A Escolha dos Campeões
          </div>
          <h2 className="text-3xl font-heading font-bold text-[#0A212D]">
            Embaixadores Oficiais Altipisos
          </h2>
          <p className="text-sm text-gray-500">
            Grandes nomes do esporte brasileiro e mundial confiam na durabilidade e amortecimento das quadras Altipisos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Falcão */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-altipisos-blue font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
              F12
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-[#0A212D]">Falcão</h4>
              <span className="text-[11px] font-semibold text-altipisos-blue">
                Melhor da História do Futsal
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              &ldquo;A qualidade e o amortecimento da Altipisos são incomparáveis. É o piso que protege o atleta e eleva o nível do jogo.&rdquo;
            </p>
          </div>

          {/* Amandinha */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
              A8
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-[#0A212D]">Amandinha</h4>
              <span className="text-[11px] font-semibold text-green-700">
                8x Melhor do Mundo
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              &ldquo;Treinar e competir em uma quadra Altipisos dá uma segurança enorme nos movimentos e giros. Padrão mundial.&rdquo;
            </p>
          </div>

          {/* Bily */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-[#0A212D] font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
              BF
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-[#0A212D]">Bily</h4>
              <span className="text-[11px] font-semibold text-gray-700">
                Futsal & Freestyle Star
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              &ldquo;A aderência das placas é perfeita para dribles rápidos e manobras. O piso responde exatamente ao comando do atleta.&rdquo;
            </p>
          </div>

          {/* Adonias */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
              AF
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-[#0A212D]">Adonias Fonseca</h4>
              <span className="text-[11px] font-semibold text-orange-600">
                Rei do Drible / Freestyle
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              &ldquo;A tecnologia modular da Altipisos permite montar uma quadra de alto nível em qualquer lugar em menos de 48 horas.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 7. DIFERENCIAIS TÉCNICOS (Flat Grid) */}
      <section id="diferenciais" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A212D] text-white rounded-3xl p-10 md:p-14 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-altipisos-blue">
              Engenharia e Sustentabilidade
            </span>
            <h2 className="text-3xl font-heading font-bold">
              Por que escolher os pisos modulares Altipisos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-altipisos-blue">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg text-white">
                Garantia de Fábrica de 10 Anos
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Produzidos com polipropileno 100% virgem e estabilizantes térmicos, resistentes a intempéries, chuvas torrenciais e sol intenso.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-green-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg text-white">
                Energia 100% Limpa e Verde
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Nossa fábrica em Palhoça/SC opera com matriz fotovoltaica sustentável, garantindo menor pegada de carbono no processo produtivo.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-altipisos-blue">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-lg text-white">
                Chancelas das Confederações
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Homologado oficialmente pela CBB (Basquete), CBFS (Futsal) e LNF para jogos oficiais e torneios federados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
