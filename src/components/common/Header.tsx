"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n, Locale } from "@/lib/i18n";
import {
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
  Globe,
  Check,
  ShoppingBag,
} from "lucide-react";

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useI18n();
  const [productsOpen, setProductsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const LANGUAGES: Array<{ code: Locale; name: string; short: string }> = [
    { code: "pt", name: "Português (BR)", short: "PT" },
    { code: "en", name: "English (US)", short: "EN" },
    { code: "es", name: "Español", short: "ES" },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  const handleSelectLang = (code: Locale) => {
    setLocale(code);
    setLangOpen(false);
  };

  return (
    <>
      {/* 1. TOPBAR CORPORATIVA */}
      <div className="bg-[#0A212D] text-gray-300 text-xs py-2.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {/* Contato Comercial Matriz Palhoça */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:altipisos@altipisos.com.br"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-altipisos-blue" />
              <span>altipisos@altipisos.com.br</span>
            </a>
            <a
              href="https://wa.me/554861365993"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-altipisos-green" />
              <span>(48) 6136-5993</span>
            </a>
          </div>

          {/* Redes Sociais Institucionais */}
          <div className="hidden sm:flex items-center gap-5 text-gray-400 text-xs">
            <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
            <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
            <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            <span className="hover:text-white transition-colors cursor-pointer">YouTube</span>
            <span className="hover:text-white transition-colors cursor-pointer">TikTok</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Oficial Altipisos */}
          <Link href="/" className="flex items-center">
            <div className="relative w-44 h-11">
              <Image
                src="/images/logo.png"
                alt="Logo Altipisos Pisos Modulares"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Links Centrais de Navegação (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-altipisos-blue transition-colors">
              {t("nav.home", "Home")}
            </Link>
            <Link href="/#quem-somos" className="hover:text-altipisos-blue transition-colors">
              {t("nav.about", "Quem Somos")}
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
                <span>{t("nav.products", "Produtos")}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-md border border-gray-200 py-2.5 z-50">
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium transition-colors"
                  >
                    {t("nav.sportIn", "Sport In (Indoor)")}
                  </Link>
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium transition-colors"
                  >
                    {t("nav.sportOut", "Sport Out (Outdoor)")}
                  </Link>
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium transition-colors"
                  >
                    {t("nav.playSoft", "Play Soft (Infantil)")}
                  </Link>
                  <Link
                    href="/#produtos"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-altipisos-blue font-medium transition-colors"
                  >
                    {t("nav.toyFloor", "Toy Floor (Recreação)")}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/#conteudos" className="hover:text-altipisos-blue transition-colors">
              {t("nav.content", "Conteúdos")}
            </Link>
            <Link href="/#blog" className="hover:text-altipisos-blue transition-colors">
              {t("nav.blog", "Blog")}
            </Link>
            <Link href="/#contato" className="hover:text-altipisos-blue transition-colors">
              {t("nav.contact", "Contato")}
            </Link>
            <Link
              href="/loja"
              className="hover:text-altipisos-blue transition-colors font-semibold text-altipisos-blue flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t("nav.store", "Loja")}</span>
            </Link>
          </nav>

          {/* Lado Direito: CTA "SOLICITE ORÇAMENTO" e Seletor de Idioma Profissional */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="/#calculadora"
              className="px-6 py-2.5 rounded-lg bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              {t("nav.requestQuote", "Solicite Orçamento")}
            </a>

            {/* Seletor de Idioma com Ícone Lucide e Dropdown Semântico */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 text-xs font-semibold text-gray-700 bg-gray-50 transition-colors"
                title="Alterar Idioma"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{currentLang.short}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-md border border-gray-200 py-1.5 z-50">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleSelectLang(l.code)}
                      className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-gray-50 transition-colors font-medium text-gray-700"
                    >
                      <span>{l.name}</span>
                      {locale === l.code && <Check className="w-3.5 h-3.5 text-altipisos-blue" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botão Menu Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg border border-gray-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-5 py-5 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1"
            >
              {t("nav.home", "Home")}
            </Link>
            <Link
              href="/#quem-somos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1"
            >
              {t("nav.about", "Quem Somos")}
            </Link>
            <div className="pl-3 border-l-2 border-altipisos-blue space-y-2 py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                {t("nav.products", "Produtos")}
              </span>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-0.5"
              >
                {t("nav.sportIn", "Sport In (Indoor)")}
              </Link>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-0.5"
              >
                {t("nav.sportOut", "Sport Out (Outdoor)")}
              </Link>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-0.5"
              >
                {t("nav.playSoft", "Play Soft (Infantil)")}
              </Link>
              <Link
                href="/#produtos"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs text-gray-600 py-0.5"
              >
                {t("nav.toyFloor", "Toy Floor (Recreação)")}
              </Link>
            </div>
            <Link
              href="/#conteudos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1"
            >
              {t("nav.content", "Conteúdos")}
            </Link>
            <Link
              href="/#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1"
            >
              {t("nav.blog", "Blog")}
            </Link>
            <Link
              href="/#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1"
            >
              {t("nav.contact", "Contato")}
            </Link>
            <Link
              href="/loja"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-altipisos-blue py-1"
            >
              {t("nav.store", "Loja")}
            </Link>

            {/* Seletor de Idioma Mobile */}
            <div className="pt-2 flex items-center gap-2 border-t border-gray-100">
              <Globe className="w-4 h-4 text-gray-400" />
              <div className="flex gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleSelectLang(l.code)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      locale === l.code
                        ? "bg-altipisos-blue text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {l.short}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/#calculadora"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 bg-altipisos-blue text-white text-xs font-bold uppercase rounded-xl shadow-sm"
              >
                {t("nav.requestQuote", "Solicite Orçamento")}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
