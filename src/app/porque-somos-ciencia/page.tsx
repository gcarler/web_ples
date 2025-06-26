// src/app/porque-somos-ciencia/page.tsx
import CienciaClientPage from '@/components/porque-somos-ciencia-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Por Qué Somos Ciencia - PLES',
  description: 'Descubra cómo nuestro compromiso con el rigor metodológico, la investigación y la evidencia impulsa soluciones efectivas y confiables.',
};

export default function PorqueSomosCienciaPage() {
  return <CienciaClientPage />;
}
