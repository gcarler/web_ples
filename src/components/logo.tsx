import * as React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  innerFillColor?: string;
}

export function PlesGroupLogo({ className, innerFillColor, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 26 26" // Adjusted viewBox to contain the stroke
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)} // Default size, can be overridden
      {...props}
    >
      {/* Apply stroke color via CSS class 'logo-outline' or defaults */}
      <circle cx="13" cy="13" r="11" className="logo-outline" strokeWidth="2.5" />
      {/* Inner circle: uses innerFillColor prop or defaults to primary theme color */}
      <circle cx="13" cy="13" r="8.5" fill={innerFillColor || "hsl(var(--primary))"} />
    </svg>
  );
}
