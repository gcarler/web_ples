import { getHeroStatements } from '@/app/actions/content-actions';
import HomePageClient from '@/components/home/home-page-client';
import { HeroStatement } from '@/lib/models/content';
import { getTranslations } from 'next-intl/server';

async function getStatements(): Promise<HeroStatement[]> {
  try {
    return await getHeroStatements();
  } catch (error) {
    console.error("Failed to fetch hero statements for homepage:", error);
    // Return a default hardcoded statement as a fallback
    return [
      {
        title: "Datos, ingeniería y propósito para el desarrollo",
        description: "De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.",
        ctaText: "Empieza hoy",
        ctaLink: "/forms",
        ctaIconName: "Send",
        ctaVariant: 'accent',
        order: 1,
      },
    ];
  }
}

export default async function Home() {
  const heroStatements = await getStatements();
  const t = await getTranslations('HomePage');

  const translatedStatements = heroStatements.map((stmt, index) => ({
      ...stmt,
      title: t(`heroStatements.${index}.title`),
      description: t(`heroStatements.${index}.description`),
      ctaText: t(`heroStatements.${index}.ctaText`)
  }));

  return <HomePageClient initialHeroStatements={translatedStatements} />;
}
