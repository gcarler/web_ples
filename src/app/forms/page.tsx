
import { UserForm } from '@/components/forms/user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlesGroupLogo } from '@/components/logo'; // Example icon

export default function FormsPage() {
  const formsText = "Estamos aquí para ayudarte a transformar tus ideas en realidad. Contáctanos y descubre cómo PLES puede impulsar tu próximo proyecto.";
  const words = formsText.split(' ');

  return (
    // Two-column layout similar to login page
    <div className="flex min-h-screen bg-background">
       {/* Left Column: Depth Illusion Container */}
       <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-0">
        <div className="relative w-full h-full flex flex-col items-center justify-center
                      bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)),_hsl(var(--primary)),_hsl(var(--ring)))]
                      bg-[length:300%_300%] animate-gradient text-primary-foreground text-center shadow-2xl">
          <PlesGroupLogo className="text-9xl mb-8" />
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Conéctate con PLES
          </h1>
          <p className="text-lg max-w-md opacity-90 flex flex-wrap justify-center">
            {words.map((word, index) => (
              <span
                key={index}
                className="inline-block animate-fly-in-word"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                {word}&nbsp;
              </span>
            ))}
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
