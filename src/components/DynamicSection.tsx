import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Define the props interface for the DynamicSection component with the new structure
interface DynamicSectionProps {
  title: string;
  link: string;
}

// DynamicSection component definition
const DynamicSection: React.FC<DynamicSectionProps> = ({
  title,
  link,
}) => {
  return (
    <section className="flex flex-col rounded-lg p-8 w-full transition-colors shadow-md hover:bg-blue-100">
      
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>

      
      <div className="mt-4 w-full flex items-center justify-end">
        <Link href={link}>
       
        <div className=" rounded-full p-2 group-hover:bg-black">
        
          <ArrowRight className="h-4 w-4 group-hover:text-white" />
        </div>
        </Link>
        </div>
    </section>
  );
};

export default DynamicSection;
