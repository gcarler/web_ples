// src/components/layout/rotating-hero-text.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (statements.length <= 1) return;

    const changeStatement = () => {
        setIsAnimating(true);
        // Timeout to allow fade-out animation to complete
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % statements.length);
            // After changing the index, the new content will render, and we set animating to false to trigger the fade-in
            setIsAnimating(false);
        }, 600); // This should match your fade-out duration
    };

    const timer = setInterval(changeStatement, interval);
    return () => clearInterval(timer);
  }, [statements, interval]);

  if (!statements || statements.length === 0) {
    return null;
  }

  const currentStatement = statements[currentIndex];
  const CtaIcon = currentStatement.ctaIconName ? iconMap[currentStatement.ctaIconName] || ArrowRight : ArrowRight;

  const titleWords = useMemo(() => currentStatement.title.split(' '), [currentStatement.title]);

  return (
    <div
      className={cn(
        'flex flex-col', // Base styling: flex column
        className
      )}
    >
        <h1 className={cn("font-bold leading-tight", titleClassName)}>
          {titleWords.map((word, index) => (
            <span
              key={index}
              className={cn(
                "inline-block transition-all duration-500",
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              )}
              style={{ transitionDelay: isAnimating ? '0s' : `${index * 100}ms`}}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <div 
            className={cn('transition-opacity duration-500', isAnimating ? 'opacity-0' : 'opacity-100')}
            style={{ transitionDelay: isAnimating ? '0s' : `${titleWords.length * 100}ms` }}
        >
            <p className={cn("text-muted-foreground mt-6", descriptionClassName)}>
                {currentStatement.description}
            </p>
            <div className={cn("mt-10", buttonContainerClassName)}>
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
