
'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define the structure for a single slide
export interface CarouselSlideProps {
  type: 'image' | 'video';
  src: string;
  alt?: string; // Required for images
  dataAiHint?: string; // For placeholder image hints
  content?: React.ReactNode; // Overlay content (text, button)
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>; // Props for video element
}

interface CarouselProps {
  slides: CarouselSlideProps[];
  className?: string;
}

export function Carousel({ slides, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!slides || slides.length === 0) {
    return null; // Don't render anything if there are no slides
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className={cn('relative w-full aspect-[3/1] overflow-hidden', className)}>
      {/* Slide Content */}
      <div className="w-full h-full transition-transform duration-500 ease-in-out">
        {currentSlide.type === 'image' && (
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt || 'Carousel image'}
            layout="fill"
            objectFit="cover"
            quality={85}
            priority={currentIndex === 0} // Prioritize loading the first image
            unoptimized={currentSlide.src.endsWith('.gif')} // Example: Disable optimization for GIFs
            data-ai-hint={currentSlide.dataAiHint}
          />
        )}
        {currentSlide.type === 'video' && (
          <video
            key={currentSlide.src} // Add key to force re-render on src change
            className="w-full h-full object-cover"
            src={currentSlide.src}
            {...currentSlide.videoProps} // Apply video-specific props
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

       {/* Overlay Content (Text, Button) */}
       {currentSlide.content && (
         <div className="absolute inset-0 z-10 flex items-center justify-center">
           {currentSlide.content}
         </div>
       )}

      {/* Navigation Buttons */}
      {slides.length > 1 && (
          <>
            <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground rounded-full"
            onClick={goToPrevious}
            aria-label="Previous Slide"
            >
            <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-background/50 hover:bg-background/80 text-foreground rounded-full"
            onClick={goToNext}
            aria-label="Next Slide"
            >
            <ChevronRight className="h-6 w-6" />
            </Button>
         </>
      )}

       {/* Optional: Navigation Dots */}
       {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                currentIndex === index ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
       )}
    </div>
  );
}
