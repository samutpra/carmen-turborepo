import React, { KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchFormProps {
    defaultValue: string;
    onSearch: (value: string) => void;
    placeholder?: string;
    containerClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
    defaultValue = '',
    placeholder = '',
    containerClassName = 'w-full md:w-1/3',
    inputClassName = 'h-8 pr-10 text-xs',
    buttonClassName = 'absolute right-0 top-0 h-full px-3',
    onSearch
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

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(event.currentTarget.search.value);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2 w-full">
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
                    size={'sm'}
                    className={buttonClassName}
                >
                    <Search />
                    <span className="sr-only">Search</span>
                </Button>
            </div>
        </form>
    );
};

export default SearchForm;