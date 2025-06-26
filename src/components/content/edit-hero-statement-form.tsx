'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { updateHeroStatement } from "@/app/actions/content-actions"
import { type HeroStatement } from "@/lib/models/content"
import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="sm">
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    )
}

interface EditHeroStatementFormProps {
    statement: HeroStatement;
}

export function EditHeroStatementForm({ statement }: EditHeroStatementFormProps) {
    const { toast } = useToast();

    const formAction = async (prevState: any, formData: FormData) => {
        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            // Pass through existing data for fields not in the form
            ctaText: statement.ctaText,
            ctaLink: statement.ctaLink,
            ctaIconName: statement.ctaIconName,
            ctaVariant: statement.ctaVariant,
            order: statement.order,
        };
        // This validation is a bit redundant since the action validates too, but it's good practice.
        if (!data.title || !data.description) {
            return { success: false, message: "Title and description cannot be empty." };
        }
        return await updateHeroStatement(statement.id!, data);
    };

    const [state, dispatch] = useActionState(formAction, { success: false, message: null });

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? "Success" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
        }
    }, [state, toast]);

    return (
        <form action={dispatch} className="p-4 border rounded-lg bg-background space-y-4">
             <h4 className="font-semibold text-foreground">Statement (Order: {statement.order})</h4>
             <div>
                <Label htmlFor={`title-${statement.id}`}>Title</Label>
                <Input id={`title-${statement.id}`} name="title" defaultValue={statement.title} />
             </div>
             <div>
                <Label htmlFor={`description-${statement.id}`}>Description</Label>
                <Textarea id={`description-${statement.id}`} name="description" defaultValue={statement.description} />
             </div>
             <SubmitButton />
        </form>
    );
}
