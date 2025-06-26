// src/app/admin/content-management/page.tsx
import { getHeroStatements } from '@/app/actions/content-actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditHeroStatementForm } from '@/components/content/edit-hero-statement-form';

export const metadata = {
  title: 'Content Management - PLES Admin',
  description: 'Manage website content like text, images, and sections.',
};

export default async function ContentManagementPage() {
  const heroStatements = await getHeroStatements();

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
          {/* A button to add new statements can be added here in the future */}
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
