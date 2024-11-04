import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface InputCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorMessage?: string;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
}

const InputCustom = React.forwardRef<HTMLInputElement, InputCustomProps>(
    ({ className, error, icon, iconPosition = 'end', ...props }, ref) => {
        return (
            <div className="relative">
                <Input
                    className={cn(
                        "text-xs",
                        iconPosition === 'end' ? "pr-10" : "pl-10",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div
                    className={cn(
                        "absolute top-1/2 transform -translate-y-1/2",
                        iconPosition === 'end' ? "right-3" : "left-3",
                        error ? "text-red-500" : "text-gray-500"
                    )}
                >
                    {error ? <AlertCircle className="h-4 w-4" /> : icon}
                </div>
            </div>
        );
    }
);

InputCustom.displayName = "InputCustom";

export { InputCustom };