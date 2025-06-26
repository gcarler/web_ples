// src/app/actions/crm-actions.ts
'use server';

import { Timestamp as AdminTimestamp } from 'firebase-admin/firestore';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { ContactInputSchema, ContactFirestore, ContactFirestoreSchema } from '@/lib/models/contact';
import { OpportunityInputSchema, Opportunity, OpportunityFirestore, OpportunityFirestoreSchema, OpportunityStageSchema, OpportunityStage } from '@/lib/models/opportunity';
import { revalidatePath } from 'next/cache';
import { checkProductStock } from '@/services/erp-service';
import { startOpportunityToCashProcess } from '@/services/bpm-service';
import { addDays } from 'date-fns';

const AddContactInputSchema = ContactInputSchema.omit({ createdAt: true, updatedAt: true });
const sdkNotInitializedError = { message: "Firebase Admin SDK is not configured. Server-side features are disabled.", success: false };

export async function addContact(
  prevState: { message: string | null; success: boolean },
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  if (!adminDb) {
    console.error(sdkNotInitializedError.message);
    return sdkNotInitializedError;
  }
  try {
    const rawData = Object.fromEntries(formData.entries());

     const dataToValidate = {
      ...rawData,
      subscribe: rawData.subscribe === 'on' || false,
      leadSource: rawData.leadSource,
      phone: rawData.phone || undefined,
      company: rawData.company || undefined,
      email: rawData.email || undefined,
      title: rawData.title || undefined,
      bio: rawData.bio || undefined,
    };

    const validatedData = AddContactInputSchema.safeParse(dataToValidate);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues.map(issue => `Error in field '${issue.path.join('.')}': ${issue.message}`).join('; ');
      return { message: `Invalid form data: ${errorMessages}`, success: false };
    }

    const contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = validatedData.data;

    const contactWithTimestamps = { ...contactData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const docRef = await addDoc(collection(adminDb, 'contacts'), contactWithTimestamps);

    if (contactData.leadSource === 'Web Form') {
      await createOpportunity({
        name: `Opportunity for ${contactData.name} (Web Lead)`,
        contactId: docRef.id,
        stage: 'Prospecting',
        description: `Generated from web form submission. Bio: ${contactData.bio || 'N/A'}`,
        amount: 0,
        closeDate: addDays(new Date(), 30),
      });
      revalidatePath('/admin/crm/opportunities');
    }

    revalidatePath('/admin/crm');
    revalidatePath('/forms');
    return { message: 'Contact added successfully!', success: true };
  } catch (error) {
    console.error('Error adding contact:', error);
    let errorMessage = 'Failed to add contact due to a server error.';
    if (error instanceof Error) errorMessage = `Failed to add contact: ${error.message}`;
    return { message: errorMessage, success: false };
  } finally {
    revalidatePath('/admin/crm');
  }
}

export async function getContacts(): Promise<ContactFirestore[]> {
  if (!adminDb) {
    console.error(sdkNotInitializedError.message);
    return [];
  }
  try {
    const contactsCol = collection(adminDb, 'contacts');
    const q = query(contactsCol, orderBy('createdAt', 'desc'));
    const contactSnapshot = await getDocs(q);

    return contactSnapshot.docs.map(doc => {
      const data = doc.data();
      const dataWithDates = { ...data, createdAt: data.createdAt?.toDate(), updatedAt: data.updatedAt?.toDate() };
      const parsedData = ContactFirestoreSchema.safeParse(dataWithDates);

      if (!parsedData.success) {
        console.warn(`Invalid contact data in Firestore ${doc.id}:`, parsedData.error);
        return {
          id: doc.id,
          name: 'Invalid Data',
          email: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          leadSource: 'Other',
          subscribe: false,
        } as ContactFirestore;
      }
      return { id: doc.id, ...parsedData.data };
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

const CreateOpportunityInputSchema = OpportunityInputSchema.omit({ createdAt: true, updatedAt: true });

export async function createOpportunity(
    input: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ id: string; message: string | null; success: boolean }> {
  if (!adminDb) {
    console.error(sdkNotInitializedError.message);
    return { ...sdkNotInitializedError, id: '' };
  }
  try {
    const validatedData = CreateOpportunityInputSchema.safeParse(input);
    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues.map(issue => `Error in field '${issue.path.join('.')}': ${issue.message}`).join('; ');
      return { id: '', message: `Invalid opportunity data: ${errorMessages}`, success: false };
    }

    const { closeDate, ...restOfData } = validatedData.data;
    const opportunityWithTimestamps = {
      ...restOfData,
      closeDate: closeDate ? AdminTimestamp.fromDate(closeDate) : undefined,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(adminDb, 'opportunities'), opportunityWithTimestamps);
    revalidatePath('/admin/crm/opportunities');
    return { id: docRef.id, message: 'Opportunity created successfully!', success: true };
  } catch (error) {
    console.error('Error creating opportunity:', error);
    let errorMessage = 'Failed to create opportunity due to a server error.';
    if (error instanceof Error) errorMessage = `Failed to create opportunity: ${error.message}`;
    return { id: '', message: errorMessage, success: false };
  }
}

export async function getOpportunities(): Promise<OpportunityFirestore[]> {
  if (!adminDb) {
    console.error(sdkNotInitializedError.message);
    return [];
  }
  try {
    const opportunitiesCol = collection(adminDb, 'opportunities');
    const q = query(opportunitiesCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const opportunities = snapshot.docs.map(doc => {
      const data = doc.data();
      const dataWithDates = {
        ...data,
        closeDate: data.closeDate?.toDate(),
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
      const parsedData = OpportunityFirestoreSchema.safeParse(dataWithDates);

      if (!parsedData.success) {
        console.warn(`Invalid opportunity data in Firestore ${doc.id}:`, parsedData.error);
        return {
          id: doc.id,
          name: 'Invalid Opportunity Data',
          contactId: '',
          stage: 'Prospecting',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as OpportunityFirestore;
      }
      return { id: doc.id, ...parsedData.data };
    });
    
    opportunities.sort((a, b) => (b.closeDate?.getTime() ?? Number.MIN_SAFE_INTEGER) - (a.closeDate?.getTime() ?? Number.MIN_SAFE_INTEGER));
    return opportunities;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

export async function updateOpportunityStage(
    opportunityId: string,
    newStage: OpportunityStage
): Promise<{ message: string | null; success: boolean }> {
  if (!adminDb) {
    console.error(sdkNotInitializedError.message);
    return sdkNotInitializedError;
  }
  try {
    const validatedStage = OpportunityStageSchema.safeParse(newStage);
    if (!validatedStage.success) {
      return { message: 'Invalid stage provided.', success: false };
    }

    const oppRef = doc(collection(adminDb, 'opportunities'), opportunityId);
    const oppSnap = await getDoc(oppRef);
    if (!oppSnap.exists()) {
      return { message: 'Opportunity not found.', success: false };
    }

    await updateDoc(oppRef, { stage: validatedStage.data, updatedAt: serverTimestamp() });

    if (validatedStage.data === 'Closed Won') {
      const currentOppData = oppSnap.data();
      if (!currentOppData) {
        return { message: 'Could not retrieve opportunity data for BPM trigger.', success: false };
      }
      const dataWithDates = {
        ...currentOppData,
        closeDate: currentOppData.closeDate?.toDate(),
        createdAt: currentOppData.createdAt?.toDate(),
        updatedAt: currentOppData.updatedAt?.toDate(), // This will be slightly old, but acceptable
      };
      const parsedCurrentData = OpportunityFirestoreSchema.safeParse(dataWithDates);
      if (!parsedCurrentData.success) {
        console.error(`Failed to parse opportunity data ${opportunityId} before triggering BPM:`, parsedCurrentData.error);
        revalidatePath('/admin/crm/opportunities');
        return { message: 'Opportunity stage updated, but failed to parse data for order process.', success: true };
      }
      
      const success = await startOpportunityToCashProcess(opportunityId, { id: opportunityId, ...parsedCurrentData.data });
      if (!success) {
        console.error(`Failed to trigger BPM process for opportunity ${opportunityId}.`);
      }
    }

    revalidatePath('/admin/crm/opportunities');
    return { message: 'Opportunity stage updated successfully!', success: true };
  } catch (error: any) {
    console.error('Error updating opportunity stage:', error);
    return { message: `Failed to update opportunity stage: ${error.message}`, success: false };
  }
}

export async function checkProductAvailability(productId: string): Promise<{ available: boolean; stockLevel: number | null }> {
    try {
        const stockInfo = await checkProductStock(productId);
        if (stockInfo) {
            return { available: stockInfo.stockLevel > 0, stockLevel: stockInfo.stockLevel };
        }
        return { available: false, stockLevel: null };
    } catch (error) {
        console.error("Error checking product stock:", error);
        return { available: false, stockLevel: null };
    }
}
