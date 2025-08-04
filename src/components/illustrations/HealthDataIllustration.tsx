'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HealthDataIllustrationProps {
    className?: string;
}

export const HealthDataIllustration = ({ className }: HealthDataIllustrationProps) => {
    // A single, long path for the ECG line to be drawn with more pronounced peaks.
    const ecgPath = "M0,50 L80,50 L90,25 L100,75 L110,50 L150,50 L160,35 L170,65 L180,50 L250,50 L260,70 L270,10 L280,50 L350,50";

    return (
        <div className={cn("relative h-full w-full overflow-hidden rounded-lg bg-background/50", className)}>
             <svg
                width="100%"
                height="100%"
                viewBox="0 0 350 100" // Viewbox matches the path coordinates
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                 <motion.path
                    d={ecgPath}
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      pathLength: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 4,
                        ease: "easeInOut",
                      },
                    }}
                 />
            </svg>
        </div>
    );
};
