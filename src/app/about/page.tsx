// src/app/about/page.tsx
'use client'

import { getCoreValues, getPillars } from '@/app/actions/content-actions';
import AboutPageClient from './about-page-client'; // The new client component
import { useState, useEffect } from 'react';
import { type CoreValue, type Pillar } from '@/lib/models/content';

export default function AboutPage() {
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedValues, fetchedPillars] = await Promise.all([
          getCoreValues(),
          getPillars()
        ]);
        setCoreValues(fetchedValues);
        setPillars(fetchedPillars);
      } catch (error) {
        console.error("Failed to fetch about page data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    // You can return a skeleton loader here if you want
    return <div>Loading...</div>;
  }

  // Pass data to the client component
  return <AboutPageClient initialCoreValues={coreValues} initialPillars={pillars} />;
}
