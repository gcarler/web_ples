'use client'; // This directive marks the component as a Client Component

import * as React from 'react';
import { cn } from '@/lib/utils';

export function PlesGroupLogo({ className, style }: { className?: string, style?: React.CSSProperties }) {
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
        }
        
        .letter {
          transition: color 0.2s ease-out, transform 0.2s ease-out;
        }

        .logo-container:hover .letter {
            color: hsl(var(--primary)); /* Change text color to primary on hover */
            transform: scale(1.1);
        }

        /* Stagger the transition for each letter */
        .logo-container .letter:nth-child(1) { transition-delay: 0s; }
        .logo-container .letter:nth-child(2) { transition-delay: 0.05s; }
        .logo-container .letter:nth-child(3) { transition-delay: 0.1s; }
        .logo-container .letter:nth-child(4) { transition-delay: 0.15s; }

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
          
          top: 0.38em;
          left: 0.22em;
          transition: background-color 0.2s ease-out;
          transition-delay: 0s; /* Dot changes with the 'p' */
        }

        /* Hover effect */
        .logo-container:hover .letra-p-con-punto::before {
          background-color: hsl(var(--accent)); /* Change dot to accent color on hover */
        }
      `}</style>
    </>
  );
}
