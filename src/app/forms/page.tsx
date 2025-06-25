
import { UserForm } from '@/components/forms/user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlesGroupLogo } from '@/components/logo'; // Example icon

export default function FormsPage() {
  return (
    // Two-column layout similar to login page
    <div className="flex min-h-screen bg-background">
       {/* Left Column: Depth Illusion Container */}
       <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-0">
        <div className="relative w-full h-full flex flex-col items-center justify-center
                      bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)),_hsl(var(--primary)),_hsl(var(--ring)))]
                      bg-[length:300%_300%] animate-gradient text-primary-foreground text-center shadow-2xl">
          <PlesGroupLogo className="text-[18rem] mb-12" />
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Conéctate con PLES
          </h1>
          <p className="text-lg max-w-md opacity-90 leading-relaxed text-left px-4">
            <span className="text-3xl font-bold text-accent">Accede</span>
            <span className="text-xl"> a un mundo de </span>
            <span className="text-4xl font-extrabold text-primary-foreground">soluciones</span>
            <span className="text-3xl font-bold text-accent"> innovadoras</span>
            <span className="text-xl"> y </span>
            <span className="text-4xl font-extrabold text-primary-foreground">gestión</span>
            <span className="text-3xl font-bold text-accent"> inteligente.</span>
          </p>
        </div>
      </div>

      {/* Right Column: Contact Form */}
       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
         <div className="w-full max-w-2xl space-y-6"> {/* Increased max-width for form */}
            <div>
               <h1 className="text-3xl font-bold">Contáctenos</h1> {/* Updated Title */}
               <p className="text-muted-foreground mt-2">Por favor complete su información a continuación</p> {/* Updated Description */}
            </div>
            {/* Removed Card component */}
            <UserForm />
         </div>
      </div>
    </div>
  );
}
