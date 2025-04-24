import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to AngularFlow</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Exploring Angular concepts within a Next.js application.
        </p>
        <p className="max-w-2xl mx-auto text-foreground mb-8">
          This application demonstrates fundamental web development features like routing and interactive forms, styled using Tailwind CSS and ShadCN UI components, mimicking a professional Angular project structure and feel.
        </p>
        <Button asChild size="lg">
          <Link href="/forms">
            Explore Forms <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Layout & Routing</CardTitle>
            <CardDescription>Structured page layout and navigation.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The application features a standard header, footer, and main content area. Navigation between different sections like 'Home' and 'Forms' is handled using Next.js App Router, providing a seamless single-page application experience similar to Angular's routing.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Interactive Forms</CardTitle>
            <CardDescription>User input handling and validation.</CardDescription>
          </CardHeader>
          <CardContent>
             <p>
              Visit the <Link href="/forms" className="text-primary underline hover:text-primary/80">Forms</Link> page to see an example of a user input form. It utilizes React Hook Form for state management, validation, and submission, comparable to Angular's Reactive Forms module.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
