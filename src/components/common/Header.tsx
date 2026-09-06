"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export const Header: React.FC = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOPBAR ORIGINAL */}
      <div className="bg-[#0A212D] text-gray-300 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {/* Contato à Esquerda */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:a.tipisos@altipisos.com.br"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-altipisos-blue" />
              <span>a.tipisos@altipisos.com.br</span>
            </a>
            <a
              href="https://wa.me/554861365993"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-green-400" />
              <span>(48) 6136-5993</span>
            </a>
          </div>

          {/* Redes Sociais à Direita */}
          <div className="hidden sm:flex items-center gap-4 text-gray-400 text-xs">
            <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
            <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
            <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            <span className="hover:text-white transition-colors cursor-pointer">YouTube</span>
            <span className="hover:text-white transition-colors cursor-pointer">TikTok</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Oficial Altipisos */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-40 h-10">
              <Image
                src="/images/logo.png"
                alt="Logo Altipisos"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Links Centrais de Navegação (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-altipisos-blue transition-colors">
              Home
            </Link>
            <Link href="/#quem-somos" className="hover:text-altipisos-blue transition-colors">
              Quem Somos
            </Link>

            {/* Dropdown de Produtos */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-altipisos-blue transition-colors py-2"
              >
                <span>Produtos</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium"
                  >
                    Sport In (Indoor)
                  </Link>
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium"
                  >
                    Sport Out (Outdoor)
                  </Link>
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium"
                  >
                    Play Soft (Infantil)
                  </Link>
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium"
                  >
                    Toy Floor (Recreação)
                  </Link>
                </div>
              )}
            </div>

            <Link href="/#conteudos" className="hover:text-altipisos-blue transition-colors">
              Conteúdos
            </Link>
            <Link href="/#blog" className="hover:text-altipisos-blue transition-colors">
              Blog
            </Link>
            <Link href="/#contato" className="hover:text-altipisos-blue transition-colors">
              Contato
            </Link>
            <Link
              href="/loja"
              className="hover:text-altipisos-blue transition-colors font-semibold text-altipisos-blue"
            >
              Loja
            </Link>
          </nav>

          {/* Lado Direito: CTA "SOLICITE ORÇAMENTO" e Seletor de Idioma */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="/#calculadora"
              className="px-5 py-2.5 rounded-lg bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Solicite Orçamento
            </a>

            {/* Seletor de Idioma */}
            <div className="flex items-center gap-1 pl-2 border-l border-gray-200 text-xs font-medium text-gray-700 cursor-pointer">
              <span className="text-base leading-none">🇧🇷</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>

          {/* Botão Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              Home
            </Link>
            <Link
              href="/#quem-somos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              Quem Somos
            </Link>
            <div className="pl-2 border-l-2 border-altipisos-blue space-y-1.5 py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Produtos
              </span>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-1"
              >
                Sport In (Indoor)
              </Link>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-1"
              >
                Sport Out (Outdoor)
              </Link>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-1"
              >
                Play Soft (Infantil)
              </Link>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-1"
              >
                Toy Floor (Recreação)
              </Link>
            </div>
            <Link
              href="/#conteudos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              Conteúdos
            </Link>
            <Link
              href="/#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              Blog
            </Link>
            <Link
              href="/#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              Contato
            </Link>
            <Link
              href="/loja"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-altipisos-blue py-1.5"
            >
              Loja Virtual
            </Link>
            <div className="pt-2">
              <a
                href="/#calculadora"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 bg-altipisos-blue text-white text-xs font-bold uppercase rounded-lg"
              >
                Solicite Orçamento
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
