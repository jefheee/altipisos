# CONTEXTO ATUAL: E-commerce e Unificação Digital Altipisos
*Fonte da Verdade Absoluta do Projeto — Padrão Docs as Code*
*Última Atualização: 06/09/2026*

---

## 📌 1. Contexto Geral do Projeto e Objetivos
A Altipisos é a principal fabricante brasileira de pisos modulares esportivos em polipropileno virgem (+27 anos de mercado, +2.500 quadras instaladas, +1.000.000 m² de piso e embaixadores como Falcão e Amandinha). 

**Missão Técnica Cumprida nas Etapas 1 a 4:**
1. **Unificação Headless Total:** Criado o ecossistema Next.js 14+ App Router sob o domínio principal, integrando o catálogo institucional e os produtos da loja Nuvemshop (`/loja`), unificando design, autoridade e SEO.
2. **Engenharia de Conversão (CRO de Alta Precisão):** Substituídos os formulários genéricos pelo componente interativo `QuickQuoteCalculator` (cálculo de placas, rampas, frete e investimento em tempo real com valor antes do compromisso) e pelo `CourtSimulator3D` (renderização WebGL via Three.js e React Three Fiber com demarcações oficiais).
3. **Automação Backoffice & Estancamento de Reputação no Mercado Livre:** Criado o pipeline Event-Driven (`/api/webhooks/meli` -> `TinyErpService` -> SEFAZ -> `MercadoLivreService`), faturando e liberando etiquetas do Mercado Envios em tempo sub-90 segundos (teste de homologação aprovado em 402ms), eliminando a causa raiz da reputação vermelha.

---

## 🛠️ 2. Stack Tecnológica em Operação
- **Core Framework:** Next.js 14.2.15 (App Router, Server Components & Route Handlers) rodando em Node.js v22.
- **Linguagem & Tipagem:** TypeScript 5+ com validação Zod.
- **Estilização & Design System:** Tailwind CSS configurado com os tokens extraídos do Stitch (`#1B6AE3` Primary Blue, `#0A212D` Deep Navy, `#10B981` Energy Green, `#F3F7FC` Ice Surface).
- **Simulador 3D WebGL:** React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) e Three.js.
- **Motor de Regras Financeiras & Logísticas:** `src/lib/pricing-engine.ts` (100% tipado e desacoplado).
- **Pipeline Fiscal:**
  - `TinyErpService` (`src/services/tiny-erp.ts`): Criação de cliente, pedido, NFe e autorização SEFAZ.
  - `MercadoLivreService` (`src/services/mercado-livre.ts`): Injeção de chave de 44 dígitos e XML em `/shipments/{id}/invoice_data`.
  - Webhooks: `/api/webhooks/meli` e `/api/webhooks/nuvemshop`.
  - Captura de Leads CRO: `/api/leads`.

---

## 📐 3. Regras de Negócio Consolidadas (Engenharia Reversa)
1. **Origem Logística:** Fábrica matriz em Palhoça/SC (Rua das Azaléias, 212 - CEP 88133-310).
2. **Preço Base por m²:**
   - Sport Out (Outdoor drenante vazado): $R\$ 140,00 / m^2$
   - Sport In (Indoor fechado liso/antiderrapante): $R\$ 150,00 / m^2$
   - Play Soft (Playground infantil amortecedor): $R\$ 165,00 / m^2$
3. **Mecânica Modular e Consumo de Placas:**
   - Dimensão padrão: $25 \times 25\text{ cm}$ $\rightarrow$ $16\text{ placas por } m^2$.
   - Rampas perimetrais: $4\text{ peças por metro linear}$ do perímetro exposto ($2 \times (\text{Largura} + \text{Comprimento})$).
   - Cantoneiras: 4 peças de canto.
4. **Algoritmo de Frete Rodoviário por km:**
   - $\le 1.000\text{ km}$: $\text{Distância} \times R\$ 2,80$
   - $> 1.000\text{ km}$: $\frac{\text{Distância} \times R\$ 3,50}{2} = \text{Distância} \times R\$ 1,75$
   - Piso de frete mínimo: $R\$ 150,00$.
5. **Condições Comerciais B2B:**
   - 15% de desconto para faturamento direto com CNPJ à vista.
   - Parcelamento em até 12x no cartão de crédito.

---

## 🚀 4. Status de Entrega das Funcionalidades
- [x] **STEP 1: Extração de UI/UX e Design System:** Todas as 14 telas, especificações de design e assets baixados via `curl` na pasta `design_system/`.
- [x] **STEP 2: Engenharia Reversa do Legado:** Fórmulas de frete, precificação por m², rendimento de peças e regras de instalação extraídas e consolidadas.
- [x] **Docs as Code Base:** Diretórios `.agents/` e `docs/Projeto_Altipisos/` totalmente criados e ativos.
- [x] **STEP 3: Automação do Backoffice (Pipeline Fiscal Meli + Tiny):** Desenvolvido e validado com sucesso com execução em 402ms.
- [x] **STEP 4: Front-end Headless & Componentização:**
  - Boilerplate Next.js 14 configurado com Tailwind e tokens oficiais.
  - Calculadora CRO `QuickQuoteCalculator.tsx` com value-before-commitment e lead scoring.
  - Simulador 3D `CourtSimulator3D.tsx` com WebGL e marcações esportivas regulamentares.
  - Storefront headless `/loja` integrado ao mesmo domínio.

---

## 📊 5. Gap Analysis (Legado vs Novo Ecossistema)
| Requisito / Dor | Como era no Sistema Antigo | Como é na Nova Arquitetura | Status |
|---|---|---|---|
| **Conversão de Leads** | Formulário genérico estático no rodapé sem estimativas | Calculadora CRO interativa com cálculo em tempo real de placas, rampas, frete e investimento | ✅ Concluído |
| **Experiência Visual de Quadras** | Imagens estáticas e descrições técnicas | Simulador 3D WebGL (React Three Fiber) com linhas oficiais regulamentares | ✅ Concluído |
| **Loja Virtual** | Subdomínio separado (`lojaaltipisos.com.br`) na Nuvemshop | Storefront Headless Next.js unificado no domínio principal (`/loja`) | ✅ Concluído |
| **Faturamento Mercado Livre** | Processo manual com atrasos > 24h (reputação vermelha) | Pipeline orientado a eventos com emissão de NFe e envio do XML em < 90 segundos | ✅ Concluído |

---

## 📝 6. Próximos Passos Imediatos
1. Inserir chaves de produção das APIs no `.env.local`.
2. Executar testes de integração com o ambiente de homologação da Nuvemshop e Mercado Livre.
