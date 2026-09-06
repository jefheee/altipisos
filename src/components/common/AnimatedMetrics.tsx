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
    label: "De História e Pioneirismo",
    sublabel: "Tradição no mercado brasileiro",
  },
  {
    prefix: "+",
    value: 2500,
    separator: ".",
    label: "Quadras Instaladas",
    sublabel: "Em todo o território nacional",
  },
  {
    prefix: "+",
    value: 2800,
    separator: ".",
    label: "Clientes Atendidos",
    sublabel: "Clubes, escolas e condomínios",
  },
  {
    prefix: "+",
    value: 1000000,
    suffix: " m²",
    separator: ".",
    label: "Pisos Modulares Instalados",
    sublabel: "Polipropileno 100% virgem",
  },
];

export const AnimatedMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0A212D] text-white py-14 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {METRICS.map((metric, index) => (
            <div key={index} className={`space-y-1 ${index > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
                {metric.prefix && <span>{metric.prefix}</span>}
                {isVisible ? (
                  <CountUp
                    start={0}
                    end={metric.value}
                    duration={2.5}
                    separator={metric.separator || ""}
                  />
                ) : (
                  <span>0</span>
                )}
                {metric.suffix && (
                  <span className="text-altipisos-blue text-2xl sm:text-3xl lg:text-4xl ml-0.5">
                    {metric.suffix}
                  </span>
                )}
              </div>
              <div className="text-sm font-semibold text-gray-200 uppercase tracking-wider pt-1">
                {metric.label}
              </div>
              {metric.sublabel && (
                <div className="text-xs text-gray-400 font-normal">
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
