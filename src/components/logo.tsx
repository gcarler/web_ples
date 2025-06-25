'use client'; 

import * as React from 'react';
import { cn } from '@/lib/utils';

export function PlesGroupLogo({ className, style }: { className?: string, style?: React.CSSProperties }) {
  
  return (
    <>
      <div
        className={cn(
          "logo-container font-comfortaa font-bold group",
          className 
        )}
        style={style}
        aria-label="PLES Logo"
        role="img"
      >
        <span className="letra-p-con-punto letter">p</span>
        <span className="letter" style={{ transitionDelay: '50ms' }}>l</span>
        <span className="letter" style={{ transitionDelay: '100ms' }}>e</span>
        <span className="letter" style={{ transitionDelay: '150ms' }}>s</span>
      </div>
      <style jsx>{`
        .logo-container {
          display: inline-flex; 
          align-items: baseline; 
          line-height: 1; 
          color: currentColor; 
          cursor: pointer;
        }
        
        .letter {
            transition: transform 0.2s ease, color 0.3s ease;
        }

        .group:hover .letter {
            color: hsl(var(--primary));
            transform: scale(1.2);
        }

        .letra-p-con-punto {
          position: relative;
          display: inline-block; 
        }

        .letra-p-con-punto::before {
          content: '';
          position: absolute;
          z-index: -1;
          background-color: hsl(var(--primary)); 
          border-radius: 100%;
          transition: background-color 0.3s ease;
          
          width: 0.31em;
          height: 0.31em;
          
          top: 0.40em;
          left: 0.22em;
        }
        
        .group:hover .letra-p-con-punto::before {
            background-color: hsl(var(--accent));
            transition-delay: 50ms;
        }
      `}</style>
    </>
  );
}
