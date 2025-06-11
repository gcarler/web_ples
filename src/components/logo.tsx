// src/components/logo.tsx
import * as React from 'react';

export function PlesGroupLogo({ className }: { className?: string }) {
  return (
    <svg
      width="100%" // Make it responsive by default
      height="100%" // Make it responsive by default
      viewBox="0 0 100 100" // Simplified viewBox for a square logo
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Allow passing a className for sizing and other styles
      aria-label="PLES Group Logo" // Accessibility
      role="img" // Accessibility
    >
      {/* Define a style block to use theme colors */}
      <style>{`
        .logo-outline { stroke: hsl(var(--border)); } /* Outline color from theme */
        .logo-fill-primary { fill: hsl(var(--primary)); } /* Primary color from theme */
        .logo-fill-accent { fill: hsl(var(--accent)); } /* Accent color from theme */
        .logo-text { fill: hsl(var(--foreground)); font-family: 'Comfortaa', sans-serif; font-weight: bold; } /* Text color from theme */
      `}</style>

      {/* Outer square with rounded corners - using primary color */}
      <rect x="5" y="5" width="90" height="90" rx="15" className="logo-fill-primary" />

      {/* Inner 'P' shape in accent color - designed to look like a modern 'P' */}
      <path
        className="logo-fill-accent"
        d="M30 25 H50 A15 15 0 0 1 50 55 H30 V75 H20 V25 Z M30 45 A5 5 0 0 0 30 35 H45 A5 5 0 0 0 45 45 H30 Z"
      />

      {/* Placeholder for 'L E S' text elements or other design features - using foreground color */}
      <text x="55" y="45" className="logo-text" fontSize="20">L</text>
      <text x="55" y="65" className="logo-text" fontSize="20">E</text>
      <text x="55" y="85" className="logo-text" fontSize="20">S</text>

      {/* Optional: Add an outline to the main square if desired */}
      {/* <rect x="5" y="5" width="90" height="90" rx="15" fill="none" className="logo-outline" strokeWidth="2" /> */}
    </svg>
  );
}
