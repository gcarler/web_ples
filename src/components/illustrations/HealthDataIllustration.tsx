
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HealthDataIllustrationProps {
    className?: string;
}

export const HealthDataIllustration = ({ className }: HealthDataIllustrationProps) => {
    // An extended ECG path designed to tile horizontally
    const ecgPath = "M0,50 L20,50 L25,40 L30,60 L35,50 L55,50 L60,45 L65,55 L70,50 L90,50";
    const pathLength = 200; // Approximate length for animation

    return (
        <div className={cn("relative h-full w-full overflow-hidden rounded-lg bg-background/50", className)}>
             <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                {/* Create a pattern to repeat the ECG line */}
                <defs>
                    <pattern id="ecg-pattern" x="0" y="0" width="90" height="100" patternUnits="userSpaceOnUse">
                         <motion.path
                            d={ecgPath}
                            fill="none"
                            stroke="hsl(var(--accent))"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0, opacity: 0}}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{
                                pathLength: { delay: 0.5, duration: 1.5, ease: "easeInOut" },
                                opacity: { delay: 0.5, duration: 0.2 },
                            }}
                        />
                    </pattern>
                </defs>
                 
                 {/* Draw the repeating pattern and animate its movement */}
                 <motion.rect
                    x="-200"
                    y="0"
                    width="400"
                    height="100"
                    fill="url(#ecg-pattern)"
                    animate={{ x: [-200, 0] }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 5,
                        ease: "linear",
                      },
                    }}
                 />

            </svg>
        </div>
    );
};
