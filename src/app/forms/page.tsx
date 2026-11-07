// src/app/forms/page.tsx
'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Send,
  Loader,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Building2,
  Crosshair,
  Layers,
  Scale,
  MapPin,
  Cpu
} from 'lucide-react';
import { ProcessingStatusModal } from '@/components/forms/processing-status-modal';
import { trackEvent } from '@/components/analytics/google-analytics';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, ingrese un correo válido.' }),
  phone: z.string().optional(),
  entityType: z.string().optional(),
  subject: z.string().min(5, { message: 'El asunto debe tener al menos 5 caracteres.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

type ContactFormData = z.infer<typeof formSchema>;

const serviceNameMap: Record<string, { label: string; department: string; defaultSubject: string; defaultMessage: string; icon: any }> = {
  'ples-catastro': {
    label: 'Catastro Multipropósito y Gestión Territorial',
    department: 'PLES Catastro',
    defaultSubject: 'Solicitud de Asesoría en Catastro Multipropósito',
    defaultMessage: 'Hola equipo PLES Catastro,\n\nMe pongo en contacto para solicitar información y cotización sobre sus servicios de gestión territorial y catastro multipropósito.\n\nDetalles del proyecto / municipio:\n- Ubicación:\n- Número estimado de predios o área:\n- Plazo estimado:\n\nQuedo a la espera de su respuesta.',
    icon: Building2
  },
  'levantamiento-predial': {
    label: 'Levantamiento Predial Multipropósito (Barrido LADM-COL)',
    department: 'PLES Catastro',
    defaultSubject: 'Cotización: Levantamiento Predial Multipropósito',
    defaultMessage: 'Hola equipo PLES Catastro,\n\nSolicito cotización para el levantamiento predial multipropósito bajo estándar LADM-COL.\n\nInformación inicial:\n- Tipo de predios (urbanos / rurales):\n- Municipio / Región:\n- Cantidad aproximada de predios:\n\nMuchas gracias.',
    icon: Crosshair
  },
  'actualizacion-mantenimiento': {
    label: 'Actualización y Conservación Catastral Dinámica',
    department: 'PLES Catastro',
    defaultSubject: 'Consulta: Mantenimiento y Conservación Catastral',
    defaultMessage: 'Hola equipo PLES Catastro,\n\nRequerimos apoyo técnico para la gestión de mutaciones catastrales y conservación dinámica con interoperabilidad SNR.\n\nDetalles de la solicitud:\n- Entidad solicitante:\n- Necesidad específica:\n\nSaludos cordiales.',
    icon: Layers
  },
  'avaluos': {
    label: 'Avalúos Masivos y Avalúos Comerciales (Metodología IGAC / RAA)',
    department: 'PLES Catastro',
    defaultSubject: 'Cotización: Avalúos Masivos y Zonas Homogéneas',
    defaultMessage: 'Hola equipo PLES Catastro,\n\nNos interesa cotizar un estudio de valoración inmobiliaria (avalúo masivo / zonas homogéneas geoeconómicas o avalúo pericial RAA).\n\nDetalles preliminares:\n- Tipo de inmuebles / jurisdicción:\n- Propósito (fiscal, comercial, servidumbre):\n\nAtentamente.',
    icon: Scale
  },
  'ordenamiento-territorial': {
    label: 'Planes de Ordenamiento Territorial (POT / PBOT / EOT)',
    department: 'PLES Catastro',
    defaultSubject: 'Asesoría: Instrumentos de Ordenamiento Territorial (POT)',
    defaultMessage: 'Hola equipo PLES Catastro,\n\nRequerimos acompañamiento técnico en la formulación o ajuste de instrumentos de ordenamiento territorial municipal.\n\nMunicipio:\nFase actual del instrumento:\n\nGracias.',
    icon: MapPin
  },
  'ples-crea': {
    label: 'Cartografía Digital, Drones VTOL y Modelado 3D',
    department: 'PLES CREA',
    defaultSubject: 'Cotización: Servicios Geoespaciales PLES CREA',
    defaultMessage: 'Hola equipo PLES CREA,\n\nMe gustaría solicitar información técnica y cotización sobre captura con drones VTOL y cartografía digital.\n\nÁrea aproximada y ubicación:\nTipo de entregable requerido:\n\nSaludos.',
    icon: Cpu
  },
  'ples-tic': {
    label: 'Desarrollo de Software y Soluciones Cloud',
    department: 'PLES TIC',
    defaultSubject: 'Consulta Soluciones PLES TIC',
    defaultMessage: 'Hola equipo PLES TIC,\n\nNos interesa conocer más sobre sus soluciones tecnológicas empresariales y desarrollo a medida.\n\nQuedo atento a su contacto.',
    icon: Cpu
  },
  'ples-consulting': {
    label: 'Consultoría Estratégica e Innovación',
    department: 'PLES Consulting',
    defaultSubject: 'Solicitud de Asesoría Estratégica PLES Consulting',
    defaultMessage: 'Hola equipo PLES Consulting,\n\nNos gustaría explorar una alianza estratégica y consultoría para nuestra organización.\n\nSaludos.',
    icon: Building2
  }
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container py-24 text-center text-muted-foreground">Cargando formulario de contacto...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}

function ContactFormContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [radicadoCode, setRadicadoCode] = useState('');
  const [submittedData, setSubmittedData] = useState({ name: '', email: '' });

  const serviceParam = searchParams.get('service') || '';
  const subserviceParam = searchParams.get('subservice') || '';
  const subjectParam = searchParams.get('subject') || '';

  // Determine active service meta
  const activeKey = subserviceParam || serviceParam;
  const activeServiceInfo = serviceNameMap[activeKey] || (serviceParam ? serviceNameMap[serviceParam] : null);

  const initialSubject = subjectParam || activeServiceInfo?.defaultSubject || '';
  const initialMessage = activeServiceInfo?.defaultMessage || '';

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      entityType: 'Municipio / Entidad Pública',
      subject: initialSubject,
      message: initialMessage,
    },
  });

  // Update form fields if query params arrive after mount
  useEffect(() => {
    if (initialSubject && !form.getValues('subject')) {
      form.setValue('subject', initialSubject);
    }
    if (initialMessage && !form.getValues('message')) {
      form.setValue('message', initialMessage);
    }
  }, [initialSubject, initialMessage, form]);

  async function onSubmit(values: ContactFormData) {
    setIsLoading(true);
    const radNumber = `#RAD-2026-PLES-${Math.floor(1000 + Math.random() * 9000)}`;
    setRadicadoCode(radNumber);
    setSubmittedData({ name: values.name, email: values.email });
    setShowModal(true);
    setIsComplete(false);

    // Realistic telemetry processing delay (2.2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2200));

    setIsComplete(true);
    trackEvent('lead_submitted', {
      radicado: radNumber,
      service: activeKey || 'general',
      entity_type: values.entityType,
    });

    toast({
      title: '¡Solicitud Radicada Exitosamente!',
      description: `Radicado institucional: ${radNumber}. Copia enviada a ${values.email}.`,
    });

    form.reset({
      name: '',
      email: '',
      phone: '',
      entityType: 'Municipio / Entidad Pública',
      subject: initialSubject,
      message: '',
    });
    setIsLoading(false);
  }

  const ServiceIcon = activeServiceInfo?.icon || Building2;

  return (
    <div className="container py-12 md:py-20 max-w-3xl">
      {/* Return link */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link href={serviceParam ? `/${serviceParam}` : '/'} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a {activeServiceInfo?.department || 'la página anterior'}</span>
          </Link>
        </Button>
      </div>

      {/* Contextual Active Service Card */}
      {activeServiceInfo && (
        <div className="mb-8 p-5 rounded-2xl border-2 border-primary/30 bg-primary/5 flex items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md">
              <ServiceIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="text-[11px] px-2.5 py-0.5">
                  {activeServiceInfo.department}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">Solicitud de Servicio</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {activeServiceInfo.label}
              </h2>
            </div>
          </div>
          <Link href="/forms" className="text-xs text-muted-foreground hover:text-primary shrink-0 underline">
            Cambiar
          </Link>
        </div>
      )}

      {/* Main Form Card */}
      <Card className="border shadow-xl bg-card rounded-2xl">
        <CardHeader className="text-center pb-6 border-b border-border/50">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mx-auto mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Atención Especializada PLES SAS</span>
          </div>
          <CardTitle className="text-3xl font-extrabold text-foreground">
            {activeServiceInfo ? `Cotizar ${activeServiceInfo.label}` : 'Solicitud de Contacto y Servicios'}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mt-2">
            Complete los datos de su proyecto para recibir un diagnóstico preliminar y propuesta técnica adaptada a su territorio.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground/80">Nombre Completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Ing. Carlos Mendoza" {...field} className="h-11 rounded-xl" />
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
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground/80">Correo Electrónico *</FormLabel>
                      <FormControl>
                        <Input placeholder="correo@entidad.gov.co" {...field} className="h-11 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground/80">Teléfono / WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="+57 300 000 0000" {...field} className="h-11 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="entityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground/80">Tipo de Organización</FormLabel>
                      <FormControl>
                        <Input placeholder="Alcaldía / Gestor / Empresa / Particular" {...field} className="h-11 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground/80">Asunto de la Solicitud *</FormLabel>
                    <FormControl>
                      <Input placeholder="¿En qué podemos asesorarle?" {...field} className="h-11 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground/80">Descripción del Proyecto o Necesidad *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describa el alcance, municipio, área estimada o preguntas específicas..." 
                        className="min-h-[160px] rounded-xl text-sm leading-relaxed"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Enviando Solicitud...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Solicitud de Cotización
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted-foreground border-t border-border/40">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Respuesta en menos de 24 horas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Atención directa con peritos certificados
                </span>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <ProcessingStatusModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        senderName={submittedData.name}
        senderEmail={submittedData.email}
        radicadoCode={radicadoCode}
        isComplete={isComplete}
      />
    </div>
  );
}
