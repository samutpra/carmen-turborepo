import React, { FormEvent, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    defaultValue: string;
    placeholder?: string;
    containerClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
    onSubmit,
    defaultValue = '',
    placeholder = 'Search Store Location...',
    containerClassName = 'w-full md:w-1/3',
    inputClassName = 'h-10 pr-10',
    buttonClassName = 'absolute right-0 top-0 h-full px-3'
}) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const formElement = e.currentTarget.closest('form');
            if (formElement) {
                formElement.requestSubmit();
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex gap-2 w-full">
            <div className={`relative ${containerClassName}`}>
                <Input
                    name="search"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onKeyDown={handleKeyDown}
                    className={inputClassName}
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className={buttonClassName}
                >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>
            </div>
        </form>
    );
};

export default SearchForm;