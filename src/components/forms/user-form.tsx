
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const LeadSourceSchema = z.enum(['Web Form', 'Referral', 'Cold Call', 'Event', 'Other']);

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

export function UserForm() {
  const { toast } = useToast();

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

  function onSubmit(data: UserFormData) {
    toast({
        title: "Submissions Temporarily Disabled",
        description: "This form is currently not connected to a backend service.",
        variant: "destructive"
    });
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
        <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Submit Form
          <Send className="ml-2" />
        </Button>
      </form>
    </Form>
  )
}
