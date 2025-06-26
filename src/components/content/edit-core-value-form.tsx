'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updateCoreValue } from "@/app/actions/content-actions";
import { type CoreValue } from "@/lib/models/content";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="sm">
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    )
}

interface EditCoreValueFormProps {
    value: CoreValue;
}

export function EditCoreValueForm({ value }: EditCoreValueFormProps) {
    const { toast } = useToast();

    const formAction = async (prevState: any, formData: FormData) => {
        const data = {
            name: formData.get('name') as string,
            explanation: formData.get('explanation') as string,
        };
        return await updateCoreValue(value.id!, data);
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
             <h4 className="font-semibold text-foreground capitalize">Value: {value.id}</h4>
             <div>
                <Label htmlFor={`name-${value.id}`}>Name</Label>
                <Input id={`name-${value.id}`} name="name" defaultValue={value.name} />
             </div>
             <div>
                <Label htmlFor={`explanation-${value.id}`}>Explanation</Label>
                <Textarea id={`explanation-${value.id}`} name="explanation" defaultValue={value.explanation} rows={4} />
             </div>
             <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Icon: {value.iconName} (Not editable)</p>
                <SubmitButton />
             </div>
        </form>
    );
}
