// src/app/admin/crm/page.tsx
import { getContacts } from '@/app/actions/crm-actions';
import { ContactDataTable } from '@/components/crm/contact-data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { contactColumns } from '@/components/crm/contact-columns'; // Assuming columns are defined here

export default async function CrmAdminPage() {
  // Fetch contacts using the Server Action
  const contacts = await getContacts();

  return (
    <div className="container mx-auto py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">CRM Contacts</CardTitle>
          <CardDescription>
            View and manage contact submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contacts.length > 0 ? (
            <ContactDataTable columns={contactColumns} data={contacts} />
          ) : (
            <p className="text-muted-foreground text-center py-4">No contacts found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Force dynamic rendering to ensure fresh data on each load
// export const dynamic = 'force-dynamic';
// Alternatively, use revalidatePath in the action to update the cache
