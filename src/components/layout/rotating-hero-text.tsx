// src/components/layout/rotating-hero-text.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroStatement {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  ctaVariant?: ButtonProps['variant'];
}

interface RotatingHeroTextProps {
  statements: HeroStatement[];
  interval?: number; // Interval in milliseconds
  className?: string;
}

export function RotatingHeroText({
  statements,
  interval = 7000, // Default to 7 seconds
  className,
}: RotatingHeroTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (statements.length <= 1) return;

    const changeStatement = () => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % statements.length);
        setIsFading(false);
      }, 500); // Duration of fade-out transition
    };

    const timer = setInterval(changeStatement, interval);
    return () => clearInterval(timer);
  }, [statements, interval]);

  if (!statements || statements.length === 0) {
    return null;
  }

  const currentStatement = statements[currentIndex];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-16 md:p-20 min-h-[400px] md:min-h-[500px] bg-background text-foreground', // Increased padding and min-height
        className
      )}
    >
      <div
        className={cn(
          'transition-opacity duration-500 ease-in-out',
          isFading ? 'opacity-0' : 'opacity-100'
        )}
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 md:mb-10 leading-tight"> {/* Increased font size */}
          {currentStatement.title}
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 md:mb-12 max-w-xl lg:max-w-3xl mx-auto"> {/* Increased font size and max-width */}
          {currentStatement.description}
        </p>
        <Button asChild size="lg" variant={currentStatement.ctaVariant || 'default'} className="text-xl px-10 py-4"> {/* Increased button text and padding */}
          <Link href={currentStatement.ctaLink}>
            {currentStatement.ctaText} <ArrowRight className="ml-3 h-6 w-6" /> {/* Increased icon size/margin */}
          </Link>
        </Button>
      </div>
    </div>
  );
}
