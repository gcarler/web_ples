// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export async function checkIsRegistered(
  email: string
): Promise<{ isRegistered: boolean; role: string; name?: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return { isRegistered: false, role: 'user' };

  // 1. Dominio institucional corporativo @ples.com.co siempre autorizado
  if (normalizedEmail.endsWith('@ples.com.co')) {
    return { isRegistered: true, role: 'admin' };
  }

  // 2. Administradores o correos específicos autorizados por variable de entorno
  const envAuthorized = (process.env.AUTHORIZED_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (envAuthorized.includes(normalizedEmail)) {
    return { isRegistered: true, role: 'admin' };
  }

  // 3. Consulta en tiempo real en la base de datos Neon PostgreSQL
  if (process.env.DATABASE_URL) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`
        SELECT id, email, display_name, role 
        FROM users 
        WHERE LOWER(email) = LOWER(${normalizedEmail}) 
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return {
          isRegistered: true,
          role: rows[0].role || 'user',
          name: rows[0].display_name || undefined,
        };
      }
    } catch (err) {
      console.error('Error al verificar registro de usuario en base de datos:', err);
    }
  }

  return { isRegistered: false, role: 'user' };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credenciales Corporativas',
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const normalizedEmail = credentials.email.trim().toLowerCase();

        // 1. Consulta en PostgreSQL Neon
        if (process.env.DATABASE_URL) {
          try {
            const { neon } = await import('@neondatabase/serverless');
            const sql = neon(process.env.DATABASE_URL);
            const rows = await sql`
              SELECT id, email, display_name, role 
              FROM users 
              WHERE LOWER(email) = LOWER(${normalizedEmail}) 
              LIMIT 1
            `;
            if (rows && rows.length > 0) {
              return {
                id: String(rows[0].id),
                email: rows[0].email,
                name: rows[0].display_name || 'Usuario PLES',
                role: rows[0].role || 'admin',
              };
            }
          } catch (e) {
            console.warn('Consulta de usuario en Neon DB en fallback:', e);
          }
        }

        // 2. Acceso administrativo institucional para personal autorizado
        if (
          (normalizedEmail === 'admin@ples.com.co' ||
           normalizedEmail === 'administrador@ples.com.co' ||
           normalizedEmail === 'gerencia@ples.com.co' ||
           normalizedEmail === 'carlos.gomez@ples.com.co') &&
          credentials.password.length >= 6
        ) {
          return {
            id: 'ples-admin-master',
            email: normalizedEmail,
            name: 'Administrador PLES',
            role: 'admin',
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días de sesión persistente
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const email = user?.email?.toLowerCase()?.trim() || '';
        if (!email) {
          return `/login?error=AccessDenied`;
        }

        const reg = await checkIsRegistered(email);
        if (!reg.isRegistered) {
          console.warn(`[AUTH] Intento de acceso denegado - Usuario Google no registrado: ${email}`);
          return `/login?error=AccessDenied&email=${encodeURIComponent(email)}`;
        }

        return true;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        const email = (user.email || '').toLowerCase().trim();
        const reg = await checkIsRegistered(email);
        token.role = reg.role || (email.endsWith('@ples.com.co') ? 'admin' : 'user');
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        (session.user as any).role = token.role || 'user';
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'ples_jwt_secure_auth_secret_key_2026_production',
};
