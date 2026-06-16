// src/components/auth/login-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, ingrese un correo válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

type LoginFormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormData) {
    setIsLoading(true);
    // Mock login logic
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (values.email === 'admin@ples.com.co' && values.password === 'admin123') {
        toast({
            title: '¡Inicio de sesión exitoso!',
            description: 'Redirigiendo al panel de administración (Mock)...',
        });
        router.push('/admin/dashboard');
    } else {
        toast({
            title: 'Error de Autenticación',
            description: 'Credenciales inválidas (Pruebe con admin@ples.com.co / admin123).',
            variant: 'destructive',
        });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="usuario@ples.com.co" {...field} />
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
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Iniciando Sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
      </form>
    </Form>
  );
}
