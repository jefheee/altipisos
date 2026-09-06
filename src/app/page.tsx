"use client";

import React, { useState } from "react";
import { QuickQuoteCalculator } from "@/components/calculator/QuickQuoteCalculator";
import { CourtSimulator3D } from "@/components/simulator/CourtSimulator3D";
import { AnimatedMetrics } from "@/components/common/AnimatedMetrics";
import { SportModality } from "@/types/pricing";
import { useI18n } from "@/lib/i18n";
import {
  ShieldCheck,
  Zap,
  Clock,
  Check,
  ArrowRight,
  Sparkles,
  Trophy,
  Star,
  Users,
  Award,
  Layers,
  HelpCircle,
  ChevronDown,
  Building2,
  HeartHandshake,
  Wrench,
  Sun,
  ShieldAlert,
} from "lucide-react";

export default function HomePage() {
  const { t } = useI18n();
  const [selectedSport, setSelectedSport] = useState<SportModality>("futsal");
  const [courtWidth, setCourtWidth] = useState(15);
  const [courtLength, setCourtLength] = useState(28);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDimensionChange = (w: number, l: number) => {
    setCourtWidth(w);
    setCourtLength(l);
  };

  const FAQS = [
    {
      q: "O que é piso modular esportivo?",
      a: "O piso modular é uma solução de revestimento por placas interligáveis feitas de polipropileno 100% virgem de alta resistência. O sistema possui travas de engate rápido (10 machos + 10 fêmeas + 2 antifurto por placa), permitindo montagem prática e sem a necessidade de cola ou ferramentas especiais.",
    },
    {
      q: "Qual a matéria-prima utilizada e sua durabilidade?",
      a: "Nossos pisos são fabricados exclusivamente com polipropileno 100% virgem aditivado com protetores Anti-UV, antioxidantes e antiestáticos. Não utilizamos plástico reciclado quebradiço. Essa composição garante garantia de fábrica de 10 anos contra quebras, ressecamento ou desbotamento solar.",
    },
    {
      q: "Quais são os tipos de base aceitos para a instalação?",
      a: "O piso modular pode ser instalado sobre concreto desempenado, concreto polido, paver de concreto, asfalto, madeira rígida ou piso cerâmico existente. A base precisa apenas estar sólida, limpa e nivelada. Em quadras externas descobertas, recomendamos pelo menos 1% de caimento para escoamento pluvial.",
    },
    {
      q: "Como funciona a dilatação térmica e o acabamento perimetral?",
      a: "O polipropileno possui dilatação natural sob oscilações de temperatura. Por isso, a equipe de instalação deixa um recuo técnico de 3 a 5 cm das muretas ou paredes. O acabamento de acesso é feito com rampas chanfradas e cantoneiras de canto, evitando desníveis e tropeços.",
    },
    {
      q: "Como é feita a limpeza e manutenção periódica?",
      a: "A manutenção é praticamente nula. Em quadras externas, a própria água da chuva lava a superfície através das microperfurações de drenagem. Para higienização em ginásios ou playgrounds, basta lavar com água e sabão neutro.",
    },
    {
      q: "Se uma placa sofrer um impacto incomum, é possível trocá-la individualmente?",
      a: "Sim. Uma das maiores vantagens mecânicas da Altipisos é a manutenção modular: qualquer placa pode ser desencaixada e substituída pontualmente em minutos, sem precisar desmontar o restante da quadra.",
    },
    {
      q: "Qual o prazo de garantia oferecido pela Altipisos?",
      a: "Oferecemos 10 anos de garantia de fábrica para os pisos modulares Sport In, Sport Out e Play Soft. Para as pinturas de demarcações esportivas em poliuretano especial (PU), oferecemos garantia técnica de 1 ano.",
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION (Flat B2B Clean Design) */}
      <section className="bg-[#0A212D] text-white pt-20 pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-altipisos-blue tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-altipisos-blue" />
              <span>{t("hero.badge", "Chancelas Oficiais: CBB • CBFS • LNF")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.12]">
              {t("hero.title", "Transforme seu espaço com Altipisos, a inovação em pisos modulares!")}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl">
              {t(
                "hero.subtitle",
                "Há mais de 27 anos, transformamos ambientes com pisos e equipamentos esportivos que unem qualidade, segurança, inovação e funcionalidade. Polipropileno 100% virgem com absorção de impacto superior a 35%."
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#calculadora"
                className="px-7 py-4 rounded-xl bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
              >
                <span>{t("hero.ctaCalculate", "Calcular Meu Projeto")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#simulador3d"
                className="px-7 py-4 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs sm:text-sm font-heading font-semibold transition-all"
              >
                {t("hero.ctaSimulator", "Abrir Montador 3D")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROVA SOCIAL ANIMADA (Zero Layout Shift com Tabular Nums) */}
      <AnimatedMetrics />

      {/* 3. QUEM SOMOS (Conteúdo Institucional Original Auditado) */}
      <section id="quem-somos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>{t("about.tag", "Sobre a Altipisos")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0A212D]">
              {t("about.title", "Segurança e Qualidade sob seus pés")}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t(
                "about.desc",
                "Somos uma empresa com mais de 27 anos, líder brasileira em soluções de pisos modulares, elevando o padrão de quadras esportivas e áreas de lazer com inovação e qualidade superior."
              )}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nosso compromisso com a excelência se reflete no atendimento técnico personalizado, oferecendo suporte desde o planejamento e dimensionamento de base até a instalação final em todo o Brasil.
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-altipisos-blue shrink-0" />
              <span>{t("about.directors", "Diretoria: Kean, Altivo e Kelton Possamai")}</span>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-altipisos-blue flex items-center justify-center font-bold">
                M
              </div>
              <h4 className="font-heading font-bold text-base text-[#0A212D]">Missão</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Proporcionar segurança, conforto e satisfação através do nosso comprometimento em levar a melhor experiência esportiva aos nossos clientes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-lg bg-green-50 text-altipisos-green flex items-center justify-center font-bold">
                V
              </div>
              <h4 className="font-heading font-bold text-base text-[#0A212D]">Visão</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Continuar sendo a principal referência em pisos modulares no Brasil e consolidar nossa presença como player esportivo global.
              </p>
            </div>

            <div className="sm:col-span-2 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-lg bg-gray-100 text-[#0A212D] flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5 text-altipisos-blue" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#0A212D]">Valores</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Eficácia, Inovação, Flexibilidade, Responsabilidade, Foco em Resultado, Comprometimento, Lideração (líder + ação) e Paixão pelo que fazemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIFERENCIAIS DA FÁBRICA */}
      <section id="diferenciais" className="bg-[#0A212D] text-white py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-altipisos-blue">
              {t("diff.title", "Nossos Diferenciais")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              Engenharia, Resistência e Sustentabilidade
            </h2>
            <p className="text-sm text-gray-300">
              {t("diff.subtitle", "Oferecemos um atendimento ágil e humano, com compromisso ético e responsável em todas as etapas.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-altipisos-blue text-white flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-white">
                {t("diff.d1Title", "Tecnologia Modular de Alto Desempenho")}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {t("diff.d1Desc", "Pisos modulares desenvolvidos com polipropileno 100% virgem, tecnologia de absorção de impacto e soluções que entregam segurança e durabilidade.")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-altipisos-green text-white flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-white">
                {t("diff.d2Title", "Padrão Profissional para Quadras")}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {t("diff.d2Desc", "Equipamentos desenvolvidos para futsal, basquete, tênis, vôlei e pickleball, com estruturas robustas e desempenho para quadras profissionais.")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-altipisos-blue text-white flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-white">
                {t("diff.d3Title", "Instalação em até 48 Horas")}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {t("diff.d3Desc", "Sem quebra-quebra, a quadra com piso modular fica pronta para uso em até 48 horas. Só precisa que a base esteja rígida e nivelada.")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-altipisos-green text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-white">
                {t("diff.d4Title", "Equipamentos Esportivos de Alta Resistência")}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {t("diff.d4Desc", "Traves oficiais, tabelas de basquete em acrílico e postes esportivos fabricados com materiais de alta qualidade para maior durabilidade.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LINHAS DE PRODUTOS & FICHAS TÉCNICAS (Flat Corporate Look) */}
      <section id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Catálogo de Fabricação Própria
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0A212D]">
            Pisos Modulares Altipisos
          </h2>
          <p className="text-sm text-gray-500">
            Especificações técnicas oficiais para projetos esportivos internos, externos e infantis com 10 anos de garantia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sport In */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-altipisos-blue flex items-center justify-center font-heading font-bold text-sm">
                IN
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-altipisos-blue">
                  Indoor Fechado
                </span>
                <h3 className="text-xl font-heading font-bold text-[#0A212D] mt-0.5">
                  Sport In 12mm
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Piso fechado com textura fosca antiderrapante. Ideal para ginásios, salões e condomínios. Opção com Manta PEBD ou pinos Impact Soft.
              </p>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-[11px] text-gray-600 border border-gray-100">
                <div className="flex justify-between">
                  <span>Dimensões:</span>
                  <strong className="text-gray-900">250×250×12mm</strong>
                </div>
                <div className="flex justify-between">
                  <span>Rendimento:</span>
                  <strong className="text-gray-900">16 peças/m²</strong>
                </div>
                <div className="flex justify-between">
                  <span>Encaixe:</span>
                  <strong className="text-gray-900">10M + 10F + 2 Antifurto</strong>
                </div>
                <div className="flex justify-between">
                  <span>Garantia:</span>
                  <strong className="text-green-700">10 Anos</strong>
                </div>
              </div>
            </div>

            <a
              href="#calculadora"
              className="w-full py-2.5 text-center rounded-xl bg-[#0A212D] hover:bg-black text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
            >
              Simular Sport In
            </a>
          </div>

          {/* Sport Out 25 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-altipisos-green flex items-center justify-center font-heading font-bold text-sm">
                OUT 25
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                  Outdoor Drenante
                </span>
                <h3 className="text-xl font-heading font-bold text-[#0A212D] mt-0.5">
                  Sport Out 25
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Superfície vazada para quadras descobertas. Escoamento pluvial rápido com secagem em até 10 min. Aditivos anti-UV e baixa absorção de calor.
              </p>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-[11px] text-gray-600 border border-gray-100">
                <div className="flex justify-between">
                  <span>Dimensões:</span>
                  <strong className="text-gray-900">250×250×12mm</strong>
                </div>
                <div className="flex justify-between">
                  <span>Rendimento:</span>
                  <strong className="text-gray-900">16 peças/m²</strong>
                </div>
                <div className="flex justify-between">
                  <span>Encaixe:</span>
                  <strong className="text-gray-900">10M + 10F + 2 Antifurto</strong>
                </div>
                <div className="flex justify-between">
                  <span>Garantia:</span>
                  <strong className="text-green-700">10 Anos</strong>
                </div>
              </div>
            </div>

            <a
              href="#calculadora"
              className="w-full py-2.5 text-center rounded-xl bg-[#0A212D] hover:bg-black text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
            >
              Simular Sport Out 25
            </a>
          </div>

          {/* Sport Out 30 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-altipisos-blue flex items-center justify-center font-heading font-bold text-sm">
                OUT 30
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-altipisos-blue">
                  Outdoor Modular 30
                </span>
                <h3 className="text-xl font-heading font-bold text-[#0A212D] mt-0.5">
                  Sport Out 30
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Módulos de maior área superficial (30×30cm). Proporciona maior estabilidade e montagem ultra veloz em grandes espaços esportivos.
              </p>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-[11px] text-gray-600 border border-gray-100">
                <div className="flex justify-between">
                  <span>Dimensões:</span>
                  <strong className="text-gray-900">300×300×13mm</strong>
                </div>
                <div className="flex justify-between">
                  <span>Rendimento:</span>
                  <strong className="text-gray-900">11 peças/m²</strong>
                </div>
                <div className="flex justify-between">
                  <span>Metro Linear:</span>
                  <strong className="text-gray-900">4 pisos (1,2m)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Garantia:</span>
                  <strong className="text-green-700">10 Anos</strong>
                </div>
              </div>
            </div>

            <a
              href="#calculadora"
              className="w-full py-2.5 text-center rounded-xl bg-[#0A212D] hover:bg-black text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
            >
              Simular Sport Out 30
            </a>
          </div>

          {/* Play Soft & Toy Floor */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-heading font-bold text-sm">
                PLAY
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  Infantil & Recreação
                </span>
                <h3 className="text-xl font-heading font-bold text-[#0A212D] mt-0.5">
                  Play Soft / Toy Floor
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Desenvolvido para playgrounds e escolas. Amortecimento mecânico certificado que atende integralmente a norma NBR 16071 contra impactos e quedas infantis.
              </p>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-[11px] text-gray-600 border border-gray-100">
                <div className="flex justify-between">
                  <span>Certificação:</span>
                  <strong className="text-gray-900">NBR 16071</strong>
                </div>
                <div className="flex justify-between">
                  <span>Paleta:</span>
                  <strong className="text-gray-900">+25 Cores</strong>
                </div>
                <div className="flex justify-between">
                  <span>Superfície:</span>
                  <strong className="text-gray-900">Atóxica & Lavável</strong>
                </div>
                <div className="flex justify-between">
                  <span>Garantia:</span>
                  <strong className="text-green-700">10 Anos</strong>
                </div>
              </div>
            </div>

            <a
              href="#calculadora"
              className="w-full py-2.5 text-center rounded-xl bg-[#0A212D] hover:bg-black text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
            >
              Simular Play Soft
            </a>
          </div>
        </div>
      </section>

      {/* 6. SIMULADOR 3D INTERATIVO (WebGL R3F) */}
      <section id="simulador3d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            {t("simulator.tag", "Visualização Paramétrica Oficial")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0A212D]">
            {t("simulator.title", "Montador de Quadras 3D")}
          </h2>
          <p className="text-sm text-gray-500">
            {t(
              "simulator.desc",
              "Alterne as modalidades esportivas com demarcações regulamentares e personalize as cores das placas modulares em tempo real."
            )}
          </p>
        </div>

        <CourtSimulator3D
          width={courtWidth}
          length={courtLength}
          sport={selectedSport}
        />
      </section>

      {/* 7. CALCULADORA CRO B2B (Estratégia Híbrida com Gated Offer) */}
      <section id="calculadora" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-green-700" />
            {t("calculator.tag", "Engenharia Direto de Fábrica")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0A212D]">
            {t("calculator.title", "Calculadora Técnica de Materiais")}
          </h2>
          <p className="text-sm text-gray-500">
            {t(
              "calculator.desc",
              "Defina o tamanho do espaço para calcular a quantidade exata de placas modulares e rampas perimetrais com valor de fábrica."
            )}
          </p>
        </div>

        <QuickQuoteCalculator
          initialSport={selectedSport}
          onDimensionChange={handleDimensionChange}
        />
      </section>

      {/* 8. EMBAIXADORES GLOBAIS DE AUTORIDADE (Depoimentos Oficiais Reais) */}
      <section id="embaixadores" className="bg-gray-50 py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
              <Star className="w-4 h-4 fill-altipisos-blue" />
              {t("ambassadors.tag", "A Escolha dos Campeões")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0A212D]">
              {t("ambassadors.title", "Embaixadores Oficiais Altipisos")}
            </h2>
            <p className="text-sm text-gray-500">
              {t(
                "ambassadors.subtitle",
                "Nossos embaixadores são apaixonados por qualidade e inovação, representando a excelência da Altipisos nas maiores arenas do mundo."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Falcão */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-altipisos-blue font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
                  F12
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0A212D]">Falcão</h4>
                  <span className="text-[11px] font-semibold text-altipisos-blue">
                    {t("ambassadors.falcaoRole", "Melhor Jogador de Futsal da História")}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{t("ambassadors.falcaoQuote", "O bom é saber que as novas gerações poderão jogar em um piso de qualidade.")}&rdquo;
                </p>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider pt-2 border-t border-gray-100">
                4x Melhor do Mundo
              </div>
            </div>

            {/* Amandinha */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-green-50 text-altipisos-green font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
                  A8
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0A212D]">Amandinha</h4>
                  <span className="text-[11px] font-semibold text-altipisos-green">
                    {t("ambassadors.amandinhaRole", "8x Eleita a Melhor do Mundo no Futsal")}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{t("ambassadors.amandinhaQuote", "A qualidade, segurança e tecnologia que a Altipisos proporciona é surreal, é sem dúvidas um prazer representar essa empresa gigante.")}&rdquo;
                </p>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider pt-2 border-t border-gray-100">
                8x Melhor do Mundo
              </div>
            </div>

            {/* Billy */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-[#0A212D] font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
                  BF
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0A212D]">Billy</h4>
                  <span className="text-[11px] font-semibold text-gray-700">
                    {t("ambassadors.billyRole", "Futsal & Freestyle Star")}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{t("ambassadors.billyQuote", "Eu me identifico muito com a empresa Altipisos, primeiro por ser uma verdadeira família. Além disso, eles têm a mesma paixão por esporte que eu.")}&rdquo;
                </p>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider pt-2 border-t border-gray-100">
                Paixão pelo Esporte
              </div>
            </div>

            {/* Adonias */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 font-heading font-extrabold text-xl mx-auto flex items-center justify-center">
                  AF
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0A212D]">Adonias Fonseca</h4>
                  <span className="text-[11px] font-semibold text-orange-600">
                    {t("ambassadors.adoniasRole", "Rei do Drible / Freestyle Mundial")}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{t("ambassadors.adoniasQuote", "Todas as vezes que joguei na quadra Altipisos meu desempenho foi muito melhor. A qualidade do piso faz total diferença na performance.")}&rdquo;
                </p>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider pt-2 border-t border-gray-100">
                Referência Freestyle
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ TÉCNICO (Perguntas Frequentes Reais da Altipisos) */}
      <section id="conteudos" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-blue uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            Esclarecimentos de Engenharia
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0A212D]">
            {t("faq.title", "Perguntas Frequentes")}
          </h2>
          <p className="text-sm text-gray-500">
            {t(
              "faq.subtitle",
              "Tire suas dúvidas técnicas sobre o piso modular, instalação, manutenção e garantia de 10 anos."
            )}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base text-[#0A212D]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    openFaq === idx ? "rotate-180 text-altipisos-blue" : ""
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
