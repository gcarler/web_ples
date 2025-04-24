import { UserForm } from '@/components/forms/user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FormsPage() {
  return (
    <div className="max-w-2xl mx-auto">
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
