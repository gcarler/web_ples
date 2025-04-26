// src/app/actions/crm-actions.ts
'use server';

import { z } from 'zod';
import { collection, addDoc, getDocs, Timestamp, query, orderBy, doc, updateDoc, getDoc } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config'; // Use Admin SDK for server actions
import { ContactSchema, Contact, ContactFirestore, ContactFirestoreSchema, LeadSourceSchema } from '@/lib/models/contact';
import { OpportunitySchema, Opportunity, OpportunityFirestore, OpportunityFirestoreSchema, OpportunityStageSchema, OpportunityStage } from '@/lib/models/opportunity';
import { revalidatePath } from 'next/cache';
import { checkProductStock } from '@/services/erp-service'; // Mock ERP call
import { startOpportunityToCashProcess } from '@/services/bpm-service'; // Mock BPM call

// --- Add Contact Action ---
const AddContactInputSchema = ContactSchema.omit({ createdAt: true, updatedAt: true });

export async function addContact(
  prevState: { message: string | null; success: boolean },
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  try {
    const rawData = Object.fromEntries(formData.entries());

    // Prepare data, ensuring 'subscribe' is boolean and validating leadSource
    const dataToValidate = {
      ...rawData,
      subscribe: rawData.subscribe === 'on',
      leadSource: rawData.leadSource ? LeadSourceSchema.parse(rawData.leadSource) : undefined, // Validate enum
      phone: rawData.phone || undefined,
      company: rawData.company || undefined,
      title: rawData.title || undefined,
      bio: rawData.bio || undefined,
    };


    const validatedData = AddContactInputSchema.safeParse(dataToValidate);

    if (!validatedData.success) {
      console.error('Validation Error:', validatedData.error.flatten().fieldErrors);
      const errorMessages = Object.values(validatedData.error.flatten().fieldErrors)
        .map(errors => errors?.join(', '))
        .filter(Boolean)
        .join('; ');
      return { message: `Invalid form data: ${errorMessages}`, success: false };
    }

    const contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = validatedData.data;

    const contactWithTimestamps = {
      ...contactData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const contactsCol = collection(adminDb, 'contacts');
    const docRef = await addDoc(contactsCol, contactWithTimestamps);

    console.log('Contact added with ID:', docRef.id);

    // Example: Optionally create a default opportunity for web form leads
    if (contactData.leadSource === 'Web Form') {
       await createOpportunity({
           name: `Opportunity for ${contactData.name} (Web Lead)`,
           contactId: docRef.id,
           stage: 'Qualification', // Start at qualification
           description: `Generated from web form submission. Bio: ${contactData.bio || 'N/A'}`,
           // amount: 0, // Set initial amount if desired
           // closeDate: // Set an estimated close date?
       });
        revalidatePath('/admin/crm/opportunities'); // Revalidate opportunities page
    }


    revalidatePath('/admin/crm');
    revalidatePath('/forms');
    return { message: 'Contact added successfully!', success: true };

  } catch (error) {
    console.error('Error adding contact:', error);
    let errorMessage = 'Failed to add contact due to a server error.';
    if (error instanceof Error) {
      errorMessage = `Failed to add contact: ${error.message}`;
    }
     if (error instanceof z.ZodError) {
       errorMessage = `Invalid lead source value provided.`; // More specific error for Zod enum failure
     }
    return { message: errorMessage, success: false };
  }
}


// --- Get Contacts Action ---
export async function getContacts(): Promise<ContactFirestore[]> {
  try {
    const contactsCol = collection(adminDb, 'contacts');
    const q = query(contactsCol, orderBy('createdAt', 'desc'));
    const contactSnapshot = await getDocs(q);

    const contacts: ContactFirestore[] = contactSnapshot.docs.map(doc => {
      const data = doc.data();
      // Validate data retrieved from Firestore
      const parsedData = ContactFirestoreSchema.safeParse(data); // Use Firestore schema

      if (!parsedData.success) {
        console.warn(`Invalid data found in Firestore document ${doc.id}:`, parsedData.error);
        return {
          id: doc.id,
          name: 'Invalid Data',
          email: '',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          leadSource: 'Other',
        } as ContactFirestore;
      }

      return { id: doc.id, ...parsedData.data } as ContactFirestore;
    });

    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

// --- Create Opportunity Action ---
const CreateOpportunityInputSchema = OpportunitySchema.omit({ createdAt: true, updatedAt: true, id: true });

export async function createOpportunity(
    input: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ id: string; message: string | null; success: boolean }> {
    try {
        const validatedData = CreateOpportunityInputSchema.safeParse(input);

        if (!validatedData.success) {
            console.error('Opportunity Validation Error:', validatedData.error.flatten().fieldErrors);
            const errorMessages = Object.values(validatedData.error.flatten().fieldErrors)
                .map(errors => errors?.join(', '))
                .filter(Boolean)
                .join('; ');
            return { id: '', message: `Invalid opportunity data: ${errorMessages}`, success: false };
        }

        const opportunityData = validatedData.data;

        // Convert JS Date to Firestore Timestamp if present
        const closeDateTimestamp = opportunityData.closeDate ? Timestamp.fromDate(opportunityData.closeDate) : undefined;

        const opportunityWithTimestamps = {
            ...opportunityData,
            closeDate: closeDateTimestamp,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        const opportunitiesCol = collection(adminDb, 'opportunities');
        const docRef = await addDoc(opportunitiesCol, opportunityWithTimestamps);

        console.log('Opportunity created with ID:', docRef.id);
        revalidatePath('/admin/crm/opportunities'); // Adjust path as needed
        return { id: docRef.id, message: 'Opportunity created successfully!', success: true };

    } catch (error) {
        console.error('Error creating opportunity:', error);
        let errorMessage = 'Failed to create opportunity due to a server error.';
        if (error instanceof Error) {
            errorMessage = `Failed to create opportunity: ${error.message}`;
        }
        return { id: '', message: errorMessage, success: false };
    }
}


// --- Get Opportunities Action ---
export async function getOpportunities(): Promise<OpportunityFirestore[]> {
  try {
    const opportunitiesCol = collection(adminDb, 'opportunities');
    // Order by close date descending, then creation date descending
    const q = query(opportunitiesCol, orderBy('closeDate', 'desc'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const opportunities: OpportunityFirestore[] = snapshot.docs.map(doc => {
      const data = doc.data();
      const parsedData = OpportunityFirestoreSchema.safeParse(data); // Validate against Firestore schema

      if (!parsedData.success) {
        console.warn(`Invalid opportunity data found in Firestore document ${doc.id}:`, parsedData.error);
        // Provide default/fallback values for display
        return {
          id: doc.id,
          name: 'Invalid Opportunity Data',
          contactId: '',
          stage: 'Prospecting',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        } as OpportunityFirestore;
      }
      return { id: doc.id, ...parsedData.data };
    });

    return opportunities;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

// --- Update Opportunity Stage Action ---
export async function updateOpportunityStage(
    opportunityId: string,
    newStage: OpportunityStage // Use the enum type
): Promise<{ message: string | null; success: boolean }> {
    try {
        // Validate the input stage
        const validatedStage = OpportunityStageSchema.safeParse(newStage);
        if (!validatedStage.success) {
            return { message: 'Invalid stage provided.', success: false };
        }

        const oppRef = doc(adminDb, 'opportunities', opportunityId);
        const oppSnap = await getDoc(oppRef);

        if (!oppSnap.exists()) {
             return { message: 'Opportunity not found.', success: false };
        }

        await updateDoc(oppRef, {
            stage: validatedStage.data,
            updatedAt: Timestamp.now(),
        });

        console.log(`Opportunity ${opportunityId} stage updated to ${validatedStage.data}`);

        // ** Integration Point: Trigger BPM on "Closed Won" **
        if (validatedStage.data === 'Closed Won') {
             console.log(`Opportunity ${opportunityId} won! Triggering BPM process...`);
             const success = await startOpportunityToCashProcess(opportunityId, oppSnap.data() as OpportunityFirestore); // Pass Opp data
             if (!success) {
                 // Log the failure but maybe don't fail the entire stage update?
                 // Or return a specific message indicating BPM trigger failure.
                 console.error(`Failed to trigger BPM process for opportunity ${opportunityId}.`);
                 // Optional: Return a message indicating partial success
                 // return { message: 'Opportunity stage updated, but failed to start order process.', success: true };
             }
        }

        revalidatePath('/admin/crm/opportunities'); // Revalidate the list page
        // Also potentially revalidate a specific opportunity page if you have one:
        // revalidatePath(`/admin/crm/opportunities/${opportunityId}`);
        return { message: 'Opportunity stage updated successfully!', success: true };

    } catch (error) {
        console.error('Error updating opportunity stage:', error);
        let errorMessage = 'Failed to update opportunity stage.';
        if (error instanceof Error) {
            errorMessage = `Failed to update opportunity stage: ${error.message}`;
        }
        return { message: errorMessage, success: false };
    }
}

// Example of calling the mock ERP service (could be part of another action)
export async function checkProductAvailability(productId: string): Promise<{ available: boolean; stockLevel: number | null }> {
    try {
        const stockInfo = await checkProductStock(productId);
        if (stockInfo) {
            return { available: stockInfo.stockLevel > 0, stockLevel: stockInfo.stockLevel };
        }
        return { available: false, stockLevel: null }; // Product not found
    } catch (error) {
        console.error("Error checking product stock:", error);
        return { available: false, stockLevel: null };
    }
}
