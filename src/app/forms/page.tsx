import { UserForm } from '@/components/forms/user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'; // Import Image

export default function FormsPage() {
  return (
    // Two-column layout similar to login page
    <div className="flex min-h-screen bg-background">
       {/* Left Column: Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="https://placehold.co/1200x1600.png" 
          alt="Abstract contact background" 
          layout="fill"
          objectFit="cover"
          data-ai-hint="abstract office contact" 
        />
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
