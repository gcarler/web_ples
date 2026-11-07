'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  'territorio',
  'comunidad',
  'empresa',
  'organización',
  'sueño',
];

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative align-baseline min-w-[210px] sm:min-w-[280px] h-[1.15em] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={WORDS[index]}
          initial={isMounted ? { y: '100%', opacity: 0, filter: 'blur(6px)' } : false}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#009FE3] to-[#48CAE4] drop-shadow-sm font-bold whitespace-nowrap"
        >
          {WORDS[index]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
