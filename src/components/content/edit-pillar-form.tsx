'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updatePillar } from "@/app/actions/content-actions";
import { type Pillar } from "@/lib/models/content";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="sm">
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    )
}

interface EditPillarFormProps {
    pillar: Pillar;
}

export function EditPillarForm({ pillar }: EditPillarFormProps) {
    const { toast } = useToast();

    const formAction = async (prevState: any, formData: FormData) => {
        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
        };
        return await updatePillar(pillar.id!, data);
    };

    const [state, dispatch] = useFormState(formAction, { success: false, message: null });

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
             <h4 className="font-semibold text-foreground capitalize">Pillar: {pillar.id}</h4>
             <div>
                <Label htmlFor={`title-${pillar.id}`}>Title</Label>
                <Input id={`title-${pillar.id}`} name="title" defaultValue={pillar.title} />
             </div>
             <div>
                <Label htmlFor={`description-${pillar.id}`}>Description</Label>
                <Textarea id={`description-${pillar.id}`} name="description" defaultValue={pillar.description} rows={3} />
             </div>
             <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Icon: {pillar.iconName} | Link: {pillar.link} (Not editable)</p>
                <SubmitButton />
             </div>
        </form>
    );
}
