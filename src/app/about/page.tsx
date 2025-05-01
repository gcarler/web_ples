// src/app/about/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - PLES',
  description: 'Learn more about PLES and our mission.',
};

export default function AboutPage() {
  return (
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">About PLES</CardTitle>
          <CardDescription>
            Our mission is to provide innovative and efficient solutions that drive growth and digital transformation.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                We are dedicated to delivering exceptional value through technology and expertise.
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://picsum.photos/600/400?random=8"
                alt="PLES Team"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="company team collaboration"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
