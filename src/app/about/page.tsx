import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

// Metadata for SEO
export const metadata = {
  title: 'Sobre Nosotros - PLES', // Page title
  description: 'Conoce más sobre PLES, nuestra misión, visión y valores.', // Updated description
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
    // Use a two-column grid layout on medium screens and up
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* Column 1: Main "Sobre Nosotros" Text */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-primary">Sobre Nosotros</h1>
        <p className="text-lg mb-4">
          Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
        </p>
        <p className="text-lg">
          CON LOS ATRIBUTOS QUE TRAE.
        </p>
         {/* Moved Valores Fundamentales here */}
         <div className="border rounded-lg p-8 shadow-md bg-card text-card-foreground mt-8">
             <h2 className="text-2xl font-bold mb-4 text-center text-primary">Nuestros Valores Fundamentales</h2>
             <p className="text-base"> {/* Adjusted text size */}
                 Integridad como principio rector, innovación como motor de progreso y colaboración como esencia de nuestro accionar. Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
             </p>
         </div>
      </section>

      {/* Column 2: Dynamic Links Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* Inner grid for cards */}
        {sections.map((section, index) => (
          // Wrap DynamicSection in a Card for consistent styling
           <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
             <CardContent className="p-0"> {/* Remove default CardContent padding */}
                 <DynamicSection {...section} />
             </CardContent>
           </Card>
        ))}
      </section>

      {/* Moved Valores Fundamentales to the left column */}
      {/* <section className="border rounded-lg p-8 shadow-md bg-card text-card-foreground md:col-span-2">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary">Nuestros Valores Fundamentales</h2>
        <p className="text-lg">
          Integridad como principio rector, innovación como motor de progreso y colaboración como esencia de nuestro accionar. Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
        </p>
      </section> */}

    </div>
  );
}
