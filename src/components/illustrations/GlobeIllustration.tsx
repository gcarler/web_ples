'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, GitMerge } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GlobeIllustration = () => {
    const mainGlobeVariants = {
        initial: { scale: 0, opacity: 0, rotate: -90 },
        animate: { 
            scale: 1, 
            opacity: 1, 
            rotate: 0, 
            transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 } 
        },
    };

    // Define satellites in a more maintainable way
    const satellites = [
        {
            orbit: {
                size: '100%',
                rotation: '0deg',
                duration: 40,
            },
            element: <div className="w-3 h-3 rounded-full bg-accent shadow-lg" />,
            animation: {
                duration: 12,
                delay: 0,
            }
        },
        {
            orbit: {
                size: '85%',
                rotation: '60deg',
                duration: 35
            },
            element: <GitMerge className="w-4 h-4 text-primary" />,
            animation: {
                duration: 15,
                delay: 1.5,
            }
        }
    ];

    return (
        <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
            <motion.div 
                className="absolute inset-0 z-10"
                variants={mainGlobeVariants}
                initial="initial"
                animate="animate"
            >
                <div className="relative w-full h-full flex justify-center items-center">
                    {/* Orbit Paths */}
                    {satellites.map((sat, index) => (
                        <motion.div 
                            key={`orbit-${index}`}
                            className="absolute border border-dashed border-primary/30 rounded-full"
                            style={{
                                width: sat.orbit.size,
                                height: sat.orbit.size,
                                transform: `rotateX(70deg) rotateZ(${sat.orbit.rotation})` 
                            }}
                            variants={{ animate: { rotate: 360, transition: { duration: sat.orbit.duration, ease: "linear", repeat: Infinity } } }}
                            animate="animate"
                        />
                    ))}

                    {/* Central Globe */}
                     <div className="relative w-[70%] h-[70%] bg-gradient-to-br from-primary via-primary/50 to-accent rounded-full flex items-center justify-center shadow-xl">
                        <Globe className="h-4/5 w-4/5 text-primary-foreground/50" strokeWidth={0.5} />
                    </div>

                    {/* Satellites */}
                    {satellites.map((sat, index) => (
                         <motion.div
                            key={`orbit-path-${index}`}
                            className="absolute"
                            style={{ width: sat.orbit.size, height: sat.orbit.size, transform: `rotateX(70deg) rotateZ(${sat.orbit.rotation})` }}
                            variants={{ animate: { rotate: 360, transition: { duration: sat.orbit.duration, ease: "linear", repeat: Infinity } } }}
                            animate="animate"
                        >
                            <motion.div
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                variants={{
                                    animate: () => ({
                                        rotate: [0, 360],
                                        transition: {
                                            duration: sat.animation.duration,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: sat.animation.delay
                                        }
                                    })
                                }}
                                animate="animate"
                                style={{
                                    transformOrigin: `0px ${(parseFloat(sat.orbit.size) / 100) * 0.5 * parseFloat(sat.orbit.size)}px`,
                                }}
                            >
                                <div style={{transform: `translateY(-${(parseFloat(sat.orbit.size) / 100) * 0.5 * parseFloat(sat.orbit.size)}px)` }}>
                                    {sat.element}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
