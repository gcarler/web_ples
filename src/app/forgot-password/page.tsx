// src/app/forgot-password/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'; // Import the actual form

export default function ForgotPasswordPage() {
  return (
    // Centered layout, Card will inherit rounded corners from theme (--radius)
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      {/* Card inherits rounded-lg from theme */}
      <Card className="w-full max-w-md shadow-lg border rounded-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address to receive password reset instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ForgotPasswordForm /> {/* Use the actual form */}
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