// src/components/auth/register-form.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { addUser } from "@/app/actions/user-actions"; // Import the server action
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { UserRoleSchema, UserRole } from "@/lib/models/user" // Import Role types

// Define the Zod schema for form validation (client-side)
// Matches the schema in user-actions addUser function
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  displayName: z.string().optional(),
  role: UserRoleSchema.default('read_only'), // Default role for self-registration
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set the error path to the confirmPassword field
});


// Define the type based on the Zod schema
type RegisterFormData = z.infer<typeof formSchema>;

// Separate SubmitButton to use useFormStatus
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Creating Account...' : 'Create Account'}
        </Button>
    );
}

export function RegisterForm() {
  const { toast } = useToast();
  const initialState = { message: null, success: false };
  // Use the addUser server action
  const [state, formAction] = useFormState(addUser, initialState);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      role: "read_only", // Default role for self-registration
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Registration Successful!" : "Registration Failed",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        form.reset(); // Reset form on successful submission
        // Optionally redirect to login or dashboard after a delay
        // setTimeout(() => router.push('/login'), 2000);
      }
    }
  }, [state, toast, form]);


  return (
    <Form {...form}>
       {/*
         Important: We pass the formAction (which wraps the addUser server action)
         to the <form> element's action prop. This triggers the server action on submit.
         We don't need a separate onSubmit handler on the form itself when using useFormState like this.
        */}
       <form action={formAction} className="space-y-6 relative">

            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="user@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

             <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                     <FormDescription>
                        Must be at least 6 characters long.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Display Name (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                     <FormDescription>
                        How your name will appear.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />

            {/* Role is hidden for self-registration, defaults to read_only */}
             <input type="hidden" {...form.register("role")} value="read_only" />

         {/* Display server-side validation errors (if any) */}
         {state.message && !state.success && (
             <p className="text-sm font-medium text-destructive">{state.message}</p>
         )}

         <SubmitButton />
      </form>
    </Form>
  )
}