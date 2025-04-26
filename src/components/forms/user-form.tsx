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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send } from 'lucide-react';
import { addContact } from "@/app/actions/crm-actions"; // Import the server action
import { useFormState, useFormStatus } from "react-dom"; // Import hooks for Server Actions
import { useEffect } from "react"; // Import useEffect

// Define the Zod schema for form validation (client-side, matching server action input)
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100, { message: "Name cannot exceed 100 characters."}),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).max(100),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters."}).optional(),
  subscribe: z.boolean().default(false).optional(),
})

// Define the type based on the Zod schema
type UserFormData = z.infer<typeof formSchema>;

// Separate SubmitButton to use useFormStatus
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={pending} // Disable button when form is pending
        >
          {pending ? 'Submitting...' : 'Submit Form'}
          {!pending && <Send className="ml-2" />}
        </Button>
    );
}


export function UserForm() {
  const { toast } = useToast();
  // Initial state for the form action
  const initialState = { message: null, success: false };
  // useFormState hook to manage form state with Server Action
  const [state, formAction] = useFormState(addContact, initialState);

  // Initialize react-hook-form (still useful for client-side validation)
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      subscribe: false,
    },
  });

  // Effect to show toast message based on the server action response state
  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        form.reset(); // Reset form on successful submission
      }
    }
     // Reset message after showing toast to prevent re-showing on re-render
    // Note: This depends on how useFormState internally manages state updates.
    // A more robust approach might involve clearing the message in the server action
    // or using a separate state variable to track if the toast has been shown.
    // For simplicity, we rely on the state changing again if another submission occurs.

  }, [state, toast, form]);


  return (
    // Use react-hook-form's Form provider for client-side validation context
    <Form {...form}>
       {/* The form now uses the formAction */}
       <form action={formAction} className="space-y-6 relative">
         {/* We no longer need form.formState.isSubmitting, use useFormStatus in SubmitButton */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                 {/* Pass field props for react-hook-form integration */}
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                Your full name.
              </FormDescription>
              <FormMessage /> {/* Shows client-side validation errors */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Your primary email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short description about yourself (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         {/* Use field.value and field.onChange for controlled checkbox */}
        <FormField
            control={form.control}
            name="subscribe"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                    <Checkbox
                        // Ensure 'name' attribute matches the FormData key expected by the server action
                        name="subscribe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        // We don't pass {...field} directly as Checkbox needs specific props
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>
                    Subscribe to newsletter
                    </FormLabel>
                    <FormDescription>
                    Receive updates via email.
                    </FormDescription>
                </div>
                 {/* FormMessage is usually not needed for a single checkbox, but can be kept */}
                 <FormMessage />
                </FormItem>
            )}
         />
         {/* Display server-side action message if not successful */}
         {state.message && !state.success && (
             <p className="text-sm font-medium text-destructive">{state.message}</p>
         )}
         <SubmitButton />
      </form>
    </Form>
  )
}
