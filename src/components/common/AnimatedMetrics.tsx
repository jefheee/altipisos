"use client";

import React, { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";

interface MetricItem {
  prefix?: string;
  value: number;
  suffix?: string;
  separator?: string;
  label: string;
  sublabel?: string;
}

const METRICS: MetricItem[] = [
  {
    value: 27,
    suffix: " Anos",
    label: "De Experiência",
    sublabel: "Pioneirismo fabril no Brasil",
  },
  {
    prefix: "+",
    value: 2500,
    separator: ".",
    label: "Clientes Atendidos",
    sublabel: "Clubes, escolas e condomínios",
  },
  {
    prefix: "+",
    value: 2800,
    separator: ".",
    label: "Projetos Realizados",
    sublabel: "Quadras entregues em todo o país",
  },
  {
    prefix: "+",
    value: 1000000,
    suffix: " m²",
    separator: ".",
    label: "Instalados",
    sublabel: "Polipropileno 100% virgem",
  },
];

export const AnimatedMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // IntersectionObserver com trigger estritamente único
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect(); // Desconecta imediatamente para impedir flicker em scroll rápido
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px", // Margem de segurança para disparar de forma previsível
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0A212D] text-white py-14 border-y border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {METRICS.map((metric, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center ${
                index > 0 ? "pt-6 md:pt-0 md:pl-8" : ""
              }`}
            >
              {/* Contêiner com largura mínima fixa e tabular-nums para eliminar Layout Shift */}
              <div className="h-12 sm:h-14 flex items-center justify-center min-w-[160px] sm:min-w-[200px]">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight tabular-nums inline-flex items-baseline">
                  {metric.prefix && (
                    <span className="mr-0.5 text-altipisos-blue select-none">
                      {metric.prefix}
                    </span>
                  )}
                  {hasTriggered ? (
                    <CountUp
                      start={0}
                      end={metric.value}
                      duration={2.2}
                      separator={metric.separator || ""}
                      useEasing={true}
                    />
                  ) : (
                    <span>0</span>
                  )}
                  {metric.suffix && (
                    <span className="text-altipisos-blue text-2xl sm:text-3xl lg:text-4xl ml-1 font-bold">
                      {metric.suffix}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm font-semibold text-gray-200 uppercase tracking-wider pt-2">
                {metric.label}
              </div>

              {metric.sublabel && (
                <div className="text-xs text-gray-400 font-normal mt-0.5">
                  {metric.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
