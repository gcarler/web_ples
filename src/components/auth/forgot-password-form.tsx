// src/components/auth/forgot-password-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, ingresa una dirección de correo electrónico válida." }),
});

type ForgotPasswordFormData = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setMessage(null);

    // Mock logic
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setMessage({ type: 'success', text: '¡Correo de restablecimiento enviado (Mock)! Revisa tu bandeja de entrada.' });
    toast({
        title: 'Correo Enviado',
        description: 'Las instrucciones para restablecer tu contraseña han sido enviadas a tu correo (Simulado).',
    });
    form.reset();
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección de Correo Electrónico</FormLabel>
              <FormControl>
                <div className="relative">
                   <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                   <Input type="email" placeholder="tu@ejemplo.com" {...field} className="pl-10" disabled={isLoading} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {message && (
          <p className={`text-sm ${message.type === 'error' ? 'text-destructive' : 'text-green-600'}`}>
            {message.text}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Enlace de Restablecimiento'}
        </Button>
      </form>
    </Form>
  );
}
