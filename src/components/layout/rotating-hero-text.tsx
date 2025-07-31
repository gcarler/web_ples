// src/components/layout/rotating-hero-text.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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

const rotatingWords = [
    { word: "Integrales", className: "text-primary" },
    { word: "Inteligentes", className: "text-accent" },
    { word: "Innovadoras", className: "text-ring" }
];

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
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);

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

  useEffect(() => {
      const wordRotator = setInterval(() => {
          setRotatingWordIndex(prevIndex => (prevIndex + 1) % rotatingWords.length);
      }, 2000); // Change word every 2 seconds
      return () => clearInterval(wordRotator);
  }, []);


  if (!statements || statements.length === 0) {
    return null;
  }

  const currentStatement = statements[currentIndex];
  const CtaIcon = currentStatement.ctaIconName ? iconMap[currentStatement.ctaIconName] || ArrowRight : ArrowRight;
  
  const titleParts = useMemo(() => currentStatement.title.split('{{word}}'), [currentStatement.title]);

  return (
    <div
      className={cn(
        'flex flex-col', // Base styling: flex column
        className
      )}
    >
        <h1 className={cn("font-bold leading-tight", titleClassName)}>
          <span
            className={cn(
              "inline-block transition-all duration-500",
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            )}
          >
            {titleParts[0]}
          </span>

          {titleParts.length > 1 && (
              <span className="inline-block align-bottom text-left overflow-hidden h-[1.2em]">
                <span 
                    className="inline-block transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(-${rotatingWordIndex * 1.2}em)`}}
                >
                    {rotatingWords.map((item, index) => (
                        <span key={index} className={cn("block h-[1.2em]", item.className)}>
                          &nbsp;{item.word}&nbsp;
                        </span>
                    ))}
                </span>
              </span>
          )}

          <span
            className={cn(
              "inline-block transition-all duration-500",
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            )}
            style={{ transitionDelay: isAnimating ? '0s' : `200ms`}}
          >
            {titleParts[1]}
          </span>
        </h1>
        <div 
            className={cn('transition-opacity duration-500', isAnimating ? 'opacity-0' : 'opacity-100')}
            style={{ transitionDelay: isAnimating ? '0s' : `400ms` }}
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
