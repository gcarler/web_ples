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
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Import Select
import { LeadSourceSchema, LeadSource } from "@/lib/models/contact" // Import LeadSource types

// Define the Zod schema for form validation (client-side, matching server action input)
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100, { message: "Name cannot exceed 100 characters."}),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).max(100),
  phone: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters."}).optional(),
  subscribe: z.boolean().default(false).optional(),
  leadSource: LeadSourceSchema.optional().default('Web Form'), // Default to Web Form for this form
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
  const initialState = { message: null, success: false };
  const [state, formAction] = useFormState(addContact, initialState);

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      title: "",
      bio: "",
      subscribe: false,
      leadSource: "Web Form", // Explicitly set default for the form
    },
  });

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
  }, [state, toast, form]);


  return (
    <Form {...form}>
       <form action={formAction} className="space-y-6 relative">

        {/* Name and Email side-by-side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
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
                    <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

         {/* Phone and Company side-by-side on larger screens */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                        <Input type="tel" placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="Acme Corporation" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
         </div>

         {/* Title and Lead Source */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Job Title (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="Project Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             {/* Hidden Lead Source - Defaults to Web Form */}
             <input type="hidden" {...form.register("leadSource")} value="Web Form" />
            {/* If you want to show lead source: */}
            {/* <FormField
                control={form.control}
                name="leadSource"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lead Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a lead source" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {LeadSourceSchema.options.map((source) => (
                                    <SelectItem key={source} value={source}>
                                        {source}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            /> */}
         </div>


         <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message / Bio (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about how we can help"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
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
                        name="subscribe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
                 <FormMessage />
                </FormItem>
            )}
         />

         {state.message && !state.success && (
             <p className="text-sm font-medium text-destructive">{state.message}</p>
         )}
         <SubmitButton />
      </form>
    </Form>
  )
}
