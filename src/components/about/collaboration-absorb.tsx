// src/components/about/collaboration-absorb.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NodeItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  fillColor: string;
  borderColor: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  color: string;
}

const LABELS = [
  'Sector Público',
  'Sector Privado',
  'Comunidades',
  'Academia',
  'Datos SIG',
  'Ciencia y Territorio',
  'Alcaldías',
  'Ingeniería',
  'Sostenibilidad',
  'Gobernanza',
  'Catastro Multipropósito',
  'Alianzas Globales',
];

// Flat translucent PLES color palette (matching the original animation)
const FLAT_PLES_PALETTE = [
  { fill: 'rgba(4, 157, 217, 0.25)', border: 'rgba(4, 157, 217, 0.65)' }, // Primary Blue
  { fill: 'rgba(5, 199, 242, 0.28)', border: 'rgba(5, 199, 242, 0.75)' }, // Accent Cyan
  { fill: 'rgba(80, 212, 242, 0.22)', border: 'rgba(80, 212, 242, 0.60)' }, // Light Cyan
  { fill: 'rgba(4, 157, 217, 0.35)', border: 'rgba(255, 255, 255, 0.55)' }, // Deeper Blue
  { fill: 'rgba(5, 199, 242, 0.38)', border: 'rgba(255, 255, 255, 0.65)' }, // Bright Cyan
];

// Large and varied circle radii (diameters from 76px to 170px)
const VARIED_SIZES = [82, 70, 62, 54, 45, 78, 65, 52, 42, 72, 58, 48];

const CHIME_FREQS = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

export function CollaborationAbsorb({ isEn }: { isEn?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initial size ~1 cm = 38px at 96 DPI
  const INITIAL_SIZE = 38;
  const [playerSize, setPlayerSize] = useState(INITIAL_SIZE);
  const [absorbedCount, setAbsorbedCount] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const stateRef = useRef({
    width: 900,
    height: 700,
    playerX: 450,
    playerY: 350,
    targetX: 450,
    targetY: 350,
    playerSize: INITIAL_SIZE,
    absorbedCount: 0,
    nodes: [] as NodeItem[],
    particles: [] as Particle[],
    animId: 0,
    sonarPulse: 0,
  });

  const playChime = (count: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        const freq = CHIME_FREQS[count % CHIME_FREQS.length];
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.23);
      }
    } catch {
      // Audio context error or blocked - ignore safely
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    stateRef.current.targetX = e.clientX - rect.left;
    stateRef.current.targetY = e.clientY - rect.top;

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  };

  const resetGame = () => {
    stateRef.current.playerSize = INITIAL_SIZE;
    stateRef.current.absorbedCount = 0;
    setPlayerSize(INITIAL_SIZE);
    setAbsorbedCount(0);
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

    // Spawn 12 large and varied circles (matching first animation)
    stateRef.current.nodes = Array.from({ length: 12 }).map((_, i) => {
      const palette = FLAT_PLES_PALETTE[i % FLAT_PLES_PALETTE.length];
      const radius = VARIED_SIZES[i % VARIED_SIZES.length];
      return {
        id: i,
        x: Math.random() * (w - radius * 2 - 40) + radius + 20,
        y: Math.random() * (h - radius * 2 - 40) + radius + 20,
        // Gentle, ambient floating motion
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        radius,
        label: LABELS[i % LABELS.length],
        fillColor: palette.fill,
        borderColor: palette.border,
      };
    });

    const drawTextWrapped = (text: string, x: number, y: number, radius: number) => {
      const fontSize = Math.max(Math.floor(radius * 0.22), 11);
      ctx.font = `bold ${fontSize}px Comfortaa, sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const words = text.split(' ');
      if (words.length > 1 && ctx.measureText(text).width > radius * 1.5) {
        const mid = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(' ');
        const line2 = words.slice(mid).join(' ');
        const lineHeight = fontSize * 1.25;
        ctx.fillText(line1, x, y - lineHeight * 0.5);
        ctx.fillText(line2, x, y + lineHeight * 0.5);
      } else {
        ctx.fillText(text, x, y);
      }
    };

    const loop = () => {
      const s = stateRef.current;
      const curW = s.width;
      const curH = s.height;

      ctx.clearRect(0, 0, curW, curH);

      // Smooth mouse tracking
      s.playerX += (s.targetX - s.playerX) * 0.22;
      s.playerY += (s.targetY - s.playerY) * 0.22;

      // Sonar pulse animation (expanding ring)
      s.sonarPulse = (s.sonarPulse + 0.018) % 1;

      // 1. BACKGROUND WATERMARK: "colaboración" in Comfortaa
      ctx.save();
      const wmSize = Math.min(Math.max(curW * 0.14, 90), 190);
      ctx.font = `700 ${wmSize}px Comfortaa, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.fillText(isEn ? 'collaboration' : 'colaboración', curW / 2, curH / 2);
      ctx.restore();

      // 2. CONVERGING & EMERGING COLLABORATIVE ENERGY VECTORS (Flat, subtle background lines)
      ctx.save();
      ctx.lineWidth = 2;
      const nexusX = curW * 0.5;
      const nexusY = curH * 0.5;

      // Inflow lines from left
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(0, curH * 0.2);
      ctx.quadraticCurveTo(curW * 0.35, curH * 0.2, nexusX, nexusY);
      ctx.moveTo(0, nexusY);
      ctx.lineTo(nexusX, nexusY);
      ctx.moveTo(0, curH * 0.8);
      ctx.quadraticCurveTo(curW * 0.35, curH * 0.8, nexusX, nexusY);
      ctx.stroke();

      // Outflow fortified beams to right
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(nexusX, nexusY);
      ctx.quadraticCurveTo(curW * 0.7, curH * 0.25, curW, curH * 0.25);
      ctx.moveTo(nexusX, nexusY);
      ctx.lineTo(curW, nexusY);
      ctx.moveTo(nexusX, nexusY);
      ctx.quadraticCurveTo(curW * 0.7, curH * 0.75, curW, curH * 0.75);
      ctx.stroke();

      // Convergence Nexus Flat Node
      ctx.fillStyle = 'rgba(5, 199, 242, 0.35)';
      ctx.beginPath();
      ctx.arc(nexusX, nexusY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. UPDATE & DRAW THE LARGE, VARIED CIRCLES (NO 3D GRADIENTS, PURE FLAT CIRCLES)
      const pRadius = s.playerSize * 0.5;
      let sizeUpdated = false;

      for (let i = 0; i < s.nodes.length; i++) {
        const node = s.nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off canvas boundaries
        if (node.x <= node.radius) {
          node.x = node.radius;
          node.vx = Math.abs(node.vx);
        } else if (node.x >= curW - node.radius) {
          node.x = curW - node.radius;
          node.vx = -Math.abs(node.vx);
        }
        if (node.y <= node.radius) {
          node.y = node.radius;
          node.vy = Math.abs(node.vy);
        } else if (node.y >= curH - node.radius) {
          node.y = curH - node.radius;
          node.vy = -Math.abs(node.vy);
        }

        // Collision check with player PLES circle
        const dx = s.playerX - node.x;
        const dy = s.playerY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pRadius + node.radius) {
          // ABSORB & GROW!
          s.absorbedCount++;
          // Grow by +8px each absorption (scaling up smoothly)
          s.playerSize = Math.min(s.playerSize + 8, 280);
          sizeUpdated = true;

          // Spawn flat circular particles
          for (let p = 0; p < 10; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.8 + Math.random() * 3.5;
            s.particles.push({
              x: node.x,
              y: node.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              radius: 3 + Math.random() * 3,
              life: 1,
              maxLife: 22 + Math.random() * 12,
              color: node.borderColor,
            });
          }

          playChime(s.absorbedCount);

          // Respawn node at opposite edge with new random position
          const edge = Math.floor(Math.random() * 4);
          if (edge === 0) {
            node.x = node.radius + 15;
            node.y = Math.random() * (curH - node.radius * 2) + node.radius;
            node.vx = Math.abs(node.vx);
          } else if (edge === 1) {
            node.x = curW - node.radius - 15;
            node.y = Math.random() * (curH - node.radius * 2) + node.radius;
            node.vx = -Math.abs(node.vx);
          } else if (edge === 2) {
            node.x = Math.random() * (curW - node.radius * 2) + node.radius;
            node.y = node.radius + 15;
            node.vy = Math.abs(node.vy);
          } else {
            node.x = Math.random() * (curW - node.radius * 2) + node.radius;
            node.y = curH - node.radius - 15;
            node.vy = -Math.abs(node.vy);
          }
          node.label = LABELS[Math.floor(Math.random() * LABELS.length)];
        }

        // DRAW FLAT TRANSLUCENT CIRCLE (NO 3D GRADIENT)
        ctx.save();
        ctx.fillStyle = node.fillColor;
        ctx.strokeStyle = node.borderColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw centered label inside the large circle
        drawTextWrapped(node.label, node.x, node.y, node.radius);
        ctx.restore();
      }

      if (sizeUpdated) {
        setPlayerSize(s.playerSize);
        setAbsorbedCount(s.absorbedCount);
      }

      // 4. DRAW PARTICLES
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
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. DRAW THE PLAYER: FLAT 2D CIRCLE IN THE EXACT PLES BLUE
      const px = s.playerX;
      const py = s.playerY;
      const pRad = s.playerSize * 0.5;

      ctx.save();

      // (a) Concentric Expanding Sonar Wave (Matching PLES logo .letra-p-con-punto::after)
      const sonarR = pRad + (s.sonarPulse * pRad * 1.4);
      const sonarAlpha = Math.max(0, 1 - s.sonarPulse);
      ctx.strokeStyle = `rgba(5, 199, 242, ${sonarAlpha * 0.85})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(px, py, sonarR, 0, Math.PI * 2);
      ctx.stroke();

      // (b) Clean Flat Outer Energy Halo
      ctx.strokeStyle = 'rgba(80, 212, 242, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, pRad + 3, 0, Math.PI * 2);
      ctx.stroke();

      // (c) THE MAIN CIRCLE: SOLID PLES PRIMARY BLUE (#049DD9) — NO 3D SHADING
      ctx.fillStyle = '#049DD9'; // Exact PLES Deep Sky Blue
      ctx.strokeStyle = '#ffffff'; // Crisp white flat outline
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(px, py, pRad, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // (d) PLES Signature Core Dot in the center (Matching the blue dot in 'p' of PLES)
      const innerDotR = Math.max(pRad * 0.28, 4);
      ctx.fillStyle = '#05C7F2'; // PLES Accent Cyan
      ctx.beginPath();
      ctx.arc(px, py, innerDotR, 0, Math.PI * 2);
      ctx.fill();

      // White center point
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, Math.max(innerDotR * 0.35, 1.5), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      stateRef.current.animId = requestAnimationFrame(loop);
    };

    stateRef.current.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      resizeObserver.disconnect();
    };
  }, [isEn]);

  const sizeCm = (playerSize / 38).toFixed(1);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full overflow-hidden select-none cursor-crosshair bg-gradient-to-br from-[#024968] via-[#049DD9] to-[#05C7F2]"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Floating HUD: Top Status Bar */}
      <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 bg-black/35 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white font-mono text-xs sm:text-sm shadow-xl">
          <Sparkles className="h-4 w-4 text-accent animate-pulse" />
          <span>{isEn ? "ALLIANCES INTEGRATED:" : "SINERGIA INTEGRADA:"} <strong>{absorbedCount}</strong></span>
          <span className="opacity-40">|</span>
          <span>{isEn ? "PLES SCALE:" : "ESCALA PLES:"} <strong>{sizeCm} cm</strong></span>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={resetGame}
          className="pointer-events-auto text-xs bg-black/35 text-white border-white/20 hover:bg-white/20 shadow-xl"
        >
          <RotateCcw className="h-3 w-3 mr-1.5" />
          {isEn ? "Reset to 1 cm" : "Reiniciar (1 cm)"}
        </Button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4 w-full max-w-lg">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm shadow-xl">
          <Sparkles className="h-4 w-4 text-accent shrink-0" />
          <span>
            {isEn
              ? "Move the PLES blue circle to absorb alliances and expand synergy"
              : "Mueve el círculo azul PLES para absorber alianzas y expandir la colaboración"}
          </span>
        </div>
      </div>
    </div>
  );
}
