// src/app/ples-crea/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'PLES CREA - Creative Solutions',
  description: 'Explore creative and design solutions by PLES CREA.',
};

export default function PlesCreaPage() {
  return (
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">PLES CREA</CardTitle>
          <CardDescription>
            Innovative design and creative solutions for your business needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                From branding to web design, we bring your vision to life.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://picsum.photos/600/400?random=9"
                alt="Creative Design"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="creative design studio"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
