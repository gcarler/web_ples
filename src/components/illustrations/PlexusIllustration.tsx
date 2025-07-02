
'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PlexusIllustrationProps {
  className?: string;
}

const PlexusIllustration = ({ className }: PlexusIllustrationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let particleCount = 60;
    let connectionDistance = 120;
    
    // Define colors from theme
    const primaryHsl = { h: 203, s: 96, l: 43 };
    const accentHsl = { h: 191, s: 98, l: 48 };

    const resizeCanvas = () => {
        const container = canvas.parentElement;
        if(container) {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            particleCount = Math.floor(canvas.width / 15);
            connectionDistance = canvas.width / 7;
        }
    };
    
    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
        this.color = Math.random() > 0.5 ? `hsl(${primaryHsl.h}, ${primaryHsl.s}%, ${primaryHsl.l}%)` : `hsl(${accentHsl.h}, ${accentHsl.s}%, ${accentHsl.l}%)`
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx!.strokeStyle = `hsla(${accentHsl.h}, ${accentHsl.s}%, ${accentHsl.l}%, ${opacity * 0.7})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    init();
    animate();

    const handleResize = () => {
        resizeCanvas();
        init();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 h-full w-full bg-gradient-to-br from-[#020617] via-black to-[#020617]", className)}>
        <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
};

export default PlexusIllustration;
