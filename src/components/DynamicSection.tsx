import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card'; // Import Card components

// Define the props interface for the DynamicSection component with the new structure
interface DynamicSectionProps {
  title: string;
  content: string; // Add content prop back if needed for description inside card
  link: string;
}

// DynamicSection component definition
const DynamicSection: React.FC<DynamicSectionProps> = ({
  title,
  content, // Use content for description
  link,
}) => {
  return (
    // Use padding within the section, it's now inside a Card's content area
    <section className="flex flex-col p-6 w-full h-full justify-between"> {/* Use h-full and justify-between */}
      <div> {/* Group title and description */}
        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
         <CardDescription className="text-muted-foreground mb-4">{content}</CardDescription> {/* Use content as description */}
      </div>

      {/* Arrow link at the bottom right */}
      <div className="mt-auto self-end"> {/* Push to bottom right */}
        <Link href={link} aria-label={`Ir a ${title}`}>
            {/* Apply hover effect to the link/arrow container */}
            <div className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-accent transition-colors group">
                 <ArrowRight className="h-4 w-4 text-primary group-hover:text-accent-foreground" />
            </div>
        </Link>
        </div>
    </section>
  );
};

export default DynamicSection;
