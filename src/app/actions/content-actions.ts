'use server';

import { collection, getDocs, query, orderBy, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { HeroStatement, HeroStatementSchema } from '@/lib/models/content';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const sdkNotInitializedError = { message: "Firebase Admin SDK is not configured. Server-side features are disabled.", success: false };

/**
 * Fetches hero statements from Firestore. If the collection is empty,
 * it seeds it with default statements.
 */
export async function getHeroStatements(): Promise<HeroStatement[]> {
  if (!adminDb) {
    console.error(sdkNotInitializedError.message);
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
  try {
    const heroStatementsCollection = collection(adminDb, 'heroStatements');
    const q = query(heroStatementsCollection, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No hero statements found. Seeding database with default statements.');
      const defaultStatements = [
        {
          title: "Datos, ingeniería y propósito para el desarrollo",
          description: "De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.",
          ctaText: "Empieza hoy",
          ctaLink: "/forms",
          ctaIconName: "Send",
          ctaVariant: 'accent',
        },
        {
          title: "Innovación que Impacta, Estrategias que Perduran",
          description: "Creamos soluciones a medida que impulsan el progreso y construyen un legado sostenible para su organización.",
          ctaText: "Conoce cómo",
          ctaLink: "/innovacion-estrategias",
          ctaIconName: "BookOpen",
          ctaVariant: 'accent',
        },
        {
          title: "Soluciones Integrales para Desafíos Complejos",
          description: "Tecnología, datos y estrategia al servicio de tus metas.",
          ctaText: "Explora Servicios",
          ctaLink: "/#nuestras-marcas",
          ctaIconName: "Layers",
          ctaVariant: 'accent',
        },
      ];
      
      await Promise.all(defaultStatements.map((stmt, index) => {
          const dataToCreate = { ...stmt, order: index, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
          return addDoc(heroStatementsCollection, dataToCreate);
      }));
      
      const newSnapshot = await getDocs(q);
      return newSnapshot.docs.map(doc => {
          const data = doc.data();
          const dataWithDates = {
              ...data,
              createdAt: data.createdAt?.toDate(),
              updatedAt: data.updatedAt?.toDate(),
          };
          return { id: doc.id, ...dataWithDates } as HeroStatement;
      });
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      const dataWithDates = {
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
      };
      const validatedData = HeroStatementSchema.safeParse({ id: doc.id, ...dataWithDates });

      if (validatedData.success) {
        return validatedData.data;
      }
      
      console.warn(`Invalid hero statement data in Firestore ${doc.id}:`, validatedData.error);
      return null;
    }).filter(Boolean) as HeroStatement[];

  } catch (error) {
    console.error('Error fetching hero statements:', error);
    return [];
  }
}

const UpdateHeroStatementInputSchema = HeroStatementSchema.omit({ id: true, createdAt: true, updatedAt: true });

export async function updateHeroStatement(
    id: string,
    data: z.infer<typeof UpdateHeroStatementInputSchema>
): Promise<{ success: boolean; message: string | null }> {
    if (!adminDb) {
      console.error(sdkNotInitializedError.message);
      return sdkNotInitializedError;
    }
    if (!id) {
        return { success: false, message: 'Statement ID is missing.' };
    }
    try {
        const validatedData = UpdateHeroStatementInputSchema.safeParse(data);
        if (!validatedData.success) {
            console.error('Validation Error:', validatedData.error.flatten().fieldErrors);
            return { success: false, message: 'Invalid data provided.' };
        }

        const statementRef = doc(collection(adminDb, 'heroStatements'), id);
        await updateDoc(statementRef, {
            ...validatedData.data,
            updatedAt: serverTimestamp(),
        });

        revalidatePath('/'); // Revalidate homepage
        revalidatePath('/admin/content-management'); // Revalidate admin page
        return { success: true, message: 'Hero statement updated successfully.' };
    } catch (error) {
        console.error('Error updating hero statement:', error);
        return { success: false, message: 'Failed to update statement.' };
    }
}
