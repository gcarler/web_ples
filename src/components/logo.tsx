'use client'; // This directive is now required for event handlers

import * as React from 'react';
import { cn } from '@/lib/utils';

export function PlesGroupLogo({ className, style }: { className?: string, style?: React.CSSProperties }) {
  
  const handleMouseEnter = () => {
    document.body.classList.add('logo-hover-active');
  };

  const handleMouseLeave = () => {
    document.body.classList.remove('logo-hover-active');
  };
  
  // The `className` prop (e.g., "h-7 text-xl") will control the overall size and font-size.
  // The internal font-size uses '1em' so it scales with the container, and 'em' units for the dot scale with this.
  return (
    <>
      <div
        className={cn(
          "logo-container font-comfortaa font-bold", // Base classes for font
          className // Apply className from props for sizing (e.g., h-7, text-xl)
        )}
        style={style}
        aria-label="PLES Logo"
        role="img"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="letra-p-con-punto letter">p</span>
        <span className="letter">l</span>
        <span className="letter">e</span>
        <span className="letter">s</span>
      </div>
      <style jsx>{`
        .logo-container {
          display: inline-flex; /* Allows it to sit inline and be sized by parent/className */
          align-items: baseline; /* Good for text alignment */
          line-height: 1; /* Adjust line height to fit content snugly */
          color: currentColor; /* Text color will be inherited or set by className */
          cursor: pointer; /* Indicate it's interactive */
          transition: transform 0.2s ease-out;
        }

        .logo-container:hover {
            transform: scale(1.05); /* Slight zoom on hover */
        }
        
        .letra-p-con-punto {
          position: relative;
          display: inline-block; /* Crucial for ::before positioning relative to this span */
        }

        .letra-p-con-punto::before {
          content: '';
          position: absolute;
          z-index: -1;
          background-color: hsl(var(--primary)); /* Use primary theme color for the dot */
          border-radius: 100%;
          
          width: 0.31em;
          height: 0.31em;
          
          top: 0.40em;
          left: 0.20em;
        }
      `}</style>
    </>
  );
}
