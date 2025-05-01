import { UserForm } from '@/components/forms/user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FormsPage() {
  return (
    // Removed container mx-auto for full-width design, added padding
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
       <Card className="shadow-lg">
         <CardHeader>
           <CardTitle className="text-2xl">User Information Form</CardTitle>
           <CardDescription>
             Please fill out the form below. This demonstrates input handling, validation, and submission using React Hook Form.
           </CardDescription>
         </CardHeader>
         <CardContent>
            <UserForm />
         </CardContent>
       </Card>
    </div>
  );
}
