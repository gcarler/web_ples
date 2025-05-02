import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';

// Metadata for SEO
export const metadata = {
  title: 'Sobre Nosotros - PLES', // Page title
  description: 'Conoce más sobre PLES y nuestra misión.', // Page description
};
// Main component for the About Us page
export default function AboutPage() {
  // Define the data for the sections to be rendered dynamically
  const sections = [
    {
      title: 'Nuestra Esencia',
      content: 'Comprendiendo quienes somos.',
      link: '/about/esencia',
    },
    {
      title: 'Nuestro Propósito',
      content: 'Explorando nuestro motor.',
      link: '/about/proposito',
    },
    {
      title: 'Colaboración Global',
      content: 'Conoce cómo trabajamos.',
      link: '/about/colaboracion',
    },
    {
      title: 'Nuestra Misión',
      content: 'Guiando nuestras acciones.',
      link: '/about/mision',
    },
    {
      title: 'Nuestra Visión',
      content: 'Definiendo nuestro horizonte.',
      link: '/about/vision',
    },
  ];
  return (
    <section className="border rounded-lg p-8 shadow-md">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full"> {/* Main container for the page */}
        <div className="flex w-full space-x-8 items-start p-4"> {/* Flex layout for the main content */}
          {/* Left column: Somos PLES section, now enclosed in a box */}
          <section className="flex-1 flex flex-col justify-start h-full">
             <div className="p-8 rounded-lg shadow-md">
              <h2 className="text-4xl font-bold mb-4">Somos PLES</h2> {/* Title */}
              {/* Updated paragraph with specific formatting */}
              <p className="text-xl">
                Somos un equipo de <span className="text-accent font-bold">PERSONAS APASIONADAS</span> por el poder transformador de la INNOVACIÓN y la TECNOLOGÍA. CREEMOS firmemente que, mediante la <span className="text-accent font-bold">COLABORACIÓN</span> y la <span className="text-accent">interdisciplinariedad</span>, es posible construir soluciones que impacten positivamente a la sociedad.
              </p>
              </div>
          </section>
          {/* Right column: Dynamic sections */}
          <div className="flex-1 space-y-4"> {/* Container for the dynamic sections with spacing */}
            {sections.map((section, index) => (
              <DynamicSection key={index} {...section} /> // Render each dynamic section
            ))}
          </div>
        </div>
        {/* Call to action */}
        <section className="calltoaction text-center mt-8">
          <Button>Conoce nuestros proyectos</Button>
        </section>
      </div>
    </section>
  );
}
