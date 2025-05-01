// src/app/register/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form'; // Import the actual form

export default function RegisterPage() {
  return (
    // Centered layout, Card will inherit rounded corners from theme (--radius)
    <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12">
       {/* Card inherits rounded-lg from theme */}
      <Card className="w-full max-w-md shadow-lg border rounded-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Register New Account</CardTitle>
          <CardDescription>
            Create a new account to access PLES services.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <RegisterForm /> {/* Use the actual registration form */}
            <div className="mt-4 text-center text-sm">
                <Link href="/login" className="text-primary hover:underline">
                    Back to Login
                </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}