'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Database, ShieldCheck, BarChart3, HeartPulse, ChevronRight } from 'lucide-react';

const DataPipelineIllustration = ({ className }: { className?: string }) => {
    const stations = [
        { icon: Database, label: "Consolidación" },
        { icon: ShieldCheck, label: "Seguridad y Cumplimiento" },
        { icon: BarChart3, label: "Análisis e Inteligencia" },
        { icon: HeartPulse, label: "Decisiones Clínicas" },
    ];

    return (
        <div className={cn("relative h-full w-full bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] p-4 md:p-8 flex items-center justify-center overflow-hidden", className)}>
             <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                    <pattern id="pipelineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pipelineGrid)" />
             </svg>
            <div className="z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 w-full max-w-4xl">
               {stations.map((station, index) => {
                   const Icon = station.icon;
                   const isHeart = Icon === HeartPulse;
                   return (
                       <React.Fragment key={index}>
                           <div className="flex flex-col items-center text-center gap-2 animate-station-pop-in" style={{ animationDelay: `${index * 0.3}s` }}>
                               <div className={cn(
                                   "relative flex items-center justify-center bg-background/80 backdrop-blur-sm border-2 border-primary/30 rounded-full p-3 md:p-4 shadow-lg shadow-primary/20"
                                )}>
                                   {isHeart ? (
                                     <>
                                        <div className="absolute inset-0 h-full w-full">
                                            <div className="absolute inset-0 rounded-full bg-accent/50 animate-heart-pulse-ring" />
                                            <div className="absolute inset-0 rounded-full bg-accent/60 animate-heart-pulse-ring" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                        <Icon className="relative z-10 h-7 w-7 md:h-8 md:w-8 text-primary animate-heart-pulse-icon" />
                                     </>
                                   ) : (
                                     <>
                                        <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                                        <div className="absolute -inset-1 border-2 border-accent/50 rounded-full animate-pulse-glow-shield" 
                                             style={{ 
                                                animationDuration: '4s', 
                                                animationDelay: `${index * 0.5}s`
                                             }}
                                        />
                                     </>
                                   )}
                               </div>
                               <span className="text-xs font-medium text-primary-foreground max-w-24">{station.label}</span>
                           </div>
                           {index < stations.length - 1 && (
                               <div className="relative h-12 w-full md:h-auto md:w-full flex-grow flex items-center justify-center animate-station-pop-in" style={{ animationDelay: `${(index + 0.5) * 0.3}s` }}>
                                   {/* Vertical line for mobile */}
                                   <div className="w-0.5 h-full bg-gradient-to-b from-primary/20 via-accent/50 to-primary/20 md:hidden"/>
                                   {/* Horizontal line for desktop */}
                                   <div className="h-0.5 w-full bg-gradient-to-r from-primary/20 via-accent/50 to-primary/20 hidden md:block"/>
                                   
                                   {/* Animated chevron */}
                                   <ChevronRight className="h-6 w-6 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-flow-pulse" style={{ animationDelay: `${index * 0.4}s`}}/>
                               </div>
                           )}
                       </React.Fragment>
                   )
               })}
            </div>
        </div>
    );
};
export default DataPipelineIllustration;
