
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
import { Send, CheckCircle } from 'lucide-react'; // Added CheckCircle
import { addContact } from "@/app/actions/crm-actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect }_tmp_ref_src_app_about_page_tsx from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeadSourceSchema, LeadSource } from "@/lib/models/contact"

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
  leadSource: LeadSourceSchema.optional().default('Web Form'),
})

type UserFormData = z.infer<typeof formSchema>;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={pending}
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
      leadSource: "Web Form",
    },
  });

  useEffect(() => {
    if (state.message && !state.success) { // Only show error toasts here
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
    if (state.success) {
         toast({ // Keep success toast as well
            title: "Success!",
            description: state.message || "Your message has been sent.",
         });
        // Form reset will be handled by the success message display logic
    }
  }, [state, toast, form]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg shadow-md bg-card">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">¡Mensaje Enviado!</h2>
        <p className="text-muted-foreground mb-6">{state.message || "Gracias por contactarnos. Nos pondremos en contacto contigo pronto."}</p>
        <Button onClick={() => {
            form.reset();
            // This is a bit of a hack to reset the useFormState.
            // A more robust solution might involve a key prop on the Form or a dedicated reset function from useFormState if available.
            // For now, we manually clear the message to allow re-submission visualization, though the state itself isn't fully reset here.
            state.message = null;
            state.success = false;
            // Re-triggering a dummy dispatch or re-initializing `useFormState` might be needed for full reset,
            // but for display purposes, this button will allow showing the form again.
            // A cleaner way would be to lift state up or use a key on the <UserForm> component.
            window.location.reload(); // Simplest way to reset form state for now.
        }} variant="outline">
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
       <form action={formAction} className="space-y-6 relative">
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
             <input type="hidden" {...form.register("leadSource")} value="Web Form" />
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

