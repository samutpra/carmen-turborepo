import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import React from 'react'

interface Props {
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
    placeholder: string;
    disabled?: boolean;
}
const AddSection: React.FC<Props> = ({
    value,
    onChange,
    onAdd,
    placeholder,
    disabled = false
}) => {

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !disabled && value.trim()) {
            onAdd();
        }
    };

    return (
        <div className="flex gap-2">
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled}
                className="flex-1"
            />
            <Button
                onClick={onAdd}
                disabled={disabled || !value.trim()}
                className="whitespace-nowrap h-7"
            >
                <Plus />
                เพิ่ม
            </Button>
        </div>
    );
}

export default AddSection