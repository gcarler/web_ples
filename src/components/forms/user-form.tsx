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
import { addOrUpdateContact } from "@/services/crm-service"; // Import the CRM service

// Define the Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, { message: "Name cannot exceed 50 characters."}),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, { message: "Bio cannot exceed 160 characters."}).optional(),
  subscribe: z.boolean().default(false).optional(),
})

// Define the type based on the Zod schema
type UserFormData = z.infer<typeof formSchema>;

export function UserForm() {
  const { toast } = useToast();

  // Initialize react-hook-form
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      subscribe: false,
    },
  })

  // Handle form submission
  async function onSubmit(values: UserFormData) {
    try {
        // Call the CRM service to add/update the contact
        await addOrUpdateContact(values);

        // Show success toast
        toast({
            title: "Form Submitted!",
            description: "Your information has been successfully sent.",
            variant: "default", // Use default variant which will pick up theme colors
        });
        form.reset(); // Reset form after successful submission

    } catch (error) {
        console.error("Failed to submit form to CRM:", error);
        // Show error toast
        toast({
            title: "Submission Failed",
            description: "Could not submit your information. Please try again later.",
            variant: "destructive", // Use destructive variant for errors
        });
        // Optionally, do not reset the form on error so the user can retry
    }
  }

  return (
    <Form {...form}>
      {/* Display loading state while submitting */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
         {form.formState.isSubmitting && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10 rounded-md">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-foreground">Submitting...</span>
            </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
              <FormDescription>
                Your full name.
              </FormDescription>
              <FormMessage />
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
                <Input type="email" placeholder="you@example.com" {...field} disabled={form.formState.isSubmitting} />
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
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>
                A short description about yourself (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="subscribe"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.formState.isSubmitting}
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
                </FormItem>
            )}
         />
        <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={form.formState.isSubmitting} // Disable button during submission
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit Form'}
          {!form.formState.isSubmitting && <Send className="ml-2" />}
        </Button>
      </form>
    </Form>
  )
}
