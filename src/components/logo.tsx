// src/components/logo.tsx
import * as React from 'react';

export function PlesGroupLogo({ className }: { className?: string }) {
  return (
    <svg
      width="100%" // Make it responsive by default
      height="100%" // Make it responsive by default
      viewBox="0 0 350 160" // ViewBox from user's SVG
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Allow passing a className for sizing and other styles
      aria-label="PLES Logo" // Accessibility
      role="img" // Accessibility
    >
      <style>{`
        .letter { fill: var(--logo-letter-color, currentColor); }
        .p-accent { fill: var(--logo-accent-color, hsl(var(--accent))); }
      `}</style>

      {/* Letter P */}
      <path className="letter" fillRule="evenodd" d="
        M 20,70
        Q 20,30 50,30
        L 80,30
        A 30,30 0 0 1 80,90
        L 80,125
        A 15,15 0 0 1 65,140
        L 35,140
        A 15,15 0 0 1 20,125
        L 20,70 Z

        M 50,77.5
        A 17.5,17.5 0 1 0 50,42.5
        A 17.5,17.5 0 1 0 50,77.5 Z
      "/>
      <circle className="p-accent" cx="50" cy="60" r="15" />

      {/* Letter L */}
      <path className="letter" d="
        M 100,20
        A 15,15 0 0 0 100,50
        L 100,125
        A 15,15 0 0 0 115,140
        L 145,140
        A 15,15 0 0 0 160,125
        L 160,50
        A 15,15 0 0 0 145,20
        L 115,20
        Z
      "/>

      {/* Letter E */}
      <path className="letter" d="
        M 240,60
        L 200,60
        A 30,30 0 1 1 200,120
        L 230,120
        A 10,10 0 0 1 240,110
        L 240,95
        L 190,95
        A 15,15 0 0 0 190,50
        L 240,50
        L 240,40
        A 10,10 0 0 1 230,30
        L 200,30
        A 30,30 0 1 1 200,60
        Z
      "/>

      {/* Letter S */}
      <path className="letter" d="
        M 270,55
        C 270,30 310,30 310,55
        C 310,80 285,80 285,95
        C 285,110 320,110 320,125
        A 10,10 0 0 1 310,135
        L 290,135
        C 290,110 250,110 250,85
        C 250,60 275,60 275,45
        C 275,30 260,35 260,45
        A 10,10 0 0 1 270,55
        Z
      "/>
    </svg>
  );
}
