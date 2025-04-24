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

export function UserForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      subscribe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate form submission
    console.log(values)
    toast({
        title: "Form Submitted!",
        description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
        ),
        variant: "default", // Use default variant which will pick up theme colors
      })
    form.reset(); // Reset form after submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
        <FormField
            control={form.control}
            name="subscribe"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                    <Checkbox
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
                </FormItem>
            )}
         />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Submit Form <Send className="ml-2" />
        </Button>
      </form>
    </Form>
  )
}
