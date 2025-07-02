'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, HeartPulse, Cloud, Database, BarChart3 } from 'lucide-react';

const HealthDataIllustration = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative h-full w-full bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] p-4 overflow-hidden", className)}>
      <svg width="100%" height="100%" viewBox="0 0 200 120" className="absolute inset-0">
          {/* Grid background */}
          <defs>
              <pattern id="healthSmallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="healthGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="40" height="40" fill="url(#healthSmallGrid)"/>
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1"/>
              </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#healthGrid)" />

          {/* Animated lines */}
          <g stroke="hsl(var(--primary) / 0.7)" strokeWidth="1" strokeLinecap="round">
            <path d="M 100 60 L 55 35" strokeDasharray="52" strokeDashoffset="52" className="animate-draw-line-health" />
            <path d="M 100 60 L 145 35" strokeDasharray="52" strokeDashoffset="52" className="animate-draw-line-health" style={{ animationDelay: '0.5s' }} />
            <path d="M 100 60 L 55 85" strokeDasharray="52" strokeDashoffset="52" className="animate-draw-line-health" style={{ animationDelay: '1s' }} />
            <path d="M 100 60 L 145 85" strokeDasharray="52" strokeDashoffset="52" className="animate-draw-line-health" style={{ animationDelay: '1.5s' }} />
          </g>
      </svg>

      {/* Icons positioned on top of the SVG grid */}
      <div className="relative h-full w-full">
        {/* Central Shield */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ShieldCheck className="h-12 w-12 text-accent animate-pulse-glow-shield"/>
        </div>
        {/* Orbiting Icons */}
        <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.2s' }}>
            <HeartPulse className="h-8 w-8 text-primary"/>
        </div>
        <div className="absolute top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.4s' }}>
            <Cloud className="h-8 w-8 text-primary"/>
        </div>
        <div className="absolute bottom-[25%] left-[25%] -translate-x-1/2 translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.6s' }}>
            <Database className="h-8 w-8 text-primary"/>
        </div>
        <div className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.8s' }}>
            <BarChart3 className="h-8 w-8 text-primary"/>
        </div>
      </div>
    </div>
  );
};

export default HealthDataIllustration;
