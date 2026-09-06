"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Filter,
  Check,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  sku: string;
  rating: number;
  inStock: boolean;
  unit: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: "piso-sport-out",
    name: "Piso Modular Sport Out - Placa 25x25cm",
    category: "Pisos Modulares",
    price: 140.0,
    sku: "ALTI-SPO-25",
    rating: 5,
    inStock: true,
    unit: "m² (16 placas)",
    description: "Vazado e drenante com aditivo anti-UV para quadras externas.",
  },
  {
    id: "piso-sport-in",
    name: "Piso Modular Sport In - Placa 25x25cm",
    category: "Pisos Modulares",
    price: 150.0,
    sku: "ALTI-SPI-25",
    rating: 5,
    inStock: true,
    unit: "m² (16 placas)",
    description: "Superfície sólida antiderrapante para ginásios e quadras internas.",
  },
  {
    id: "piso-play-soft",
    name: "Piso Modular Play Soft - Placa 25x25cm",
    category: "Pisos Modulares",
    price: 165.0,
    sku: "ALTI-PLS-25",
    rating: 5,
    inStock: true,
    unit: "m² (16 placas)",
    description: "Amortecimento reforçado anti-impacto para recreação e playgrounds.",
  },
  {
    id: "rampa-acabamento",
    name: "Rampa de Acabamento Perimetral Chanfrada 25cm",
    category: "Acessórios",
    price: 9.5,
    sku: "ALTI-RAMP-25",
    rating: 5,
    inStock: true,
    unit: "unidade (25cm)",
    description: "Acessibilidade e acabamento de borda sem desnível.",
  },
  {
    id: "cantoneira-acabamento",
    name: "Cantoneira de Canto para Piso Modular",
    category: "Acessórios",
    price: 12.0,
    sku: "ALTI-CANT",
    rating: 5,
    inStock: true,
    unit: "unidade",
    description: "Encaixe de canto perfeito de 90 graus para travar o perímetro.",
  },
  {
    id: "kit-demarcacao-pu",
    name: "Kit Tinta Poliuretano PU para Demarcação de Quadra",
    category: "Demarcação",
    price: 340.0,
    originalPrice: 390.0,
    sku: "ALTI-TINTA-PU",
    rating: 5,
    inStock: true,
    unit: "galão 3.6L",
    description: "Alta aderência sobre polipropileno. Branco, amarelo e azul.",
  },
  {
    id: "par-traves-futsal",
    name: "Par de Traves de Futsal Oficial 3x2m com Redes",
    category: "Equipamentos",
    price: 2450.0,
    sku: "ALTI-TRAVE-FUT",
    rating: 5,
    inStock: true,
    unit: "par",
    description: "Tubo de aço galvanizado 3 polegadas com pintura eletrostática.",
  },
  {
    id: "tabela-basquete-acrilico",
    name: "Tabela de Basquete em Acrílico Oficial 10mm com Aro",
    category: "Equipamentos",
    price: 3890.0,
    sku: "ALTI-TAB-BASQ",
    rating: 5,
    inStock: true,
    unit: "unidade",
    description: "Tabela de alta resistência padrão CBB/FIBA com aro retrátil.",
  },
];

const CATEGORIES = ["Todos", "Pisos Modulares", "Acessórios", "Demarcação", "Equipamentos"];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const filtered =
    activeCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setLastAdded(product.name);
    setTimeout(() => setLastAdded(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header da Loja */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-altipisos-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-altipisos-blue-light text-altipisos-blue text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            Loja Nuvemshop Integrada (Headless)
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-altipisos-navy">
            Equipamentos & Produtos Altipisos
          </h1>
          <p className="text-sm text-altipisos-navy-muted">
            Compre placas avulsas, kits de reposição, tintas de demarcação e equipamentos esportivos com despacho imediato.
          </p>
        </div>

        {/* Carrinho Flutuante */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-altipisos-border rounded-xl shadow-sm text-sm font-semibold text-altipisos-navy">
            <ShoppingCart className="w-5 h-5 text-altipisos-blue" />
            <span>Carrinho:</span>
            <span className="w-6 h-6 rounded-full bg-altipisos-blue text-white text-xs flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </div>
        </div>
      </div>

      {lastAdded && (
        <div className="bg-altipisos-green-light border border-altipisos-green/40 p-3.5 rounded-xl text-altipisos-green-dark text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <Check className="w-4 h-4 text-altipisos-green" />
          <span>&ldquo;{lastAdded}&rdquo; adicionado ao seu carrinho da Nuvemshop!</span>
        </div>
      )}

      {/* Categorias */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-gray-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filtrar:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-altipisos-blue text-white shadow-sm"
                : "bg-white border border-altipisos-border text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-altipisos-border p-5 shadow-tile hover:shadow-tile-hover transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-40 rounded-xl bg-altipisos-ice flex items-center justify-center p-4 text-center border border-gray-100">
                <span className="font-heading font-bold text-altipisos-navy text-sm">
                  {prod.name}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-altipisos-blue tracking-wider">
                  {prod.category}
                </span>
                <h3 className="font-heading font-bold text-sm text-altipisos-navy line-clamp-2 mt-0.5">
                  {prod.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  {prod.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Preço de Tabela</span>
                  <div className="text-lg font-bold font-heading text-altipisos-navy">
                    R$ {prod.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  /{prod.unit}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(prod)}
                className="w-full py-2.5 px-3 rounded-xl bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Banner de Condições Corporativas B2B */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-altipisos-navy to-altipisos-blue text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-altipisos-cyan uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Faturamento Faturado via CNPJ
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            Vai reformar ou construir uma quadra completa?
          </h2>
          <p className="text-xs md:text-sm text-gray-200 max-w-xl">
            Para áreas acima de 100m², utilize a nossa Calculadora Técnica B2B para obter até 15% de desconto de fábrica e projeto 3D em escala personalizado.
          </p>
        </div>

        <Link
          href="/#calculadora"
          className="px-6 py-3.5 bg-white text-altipisos-navy hover:bg-gray-100 rounded-xl text-xs font-heading font-bold uppercase tracking-wider shadow-lg shrink-0 flex items-center gap-2 transition-all"
        >
          <span>Ir para Calculadora B2B</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
