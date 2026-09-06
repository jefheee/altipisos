import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Phone, Mail, MapPin, Shield, Zap, ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Altipisos | Pisos Modulares Esportivos de Alta Performance",
  description:
    "Líder nacional em pisos modulares esportivos em polipropileno para quadras internas e externas. 27 anos de história, chancelas CBB/CBFS e embaixadores Falcão e Amandinha.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen flex flex-col bg-[#FBF9F8]">
        {/* Top Header Bar */}
        <div className="bg-altipisos-navy text-gray-300 text-xs py-2 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-altipisos-blue" />
                Fábrica: Palhoça - SC
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-altipisos-blue" />
                contato@altipisos.com.br
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/554861365993"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-altipisos-cyan hover:underline font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp: (48) 6136-5993
              </a>
              <span className="inline-flex items-center gap-1 text-[11px] bg-altipisos-green-dark text-altipisos-green-light px-2 py-0.5 rounded-full font-semibold">
                <Zap className="w-3 h-3" />
                Energia 100% Verde
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-altipisos-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-altipisos-blue flex items-center justify-center font-heading font-black text-white text-2xl shadow-md">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-wider text-altipisos-navy leading-none">
                  ALTIPISOS
                </span>
                <span className="text-[10px] font-semibold text-altipisos-blue uppercase tracking-widest mt-0.5">
                  Pisos Esportivos Modulares
                </span>
              </div>
            </Link>

            {/* Nav Menu */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-altipisos-navy">
              <Link href="#produtos" className="hover:text-altipisos-blue transition-colors">
                Produtos
              </Link>
              <Link href="#simulador3d" className="hover:text-altipisos-blue transition-colors">
                Simulador 3D
              </Link>
              <Link href="#calculadora" className="hover:text-altipisos-blue transition-colors">
                Calculadora B2B
              </Link>
              <Link href="#diferenciais" className="hover:text-altipisos-blue transition-colors">
                Diferenciais
              </Link>
              <Link href="#embaixadores" className="hover:text-altipisos-blue transition-colors">
                Embaixadores
              </Link>
              <Link
                href="/loja"
                className="flex items-center gap-1.5 text-altipisos-blue font-bold hover:opacity-80"
              >
                <ShoppingCart className="w-4 h-4" />
                Loja Nuvemshop
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <a
                href="#calculadora"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                Simular Orçamento
              </a>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-altipisos-navy text-white pt-16 pb-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-altipisos-blue flex items-center justify-center font-heading font-bold text-white text-lg">
                    A
                  </div>
                  <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                    ALTIPISOS
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Líder brasileira na fabricação de pisos modulares esportivos em polipropileno virgem.
                  Soluções para quadras de futebol, basquete, tênis, vôlei e recreação.
                </p>
                <div className="flex items-center gap-2 text-xs text-altipisos-green-light">
                  <Shield className="w-4 h-4 text-altipisos-green" />
                  <span>Garantia de Fábrica de 10 Anos</span>
                </div>
              </div>

              <div>
                <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                  Linhas de Produtos
                </h5>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li>Sport Out (Outdoor Drenante)</li>
                  <li>Sport In (Indoor Fechado)</li>
                  <li>Play Soft (Playground & Recreação)</li>
                  <li>Toy Floor (Infantil)</li>
                  <li>Acessórios, Rampas e Demarcações</li>
                </ul>
              </div>

              <div>
                <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                  Chancelas Oficiais
                </h5>
                <p className="text-xs text-gray-400 mb-3">
                  Pisos homologados e chancelados pelas principais federações e entidades esportivas do Brasil:
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-bold text-altipisos-blue-light">
                  <span className="bg-white/10 px-2.5 py-1 rounded">CBB (Basquete)</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded">CBFS (Futsal)</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded">LNF</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded">FPB</span>
                </div>
              </div>

              <div>
                <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                  Contato da Fábrica
                </h5>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li>Rua das Azaléias, 212 - Jardim Eldorado</li>
                  <li>Palhoça - SC, CEP 88133-310</li>
                  <li>WhatsApp Comercial: (48) 6136-5993</li>
                  <li>E-mail: contato@altipisos.com.br</li>
                  <li>CNPJ: 05.814.000/0001-88</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
              <span>© {new Date().getFullYear()} Altipisos Pisos Esportivos. Todos os direitos reservados.</span>
              <span>Arquitetura Headless Unificada • Padrão Docs as Code</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
