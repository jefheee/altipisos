# CONTEXTO ATUAL: E-commerce e Unificação Digital Altipisos
*Fonte da Verdade Absoluta do Projeto — Padrão Docs as Code*
*Última Atualização: 06/09/2026*

---

## 📌 1. Contexto Geral do Projeto e Objetivos
A Altipisos é a principal fabricante brasileira de pisos modulares esportivos em polipropileno virgem (+27 anos de mercado, +2.500 quadras instaladas, +1.000.000 m² de piso e embaixadores como Falcão e Amandinha). 

**Missão Técnica Cumprida:**
1. **Source Control Unificado:** Repositórios Git aninhados foram eliminados. Raiz do projeto versionada de forma limpa e unificada (`git commit` inicial registrado).
2. **Design B2B Flat & Header Original:** Eliminados os gradientes sintéticos. Implementada estética corporativa limpa (fundos sólidos branco, cinza claro e navy), logo oficial recuperada em `/images/logo.png`, e Header reconstruído com links centrais, dropdown de produtos (Sport In, Sport Out, Play Soft, Toy Floor), botão "SOLICITE ORÇAMENTO" e seletor de idioma.
3. **Prova Social com Contadores Animados:** Componente `AnimatedMetrics.tsx` acionado via Intersection Observer com contadores numéricos dinâmicos (`react-countup`).
4. **Calculadora CRO Híbrida B2B (Anti-Ancoragem Negativa):** 
   - Exibe a faixa de referência "A partir de R$ 140/m²".
   - Mantém abertos os dados técnicos úteis (área em m², total de placas e metros lineares de rampa).
   - Bloqueia o valor monetário bruto sob um painel com efeito blur ("Gated Offer"), estimulando o lead a informar Nome e WhatsApp para receber o relatório financeiro com TCO e 15% de desconto de fábrica (CNPJ).
5. **Automação Backoffice Fiscal:** Pipeline Event-Driven operando em 402ms no teste automatizado (Mercado Livre + Tiny ERP + SEFAZ), estancando a penalização de reputação.

---

## 🛠️ 2. Stack Tecnológica em Operação
- **Core Framework:** Next.js 14.2.15 (App Router, Server Components & Route Handlers) rodando em Node.js v22.
- **Linguagem & Tipagem:** TypeScript 5+ com validação Zod.
- **Estilização:** Tailwind CSS v3 com design tokens sólidos da marca (#1B6AE3, #0A212D, #10B981, #FBF9F8).
- **Animações Numéricas:** `react-countup` integrado com Intersection Observer nativo.
- **Simulador 3D WebGL:** React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) e Three.js.
- **Engine de Precificação & Frete:** `src/lib/pricing-engine.ts`.
- **Serviços Fiscais e Webhooks:** `src/services/tiny-erp.ts`, `src/services/mercado-livre.ts`, `/api/webhooks/meli`, `/api/webhooks/nuvemshop`, `/api/leads`.

---

## 📐 3. Regras de Negócio e Estratégia CRO B2B
1. **Quantitativo de Materiais:**
   - 16 placas de $25 \times 25\text{ cm}$ por m².
   - 4 peças de rampa por metro linear do perímetro exposto ($2 \times (L + C)$).
   - 4 cantoneiras de acabamento.
2. **Estratégia Híbrida de Preço:**
   - Exibição de âncora inicial: "A partir de R$ 140/m²".
   - Bloqueio de TCO completo para evitar cotação fria/comparação predatória.
   - Conexão direta com o WhatsApp comercial da fábrica em Palhoça/SC via mensagem pré-formatada.
3. **Logística e Frete de Fábrica:**
   - R$ 2,80/km para rotas $\le 1.000\text{ km}$.
   - R$ 1,75/km para rotas $> 1.000\text{ km}$.

---

## 🚀 4. Status de Entrega das Tarefas
- [x] **TASK 1: Correção do Source Control:** Pastas `.git` aninhadas excluídas; repositório único inicializado na raiz; `.gitignore` configurado; commit inicial realizado.
- [x] **TASK 2: Arquivo de Migração de Conteúdo:** Criado `docs/Projeto_Altipisos/CONTENT_MIGRATION.md` com seções e blocos de comentários preparados.
- [x] **TASK 3: Limpeza de UI/UX e Header Original:** Layout Flat limpo sem gradientes sintéticos; logo oficial Altipisos em `/images/logo.png`; Header fiel ao original com dropdown de produtos e botão azul de solicitação de orçamento.
- [x] **TASK 4: Prova Social Animada:** Criado `AnimatedMetrics.tsx` com disparos automáticos via Intersection Observer.
- [x] **TASK 5: Motor da Calculadora CRO (Híbrida B2B):** Implementado `QuickQuoteCalculator.tsx` com precificação ancorada, quantitativo aberto e painel financeiro desbloqueável por lead.

---

## 📊 5. Gap Analysis Atualizado
| Requisito / Dor | Como era no Sistema Antigo | Como é na Nova Arquitetura | Status |
|---|---|---|---|
| **Controle de Versão** | Repositórios aninhados e corrompidos | Git unificado na raiz com `.gitignore` padronizado | ✅ Resolvido |
| **Aparência do Front-end** | Gradientes pesados com visual sintético | Design Flat corporativo limpo, whitespace ampliado e logo oficial | ✅ Resolvido |
| **Navegação & Header** | Header genérico com topbar redundante | Header fiel ao institucional original com dropdown e idioma | ✅ Resolvido |
| **Métricas de Autoridade** | Números estáticos sem impacto | Contadores animados acionados por rolagem | ✅ Resolvido |
| **Modelo Comercial B2B** | Formulário genérico ou preço aberto descontextualizado | Estratégia híbrida: quantitativo aberto + oferta travada no WhatsApp | ✅ Resolvido |
| **Faturamento Mercado Livre** | Processo manual > 24h (reputação vermelha) | Pipeline orientado a eventos faturando em 402ms | ✅ Resolvido |
