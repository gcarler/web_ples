// src/app/ples-consulting/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'PLES Consulting - Specialized Consulting Services',
  description: 'Explore our range of specialized consulting services.',
};

export default function PlesConsultingPage() {
  return (
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">PLES Consulting</CardTitle>
          <CardDescription>
            Providing expert consulting services to optimize your business strategy.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                Strategic consulting to drive innovation and efficiency.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://picsum.photos/600/400?random=12"
                alt="Consulting Services"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="business consulting strategy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
