// src/app/actions/user-actions.ts
'use server';

import { UserProfile } from '@/lib/models/user';
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  return neon(process.env.DATABASE_URL);
}

export async function addUser(
  prevState: any,
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const displayName = (formData.get('displayName') as string)?.trim() || 'Usuario PLES';
  const role = (formData.get('role') as string) || 'read_only';

  if (!email) {
    return { message: 'El correo electrónico es requerido.', success: false };
  }

  try {
    const sql = getDb();
    await sql`
      INSERT INTO users (email, display_name, role)
      VALUES (${email}, ${displayName}, ${role})
      ON CONFLICT (email) DO UPDATE 
      SET display_name = EXCLUDED.display_name, role = EXCLUDED.role, updated_at = now()
    `;
    revalidatePath('/admin/users');
    return { message: 'Usuario registrado exitosamente en el sistema.', success: true };
  } catch (err: any) {
    console.error('Error al agregar usuario:', err);
    return { message: `Error al registrar usuario: ${err.message}`, success: false };
  }
}

// --- Get Users Action ---
export async function getUsers(): Promise<UserProfile[]> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, email, display_name, role, created_at, updated_at 
      FROM users 
      ORDER BY id ASC
    `;
    return rows.map((r: any) => ({
      uid: String(r.id),
      email: r.email,
      displayName: r.display_name || 'Usuario',
      role: r.role || 'read_only',
      createdAt: r.created_at ? new Date(r.created_at) : new Date(),
      updatedAt: r.updated_at ? new Date(r.updated_at) : new Date(),
    }));
  } catch (err) {
    console.error('Error al consultar usuarios:', err);
    return [
      {
        uid: '1',
        email: 'admin@ples.com.co',
        displayName: 'Administrador PLES',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}

export async function updateUserRole(
  uid: string,
  role: any
): Promise<{ message: string | null; success: boolean }> {
  try {
    const sql = getDb();
    await sql`
      UPDATE users 
      SET role = ${role}, updated_at = now() 
      WHERE id = ${Number(uid)} OR email = ${uid}
    `;
    revalidatePath('/admin/users');
    return { message: 'Rol de usuario actualizado con éxito.', success: true };
  } catch (err: any) {
    console.error('Error al actualizar rol:', err);
    return { message: 'Error al actualizar rol de usuario.', success: false };
  }
}

// --- Delete User Action ---
export async function deleteUser(uid: string): Promise<{ message: string | null; success: boolean }> {
  try {
    const sql = getDb();
    await sql`
      DELETE FROM users 
      WHERE id = ${Number(uid)} OR email = ${uid}
    `;
    revalidatePath('/admin/users');
    return { message: 'Usuario eliminado exitosamente.', success: true };
  } catch (err: any) {
    console.error('Error al eliminar usuario:', err);
    return { message: 'Error al eliminar usuario.', success: false };
  }
}
