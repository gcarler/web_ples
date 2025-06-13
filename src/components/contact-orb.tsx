// src/components/contact-orb.tsx
'use client';

import { useState, useEffect } from 'react';
import { Mail, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserForm } from '@/components/forms/user-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function ContactOrb() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when panel is open
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPanelOpen]);

  return (
    <>
      {/* The Orb */}
      <button
        id="ples-drop"
        onClick={togglePanel}
        className={cn(
          "fixed bottom-[30px] left-[30px] w-[60px] h-[60px] rounded-full cursor-pointer z-[998]",
          "flex justify-center items-center text-white text-3xl font-bold",
          "shadow-[0_5px_20px_rgba(0,174,239,0.5)] transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
          "hover:scale-115 hover:rotate-[-15deg] hover:shadow-[0_8px_30px_rgba(0,174,239,0.8)]",
          "bg-[var(--ples-gradient-radial)]", // Using CSS variable for gradient
          isPanelOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100', // Hide orb when panel is open
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        aria-label="Abrir Formulario de Contacto"
      >
        <MessageSquare size={32} />
      </button>

      {/* The Fullscreen Panel */}
      <div
        id="drop-panel"
        className={cn(
          "fixed inset-0 z-[1000] flex justify-center items-center overflow-hidden",
          isPanelOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        )}
        onClick={(e) => {
          // Close panel if clicking on the backdrop itself (panel background)
          if (e.target === e.currentTarget.querySelector('.panel-background-container > div')) {
            // A bit more specific selector for the background div itself
             togglePanel();
          }
        }}
      >
        {/* Panel Background (Expanding Circle) */}
        <div className="panel-background-container absolute inset-0 overflow-hidden"> {/* Added container for centering and click detection */}
            <div
            className={cn(
                "absolute w-[300vw] h-[300vw] rounded-full",
                "bg-[var(--ples-gradient-radial)]", // Using CSS variable for gradient
                "top-[100%] left-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]",
                isPanelOpen ? "translate-x-[-50%] translate-y-[-50%] scale-100" : "translate-x-[-50%] translate-y-[-50%] scale-0"
            )}
            />
        </div>


        {/* Panel Content */}
        <div
          className={cn(
            "relative text-center w-full max-w-xl md:max-w-2xl lg:max-w-3xl px-4",
            "transition-all duration-[600ms] ease-[ease] delay-[500ms]",
            isPanelOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
          )}
        >
          {/* Close Button for the Panel */}
          <button
            onClick={togglePanel}
            className={cn(
              "absolute top-[-50px] md:top-[-35px] right-[-10px] md:right-[-5px] p-2 rounded-full cursor-pointer text-white opacity-80 transition-all duration-300 ease-[ease]",
              "hover:opacity-100 hover:rotate-180 hover:scale-110 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            )}
            aria-label="Cerrar Formulario de Contacto"
          >
            <X size={32} />
          </button>
          
          <Card className="w-full bg-card text-card-foreground shadow-2xl max-h-[90vh] overflow-y-auto rounded-lg">
            <CardHeader className="pt-6 pb-4">
              <CardTitle className="text-2xl md:text-3xl">Conéctate con Nosotros</CardTitle>
              <CardDescription className="text-sm md:text-base">
                ¿Tienes una idea o proyecto en mente? Déjanos tus datos y nos pondremos en contacto.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-6">
              <UserForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
