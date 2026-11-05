// src/components/about/innovation-ai-network.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Zap, RefreshCw, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NodeItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  label: string;
  category: 'drone' | 'cadastre' | 'ai' | 'gis';
  highlight: number; // 0 to 1 decay
}

interface PulseWave {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

interface Photon {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const NODES_DATA: { label: string; category: 'drone' | 'cadastre' | 'ai' | 'gis' }[] = [
  { label: 'Ortofoto Satelital', category: 'gis' },
  { label: 'LiDAR 3D', category: 'drone' },
  { label: 'Avalúos Masivos', category: 'cadastre' },
  { label: 'Algoritmo IA PLES', category: 'ai' },
  { label: 'Linderos Prediales', category: 'cadastre' },
  { label: 'Gemelo Digital', category: 'ai' },
  { label: 'Topografía RTK', category: 'drone' },
  { label: 'Nube Territorial', category: 'gis' },
  { label: 'Sensor Fotogramétrico', category: 'drone' },
  { label: 'Gobernanza SIG', category: 'gis' },
  { label: 'Zonificación Urbana', category: 'cadastre' },
  { label: 'Red Catastral 4.0', category: 'cadastre' },
  { label: 'Big Data Espacial', category: 'ai' },
  { label: 'Deep Learning Geo', category: 'ai' },
  { label: 'Modelo Digital Terreno', category: 'drone' },
  { label: 'Dron VTOL Autónomo', category: 'drone' },
  { label: 'Catastro Multipropósito', category: 'cadastre' },
  { label: 'Matriz Espacial', category: 'gis' },
  { label: 'Analítica Predictiva', category: 'ai' },
  { label: 'Fotogrametría Aérea', category: 'drone' },
  { label: 'Cartografía Oficial', category: 'gis' },
  { label: 'Infraestructura Datos', category: 'gis' },
];

const CATEGORY_COLORS: Record<'drone' | 'cadastre' | 'ai' | 'gis', { border: string; glow: string; text: string }> = {
  drone: { border: '#05C7F2', glow: 'rgba(5, 199, 242, 0.4)', text: '#ffffff' },      // Accent Cyan
  cadastre: { border: '#50D4F2', glow: 'rgba(80, 212, 242, 0.4)', text: '#ffffff' },   // Light Cyan
  ai: { border: '#ffffff', glow: 'rgba(255, 255, 255, 0.5)', text: '#ffffff' },         // Neural White
  gis: { border: '#049DD9', glow: 'rgba(4, 157, 217, 0.5)', text: '#ffffff' },         // Primary Deep Blue
};

const CHIME_PENTATONIC = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];

export function InnovationAiNetwork({ isEn }: { isEn?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeConnections, setActiveConnections] = useState(0);
  const [optimizationsCount, setOptimizationsCount] = useState(1);
  const [efficiency, setEfficiency] = useState(99.4);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const stateRef = useRef({
    width: 900,
    height: 700,
    cursorX: 450,
    cursorY: 350,
    targetCursorX: 450,
    targetCursorY: 350,
    isHovering: false,
    nodes: [] as NodeItem[],
    pulses: [] as PulseWave[],
    photons: [] as Photon[],
    particles: [] as Particle[],
    sonarPulse: 0,
    animId: 0,
    pulseCount: 0,
  });

  const playSynthesizerChime = (pitchIndex: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        const freq = CHIME_PENTATONIC[pitchIndex % CHIME_PENTATONIC.length];
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, audioCtxRef.current.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.36);
      }
    } catch {
      // Audio context error or blocked - ignore safely
    }
  };

  const triggerOptimizationPulse = (x?: number, y?: number) => {
    const s = stateRef.current;
    const px = x ?? s.cursorX;
    const py = y ?? s.cursorY;

    // Create expanding shockwave
    s.pulses.push({
      x: px,
      y: py,
      r: 10,
      maxR: Math.max(s.width, s.height) * 0.75,
      alpha: 1,
    });

    s.pulseCount++;
    setOptimizationsCount(s.pulseCount);
    setEfficiency(Number((99.2 + Math.random() * 0.7).toFixed(1)));
    playSynthesizerChime(s.pulseCount);

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  };

  const reorganizeNetwork = () => {
    const s = stateRef.current;
    s.nodes.forEach((node) => {
      node.vx = (Math.random() - 0.5) * 2.5;
      node.vy = (Math.random() - 0.5) * 2.5;
      node.highlight = 1;
    });
    triggerOptimizationPulse(s.width / 2, s.height / 2);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    stateRef.current.targetCursorX = e.clientX - rect.left;
    stateRef.current.targetCursorY = e.clientY - rect.top;
    stateRef.current.isHovering = true;

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    stateRef.current.isHovering = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    triggerOptimizationPulse(e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const w = container.clientWidth || 900;
      const h = container.clientHeight || 700;
      canvas.width = w;
      canvas.height = h;
      stateRef.current.width = w;
      stateRef.current.height = h;
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const w = stateRef.current.width;
    const h = stateRef.current.height;

    // Initialize network nodes
    stateRef.current.nodes = NODES_DATA.map((item, i) => {
      const angle = (i / NODES_DATA.length) * Math.PI * 2;
      const distFromCenter = Math.min(w, h) * (0.18 + (i % 3) * 0.14);
      return {
        id: i,
        x: w / 2 + Math.cos(angle) * distFromCenter + (Math.random() - 0.5) * 60,
        y: h / 2 + Math.sin(angle) * distFromCenter + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        baseRadius: item.category === 'ai' ? 14 : item.category === 'drone' ? 12 : 10,
        label: item.label,
        category: item.category,
        highlight: 0,
      };
    });

    let frameCount = 0;

    const loop = () => {
      frameCount++;
      const s = stateRef.current;
      const curW = s.width;
      const curH = s.height;

      ctx.clearRect(0, 0, curW, curH);

      // Smooth cursor lerp
      s.cursorX += (s.targetCursorX - s.cursorX) * 0.18;
      s.cursorY += (s.targetCursorY - s.cursorY) * 0.18;
      s.sonarPulse = (s.sonarPulse + 0.02) % 1;

      // 1. BACKGROUND ENVIRONMENT: "INNOVACIÓN" with architectural styling
      ctx.save();
      const fontSize = Math.min(Math.max(curW * 0.13, 85), 180);
      ctx.font = `700 ${fontSize}px Comfortaa, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.fillText(isEn ? 'INNOVATION' : 'INNOVACIÓN', curW / 2, curH * 0.48);

      // Digital Grid & Spatial Coordinates
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridGap = 80;
      for (let x = 0; x < curW; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, curH);
        ctx.stroke();
      }
      for (let y = 0; y < curH; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(curW, y);
        ctx.stroke();
      }

      // Telemetry tags
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.textAlign = 'left';
      ctx.fillText('PLES SPATIAL AI ENGINE // v4.2.0-NATIVE', 24, curH - 24);
      ctx.textAlign = 'right';
      ctx.fillText('ORCHESTRATION: MULTI-LAYER GIS // AUTONOMOUS MAPPING', curW - 24, curH - 24);
      ctx.restore();

      // 2. INTER-NODE SYNAPSES (Connections between adjacent nodes)
      const connectDist = Math.min(curW, curH) * 0.26;
      let connectionsCount = 0;

      for (let i = 0; i < s.nodes.length; i++) {
        const n1 = s.nodes[i];
        for (let j = i + 1; j < s.nodes.length; j++) {
          const n2 = s.nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            connectionsCount++;
            const alpha = (1 - dist / connectDist) * 0.35;
            ctx.save();
            ctx.strokeStyle = `rgba(5, 199, 242, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
            ctx.restore();

            // Occasionally spawn photons traveling along active synapses
            if (frameCount % 45 === 0 && Math.random() < 0.25) {
              s.photons.push({
                fromX: n1.x,
                fromY: n1.y,
                toX: n2.x,
                toY: n2.y,
                progress: 0,
                speed: 0.025 + Math.random() * 0.02,
              });
            }
          }
        }
      }

      // 3. CURSOR AI CORE SYNAPSES (Connections from central cursor to nearby nodes)
      const cursorDist = Math.min(curW, curH) * 0.38;
      const px = s.cursorX;
      const py = s.cursorY;

      for (let i = 0; i < s.nodes.length; i++) {
        const node = s.nodes[i];
        const dx = px - node.x;
        const dy = py - node.y;
        const dist = Math.hypot(dx, dy);

        if (dist < cursorDist) {
          connectionsCount += 2;
          const proximity = 1 - dist / cursorDist;
          node.highlight = Math.max(node.highlight, proximity);

          // Laser synapse to cursor
          ctx.save();
          ctx.strokeStyle = `rgba(5, 199, 242, ${proximity * 0.75})`;
          ctx.lineWidth = 1.5 + proximity * 1.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
          ctx.restore();

          // Magnetic gentle pull towards cursor
          node.vx += (dx / dist) * 0.06 * proximity;
          node.vy += (dy / dist) * 0.06 * proximity;

          // Continuous photons to AI core
          if (frameCount % 18 === 0 && Math.random() < 0.35) {
            s.photons.push({
              fromX: node.x,
              fromY: node.y,
              toX: px,
              toY: py,
              progress: 0,
              speed: 0.04 + proximity * 0.03,
            });
          }
        }
      }

      if (frameCount % 15 === 0) {
        setActiveConnections(connectionsCount);
      }

      // 4. PHOTONS (Packets of light traveling along network lines)
      for (let i = s.photons.length - 1; i >= 0; i--) {
        const ph = s.photons[i];
        ph.progress += ph.speed;

        if (ph.progress >= 1) {
          s.photons.splice(i, 1);
          continue;
        }

        const currX = ph.fromX + (ph.toX - ph.fromX) * ph.progress;
        const currY = ph.fromY + (ph.toY - ph.fromY) * ph.progress;

        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#05C7F2';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. UPDATE & DRAW PULSE WAVES
      for (let i = s.pulses.length - 1; i >= 0; i--) {
        const wave = s.pulses[i];
        wave.r += 14;
        wave.alpha = Math.max(0, 1 - wave.r / wave.maxR);

        if (wave.alpha <= 0 || wave.r >= wave.maxR) {
          s.pulses.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(5, 199, 242, ${wave.alpha * 0.75})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.r, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glowing echo
        ctx.strokeStyle = `rgba(255, 255, 255, ${wave.alpha * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.r * 0.85, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Check collision between wave and nodes
        for (let n = 0; n < s.nodes.length; n++) {
          const node = s.nodes[n];
          const ndist = Math.hypot(node.x - wave.x, node.y - wave.y);
          if (Math.abs(ndist - wave.r) < 16) {
            node.highlight = 1;

            // Spawn spark particles
            if (Math.random() < 0.25) {
              for (let p = 0; p < 4; p++) {
                const pAngle = Math.random() * Math.PI * 2;
                s.particles.push({
                  x: node.x,
                  y: node.y,
                  vx: Math.cos(pAngle) * 2,
                  vy: Math.sin(pAngle) * 2,
                  life: 1,
                  maxLife: 20,
                  color: '#05C7F2',
                });
              }
            }
          }
        }
      }

      // 6. UPDATE & DRAW NODES
      for (let i = 0; i < s.nodes.length; i++) {
        const node = s.nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Damping and bounce
        node.vx *= 0.985;
        node.vy *= 0.985;

        // Ambient roaming momentum
        if (Math.hypot(node.vx, node.vy) < 0.2) {
          node.vx += (Math.random() - 0.5) * 0.4;
          node.vy += (Math.random() - 0.5) * 0.4;
        }

        const margin = 30;
        if (node.x <= margin) {
          node.x = margin;
          node.vx = Math.abs(node.vx);
        } else if (node.x >= curW - margin) {
          node.x = curW - margin;
          node.vx = -Math.abs(node.vx);
        }
        if (node.y <= margin) {
          node.y = margin;
          node.vy = Math.abs(node.vy);
        } else if (node.y >= curH - margin) {
          node.y = curH - margin;
          node.vy = -Math.abs(node.vy);
        }

        // Decay highlight
        node.highlight = Math.max(0, node.highlight - 0.02);

        const currentRadius = node.baseRadius + node.highlight * 4;
        const colorCfg = CATEGORY_COLORS[node.category];

        ctx.save();
        // Glow Halo
        if (node.highlight > 0.1) {
          ctx.shadowColor = colorCfg.border;
          ctx.shadowBlur = 14 * node.highlight;
        }

        // Outer Node Circle
        ctx.fillStyle = node.highlight > 0.4 ? 'rgba(5, 199, 242, 0.5)' : 'rgba(4, 157, 217, 0.35)';
        ctx.strokeStyle = colorCfg.border;
        ctx.lineWidth = node.highlight > 0.4 ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner Core Dot
        ctx.fillStyle = node.highlight > 0.3 ? '#ffffff' : colorCfg.border;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // Node Label (Visible when active or hovering, or static clean tag)
        const textAlpha = Math.max(0.45, node.highlight);
        ctx.font = `600 ${node.highlight > 0.4 ? '11px' : '10px'} Comfortaa, sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fillText(node.label, node.x, node.y + currentRadius + 5);

        ctx.restore();
      }

      // 7. PARTICLES
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;

        if (pt.life <= 0) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life / pt.maxLife;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 8. THE CENTRAL PLES AI ORCHESTRATION CORE (Cursor / Pointer)
      ctx.save();
      // Radar Sonar Wave radiating from cursor
      const cursorSonarR = 20 + s.sonarPulse * 70;
      const cursorSonarAlpha = Math.max(0, 1 - s.sonarPulse);
      ctx.strokeStyle = `rgba(5, 199, 242, ${cursorSonarAlpha * 0.9})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, cursorSonarR, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Glow Aura
      const coreAura = ctx.createRadialGradient(px, py, 4, px, py, 32);
      coreAura.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      coreAura.addColorStop(0.35, 'rgba(5, 199, 242, 0.7)');
      coreAura.addColorStop(1, 'rgba(4, 157, 217, 0)');
      ctx.fillStyle = coreAura;
      ctx.beginPath();
      ctx.arc(px, py, 32, 0, Math.PI * 2);
      ctx.fill();

      // Flat PLES Blue AI Node
      ctx.fillStyle = '#049DD9';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Center High-Tech Aperture
      ctx.fillStyle = '#05C7F2';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      s.animId = requestAnimationFrame(loop);
    };

    stateRef.current.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      resizeObserver.disconnect();
    };
  }, [isEn]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="absolute inset-0 w-full h-full overflow-hidden select-none cursor-crosshair bg-gradient-to-br from-[#024968] via-[#049DD9] to-[#05C7F2]"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Floating HUD: Real-Time AI Telemetry Bar */}
      <div className="absolute top-6 left-6 right-6 z-30 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-white font-mono text-xs sm:text-sm shadow-xl">
          <Cpu className="h-4 w-4 text-accent animate-pulse" />
          <span>{isEn ? "ACTIVE SYNAPSES:" : "SINAPSIS ACTIVAS:"} <strong>{activeConnections}</strong></span>
          <span className="opacity-40">|</span>
          <span>{isEn ? "AI EFFICIENCY:" : "EFICIENCIA IA:"} <strong className="text-accent">{efficiency}%</strong></span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="hidden sm:inline">{isEn ? "OPTIMIZATIONS:" : "OPTIMIZACIONES:"} <strong>{optimizationsCount}</strong></span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              triggerOptimizationPulse();
            }}
            className="text-xs bg-black/40 text-white border-white/20 hover:bg-white/20 shadow-xl"
          >
            <Zap className="h-3.5 w-3.5 mr-1.5 text-accent" />
            {isEn ? "Trigger AI Pulse" : "Emitir Pulso IA"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              reorganizeNetwork();
            }}
            className="text-xs bg-black/40 text-white border-white/20 hover:bg-white/20 shadow-xl"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            {isEn ? "Reorganize" : "Reorganizar"}
          </Button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4 w-full max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm shadow-xl">
          <Sparkles className="h-4 w-4 text-accent shrink-0" />
          <span>
            {isEn
              ? "Move cursor to orchestrate spatial data // Click to trigger a territorial optimization shockwave"
              : "Mueve el cursor para orquestar la red geoespacial // Haz clic para emitir una onda de optimización"}
          </span>
        </div>
      </div>
    </div>
  );
}
