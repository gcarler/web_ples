// src/app/actions/user-actions.ts
'use server';

import { z } from 'zod';
import { adminAuth, adminDb } from '@/lib/firebase/firebase-admin-config';
import { UserProfile, UserProfileSchema, UserRoleSchema } from '@/lib/models/user';
import { collection, getDocs, doc, setDoc, updateDoc, serverTimestamp, Timestamp, deleteDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { CreateUserRequest } from 'firebase-admin/auth';

// Schema for adding/registering a new user (used by the server action)
// Note: confirmPassword is only for client-side validation and not sent here.
// Role might default differently for self-registration vs admin creation.
const AddUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  displayName: z.string().optional(),
  role: UserRoleSchema.default('read_only'), // Default role can be adjusted
});

export async function addUser(
  prevState: { message: string | null; success: boolean },
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  try {
    const rawData = Object.fromEntries(formData.entries());

    // Validate using the server-side schema
    const validatedData = AddUserInputSchema.safeParse(rawData);

    if (!validatedData.success) {
      console.error('Validation Error:', validatedData.error.flatten().fieldErrors);
      const errorMessages = Object.values(validatedData.error.flatten().fieldErrors)
        .map(errors => errors?.join(', '))
        .filter(Boolean)
        .join('; ');
      return { message: `Invalid form data: ${errorMessages}`, success: false };
    }

    const { email, password, displayName, role } = validatedData.data;

    // 1. Create user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email: email,
      password: password,
      displayName: displayName,
      emailVerified: false, // Optional: Set email verification status (usually false initially)
      disabled: false,
    } as CreateUserRequest);

    // 2. Create user profile document in Firestore
    // Use the validated 'role' from input (which might be default 'read_only' for registration)
    const userProfile: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
      uid: userRecord.uid,
      email: email,
      displayName: displayName,
      role: role, // Use the role passed from the form (could be default)
      // tenantId: // Assign tenant ID if using multi-tenancy
    };

    const userDocRef = doc(adminDb, 'users', userRecord.uid);
    await setDoc(userDocRef, {
      ...userProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log('User created successfully:', userRecord.uid);
    // Revalidate relevant pages
    revalidatePath('/admin/users'); // If created via admin panel
    revalidatePath('/register');    // If created via registration page
    revalidatePath('/login');       // To potentially update UI state if needed
    return { message: 'User created successfully!', success: true };

  } catch (error: any) {
    console.error('Error adding user:', error);
    let errorMessage = 'Failed to add user.';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'Email address is already in use by another account.';
    } else if (error instanceof z.ZodError) {
        // This case might not happen often if client-side validation is robust
      errorMessage = 'Invalid data provided.';
    } else if (error.message) {
        errorMessage = error.message;
    }
    return { message: errorMessage, success: false };
  }
}

// --- Get Users Action ---
export async function getUsers(): Promise<UserProfile[]> {
  try {
    const usersCol = collection(adminDb, 'users');
    const userSnapshot = await getDocs(usersCol);

    const users: UserProfile[] = userSnapshot.docs.map(doc => {
      const data = doc.data();
       // Ensure Timestamps are correctly handled
       if (data.createdAt && !(data.createdAt instanceof Timestamp)) {
         data.createdAt = Timestamp.fromMillis(data.createdAt.seconds * 1000);
       }
       if (data.updatedAt && !(data.updatedAt instanceof Timestamp)) {
         data.updatedAt = Timestamp.fromMillis(data.updatedAt.seconds * 1000);
       }

      // Validate using UserProfileSchema
      const parsedData = UserProfileSchema.safeParse({ uid: doc.id, ...data });

      if (!parsedData.success) {
        console.warn(`Invalid user profile data found in Firestore document ${doc.id}:`, parsedData.error);
        // Provide default/fallback values for display
        return {
          uid: doc.id,
          email: 'Invalid Data',
          role: 'read_only', // Default role
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        } as UserProfile;
      }

      return parsedData.data; // No need for 'id' as uid is the id
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// --- Update User Role Action ---
const UpdateUserRoleInputSchema = z.object({
  uid: z.string().min(1),
  role: UserRoleSchema,
});

export async function updateUserRole(
    uid: string,
    role: z.infer<typeof UserRoleSchema>
): Promise<{ message: string | null; success: boolean }> {
    try {
        const validatedData = UpdateUserRoleInputSchema.safeParse({ uid, role });
        if (!validatedData.success) {
            return { message: 'Invalid input data.', success: false };
        }

        const userDocRef = doc(adminDb, 'users', uid);
        await updateDoc(userDocRef, {
            role: validatedData.data.role,
            updatedAt: serverTimestamp(),
        });

        console.log(`User role updated successfully for UID: ${uid}`);
        revalidatePath('/admin/users');
        return { message: 'User role updated successfully!', success: true };
    } catch (error: any) {
        console.error(`Error updating user role for UID ${uid}:`, error);
        return { message: `Failed to update user role: ${error.message}`, success: false };
    }
}


// --- Delete User Action ---
export async function deleteUser(uid: string): Promise<{ message: string | null; success: boolean }> {
    if (!uid) return { message: 'Invalid User ID.', success: false };
    try {
        // 1. Delete user from Firebase Authentication
        await adminAuth.deleteUser(uid);

        // 2. Delete user profile from Firestore
        const userDocRef = doc(adminDb, 'users', uid);
        await deleteDoc(userDocRef);

        console.log(`User deleted successfully: ${uid}`);
        revalidatePath('/admin/users');
        return { message: 'User deleted successfully!', success: true };
    } catch (error: any) {
        console.error(`Error deleting user ${uid}:`, error);
        let errMsg = 'Failed to delete user.';
        if (error.code === 'auth/user-not-found') {
            errMsg = 'User not found in Authentication. Firestore profile might still exist.';
             // Optionally try deleting Firestore doc again if auth user doesn't exist
             try {
                const userDocRef = doc(adminDb, 'users', uid);
                await deleteDoc(userDocRef);
                revalidatePath('/admin/users');
                return { message: 'User deleted from Firestore (was not in Auth).', success: true };
             } catch (fsError) {
                 console.error(`Error deleting Firestore profile for non-auth user ${uid}:`, fsError);
                 return { message: 'User not found in Auth, failed to delete Firestore profile.', success: false };
             }
        } else {
            errMsg = error.message;
        }
        return { message: errMsg, success: false };
    }
}