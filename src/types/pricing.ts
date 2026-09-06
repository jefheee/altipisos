export type SportModality =
  | "futsal"
  | "basketball"
  | "volleyball"
  | "pickleball"
  | "tennis"
  | "multisport";

export type ProductLine = "sport-out" | "sport-in" | "play-soft";

export type ServiceType = "supply-only" | "supply-and-install";

export interface SportPreset {
  id: SportModality;
  name: string;
  defaultWidth: number;
  defaultLength: number;
  description: string;
}

export interface QuoteCalculationInput {
  widthMeters: number;
  lengthMeters: number;
  productLine: ProductLine;
  serviceType: ServiceType;
  distanceKm?: number;
  zipCode?: string;
}

export interface QuoteCalculationResult {
  totalAreaM2: number;
  totalTiles: number; // 16 placas / m² (25x25cm)
  perimeterMeters: number;
  rampPieces: number; // 4 rampas por metro linear
  cornerPieces: number; // 4 cantos
  estimatedWeightKg: number;
  baseMaterialCost: number;
  installationCost: number;
  freightCost: number;
  subtotal: number;
  totalCost: number;
  pricePerM2: number;
  installment12x: number;
  b2bDiscountedTotal: number; // 15% OFF direto de fábrica faturado
}

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  whatsapp: string;
  companyOrClub?: string;
  cityState?: string;
  zipCode?: string;
  quote: QuoteCalculationResult;
  input: QuoteCalculationInput;
  sport: SportModality;
  selectedColors?: {
    innerCourt: string;
    outerArea: string;
    lines: string;
  };
}
