
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
import React from "react"

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
})

type UserFormData = z.infer<typeof formSchema>;


export function UserForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
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
    },
  });

  // Client-side submission handler
  async function onSubmit(data: UserFormData) {
    setIsSubmitting(true);
    
    // Check for the n8n webhook URL from environment variables
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CONTACT_FORM_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        
        console.log("Form data successfully sent to n8n workflow.", await response.json());

      } catch (error) {
        console.error("Failed to send data to n8n:", error);
        toast({
            title: "Error de Integración",
            description: "No se pudo enviar el formulario a nuestro sistema de automatización. Por favor, intente de nuevo más tarde.",
            variant: "destructive"
        });
        setIsSubmitting(false);
        return; // Stop execution if webhook fails
      }
    } else {
        console.warn("N8N_CONTACT_FORM_WEBHOOK_URL is not defined. Skipping n8n integration.");
    }
    
    // This part will run regardless of webhook, or if webhook is not defined
    console.log("Form data submitted:", data);
    toast({
      title: "¡Formulario Enviado!",
      description: "Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.",
    });
    form.reset(); // Reset form fields after successful submission
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
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
                    <Input type="email" placeholder="you@example.com" {...field} disabled={isSubmitting} />
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
                        <Input type="tel" placeholder="+1 234 567 890" {...field} disabled={isSubmitting} />
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
                        <Input placeholder="Acme Corporation" {...field} disabled={isSubmitting} />
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
                        <Input placeholder="Project Manager" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
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
                  disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
        <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Submit Form'}
          <Send className="ml-2" />
        </Button>
      </form>
    </Form>
  )
}
