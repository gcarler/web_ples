// src/app/admin/crm/page.tsx
import { getContacts } from '@/app/actions/crm-actions';
import { ContactDataTable } from '@/components/crm/contact-data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { contactColumns } from '@/components/crm/contact-columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

// Metadata for the page
export const metadata = {
  title: 'CRM Contacts - PLES Admin',
  description: 'View and manage contact submissions.',
};

export default async function CrmAdminPage() {
  // Fetch contacts using the Server Action
  const contacts = await getContacts();

  return (
    // Removed horizontal padding (px-4 sm:px-6 lg:px-8) to rely on AdminLayout's SidebarInset padding
    <div className="py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">CRM Contacts</h1>
            <p className="text-muted-foreground">
                 View and manage contact submissions.
            </p>
        </div>
        {/* Optional: Add Button to add new contact directly */}
        {/* <Button asChild>
            <Link href="/admin/crm/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Contact
            </Link>
        </Button> */}
      </div>

      <Card className="shadow-lg border">
        {/* Removed CardHeader as title is now outside the card */}
        <CardContent className="pt-6"> {/* Added padding top */}
          {contacts.length > 0 ? (
            <ContactDataTable columns={contactColumns} data={contacts} />
          ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No contacts found.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                    Contacts submitted through the website form will appear here.
                </p>
                 {/* Optional: Link to the form page */}
                 <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href="/forms">Go to Contact Form</Link>
                 </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Force dynamic rendering or use revalidatePath for fresh data
export const dynamic = 'force-dynamic';
