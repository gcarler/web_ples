// src/app/register/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

// Basic placeholder form - replace with actual registration form component
function RegisterFormPlaceholder() {
    return (
        <div className="text-center py-8">
            <p className="text-muted-foreground">Registration form will be here.</p>
             <Link href="/login" className="text-primary hover:underline mt-4 inline-block">
                 Back to Login
             </Link>
        </div>
    );
}

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Register New Account</CardTitle>
          <CardDescription>
            Create a new account to access PLES services.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <RegisterFormPlaceholder />
        </CardContent>
      </Card>
    </div>
  );
}
