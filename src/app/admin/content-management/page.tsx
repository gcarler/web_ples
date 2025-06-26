// src/app/admin/content-management/page.tsx
import { getHeroStatements, getCoreValues, getPillars } from '@/app/actions/content-actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditHeroStatementForm } from '@/components/content/edit-hero-statement-form';
import { EditCoreValueForm } from '@/components/content/edit-core-value-form';
import { EditPillarForm } from '@/components/content/edit-pillar-form';

export const metadata = {
  title: 'Content Management - PLES Admin',
  description: 'Manage website content like text, images, and sections.',
};

export default async function ContentManagementPage() {
  const heroStatements = await getHeroStatements();
  const coreValues = await getCoreValues();
  const pillars = await getPillars();

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
          <CardTitle>Homepage Hero Statements</CardTitle>
          <CardDescription>
            Edit the rotating statements on the homepage hero section. Changes will be reflected live.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {heroStatements.map((statement) => (
            statement.id ? <EditHeroStatementForm key={statement.id} statement={statement} /> : null
          ))}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle>About Page: Core Values</CardTitle>
          <CardDescription>
            Edit the core values displayed on the "About Us" page. Icons and links are not editable here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {coreValues.map((value) => (
            value.id ? <EditCoreValueForm key={value.id} value={value} /> : null
          ))}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle>About Page: Pillars</CardTitle>
          <CardDescription>
            Edit the foundational pillars displayed on the "About Us" page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pillars.map((pillar) => (
            pillar.id ? <EditPillarForm key={pillar.id} pillar={pillar} /> : null
          ))}
        </CardContent>
      </Card>
      
    </div>
  );
}

export const dynamic = 'force-dynamic';
