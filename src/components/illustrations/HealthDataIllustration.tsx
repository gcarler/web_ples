// src/components/illustrations/HealthDataIllustration.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HealthDataIllustrationProps {
    className?: string;
}

export const HealthDataIllustration = ({ className }: HealthDataIllustrationProps) => {
    // New, more realistic ECG path based on the user's image.
    // It features a repeating QRS complex (dip, sharp peak, dip).
    const ecgPath = "M0,50 L20,50 L25,55 L30,20 L35,65 L40,50 L60,50 L65,55 L70,20 L75,65 L80,50 L100,50 L105,55 L110,20 L115,65 L120,50 L140,50 L145,55 L150,20 L155,65 L160,50 L180,50 L185,55 L190,20 L195,65 L200,50 L220,50 L225,55 L230,20 L235,65 L240,50 L260,50 L265,55 L270,20 L275,65 L280,50 L300,50 L305,55 L310,20 L315,65 L320,50 L350,50";

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
                        ease: "linear",
                      },
                    }}
                 />
            </svg>
        </div>
    );
};
