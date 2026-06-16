// src/app/actions/user-actions.ts
'use server';

import { UserProfile } from '@/lib/models/user';

export async function addUser(
  prevState: any,
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  return { message: 'User created successfully (Mock)!', success: true };
}

// --- Get Users Action ---
export async function getUsers(): Promise<UserProfile[]> {
  return [
    {
      uid: 'mock-admin-id',
      email: 'admin@ples.com.co',
      displayName: 'Mock Admin',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];
}

export async function updateUserRole(
    uid: string,
    role: any
): Promise<{ message: string | null; success: boolean }> {
    return { message: 'User role updated successfully (Mock)!', success: true };
}


// --- Delete User Action ---
export async function deleteUser(uid: string): Promise<{ message: string | null; success: boolean }> {
    return { message: 'User deleted successfully (Mock)!', success: true };
}
