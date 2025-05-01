// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth functions
import { app } from '@/lib/firebase/firebase-config'; // Import Firebase app instance
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';
import Link from 'next/link'; // Import Link
import { PlesGroupLogo } from '@/components/logo'; // Import the logo

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app); // Initialize Firebase Auth

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      // Store token in cookie (client-side) after successful login
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        // Set cookie - adjust path, domain, maxAge/expires as needed
        document.cookie = `firebaseIdToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // Example: 7 days
      }
      router.push('/admin/dashboard'); // Redirect to dashboard after successful login
    } catch (err: any) {
      console.error('Login Error:', err);
      let errorMessage = 'Failed to log in. Please check your credentials.';
      // Provide more specific Firebase error messages if needed
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/api-key-not-valid') {
          errorMessage = 'Firebase API Key is invalid. Please check your environment variables.';
           console.error("Firebase Config Error: API Key is not valid. Ensure NEXT_PUBLIC_FIREBASE_API_KEY is set correctly in your .env.local file and the server was restarted.");
      }
      setError(errorMessage);
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Centered layout with dark background
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 dark text-white px-4 py-12">
       {/* Removed Large Title Above Card */}
       {/* <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-100 mb-8">
         EL USO INTELIGENTE DE LA EXPERIENCIA
       </h1> */}
      {/* Card with dark background, rounded corners, and shadow */}
      <Card className="w-full max-w-md bg-gray-800/90 border-gray-700 shadow-xl rounded-xl">
        <CardHeader className="space-y-4 text-center pt-8">
           <PlesGroupLogo className="h-12 w-12 mx-auto text-primary" /> {/* Logo Added */}
          {/* Title removed from here */}
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 px-8">
            <div className="space-y-2">
              {/* Label removed to match image */}
              {/* <Label htmlFor="email" className="text-gray-300">Email</Label> */}
              {/* Input with rounded corners and lighter background */}
              <Input
                id="email"
                type="email"
                placeholder="Email" // Changed placeholder
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-gray-700 border-gray-600 text-gray-100 rounded-md placeholder:text-gray-400" // Adjusted styling
              />
            </div>
            <div className="space-y-2">
              {/* Label removed */}
              {/* <Label htmlFor="password" className="text-gray-300">Password</Label> */}
              {/* Input with rounded corners */}
              <Input
                id="password"
                type="password"
                placeholder="Contraseña" // Changed placeholder
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                 className="bg-gray-700 border-gray-600 text-gray-100 rounded-md placeholder:text-gray-400" // Adjusted styling
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p> // Adjusted error color
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
             {/* Login button with rounded corners */}
            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white rounded-md" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
              {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
             {/* Register and Forgot Password links */}
            <div className="flex justify-between w-full text-sm">
              {/* Link buttons inherit styling */}
              <Button variant="link" asChild className="px-0 text-gray-400 hover:text-gray-200">
                <Link href="/register">Register an account</Link>
              </Button>
              <Button variant="link" asChild className="px-0 text-gray-400 hover:text-gray-200">
                 <Link href="/forgot-password">Forgot password?</Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
