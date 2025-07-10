// src/app/porque-somos-ciencia/page.tsx
import CienciaClientPage from '@/components/porque-somos-ciencia-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Por Qué Somos Ciencia - PLES',
  description: 'Descubra cómo nuestro compromiso con el rigor metodológico, la investigación y la evidencia impulsa soluciones efectivas y confiables.',
};

export default function PorqueSomosCienciaPage() {
  // This is a server component that renders the client component.
  // It's a good pattern for fetching data in the future if needed,
  // while keeping interactions on the client.
  return <CienciaClientPage />;
}
