
'use client'; 

import * as React from 'react';
import { cn } from '@/lib/utils';

export function PlesGroupLogo({ className, style, hoverVariant }: { className?: string, style?: React.CSSProperties, hoverVariant?: string }) {
  
  return (
    <>
      <div
        className={cn(
          "logo-container font-comfortaa font-bold group",
          className 
        )}
        style={style}
        data-hover-variant={hoverVariant}
        aria-label="PLES Logo"
        role="img"
      >
        <span className="letra-p-con-punto letter">p</span>
        <span className="letter" style={{ transitionDelay: '50ms' }}>l</span>
        <span className="letter" style={{ transitionDelay: '100ms' }}>e</span>
        <span className="letter" style={{ transitionDelay: '150ms' }}>s</span>
      </div>
      <style jsx>{`
        @keyframes sonar {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

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

        .group[data-hover-variant="black-gradient"]:hover .letter {
            background: linear-gradient(hsl(0 0% 5%), hsl(0 0% 45%));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
            color: transparent;
            transform: scale(1.2);
        }

        .letra-p-con-punto {
          position: relative;
          display: inline-block; 
          isolation: isolate;
        }

        .letra-p-con-punto::before {
          content: '';
          position: absolute;
          background-color: hsl(var(--primary)); 
          border-radius: 100%;
          transition: background-color 0.3s ease;
          
          width: 0.40em;
          height: 0.40em;
          
          top: 0.33em;
          left: 0.17em;
          z-index: -1;

          transform-origin: center;
          /* No animation, this is the static dot */
        }

        /* New animated element */
        .letra-p-con-punto::after {
          content: '';
          position: absolute;
          width: 0.40em;
          height: 0.40em;
          top: 0.33em;
          left: 0.17em;
          z-index: -2; /* Behind the main dot */
          background-color: hsl(var(--primary));
          border-radius: 100%;
          animation: sonar 1.5s infinite;
          transition: background-color 0.3s ease;
        }
        
        .group:hover .letra-p-con-punto::before,
        .group:hover .letra-p-con-punto::after {
            background-color: hsl(var(--accent));
            transition-delay: 50ms;
        }

        .group[data-hover-variant="black-gradient"]:hover .letra-p-con-punto::before,
        .group[data-hover-variant="black-gradient"]:hover .letra-p-con-punto::after {
            background-color: hsl(var(--primary));
        }
        
      `}</style>
    </>
  );
}
