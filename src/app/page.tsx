// src/app/page.tsx
import { getHeroStatements } from '@/app/actions/content-actions';
import HomePageClient from '@/components/home/home-page-client';
import { type HeroStatement } from '@/lib/models/content';

// This is the main page component
export default async function Page() {
  const initialHeroStatements: HeroStatement[] = await getHeroStatements();
  return <HomePageClient initialHeroStatements={initialHeroStatements} />;
}
