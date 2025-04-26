// src/app/actions/crm-actions.ts
'use server';

import { z } from 'zod';
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config'; // Use Admin SDK for server actions
import { ContactSchema, Contact, ContactFirestore } from '@/lib/models/contact';
import { revalidatePath } from 'next/cache';

// --- Add Contact Action ---
const AddContactInputSchema = ContactSchema.omit({ createdAt: true, updatedAt: true }); // Input doesn't include server timestamps

export async function addContact(
  prevState: { message: string | null; success: boolean },
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  try {
    const rawData = Object.fromEntries(formData.entries());

    // Prepare data, ensuring 'subscribe' is boolean
    const dataToValidate = {
      ...rawData,
      subscribe: rawData.subscribe === 'on', // Convert checkbox value
    };

    // Validate data using Zod schema
    const validatedData = AddContactInputSchema.safeParse(dataToValidate);

    if (!validatedData.success) {
      console.error('Validation Error:', validatedData.error.flatten().fieldErrors);
      // Combine all error messages for a user-friendly display
      const errorMessages = Object.values(validatedData.error.flatten().fieldErrors)
        .map(errors => errors?.join(', '))
        .filter(Boolean) // Remove empty entries
        .join('; ');
      return { message: `Invalid form data: ${errorMessages}`, success: false };
    }

    const contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = validatedData.data;

    // Add server-generated timestamps
    const contactWithTimestamps = {
      ...contactData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // Add document to Firestore 'contacts' collection
    const contactsCol = collection(adminDb, 'contacts');
    const docRef = await addDoc(contactsCol, contactWithTimestamps);

    console.log('Contact added with ID:', docRef.id);
    revalidatePath('/admin/crm'); // Revalidate the CRM admin page to show the new contact
    revalidatePath('/forms'); // Revalidate the form page maybe? Or just rely on success message.
    return { message: 'Contact added successfully!', success: true };

  } catch (error) {
    console.error('Error adding contact:', error);
    let errorMessage = 'Failed to add contact due to a server error.';
    if (error instanceof Error) {
      errorMessage = `Failed to add contact: ${error.message}`;
    }
    return { message: errorMessage, success: false };
  }
}


// --- Get Contacts Action ---
export async function getContacts(): Promise<ContactFirestore[]> {
  try {
    const contactsCol = collection(adminDb, 'contacts');
    // Order by creation date, newest first
    const q = query(contactsCol, orderBy('createdAt', 'desc'));
    const contactSnapshot = await getDocs(q);

    const contacts: ContactFirestore[] = contactSnapshot.docs.map(doc => {
      const data = doc.data();
      // Validate data retrieved from Firestore (optional but good practice)
      const parsedData = ContactSchema.extend({
        createdAt: z.instanceof(Timestamp),
        updatedAt: z.instanceof(Timestamp),
      }).safeParse(data);

      if (!parsedData.success) {
        console.warn(`Invalid data found in Firestore document ${doc.id}:`, parsedData.error);
        // Handle invalid data, e.g., return a default structure or skip
        return {
          id: doc.id,
          name: 'Invalid Data',
          email: '',
          createdAt: Timestamp.now(), // Placeholder
          updatedAt: Timestamp.now(), // Placeholder
        } as ContactFirestore; // Cast carefully or define a specific type
      }

      return { id: doc.id, ...parsedData.data } as ContactFirestore;
    });

    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    // In a real app, you might want to throw the error or return an empty array
    // depending on how the calling component handles errors.
    return [];
  }
}
