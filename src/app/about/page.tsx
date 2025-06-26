// src/app/about/page.tsx
import { getCoreValues, getPillars } from '@/app/actions/content-actions';
import AboutPageClient from './about-page-client'; // The new client component

export const metadata = {
  title: 'Sobre PLES - Fusión de Visión Global y Enfoque Multidisciplinario',
  description: 'Conozca PLES, donde fusionamos visión global y enfoque multidisciplinario para construir un legado de impacto y sostenibilidad a través de la ciencia, la tecnología y la innovación.',
};

export default async function AboutPage() {
  // Fetch data on the server
  const coreValues = await getCoreValues();
  const pillars = await getPillars();

  // Pass data to the client component
  return <AboutPageClient initialCoreValues={coreValues} initialPillars={pillars} />;
}
