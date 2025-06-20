// src/components/logo.tsx
import * as React from 'react';

export function PlesGroupLogo({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 340 160" // Adjusted viewBox for "PLES"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style} // Pass style prop for CSS variables
      aria-label="PLES Logo" // Updated aria-label
      role="img"
    >
      <style>{`
        .letter { fill: currentColor; }
        .p-accent { fill: var(--logo-accent-color, hsl(var(--primary))); }
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

      {/* Letter E (Shifted left by 10px from original PLESIA E position) */}
      <path className="letter" d="
        M 230,60
        L 190,60
        A 30,30 0 1 1 190,120
        L 220,120
        A 10,10 0 0 1 230,110
        L 230,95
        L 180,95
        A 15,15 0 0 0 180,50
        L 230,50
        L 230,40
        A 10,10 0 0 1 220,30
        L 190,30
        A 30,30 0 1 1 190,60
        Z
      "/>

      {/* Letter S (Original position, fits after shifted E) */}
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
