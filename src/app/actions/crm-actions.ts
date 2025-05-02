// src/app/actions/crm-actions.ts
'use server';

import { Timestamp as AdminTimestamp } from 'firebase-admin/firestore';
import { collection, addDoc, getDocs, Timestamp, query, orderBy, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config'; // Use Admin SDK for server actions
import { ContactInputSchema, Contact, LeadSourceSchema } from '@/lib/models/contact'; // Import Input schema and base type
import type { ContactFirestore } from '@/lib/models/contact'; // Import Firestore specific type
import { ContactOutputSchema, ContactFirestoreSchema } from '@/lib/models/contact'; // Import Output/Firestore schema
import { OpportunityInputSchema, Opportunity, OpportunityFirestore, OpportunityFirestoreSchema, OpportunityStageSchema, OpportunityStage } from '@/lib/models/opportunity'; // Import Opportunity schemas/types
import { revalidatePath } from 'next/cache';
import { checkProductStock, ProductStockInfo } from '@/services/erp-service'; // Import ERP service
import { startOpportunityToCashProcess } from '@/services/bpm-service'; // Import BPM service
import { addDays } from 'date-fns';

// --- Add Contact Action ---
// Use ContactInputSchema for validating incoming form data
const AddContactInputSchema = ContactInputSchema.omit({ createdAt: true, updatedAt: true });

export async function addContact(
  prevState: { message: string | null; success: boolean },
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  try {
    const rawData = Object.fromEntries(formData.entries());

    // Prepare data, ensuring 'subscribe' is boolean and validating leadSource
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
      const errorMessages = validatedData.error.issues
        .map((issue) => {
          // Customize error messages based on the issue path (field) if needed
          return `Error in field '${issue.path.join('.')}': ${issue.message}`;
        })
        .filter((message): message is string => !!message) // Ensure it's a string
        .join('; ');
      return { message: `Invalid form data: ${errorMessages}`, success: false };
    }

    const contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = validatedData.data;

    // Use serverTimestamp for creation and update times
    const contactWithTimestamps = {
      ...contactData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const contactsCol = collection(adminDb, 'contacts');
    const docRef = await addDoc(contactsCol, contactWithTimestamps);

    console.log('Contact added with ID:', docRef.id);

    // Example: Optionally create a default opportunity for web form leads
    if (contactData.leadSource === 'Web Form') {
      await createOpportunity({
        name: `Opportunity for ${contactData.name} (Web Lead)`,
        contactId: docRef.id,
        stage: 'Prospecting', // Start at qualification
        description: `Generated from web form submission. Bio: ${contactData.bio || 'N/A'}`,
        amount: 0,
        // Set the close date 30 days in the future from now
        closeDate: addDays(new Date(), 30),
      });
      

        revalidatePath('/admin/crm/opportunities'); // Revalidate opportunities page
    }


    revalidatePath('/admin/crm'); // Revalidate contacts list
    revalidatePath('/forms');
    return { message: 'Contact added successfully!', success: true };

  } catch (error) {
    console.error('Error adding contact:', error);
    let errorMessage = 'Failed to add contact due to a server error.';
    if (error instanceof Error) {
      errorMessage = `Failed to add contact: ${error.message}`;
    } 
    return { message: errorMessage, success: false };
  } finally {
     // Execute this block always, whether there was an error or not
      revalidatePath('/admin/crm');
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
        // Ensure Timestamps are correctly handled if they are plain objects
        if (data.createdAt && !(data.createdAt instanceof AdminTimestamp)) {
            console.warn(`createdAt is not a Timestamp for contact ${doc.id}, attempting to convert. Data:`, data.createdAt);
            data.createdAt = AdminTimestamp.fromMillis(data.createdAt.seconds * 1000);
        }
        if (data.updatedAt && !(data.updatedAt instanceof AdminTimestamp)) {
            console.warn(`updatedAt is not a Timestamp for contact ${doc.id}, attempting to convert. Data:`, data.updatedAt);
            data.updatedAt = AdminTimestamp.fromMillis(data.updatedAt.seconds * 1000);
        }

      // Validate data retrieved from Firestore using the specific Firestore schema
      const parsedData = ContactFirestoreSchema.safeParse(data); // Use Firestore schema

      if (!parsedData.success) {
        console.warn(`Invalid contact data found in Firestore document ${doc.id}:`, parsedData.error);
        // Provide default/fallback values for display
        return {
          id: doc.id,
          name: 'Invalid Data',
          email: '',
          createdAt: AdminTimestamp.now(),
          updatedAt: AdminTimestamp.now(),
          leadSource: 'Other', 
          address: undefined,
          bio: undefined,
          company: undefined,
          phone: undefined,
          subscribe: false,
          title: undefined,
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
// Use OpportunityInputSchema for creation
const CreateOpportunityInputSchema = OpportunityInputSchema.omit({ createdAt: true, updatedAt: true, id: true });

export async function createOpportunity(
    input: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ id: string; message: string | null; success: boolean }> {
    try {
        // Validate input using the derived schema
        const validatedData = CreateOpportunityInputSchema.safeParse(input);

        if (!validatedData.success) {
            const errorMessages = validatedData.error.issues
                .map((issue) => {
                    // Customize error messages based on the issue path (field) if needed
                    return `Error in field '${issue.path.join('.')}': ${issue.message}`;
                })
                .filter((message): message is string => !!message) // Ensure it's a string
                .join('; ');
            return { id: '', message: `Invalid opportunity data: ${errorMessages}`, success: false };
        }

        const opportunityData = validatedData.data;

        // Convert JS Date to Firestore Timestamp if present
        const closeDateTimestamp = opportunityData.closeDate ? AdminTimestamp.fromDate(opportunityData.closeDate) : undefined;

        // Use serverTimestamp for creation and update times
        const opportunityWithTimestamps = {
            ...opportunityData,
            closeDate: closeDateTimestamp,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
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
    const q = query(opportunitiesCol, orderBy('createdAt', 'desc')); // Sort by creation first for consistency
    const snapshot = await getDocs(q);

    const opportunities: OpportunityFirestore[] = snapshot.docs.map(doc => {
      const data = doc.data();
        // Ensure Timestamps are handled correctly
      if (data.closeDate && !(data.closeDate instanceof AdminTimestamp)) {
        // Convert plain object to Timestamp if needed
        if (typeof data.closeDate === 'object' && data.closeDate && 'seconds' in data.closeDate && 'nanoseconds' in data.closeDate) {
          data.closeDate = new AdminTimestamp(data.closeDate.seconds, data.closeDate.nanoseconds);
        } else {
          // Handle potential invalid date formats or log an error
          console.warn(`Invalid closeDate format in Firestore for doc ${doc.id}`);
          data.closeDate = undefined; // Or set to null/default
        }
      }
      if (data.createdAt && !(data.createdAt instanceof AdminTimestamp)) {
        if (typeof data.createdAt === 'object' && data.createdAt && 'seconds' in data.createdAt && 'nanoseconds' in data.createdAt) {
          data.createdAt = new AdminTimestamp(data.createdAt.seconds, data.createdAt.nanoseconds);
        } else {
          console.warn(`Invalid createdAt format in Firestore for doc ${doc.id}`);
          data.createdAt = AdminTimestamp.now(); // Fallback to now
        }
      }
      if (data.updatedAt && !(data.updatedAt instanceof AdminTimestamp)) {
        if (typeof data.updatedAt === 'object' && data.updatedAt && 'seconds' in data.updatedAt && 'nanoseconds' in data.updatedAt) {
          data.updatedAt = new AdminTimestamp(data.updatedAt.seconds, data.updatedAt.nanoseconds);
        } else {
          console.warn(`Invalid updatedAt format in Firestore for doc ${doc.id}`);
          data.updatedAt = Timestamp.now(); // Fallback to now
        }
       }

      // Validate against Firestore schema
      const parsedData = OpportunityFirestoreSchema.safeParse(data);

      if (!parsedData.success) {
        console.warn(`Invalid opportunity data found in Firestore document ${doc.id}:`, parsedData.error);
        // Provide default/fallback values for display
        return {
          id: doc.id,
          name: 'Invalid Opportunity Data',
          contactId: '',
          stage: 'Prospecting',
          createdAt: data.createdAt || AdminTimestamp.now(), // Use converted or fallback timestamp
          updatedAt: data.updatedAt || AdminTimestamp.now(), // Use converted or fallback timestamp
          // Add other required fields with defaults if needed
        } as OpportunityFirestore;
      }
      // Ensure the id is included in the returned object
      return { id: doc.id, ...parsedData.data };
      });

    const isDataValid = opportunities.every(opp => opp.closeDate instanceof Timestamp);

    // Only sort if all the dates are valid
    if (isDataValid){
       opportunities.sort((a, b) => {
        const dateA = a.closeDate?.toDate()?.getTime() ?? Number.MAX_SAFE_INTEGER; // Treat undefined as far future
        const dateB = b.closeDate?.toDate()?.getTime() ?? Number.MAX_SAFE_INTEGER;
        return dateB - dateA; // Descending by close date
      });
    }
    
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
             const errorMessages = validatedStage.error.issues
            .map(issue => `Error in field '${issue.path.join('.')}': ${issue.message}`)
            .filter((message): message is string => !!message)
            .join('; ');
            return { message: 'Invalid stage provided.', success: false };
        }

        const oppRef = doc(collection(adminDb, 'opportunities'), opportunityId);
        const oppSnap = await getDoc(oppRef);

        if (!oppSnap.exists()) {
             return { message: 'Opportunity not found.', success: false };
        }
        const currentOppData = oppSnap.data();
        
        if (currentOppData.amount === undefined) {
          console.warn(`Opportunity ${opportunityId} has no amount, setting to 0.`);
          currentOppData.amount = 0;
        }


        await updateDoc(oppRef, {
            stage: validatedStage.data,
            updatedAt: serverTimestamp(), // Use server timestamp for update
        });

        console.log(`Opportunity ${opportunityId} stage updated to ${validatedStage.data}`);

        // ** Integration Point: Trigger BPM on "Closed Won" **
        if (validatedStage.data === 'Closed Won') {
            console.log(`Opportunity ${opportunityId} won! Triggering BPM process...`);
            // Ensure Timestamps are handled before passing to BPM
            currentOppData.closeDate = handleTimestampConversion(currentOppData.closeDate, `closeDate in opportunity ${opportunityId}`);
            currentOppData.createdAt = handleTimestampConversion(currentOppData.createdAt, `createdAt in opportunity ${opportunityId}`);
            currentOppData.updatedAt = handleTimestampConversion(currentOppData.updatedAt, `updatedAt in opportunity ${opportunityId}`);
            

             // Reparse the potentially modified data before passing to BPM
             const parsedCurrentData = OpportunityFirestoreSchema.safeParse(currentOppData);

            if (!parsedCurrentData.success) {
                 console.error(`Failed to parse opportunity data ${opportunityId} before triggering BPM:`, parsedCurrentData.error);
                  // Optionally, still proceed with revalidation but log the error prominently
                 revalidatePath('/admin/crm/opportunities');
                 return { message: 'Opportunity stage updated, but failed to parse data for order process.', success: true }; // Partial success
            }
            // Reparse the potentially modified data before passing to BPM
             const parsedCurrentData = OpportunityFirestoreSchema.safeParse(currentOppData);

             if (!parsedCurrentData.success) {
                 console.error(`Failed to parse opportunity data ${opportunityId} before triggering BPM:`, parsedCurrentData.error);
                  // Optionally, still proceed with revalidation but log the error prominently
                 revalidatePath('/admin/crm/opportunities');
                 return { message: 'Opportunity stage updated, but failed to parse data for order process.', success: true }; // Partial success
             }


             const success = await startOpportunityToCashProcess(opportunityId, {id: opportunityId, ...parsedCurrentData.data}); // Pass Opp data
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
    } catch (error: any) {
        console.error('Error updating opportunity stage:', error);
        return { message: `Failed to update opportunity stage: ${error.message}`, success: false };
    }
}
function handleTimestampConversion(timestamp: any, fieldName: string): AdminTimestamp | undefined {
    if (!timestamp) return undefined;
  
    if (timestamp instanceof Timestamp) {
      return timestamp;
    } else if (typeof timestamp === 'object' && timestamp && 'seconds' in timestamp && 'nanoseconds' in timestamp) {
      return new Timestamp(timestamp.seconds, timestamp.nanoseconds);
    } else {
        console.warn(`Invalid ${fieldName} format, attempting to set now(). Data:`, timestamp);
        return AdminTimestamp.now();
    }
  }
  
// Example of calling the ERP service (could be part of another action)
export async function checkProductAvailability(productId: string): Promise<{ available: boolean; stockLevel: number | null }> {
    try {
        const stockInfo = await checkProductStock(productId); // Uses the Firestore-backed ERP service
        if (stockInfo) {
            return { available: stockInfo.stockLevel > 0, stockLevel: stockInfo.stockLevel };
        }
        return { available: false, stockLevel: null }; // Product not found
    } catch (error) {
        console.error("Error checking product stock:", error);
        return { available: false, stockLevel: null };
    }
}
