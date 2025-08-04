
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import PlexusIllustration from './PlexusIllustration';

interface HealthDataIllustrationProps {
    className?: string;
}

export const HealthDataIllustration = ({ className }: HealthDataIllustrationProps) => {
    const ecgPath = "M0,50 L20,50 L30,30 L40,70 L50,50 L70,50";
    const ecgPathLength = 138; // Pre-calculated path length

    return (
        <div className={cn("relative h-full w-full overflow-hidden rounded-lg", className)}>
            <PlexusIllustration />
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
                    className="relative w-40 h-40 md:w-48 md:h-48"
                >
                    {/* Shield */}
                    <ShieldCheck 
                        className="absolute inset-0 w-full h-full text-accent/30" 
                        strokeWidth={0.5} 
                    />

                    {/* Pulsing Heart */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <HeartPulse className="w-1/2 h-1/2 text-primary" strokeWidth={1} />
                    </motion.div>
                    
                     {/* ECG Line */}
                    <svg
                        viewBox="-5 -5 80 110"
                        className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] overflow-visible"
                    >
                        <motion.path
                            d={ecgPath}
                            fill="none"
                            stroke="hsl(var(--accent))"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{
                                pathLength: {
                                    delay: 0.5,
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    repeatDelay: 1,
                                    ease: 'easeInOut',
                                },
                                opacity: {
                                    delay: 0.5,
                                    duration: 0.1
                                }
                            }}
                        />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};
