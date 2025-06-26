
// src/components/layout/rotating-hero-text.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ArrowRight, Send, BookOpen, Layers, Cpu } from 'lucide-react'; // Import all icons here
import { cn } from '@/lib/utils';
import { type HeroStatement } from '@/lib/models/content';


interface RotatingHeroTextProps {
  statements: HeroStatement[];
  interval?: number;
  className?: string; // For the root container of this component
  titleClassName?: string;
  descriptionClassName?: string;
  buttonContainerClassName?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  Send,
  BookOpen,
  Layers,
  Cpu,
  ArrowRight, // Default
};

export function RotatingHeroText({
  statements,
  interval = 7000,
  className,
  titleClassName,
  descriptionClassName,
  buttonContainerClassName,
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
  // Use ctaIconName to get the component from the map, fallback to ArrowRight
  const CtaIcon = currentStatement.ctaIconName ? iconMap[currentStatement.ctaIconName] || ArrowRight : ArrowRight;

  return (
    <div
      className={cn(
        'flex flex-col', // Base styling: flex column
        className
      )}
    >
      <div
        className={cn(
          'transition-opacity duration-500 ease-in-out',
          isFading ? 'opacity-0' : 'opacity-100'
        )}
      >
        <h1 className={cn("font-bold leading-tight", titleClassName)}>
          {currentStatement.title}
        </h1>
        <p className={cn("text-muted-foreground mt-6", descriptionClassName)}> {/* Adjusted margin top for description */}
          {currentStatement.description}
        </p>
        <div className={cn("mt-10", buttonContainerClassName)}> {/* Adjusted margin top for button */}
            <Button size="lg" variant={currentStatement.ctaVariant || 'default'} asChild>
                <Link href={currentStatement.ctaLink}>
                    <span className="flex items-center">
                    {currentStatement.ctaText} <CtaIcon className="ml-2 h-5 w-5" />
                    </span>
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
