// src/components/crm/opportunity-stage-pill.tsx
import { Badge } from "@/components/ui/badge";
import { OpportunityStage } from "@/lib/models/opportunity";
import { cn } from "@/lib/utils";
import { CheckCircle, CircleDollarSign, Clock, ListFilter, Percent, RotateCcw, XCircle } from "lucide-react"; // Example icons

interface OpportunityStagePillProps {
    stage: OpportunityStage;
    className?: string;
}

export function OpportunityStagePill({ stage, className }: OpportunityStagePillProps) {
    let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
    let Icon = ListFilter; // Default icon

    switch (stage) {
        case 'Prospecting':
        case 'Qualification':
        case 'Needs Analysis':
            variant = "secondary";
            Icon = ListFilter;
            break;
        case 'Value Proposition':
        case 'Proposal/Price Quote':
            variant = "outline"; // Use outline for mid-stages
            Icon = CircleDollarSign;
            break;
        case 'Negotiation/Review':
            variant = "default"; // Use default (primary) for active negotiation
             Icon = Clock;
            break;
        case 'Closed Won':
            variant = "default"; // Use primary (like accent color for success)
            Icon = CheckCircle;
            // Custom class for green-ish background if theme doesn't cover it well
             className = cn(className, "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50");
            break;
        case 'Closed Lost':
            variant = "destructive";
            Icon = XCircle;
            break;
        default:
            variant = "secondary";
            Icon = ListFilter;
    }

    return (
        <Badge variant={variant} className={cn("capitalize px-2.5 py-0.5 text-xs", className)}>
            <Icon className="mr-1 h-3 w-3" />
            {stage.replace(/[/ ]/g, ' ')} {/* Replace slash with space for readability */}
        </Badge>
    );
}
