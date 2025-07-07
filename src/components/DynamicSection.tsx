import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card'; // Import Card components
import React from 'react';

// Define the props interface for the DynamicSection component with the new structure
interface DynamicSectionProps {
  title: string;
  content: string;
  link: string;
  icon: React.ElementType; // Icon is expected
}

// DynamicSection component definition
const DynamicSection: React.FC<DynamicSectionProps> = ({
  title,
  content,
  link,
  icon: Icon,
}) => {
  return (
    // Use padding within the section, it's now inside a Card's content area
    <section className="flex flex-col p-6 w-full h-full justify-between"> {/* Use h-full and justify-between */}
      <div> {/* Group title and description */}
        <div className="flex items-center gap-3 mb-3">
            <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
            <CardTitle className="text-xl font-semibold group-hover:text-primary-foreground">{title}</CardTitle>
        </div>
         {/* Ensure description color adapts on hover */}
         <CardDescription className="text-muted-foreground group-hover:text-primary-foreground/90 mb-4">{content}</CardDescription> {/* Use content as description */}
      </div>

      {/* Arrow link at the bottom right */}
      <div className="mt-auto self-end"> {/* Push to bottom right */}
        <Link href={link} aria-label={`Ir a ${title}`}>
            {/* Apply hover effect to the link/arrow container */}
            {/* Ensure arrow color adapts on hover */}
            <div className="flex items-center justify-center h-8 w-8 rounded-full group-hover:bg-primary-foreground/20 transition-colors">
                 <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
            </div>
        </Link>
        </div>
    </section>
  );
};

export default DynamicSection;
