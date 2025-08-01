'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, GitMerge } from 'lucide-react';

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

    const orbitVariants = {
        animate: { 
            rotate: 360, 
            transition: { duration: 40, ease: "linear", repeat: Infinity }
        },
    };

    const satelliteVariants = {
        animate: (i: number) => ({
            offsetDistance: ["0%", "100%"],
            transition: { 
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
            }
        }),
    };

    return (
        <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }}
            />
            
            <motion.div 
                className="absolute inset-0 z-10"
                variants={mainGlobeVariants}
                initial="initial"
                animate="animate"
            >
                <div className="relative w-full h-full flex justify-center items-center">
                    {/* Orbit Paths */}
                    <motion.div 
                        className="absolute w-full h-full border border-dashed border-primary/30 rounded-full"
                        style={{ transform: "rotateX(70deg) rotateZ(0deg)" }}
                        variants={orbitVariants}
                        animate="animate"
                    />
                     <motion.div 
                        className="absolute w-[85%] h-[85%] border border-dashed border-accent/30 rounded-full"
                        style={{ transform: "rotateX(70deg) rotateZ(60deg)" }}
                        variants={orbitVariants}
                        animate="animate"
                    />

                    {/* Central Globe */}
                     <div className="relative w-[70%] h-[70%] bg-gradient-to-br from-primary via-primary/50 to-accent rounded-full flex items-center justify-center shadow-xl">
                        <Globe className="h-4/5 w-4/5 text-primary-foreground/50" strokeWidth={0.5} />
                    </div>

                    {/* Orbit 1 */}
                    <motion.div
                        className="absolute w-full h-full"
                        style={{ transform: "rotateX(70deg) rotateZ(0deg)" }}
                        variants={orbitVariants}
                        animate="animate"
                    >
                         <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent shadow-lg"
                            custom={1}
                            variants={satelliteVariants}
                            animate="animate"
                            style={{ offsetPath: `path("M 0,${140 * (window.innerWidth > 640 ? 1 : 0.7)} a ${140 * (window.innerWidth > 640 ? 1 : 0.7)},${140 * (window.innerWidth > 640 ? 1 : 0.7)} 0 1,0 ${280 * (window.innerWidth > 640 ? 1 : 0.7)},0 a ${140 * (window.innerWidth > 640 ? 1 : 0.7)},${140 * (window.innerWidth > 640 ? 1 : 0.7)} 0 1,0 -${280 * (window.innerWidth > 640 ? 1 : 0.7)},0")` }}
                         />
                    </motion.div>
                    
                    {/* Orbit 2 */}
                    <motion.div
                        className="absolute w-[85%] h-[85%]"
                        style={{ transform: "rotateX(70deg) rotateZ(60deg)" }}
                        variants={orbitVariants}
                        animate="animate"
                    >
                          <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            custom={2}
                            variants={satelliteVariants}
                            animate="animate"
                            style={{ offsetPath: `path("M 0,${119 * (window.innerWidth > 640 ? 1 : 0.7)} a ${119 * (window.innerWidth > 640 ? 1 : 0.7)},${119 * (window.innerWidth > 640 ? 1 : 0.7)} 0 1,0 ${238 * (window.innerWidth > 640 ? 1 : 0.7)},0 a ${119 * (window.innerWidth > 640 ? 1 : 0.7)},${119 * (window.innerWidth > 640 ? 1 : 0.7)} 0 1,0 -${238 * (window.innerWidth > 640 ? 1 : 0.7)},0")` }}
                         >
                            <GitMerge className="w-4 h-4 text-primary" />
                         </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
