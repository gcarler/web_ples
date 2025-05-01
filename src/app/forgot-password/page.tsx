// src/app/forgot-password/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

// Basic placeholder form - replace with actual password reset form component
function ForgotPasswordFormPlaceholder() {
    return (
        <div className="text-center py-8">
            <p className="text-muted-foreground">Password reset form will be here.</p>
            <Link href="/login" className="text-primary hover:underline mt-4 inline-block">
                 Back to Login
             </Link>
        </div>
    );
}


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
            <ForgotPasswordFormPlaceholder />
        </CardContent>
      </Card>
    </div>
  );
}
