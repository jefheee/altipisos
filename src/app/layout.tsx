import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Providers } from "@/components/common/Providers";
import { ShieldCheck, Phone, Mail, MapPin, Award } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Altipisos | Pisos Modulares Esportivos de Alta Performance",
  description:
    "Líder brasileira em pisos modulares esportivos em polipropileno 100% virgem para quadras internas e externas. 27 anos de história, chancelas CBB/CBFS e garantia de fábrica de 10 anos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen flex flex-col bg-[#FBF9F8] text-[#1B1C1C]">
        <Providers>
          {/* Header Oficial Altipisos com i18n */}
          <Header />

          {/* Conteúdo Principal */}
          <main className="flex-grow">{children}</main>

          {/* Rodapé B2B Flat & Corporativo */}
          <footer className="bg-[#0A212D] text-white pt-16 pb-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
                <div className="space-y-4">
                  <div className="relative w-40 h-10">
                    <Image
                      src="/images/logo.png"
                      alt="Altipisos Pisos Esportivos"
                      fill
                      className="object-contain object-left brightness-0 invert"
                    />
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Mais de 27 anos transformando ambientes com pisos e equipamentos esportivos que unem qualidade, segurança, inovação e funcionalidade.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-altipisos-green">
                    <ShieldCheck className="w-4 h-4 text-altipisos-green" />
                    <span>Garantia de Fábrica de 10 Anos</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                    Pisos Modulares
                  </h5>
                  <ul className="space-y-2.5 text-xs text-gray-300">
                    <li>Sport In (Indoor Fechado 250×250mm)</li>
                    <li>Sport Out 25 (Outdoor Drenante 250×250mm)</li>
                    <li>Sport Out 30 (Outdoor Drenante 300×300mm)</li>
                    <li>Play Soft (Playground & NBR 16071)</li>
                    <li>Toy Floor (Jogos Educativos Infantis)</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                    Chancelas & Homologações
                  </h5>
                  <p className="text-xs text-gray-300 mb-3">
                    Pisos e equipamentos testados e homologados pelas confederações oficiais:
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold text-blue-200">
                    <span className="bg-white/10 px-2.5 py-1 rounded flex items-center gap-1">
                      <Award className="w-3 h-3 text-altipisos-blue" />
                      CBB (Basquete)
                    </span>
                    <span className="bg-white/10 px-2.5 py-1 rounded flex items-center gap-1">
                      <Award className="w-3 h-3 text-altipisos-blue" />
                      CBFS (Futsal)
                    </span>
                    <span className="bg-white/10 px-2.5 py-1 rounded flex items-center gap-1">
                      <Award className="w-3 h-3 text-altipisos-blue" />
                      LNF (Liga Nacional)
                    </span>
                    <span className="bg-white/10 px-2.5 py-1 rounded flex items-center gap-1">
                      <Award className="w-3 h-3 text-altipisos-blue" />
                      FPB (São Paulo)
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                    Fábrica & Central Comercial
                  </h5>
                  <ul className="space-y-2 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-altipisos-blue shrink-0 mt-0.5" />
                      <span>Rua Azaléia 212, Jardim Eldorado, Palhoça/SC - CEP 88133-310</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-altipisos-green shrink-0" />
                      <span>WhatsApp: +55 (48) 6136-5993</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-400 text-[11px]">
                      <span>SC: +55 (48) 3346-3454 | SP: +55 (11) 5461-1019</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-altipisos-blue shrink-0" />
                      <span>altipisos@altipisos.com.br</span>
                    </li>
                    <li className="text-gray-400 text-[11px] pt-1">
                      CNPJ: 13.627.549/0001-52
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
                <span>Altipisos - 2026 | Todos os direitos reservados. Altipisos Revestimentos e Quadras Esportivas LTDA.</span>
                <span>Fabricado com Energia 100% Verde Solar</span>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
