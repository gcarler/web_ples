// src/components/admin/add-user-form.tsx
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
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  displayName: z.string().optional(),
  role: UserRoleSchema.default('read_only'),
});

// Define the type based on the Zod schema
type AddUserFormData = z.infer<typeof formSchema>;

// Separate SubmitButton to use useFormStatus
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Creando Usuario...' : 'Crear Usuario'}
        </Button>
    );
}

export function AddUserForm() {
  const { toast } = useToast();
  const initialState = { message: null, success: false };
  const [state, formAction] = useFormState(addUser, initialState);

  const form = useForm<AddUserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      role: "read_only", // Default role
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
        // Optionally redirect back to the user list or show a success message inline
        // router.push('/admin/users');
      }
    }
  }, [state, toast, form]);


  return (
    <Form {...form}>
       <form action={formAction} className="space-y-6 relative">

            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Direcci?n de Correo Electr?nico</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="usuario@ejemplo.com" {...field} />
                </FormControl>
                 <FormDescription>
                    La direcci?n de correo electr?nico que el usuario usar? para iniciar sesi?n.
                 </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

             <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Contrase?a</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                     <FormDescription>
                        Debe tener al menos 6 caracteres.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre a Mostrar (Opcional)</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                     <FormDescription>
                        C?mo aparecer? el nombre del usuario.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Asignar Rol</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar un rol" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {UserRoleSchema.options.map((roleOption) => (
                                    <SelectItem key={roleOption} value={roleOption}>
                                        {/* Make role names more user-friendly */}
                                        {roleOption.charAt(0).toUpperCase() + roleOption.slice(1).replace('_', ' ')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                         <FormDescription>
                            Determina los permisos de acceso del usuario.
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
