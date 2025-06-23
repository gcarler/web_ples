// src/lib/models/user.ts
import { z } from 'zod';
import { Timestamp } from 'firebase-admin/firestore'; // Using admin timestamp for server-side logic

// Define available roles
export const UserRoleSchema = z.enum(['admin', 'crm_user', 'erp_user', 'bpm_viewer', 'read_only']);
export type UserRole = z.infer<typeof UserRoleSchema>;

// Define the roles and their permissions (example structure)
// In a real application, this might be more complex and stored elsewhere
export const ROLES = {
    admin: {
        permissions: ['manage_users', 'manage_crm', 'manage_erp', 'manage_bpm', 'view_dashboard', 'manage_content'], // Added manage_content
    },
    crm_user: {
        permissions: ['manage_crm', 'view_dashboard'], // Can manage CRM data
    },
    erp_user: {
        permissions: ['manage_erp', 'view_dashboard'], // Can manage ERP data
    },
    bpm_viewer: {
        permissions: ['view_bpm', 'view_dashboard'], // Can only view BPM processes
    },
    read_only: {
        permissions: ['view_dashboard'], // Can only view the dashboard
    },
} as const; // Use 'as const' for stricter typing

// Schema for User Profile data stored in Firestore, using z.date()
export const UserProfileSchema = z.object({
  uid: z.string(), // Corresponds to Firebase Auth UID
  email: z.string().email(), // User's email
  displayName: z.string().optional(), // User's display name
  role: UserRoleSchema.default('read_only'), // User's role, defaults to read_only
  tenantId: z.string().optional(), // Optional: For multi-tenancy support
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

// Helper function to check if a user has a specific permission
export function hasPermission(role: UserRole | undefined | null, permission: string): boolean {
    if (!role) return false;
    const rolePermissions = ROLES[role]?.permissions as readonly string[] | undefined;
    return !!rolePermissions?.includes(permission);
}
