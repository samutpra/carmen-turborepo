import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface PasswordInput extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorMessage?: string;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInput>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ className, error, icon, iconPosition = 'end', type = 'password', ...props }, ref) => {
        const [isPasswordVisible, setPasswordVisible] = useState(false);

        const togglePasswordVisibility = () => {
            setPasswordVisible(prev => !prev);
        };

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
                    type={isPasswordVisible ? 'text' : 'password'}
                    {...props}
                />
                <div
                    className={cn(
                        "absolute top-1/2 transform -translate-y-1/2",
                        iconPosition === 'end' ? "right-3" : "left-3",
                        error ? "text-red-500" : "text-gray-500"
                    )}
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
                </div>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
