// src/components/language-selector.tsx
'use client';

import React from 'react';
import { useLanguage, AVAILABLE_LANGUAGES, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'floating' | 'compact';
  className?: string;
}

export function LanguageSelector({ variant = 'header', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, currentLanguageMeta, availableLanguages } = useLanguage();
  const { toast } = useToast();

  const handleSelectLanguage = (code: Language) => {
    if (code === language) return;
    setLanguage(code);

    const targetMeta = availableLanguages.find((l) => l.code === code);
    const notifications: Record<Language, string> = {
      es: 'Idioma cambiado a Español 🇪🇸',
      en: 'Language changed to English 🇺🇸',
      fr: 'Langue changée en Français 🇫🇷',
      pt: 'Idioma alterado para Português 🇧🇷',
      de: 'Sprache geändert auf Deutsch 🇩🇪',
      it: 'Lingua cambiata in Italiano 🇮🇹',
    };

    toast({
      title: notifications[code] || `Idioma: ${targetMeta?.label}`,
      description: targetMeta?.nativeName,
      duration: 2500,
    });
  };

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full shadow-2xl bg-card/90 backdrop-blur-md border-2 border-primary/30 hover:border-primary px-3.5 py-2 h-11 flex items-center gap-2 group"
            >
              <Globe className="h-4 w-4 text-primary group-hover:rotate-45 transition-transform" />
              <span className="text-base">{currentLanguageMeta.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider font-mono">
                {currentLanguageMeta.code}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 p-2 rounded-2xl shadow-2xl border-2">
            <DropdownMenuLabel className="text-xs font-mono uppercase text-muted-foreground px-2 py-1.5 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-primary" />
              Seleccionar Idioma
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableLanguages.map((lang) => {
              const isActive = lang.code === language;
              return (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer text-xs font-semibold ${
                    isActive ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-muted-foreground font-mono uppercase">
                      ({lang.code})
                    </span>
                  </span>
                  {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Header / Default Variant
  return (
    <div className={`inline-flex items-center ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-2.5 rounded-lg border border-transparent hover:border-border hover:bg-accent/60 flex items-center gap-1.5 text-foreground transition-all"
            aria-label="Seleccionar idioma"
          >
            <Globe className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm">{currentLanguageMeta.flag}</span>
            <span className="text-xs font-bold uppercase font-mono tracking-wider">
              {currentLanguageMeta.code}
            </span>
            <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 p-1.5 rounded-2xl shadow-xl border border-border">
          <DropdownMenuLabel className="text-[11px] font-mono uppercase text-muted-foreground px-2 py-1 flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-primary" />
            Idioma / Language
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableLanguages.map((lang) => {
            const isActive = lang.code === language;
            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer text-xs font-medium transition-colors ${
                  isActive ? 'bg-primary/15 text-primary font-bold' : 'hover:bg-muted text-foreground'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                  <span className="text-[10px] text-muted-foreground font-mono uppercase">
                    ({lang.code})
                  </span>
                </span>
                {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
