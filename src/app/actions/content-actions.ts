'use server';

import { collection, getDocs, query, orderBy, doc, updateDoc, addDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { HeroStatement, HeroStatementSchema, CoreValue, CoreValueSchema, Pillar, PillarSchema } from '@/lib/models/content';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const sdkNotInitializedError = { message: "Firebase Admin SDK is not configured. Server-side features are disabled.", success: false };

/**
 * Fetches hero statements from Firestore. If the collection is empty or only contains placeholders,
 * it seeds it with default statements.
 */
export async function getHeroStatements(): Promise<HeroStatement[]> {
  const defaultStatements = [
      {
        title: "Datos, ingeniería y propósito para el {{word}}",
        description: "De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.",
        ctaText: "Empieza hoy",
        ctaLink: "/forms",
        ctaIconName: "Send",
        ctaVariant: 'accent',
        order: 1,
      },
      {
        title: "Innovación que Impacta, Estrategias que Perduran",
        description: "Creamos soluciones a medida que impulsan el progreso y construyen un legado sostenible para su organización.",
        ctaText: "Conoce cómo",
        ctaLink: "/innovacion-estrategias",
        ctaIconName: "BookOpen",
        ctaVariant: 'accent',
        order: 2,
      },
      {
        title: "Soluciones {{word}} para Desafíos Complejos",
        description: "Tecnología, datos y estrategia al servicio de tus metas.",
        ctaText: "Explora Servicios",
        ctaLink: "/#nuestras-marcas",
        ctaIconName: "Layers",
        ctaVariant: 'accent',
        order: 3,
      },
    ];

  if (!adminDb) {
    console.warn(sdkNotInitializedError.message + ' (getHeroStatements)');
    return defaultStatements;
  }
  try {
    const heroStatementsCollection = collection(adminDb, 'heroStatements');
    const q = query(heroStatementsCollection, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    
    const hasMeaningfulData = snapshot.docs.some(doc => doc.data().title);

    if (snapshot.empty || !hasMeaningfulData) {
      const batch = writeBatch(adminDb);
      
      // Delete existing placeholder docs if they exist
      snapshot.docs.forEach(doc => batch.delete(doc.ref));

      defaultStatements.forEach((stmt, index) => {
          const docRef = doc(heroStatementsCollection); // Auto-generate ID
          const dataToCreate = { ...stmt, order: index, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
          batch.set(docRef, dataToCreate);
      });
      await batch.commit();

      const newSnapshot = await getDocs(q);
      return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroStatement));
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      const validatedData = HeroStatementSchema.safeParse({ id: doc.id, ...data });
      if (validatedData.success) return validatedData.data;
      console.warn(`Invalid hero statement data in Firestore ${doc.id}:`, validatedData.error);
      return null;
    }).filter(Boolean) as HeroStatement[];

  } catch (error) {
    console.error('Error fetching hero statements:', error);
    return defaultStatements;
  }
}

const UpdateHeroStatementInputSchema = HeroStatementSchema.pick({ 
    title: true, 
    description: true,
});

export async function updateHeroStatement(
    id: string,
    data: z.infer<typeof UpdateHeroStatementInputSchema>
): Promise<{ success: boolean; message: string | null }> {
    if (!adminDb) return sdkNotInitializedError;
    if (!id) return { success: false, message: 'Statement ID is missing.' };

    try {
        const validatedData = UpdateHeroStatementInputSchema.safeParse(data);
        if (!validatedData.success) {
            return { success: false, message: 'Invalid data provided.' };
        }

        const statementRef = doc(adminDb, 'heroStatements', id);
        await updateDoc(statementRef, { ...validatedData.data, updatedAt: serverTimestamp() });

        revalidatePath('/'); 
        revalidatePath('/admin/content-management');
        return { success: true, message: 'Hero statement updated successfully.' };
    } catch (error) {
        console.error('Error updating hero statement:', error);
        return { success: false, message: 'Failed to update statement.' };
    }
}


// --- Core Values Actions ---
export async function getCoreValues(): Promise<CoreValue[]> {
    const defaultValues = [
        { id: 'colaboracion', name: 'COLABORACIÓN', iconName: 'UsersIcon', explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos la sinergia entre equipos multidisciplinarios y promovemos alianzas estratégicas para co-crear soluciones integrales que superan las expectativas y generan un impacto duradero.", order: 0 },
        { id: 'innovacion', name: 'INNOVACIÓN', iconName: 'Lightbulb', explanation: "Como motor de nuestro progreso, la innovación nos impulsa a desafiar el status quo y a explorar constantemente nuevas tecnologías y metodologías. Convertimos ideas audaces en soluciones prácticas que aportan un valor tangible y sostenible a nuestros clientes.", order: 1 },
        { id: 'integridad', name: 'INTEGRIDAD', iconName: 'Shield', explanation: "Actuamos con honestidad, transparencia y ética profesional en cada interacción. La integridad es el pilar de la confianza que construimos con nuestros clientes, socios y la comunidad, garantizando que nuestras acciones siempre estén alineadas con nuestros principios.", order: 2 },
    ];
    if (!adminDb) {
        console.warn(sdkNotInitializedError.message + ' (getCoreValues)');
        return defaultValues;
    }
    try {
        const valuesCollection = collection(adminDb, 'coreValues');
        const q = query(valuesCollection, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        
        const hasMeaningfulData = snapshot.docs.some(doc => doc.data().name);

        if (snapshot.empty || !hasMeaningfulData) {
            const batch = writeBatch(adminDb);
            
            // Delete existing placeholder docs if they exist
            snapshot.docs.forEach(doc => batch.delete(doc.ref));

            defaultValues.forEach(value => {
                const { id, ...data } = value;
                const docRef = doc(valuesCollection, id);
                batch.set(docRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
            });
            await batch.commit();
            return defaultValues;
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CoreValue));
    } catch (error) {
        console.error('Error fetching core values:', error);
        return defaultValues;
    }
}

export async function updateCoreValue(id: string, data: { name: string; explanation: string }): Promise<{ success: boolean; message: string | null }> {
    if (!adminDb) return sdkNotInitializedError;
    if (!id) return { success: false, message: 'Core value ID is missing.' };
    try {
        const validatedData = CoreValueSchema.pick({ name: true, explanation: true }).safeParse(data);
        if (!validatedData.success) return { success: false, message: 'Invalid data.' };
        
        const valueRef = doc(adminDb, 'coreValues', id);
        await updateDoc(valueRef, { ...validatedData.data, updatedAt: serverTimestamp() });
        
        revalidatePath('/about');
        revalidatePath('/admin/content-management');
        return { success: true, message: 'Core value updated.' };
    } catch (error) {
        console.error('Error updating core value:', error);
        return { success: false, message: 'Failed to update core value.' };
    }
}


// --- Pillars Actions ---
export async function getPillars(): Promise<Pillar[]> {
    const defaultPillars = [
        { id: 'ciencia', title: 'Ciencia', description: 'El rigor metodológico como pilar de la confianza y la efectividad.', link: '/porque-somos-ciencia', iconName: 'FlaskConical', order: 0 },
        { id: 'tecnologia', title: 'Tecnología', description: 'Herramientas de vanguardia como catalizadores de la eficiencia y la escala.', link: '/porque-somos-tecnologia', iconName: 'Cpu', order: 1 },
        { id: 'innovacion', title: 'Innovación', description: 'La creatividad y el pensamiento disruptivo para generar valor sostenible.', link: '/porque-somos-innovacion', iconName: 'Lightbulb', order: 2 },
    ];
    if (!adminDb) {
        console.warn(sdkNotInitializedError.message + ' (getPillars)');
        return defaultPillars;
    }
    try {
        const pillarsCollection = collection(adminDb, 'pillars');
        const q = query(pillarsCollection, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);

        const hasMeaningfulData = snapshot.docs.some(doc => doc.data().title);

        if (snapshot.empty || !hasMeaningfulData) {
            const batch = writeBatch(adminDb);
            
            // Delete existing placeholder docs if they exist
            snapshot.docs.forEach(doc => batch.delete(doc.ref));

            defaultPillars.forEach(pillar => {
                const { id, ...data } = pillar;
                const docRef = doc(pillarsCollection, id);
                batch.set(docRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
            });
            await batch.commit();
            return defaultPillars;
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pillar));
    } catch (error) {
        console.error('Error fetching pillars:', error);
        return defaultPillars;
    }
}

export async function updatePillar(id: string, data: { title: string; description: string }): Promise<{ success: boolean; message: string | null }> {
    if (!adminDb) return sdkNotInitializedError;
    if (!id) return { success: false, message: 'Pillar ID is missing.' };
    try {
        const validatedData = PillarSchema.pick({ title: true, description: true }).safeParse(data);
        if (!validatedData.success) return { success: false, message: 'Invalid data.' };

        const pillarRef = doc(adminDb, 'pillars', id);
        await updateDoc(pillarRef, { ...validatedData.data, updatedAt: serverTimestamp() });

        revalidatePath('/about');
        revalidatePath('/admin/content-management');
        return { success: true, message: 'Pillar updated.' };
    } catch (error) {
        console.error('Error updating pillar:', error);
        return { success: false, message: 'Failed to update pillar.' };
    }
}
