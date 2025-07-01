'use server';

import { collection, getDocs } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config';

// Define a type for a city for better type safety
export interface City {
  name: string;
  state: string | null;
  country: string;
  capital?: boolean;
  population?: number;
  regions?: string[];
}

// Get a list of cities from your database
export async function getCities(): Promise<City[]> {
  // Use adminDb for server-side operations
  if (!adminDb) {
    console.error("Firebase Admin SDK is not initialized. Server-side features are disabled.");
    // Return dummy data for UI development without full backend setup
    return [
        { name: 'Los Angeles', state: 'CA', country: 'USA' },
        { name: 'Tokyo', state: null, country: 'Japan' },
        { name: 'London', state: null, country: 'United Kingdom' },
    ];
  }

  try {
    const citiesCol = collection(adminDb, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    if (citySnapshot.empty) {
        console.log("No documents found in 'cities' collection.");
        return [];
    }
    const cityList = citySnapshot.docs.map(doc => doc.data() as City);
    return cityList;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}
