"use client";

import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Text } from "@react-three/drei";
import * as THREE from "three";
import { SportModality } from "@/types/pricing";
import { ALTIPISOS_COLORS, SPORT_PRESETS } from "@/lib/pricing-engine";
import { Eye, Palette, Maximize2, Camera } from "lucide-react";

interface CourtSimulator3DProps {
  width?: number;
  length?: number;
  sport?: SportModality;
}

// Sub-componente da Quadra 3D dentro do Canvas
function ModularCourtScene({
  width,
  length,
  sport,
  innerColor,
  outerColor,
  lineColor,
}: {
  width: number;
  length: number;
  sport: SportModality;
  innerColor: string;
  outerColor: string;
  lineColor: string;
}) {
  const apronMargin = 2.0; // Margem de escape da quadra
  const totalLength = length + apronMargin * 2;
  const totalWidth = width + apronMargin * 2;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Área de Escape / Borda Perimetral (Piso Externo) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[totalWidth, totalLength]} />
        <meshStandardMaterial color={outerColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* 2. Área Interna de Jogo (Piso Modular Principal) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={innerColor} roughness={0.6} metalness={0.15} />
      </mesh>

      {/* 3. Textura de Grade Modular 25x25cm (Visual das placas de polipropileno) */}
      <Grid
        position={[0, 0.002, 0]}
        args={[totalWidth, totalLength]}
        cellSize={0.25}
        cellThickness={0.5}
        cellColor="#000000"
        sectionSize={1.0}
        sectionThickness={1.0}
        sectionColor="#ffffff"
        fadeDistance={40}
        fadeStrength={1.5}
      />

      {/* 4. Linhas Demarcatórias Esportivas Paramétricas */}
      {/* Linha Perimetral da Área de Jogo */}
      <lineSegments position={[0, 0.005, 0]}>
        <edgesGeometry
          args={[new THREE.BoxGeometry(width, 0.01, length)]}
        />
        <lineBasicMaterial color={lineColor} linewidth={3} />
      </lineSegments>

      {/* Linha Central */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, 0.08]} />
        <meshBasicMaterial color={lineColor} />
      </mesh>

      {/* Círculo Central */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.75, 1.83, 48]} />
        <meshBasicMaterial color={lineColor} />
      </mesh>

      {/* Marcações Específicas por Modalidade */}
      {sport === "futsal" && (
        <>
          {/* Áreas Penais de Futsal em Ambas as Cabeceiras */}
          <mesh position={[0, 0.004, length / 2 - 3]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.95, 4.05, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
          <mesh position={[0, 0.004, -length / 2 + 3]} rotation={[-Math.PI / 2, 0, Math.PI]}>
            <ringGeometry args={[3.95, 4.05, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        </>
      )}

      {sport === "basketball" && (
        <>
          {/* Linhas de 3 Pontos do Basquete */}
          <mesh position={[0, 0.004, length / 2 - 1.575]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[6.68, 6.78, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
          <mesh position={[0, 0.004, -length / 2 + 1.575]} rotation={[-Math.PI / 2, 0, Math.PI]}>
            <ringGeometry args={[6.68, 6.78, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        </>
      )}

      {sport === "volleyball" && (
        <>
          {/* Linhas de 3m de Ataque do Vôlei */}
          <mesh position={[0, 0.004, 3]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, 0.06]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
          <mesh position={[0, 0.004, -3]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, 0.06]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        </>
      )}

      {sport === "pickleball" && (
        <>
          {/* Linhas da Cozinha / Non-Volley Zone (2.13m de cada lado da rede) */}
          <mesh position={[0, 0.004, 2.13]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, 0.05]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
          <mesh position={[0, 0.004, -2.13]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, 0.05]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        </>
      )}
    </group>
  );
}

export const CourtSimulator3D: React.FC<CourtSimulator3DProps> = ({
  width = 15,
  length = 28,
  sport = "futsal",
}) => {
  const [selectedInnerColor, setSelectedInnerColor] = useState("#1B6AE3"); // Azul Royal
  const [selectedOuterColor, setSelectedOuterColor] = useState("#006444"); // Verde Bandeira
  const [selectedLineColor, setSelectedLineColor] = useState("#FFFFFF"); // Branco
  const [activeSport, setActiveSport] = useState<SportModality>(sport);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleExportSnapshot = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `quadra-altipisos-${activeSport}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-tile border border-altipisos-border overflow-hidden">
      {/* Barra de Ferramentas Superior */}
      <div className="p-4 bg-altipisos-navy text-white flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-altipisos-blue flex items-center justify-center">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm">Montador de Quadras 3D WebGL</h4>
            <span className="text-[11px] text-gray-300">
              Visualização paramétrica com demarcações oficiais e placas modulares
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Seletor Rápido de Modalidade */}
          <select
            value={activeSport}
            onChange={(e) => setActiveSport(e.target.value as SportModality)}
            className="bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 focus:outline-none"
          >
            {Object.values(SPORT_PRESETS).map((p) => (
              <option key={p.id} value={p.id} className="bg-altipisos-navy text-white">
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportSnapshot}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-altipisos-blue hover:bg-altipisos-blue-hover text-white text-xs font-semibold rounded-lg transition-all"
            title="Salvar Render da Quadra"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar Render</span>
          </button>
        </div>
      </div>

      {/* Viewport WebGL (3D Canvas) */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-[#111827]">
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 24, 28], fov: 45 }}
          shadows
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 25, 15]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 15, -15]} intensity={0.5} />

          <ModularCourtScene
            width={width}
            length={length}
            sport={activeSport}
            innerColor={selectedInnerColor}
            outerColor={selectedOuterColor}
            lineColor={selectedLineColor}
          />

          <OrbitControls
            maxPolarAngle={Math.PI / 2.1}
            minDistance={8}
            maxDistance={70}
            enablePan={true}
          />
        </Canvas>

        {/* Badge Overlay */}
        <div className="absolute top-4 left-4 pointer-events-none bg-black/60 backdrop-blur-md text-white px-3 py-2 rounded-xl text-xs space-y-0.5">
          <div className="font-bold text-altipisos-cyan">
            {SPORT_PRESETS[activeSport].name}
          </div>
          <div className="text-[10px] text-gray-300">
            {length}m × {width}m ({length * width}m²) • 16 placas/m²
          </div>
        </div>
      </div>

      {/* Painel de Paleta de Cores Altipisos (12 Cores Oficiais) */}
      <div className="p-4 bg-gray-50 border-t border-altipisos-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-altipisos-navy">
              <Palette className="w-4 h-4 text-altipisos-blue" />
              <span>Cartela de Cores Altipisos:</span>
            </div>
            <div className="text-[11px] text-gray-500">
              Selecione as cores da área interna e da borda perimetral
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Seletor Área Interna */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700">Área Interna:</span>
              <div className="flex items-center gap-1">
                {ALTIPISOS_COLORS.slice(0, 6).map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setSelectedInnerColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      selectedInnerColor === c.hex
                        ? "border-altipisos-blue scale-125 shadow-md"
                        : "border-white hover:scale-110"
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Seletor Área Externa */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700">Borda / Escape:</span>
              <div className="flex items-center gap-1">
                {ALTIPISOS_COLORS.slice(0, 6).map((c) => (
                  <button
                    key={`outer-${c.hex}`}
                    type="button"
                    onClick={() => setSelectedOuterColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      selectedOuterColor === c.hex
                        ? "border-altipisos-blue scale-125 shadow-md"
                        : "border-white hover:scale-110"
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
