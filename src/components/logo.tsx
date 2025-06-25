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
        <span className="letra-p-con-punto">p</span>
        <span>les</span>
      </div>
      <style jsx>{`
        .logo-container {
          display: inline-flex; /* Allows it to sit inline and be sized by parent/className */
          align-items: baseline; /* Good for text alignment */
          line-height: 1; /* Adjust line height to fit content snugly */
          color: currentColor; /* Text color will be inherited or set by className */
          transition: color 0.3s ease-in-out;
        }

        .logo-container:hover {
            color: hsl(var(--primary)); /* Change text color to primary on hover */
        }

        .letra-p-con-punto {
          position: relative;
          display: inline-block; /* Crucial for ::before positioning relative to this span */
        }

        .letra-p-con-punto::before {
          content: '';
          position: absolute;
          z-index: -1; /* Places the dot behind the letter 'p' text if needed, though with current positioning it might not overlap text */
          background-color: hsl(var(--primary)); /* Use primary theme color for the dot */
          border-radius: 100%; /* Makes it a circle */
          
          /* Sizing and positioning relative to the font-size of .letra-p-con-punto */
          width: 0.31em;  /* Diameter of the dot */
          height: 0.31em; /* Diameter of the dot */
          
          /* Positioning to center the dot within the 'p' */
          top: 0.45em;   /* Adjust based on Comfortaa font's 'p' shape */
          left: 0.21em;  /* Adjust based on Comfortaa font's 'p' shape */
          transition: background-color 0.3s ease-in-out; /* Add transition for smooth color change */
        }

        /* Hover effect */
        .logo-container:hover .letra-p-con-punto::before {
          background-color: hsl(var(--accent)); /* Change dot to accent color on hover */
        }
      `}</style>
    </>
  );
}
