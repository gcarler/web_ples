// src/app/admin/content-management/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'Content Management - PLES Admin',
  description: 'Manage website content like text, images, and sections.',
};

export default function ContentManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Edit and update various content sections of your public website.
          </p>
        </div>
      </div>

      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle>Website Content Editor</CardTitle>
          <CardDescription>
            This section will provide tools to manage the textual and visual content of your main website pages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Under Development</AlertTitle>
            <AlertDescription>
              The content management tools are currently under development.
              Future capabilities will include editing hero text, service descriptions, testimonials, and more.
            </AlertDescription>
          </Alert>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hero Section</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Edit the rotating statements, descriptions, and call-to-action buttons on the homepage hero.
                </p>
                {/* Placeholder for future form/controls */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About Us Page</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Update the main text, mission, vision, and values on the "About Us" page.
                </p>
                {/* Placeholder for future form/controls */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Service Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage descriptions, features, and case studies for Ples CREA, TIC, Catastro, and Consulting.
                </p>
                {/* Placeholder for future form/controls */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add, edit, or remove customer testimonials displayed on the homepage.
                </p>
                {/* Placeholder for future form/controls */}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
