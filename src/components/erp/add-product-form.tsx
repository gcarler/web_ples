// src/components/erp/add-product-form.tsx
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { addProduct } from "@/app/actions/erp-actions"; 
import { useFormState, useFormStatus } from "react-dom";
import { useEffect }_tmp_ref_src_app_about_page_tsx from "react";
import { ProductInputSchema } from "@/lib/models/erp"; // Import the base Zod schema

// Define the Zod schema specifically for the form, omitting server-set fields
const AddProductFormSchema = ProductInputSchema.omit({ 
    id: true, 
    createdAt: true, 
    updatedAt: true 
});

type AddProductFormData = z.infer<typeof AddProductFormSchema>;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Adding Product...' : 'Add Product'}
        </Button>
    );
}

export function AddProductForm() {
  const { toast } = useToast();
  const initialState = { message: null, success: false };
  const [state, formAction] = useFormState(addProduct, initialState);

  const form = useForm<AddProductFormData>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      price: 0,
      stockLevel: 0,
      category: "",
      imageUrl: "",
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
        form.reset(); 
        // Optionally redirect or give other success feedback
      }
    }
  }, [state, toast, form]);


  return (
    <Form {...form}>
       <form action={formAction} className="space-y-6 relative">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                      <Input placeholder="e.g., Premium Widget" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                  <FormControl>
                      <Input placeholder="e.g., WIDGET-PREM-001" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="stockLevel"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stock Level</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Category (Optional)</FormLabel>
                  <FormControl>
                      <Input placeholder="e.g., Electronics, Books" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                      <Textarea placeholder="Describe the product..." {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                      <Input placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormDescription>
                    Link to an image of the product.
                  </FormDescription>
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
