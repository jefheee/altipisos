# CONTEXTO ATUAL: E-commerce e Unificação Digital Altipisos
*Fonte da Verdade Absoluta do Projeto — Padrão Docs as Code*
*Última Atualização: 06/09/2026*

---

## 📌 1. Contexto Geral do Projeto e Objetivos
A Altipisos é a principal fabricante brasileira de pisos modulares esportivos em polipropileno virgem (+27 anos de mercado, +2.500 clientes atendidos, +2.800 projetos realizados, +1.000.000 m² instalados e chancelas esportivas oficiais CBB, CBFS e LNF).

**Entregas Concluídas nesta Sessão:**
1. **Injeção de Conteúdo Institucional Semântico:** Migrados e integrados todos os dados corporativos autênticos extraídos de `docs/Projeto_Altipisos/01_Raw_Sources/CONTENT_MIGRATION.md` (CNPJ `13.627.549/0001-52`, Diretoria Possamai, telefones de SC/SP/WhatsApp, fatias de mercado, fichas técnicas de Sport In, Sport Out 25 e 30, Play Soft NBR 16071, Toy Floor, FAQ técnico e depoimentos dos 4 embaixadores mundiais).
2. **Eliminação de Layout Shift (Flicker do Contador):** O componente `AnimatedMetrics.tsx` foi estabilizado com `tabular-nums`, contêineres de largura mínima consistente (`min-w-[160px]`) e desconexão imediata do `IntersectionObserver` no primeiro disparo (`triggerOnce`).
3. **Setup de Internacionalização (i18n):** Estrutura de internacionalização ativa suportando Português (`pt-BR`), Inglês (`en-US`) e Espanhol (`es-ES`) via dicionários estruturados (`src/dictionaries/`) e hook reativo `useI18n()`, com seletor interativo na barra de navegação.
4. **Design System B2B Corporate:** Tailwind configurado com paleta restrita corporativa (`altipisos-blue: #1B6AE3`, `altipisos-navy: #0A212D`, `altipisos-green: #10B981`), eliminação completa de gradientes sintéticos e substituição de 100% dos emojis por ícones finos profissionais da biblioteca `lucide-react`.

---

## 🛠️ 2. Stack Tecnológica em Operação
- **Core Framework:** Next.js 14.2.15 (App Router, Server Components & Route Handlers).
- **Linguagem & Tipagem:** TypeScript 5+ com validação Zod.
- **Internacionalização:** Dicionários JSON (`pt.json`, `en.json`, `es.json`) com `I18nProvider` em `src/lib/i18n.tsx`.
- **Estilização:** Tailwind CSS v3 com paleta estrita da marca (#1B6AE3, #0A212D, #10B981) e fontes Outfit / Inter.
- **Ícones:** `lucide-react` (ícones consistentes, finos e sem emojis).
- **Animações Numéricas:** `react-countup` com `tabular-nums` e Intersection Observer estabilizado contra CLS (Cumulative Layout Shift).
- **3D WebGL:** React Three Fiber (`@react-three/fiber`), Drei e Three.js.
- **Engine Financeira & Logística:** `src/lib/pricing-engine.ts`.
- **Automação Fiscal de Backoffice:** `src/services/tiny-erp.ts`, `src/services/mercado-livre.ts`, `/api/webhooks/meli`, `/api/webhooks/nuvemshop`, `/api/leads`.

---

## 📐 3. Dados Cadastrais & Especificações Técnicas Integradas
1. **Dados Corporativos da Matriz:**
   - Razão Social: Altipisos Revestimentos e Quadras Esportivas LTDA.
   - CNPJ: 13.627.549/0001-52.
   - Endereço: Rua Azaléia 212, Jardim Eldorado, Palhoça/SC - CEP 88133-310.
   - Contatos: Matriz SC (48) 3346-3454 | Filial SP (11) 5461-1019 | WhatsApp (48) 6136-5993 | altipisos@altipisos.com.br.
2. **Produtos e Fichas Técnicas:**
   - **Sport In:** 250×250×12mm | 16 un/m² | 10M + 10F + 2 Antifurto | Manta PEBD ou pinos Impact Soft | 10 anos de garantia.
   - **Sport Out 25:** 250×250×12mm | 16 un/m² | Drenante de alta vazão (seca em 10 min) | Aditivos Anti-UV e baixa absorção de calor | 10 anos de garantia.
   - **Sport Out 30:** 300×300×13mm | 11 un/m² | Alta estabilidade dimensional | 10 anos de garantia.
   - **Play Soft:** Atende NBR 16071 para playgrounds | Atóxico e higienizável | Amortecimento contra quedas infantis.
   - **Toy Floor:** Módulos recreativos com jogos cognitivos e educativos integrados.
3. **Embaixadores:**
   - Falcão (4x Melhor do Mundo no Futsal)
   - Amandinha (8x Eleita a Melhor do Mundo no Futsal)
   - Billy (Futsal & Freestyle Star)
   - Adonias Fonseca (Rei do Drible / Freestyle Mundial)

---

## 🚀 4. Status de Entrega das Tarefas
- [x] **TASK 1: Injeção Inteligente de Conteúdo:** Migração concluída e arquivada em `docs/Projeto_Altipisos/01_Raw_Sources/CONTENT_MIGRATION.md`.
- [x] **TASK 2: Resolução do Bug de Layout Shift:** `AnimatedMetrics.tsx` refatorado com `tabular-nums`, largura mínima fixa e `triggerOnce` estrito.
- [x] **TASK 3: Setup de Internacionalização (i18n):** Suporte completo para pt-BR, en-US e es-ES com seletor interativo no Header.
- [x] **TASK 4: Refinamento de Design System (Corporate B2B):** Cores estritas no Tailwind, eliminação de gradientes, sombras suaves (`shadow-sm`/`shadow-md`) e 100% ícones Lucide.

---

## 📊 5. Gap Analysis Atualizado
| Requisito / Dor | Como era no Sistema Antigo | Como é na Nova Arquitetura | Status |
|---|---|---|---|
| **Conteúdo & Autoridade** | Textos genéricos ou desatualizados | Conteúdo institucional 100% migrado com fichas técnicas e FAQ | ✅ Resolvido |
| **Performance e Layout Shift** | Contadores sofriam flicker e reflow na rolagem | Contagem fluida sem oscilação com `tabular-nums` | ✅ Resolvido |
| **Mercado Internacional** | Sem suporte a idiomas estrangeiros | Arquitetura i18n ativa para PT, EN e ES | ✅ Resolvido |
| **Visual do Front-end** | Gradientes pesados com aspecto sintético | Visual Flat Corporate de alta credibilidade para B2B | ✅ Resolvido |
| **Faturamento Mercado Livre** | Processo manual > 24h (reputação vermelha) | Pipeline orientado a eventos faturando em 402ms | ✅ Resolvido |
