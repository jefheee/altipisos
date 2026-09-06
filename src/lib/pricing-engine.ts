import {
  ProductLine,
  QuoteCalculationInput,
  QuoteCalculationResult,
  SportModality,
  SportPreset,
} from "@/types/pricing";

export const SPORT_PRESETS: Record<SportModality, SportPreset> = {
  futsal: {
    id: "futsal",
    name: "Futsal / Salão",
    defaultWidth: 20,
    defaultLength: 40,
    description: "Medidas oficiais FIFA/CBFS (40x20m = 800m²) ou compacta",
  },
  basketball: {
    id: "basketball",
    name: "Basquete",
    defaultWidth: 15,
    defaultLength: 28,
    description: "Medidas oficiais FIBA (28x15m = 420m²) ou 3x3 (15x11m)",
  },
  volleyball: {
    id: "volleyball",
    name: "Vôlei",
    defaultWidth: 9,
    defaultLength: 18,
    description: "Medidas oficiais FIVB (18x9m = 162m²)",
  },
  pickleball: {
    id: "pickleball",
    name: "Pickleball",
    defaultWidth: 6.1,
    defaultLength: 13.41,
    description: "Quadra oficial de Pickleball (13.41x6.10m = 81.8m²)",
  },
  tennis: {
    id: "tennis",
    name: "Tênis",
    defaultWidth: 10.97,
    defaultLength: 23.77,
    description: "Quadra oficial ITF (23.77x10.97m = 260.8m²)",
  },
  multisport: {
    id: "multisport",
    name: "Poliesportiva Condominial",
    defaultWidth: 14,
    defaultLength: 24,
    description: "Tamanho versátil para condomínios e escolas (24x14m = 336m²)",
  },
};

export const PRODUCT_LINE_DETAILS: Record<
  ProductLine,
  { name: string; basePricePerM2: number; tileWeightKg: number; thickness: string; surface: string }
> = {
  "sport-out": {
    name: "Sport Out (Outdoor Drenante)",
    basePricePerM2: 140.0, // Preço extraído do repositório legado
    tileWeightKg: 0.245,
    thickness: "15mm",
    surface: "Grelha perfurada drenante com escoamento rápido",
  },
  "sport-in": {
    name: "Sport In (Indoor Fechado)",
    basePricePerM2: 150.0, // Preço extraído do repositório legado
    tileWeightKg: 0.27,
    thickness: "12mm",
    surface: "Superfície sólida fosca texturizada antiderrapante",
  },
  "play-soft": {
    name: "Play Soft (Playground & Recreação)",
    basePricePerM2: 165.0,
    tileWeightKg: 0.29,
    thickness: "16mm",
    surface: "Amortecimento especial anti-impacto infantil",
  },
};

export const ALTIPISOS_COLORS = [
  { name: "Azul Royal", hex: "#1B6AE3" },
  { name: "Azul Marinho", hex: "#0A212D" },
  { name: "Verde Bandeira", hex: "#006444" },
  { name: "Verde Claro", hex: "#10B981" },
  { name: "Laranja", hex: "#F97316" },
  { name: "Vermelho", hex: "#DC2626" },
  { name: "Amarelo Ouro", hex: "#EAB308" },
  { name: "Grafite", hex: "#334155" },
  { name: "Cinza Claro", hex: "#94A3B8" },
  { name: "Branco", hex: "#FFFFFF" },
  { name: "Preto", hex: "#18181B" },
  { name: "Roxo", hex: "#7C3AED" },
];

/**
 * Calcula o frete rodoviário dinâmico utilizando as regras do repositório legado
 * Base: Fábrica em Palhoça/SC
 */
export function calculateFreight(distanceKm: number = 200): number {
  if (distanceKm <= 0) return 0;

  let frete = 0;
  if (distanceKm <= 1000) {
    frete = distanceKm * 2.8; // R$ 2,80 por km até 1000km
  } else {
    frete = (distanceKm * 3.5) / 2; // R$ 1,75 por km acima de 1000km
  }

  // Trava de frete mínimo operacional
  return Math.max(frete, 150.0);
}

/**
 * Motor de Cálculo Principal da Altipisos
 */
export function calculateQuote(input: QuoteCalculationInput): QuoteCalculationResult {
  const width = Math.max(input.widthMeters, 1);
  const length = Math.max(input.lengthMeters, 1);
  const totalAreaM2 = Math.round(width * length * 100) / 100;

  // 1 m² = 16 placas de 25x25cm (0.25 x 0.25m = 0.0625m²)
  const totalTiles = Math.ceil(totalAreaM2 * 16);

  // Perímetro linear para rampas de borda: 2 * (L + C)
  const perimeterMeters = Math.round(2 * (width + length) * 100) / 100;
  // Cada rampa tem 25cm de largura -> 4 rampas por metro linear
  const rampPieces = Math.ceil(perimeterMeters * 4);
  const cornerPieces = 4;

  const productInfo = PRODUCT_LINE_DETAILS[input.productLine];
  const estimatedWeightKg = Math.round(totalTiles * productInfo.tileWeightKg + rampPieces * 0.1);

  // Preço base do piso
  const baseMaterialCost = totalAreaM2 * productInfo.basePricePerM2;

  // Custo de instalação (R$ 28/m² com equipe técnica Altipisos em até 48h)
  const installationCost =
    input.serviceType === "supply-and-install" ? totalAreaM2 * 28.0 : 0.0;

  // Frete
  const distance = input.distanceKm ?? 180; // Distância padrão estimada se não informada
  const freightCost = calculateFreight(distance);

  const subtotal = baseMaterialCost + installationCost;
  const totalCost = subtotal + freightCost;
  const pricePerM2 = totalAreaM2 > 0 ? totalCost / totalAreaM2 : 0;

  // Condição especial B2B direto de fábrica (15% OFF à vista para faturamento CNPJ)
  const b2bDiscountedTotal = Math.round(totalCost * 0.85 * 100) / 100;

  // Parcelamento em até 12x no cartão
  const installment12x = Math.round((totalCost * 1.1) / 12 * 100) / 100;

  return {
    totalAreaM2,
    totalTiles,
    perimeterMeters,
    rampPieces,
    cornerPieces,
    estimatedWeightKg,
    baseMaterialCost,
    installationCost,
    freightCost,
    subtotal,
    totalCost,
    pricePerM2,
    installment12x,
    b2bDiscountedTotal,
  };
}
