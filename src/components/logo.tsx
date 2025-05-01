import * as React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

export function PlesGroupLogo({ className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 26 26" // Adjusted viewBox to contain the stroke
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)} // Default size, can be overridden
      {...props}
    >
      {/* Grey outline circle - Changed from white to grey */}
      <circle cx="13" cy="13" r="11" stroke="#808080" strokeWidth="2.5" />
      {/* Primary blue inner circle - uses CSS variable for color */}
      <circle cx="13" cy="13" r="8.5" fill="hsl(var(--primary))" />
    </svg>
  );
}
