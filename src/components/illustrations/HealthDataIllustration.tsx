
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HealthDataIllustrationProps {
    className?: string;
}

export const HealthDataIllustration = ({ className }: HealthDataIllustrationProps) => {
    // A more realistic ECG path that tiles smoothly.
    const ecgPath = "M0,50 L20,50 L25,40 L30,60 L35,50 L55,50 L60,45 L65,55 L70,50 L90,50";
    const patternWidth = 90; // The width of the path defined above

    return (
        <div className={cn("relative h-full w-full overflow-hidden rounded-lg bg-background/50", className)}>
             <svg
                width="100%"
                height="100%"
                className="absolute inset-0 h-full w-full"
            >
                {/* Create a pattern to repeat the ECG line */}
                <defs>
                    <pattern 
                        id="ecg-pattern" 
                        x="0" 
                        y="0" 
                        width={patternWidth} 
                        height="100%" // Use percentage for height
                        patternUnits="userSpaceOnUse"
                    >
                         <path
                            d={ecgPath}
                            fill="none"
                            stroke="hsl(var(--accent))"
                            strokeWidth="1.5" // Slightly thicker line
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </pattern>
                </defs>
                 
                 {/* Draw a rectangle filled with the repeating pattern and animate its x position */}
                 <motion.rect
                    width={`${patternWidth * 4}`} // Make the rectangle wider than the view to ensure it fills during scroll
                    height="100%"
                    fill="url(#ecg-pattern)"
                    initial={{ x: 0 }}
                    animate={{ x: -patternWidth }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.5, // Faster, more realistic speed
                        ease: "linear",
                      },
                    }}
                 />
            </svg>
        </div>
    );
};
