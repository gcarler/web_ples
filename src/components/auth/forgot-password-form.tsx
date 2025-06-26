// src/components/auth/forgot-password-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const auth = app ? getAuth(app) : null;

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setMessage(null);

    if (!auth) {
        const configError = "Firebase no está configurado. No se puede enviar el correo de restablecimiento.";
        setMessage({ type: 'error', text: configError });
        toast({ title: 'Error de Configuración', description: configError, variant: 'destructive' });
        setIsLoading(false);
        return;
    }

    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage({ type: 'success', text: '¡Correo de restablecimiento enviado! Revisa tu bandeja de entrada.' });
      toast({
        title: 'Correo Enviado',
        description: 'Las instrucciones para restablecer tu contraseña han sido enviadas a tu correo.',
      });
      form.reset(); // Reset form on success
    } catch (error: any) {
      console.error('Password Reset Error:', error);
      let errorMessage = 'No se pudo enviar el correo de restablecimiento. Por favor, inténtalo de nuevo.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No se encontró ningún usuario con esta dirección de correo electrónico.';
      } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Por favor, ingresa una dirección de correo electrónico válida.';
      }
      setMessage({ type: 'error', text: errorMessage });
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
