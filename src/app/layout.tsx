import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Shield, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

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
      <body className="antialiased min-h-screen flex flex-col bg-[#FBF9F8] text-[#1B1C1C]">
        {/* Header Oficial Altipisos */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-grow">{children}</main>

        {/* Rodapé B2B Flat & Limpo */}
        <footer className="bg-[#0A212D] text-white pt-16 pb-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
              <div className="space-y-4">
                <div className="relative w-36 h-9">
                  <Image
                    src="/images/logo.png"
                    alt="Altipisos Pisos Esportivos"
                    fill
                    className="object-contain object-left brightness-0 invert"
                  />
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Líder brasileira na fabricação de pisos modulares esportivos em polipropileno virgem. Soluções para quadras de futebol, basquete, tênis, vôlei e recreação.
                </p>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Garantia de Fábrica de 10 Anos</span>
                </div>
              </div>

              <div>
                <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                  Linhas de Produtos
                </h5>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li>Sport In (Indoor Fechado)</li>
                  <li>Sport Out (Outdoor Drenante)</li>
                  <li>Play Soft (Playground & Recreação)</li>
                  <li>Toy Floor (Infantil)</li>
                  <li>Acessórios, Rampas e Demarcações</li>
                </ul>
              </div>

              <div>
                <h5 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white">
                  Chancelas Esportivas
                </h5>
                <p className="text-xs text-gray-300 mb-3">
                  Pisos homologados pelas principais confederações esportivas do país:
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-bold text-blue-200">
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
                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-altipisos-blue shrink-0 mt-0.5" />
                    <span>Rua das Azaléias, 212 - Palhoça/SC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>WhatsApp: (48) 6136-5993</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-altipisos-blue shrink-0" />
                    <span>a.tipisos@altipisos.com.br</span>
                  </li>
                  <li className="text-gray-400 text-[11px]">
                    CNPJ: 05.814.000/0001-88
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
              <span>© {new Date().getFullYear()} Altipisos Pisos Esportivos. Todos os direitos reservados.</span>
              <span>Fabricação Nacional com Energia 100% Limpa</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
