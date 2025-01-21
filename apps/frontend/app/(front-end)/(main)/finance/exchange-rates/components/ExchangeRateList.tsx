"use client";
import React, { useCallback, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getExchangeRate } from '../../actions/exchangeRate';
import { Button } from '@/components/ui/button';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';
interface ExchangeRateType {
    code: string;
    name: string;
    symbol: string;
    historical_rate: number;
}

const ITEMS_PER_PAGE = 10;

const LoadingTable = () => (
    <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-12" />
        ))}
    </div>
);

const ExchangeRateList = () => {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRateType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('THB');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getExchangeRate();
            setExchangeRates(data);
        } catch (err) {
            console.error(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const handleBaseCurrencySelect = async (base_currency: string) => {
        setSelectedCurrency(base_currency === selectedCurrency ? "" : base_currency);
        setOpen(false);
        const data = await getExchangeRate(base_currency);
        setExchangeRates(data);
        setCurrentPage(1);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const filteredRates = exchangeRates.filter((rate) =>
        Object.values(rate)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRates.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRates = filteredRates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const formatRate = (rate: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(rate);
    };

    const title = 'Exchange Rates';

    const filter = (
        <div className="filter-container">
            <div className="relative my-2 w-full md:w-1/3">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search currencies..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                    aria-label="Search currencies"
                />
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        size={'sm'}
                        className="w-[100px] justify-between"
                    >
                        {selectedCurrency
                            ? exchangeRates.find((rate) => rate.code === selectedCurrency)?.code
                            : "Select base currency"}
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search currency..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No currency found.</CommandEmpty>
                            <CommandGroup>
                                {exchangeRates.map((rate) => (
                                    <CommandItem
                                        key={rate.code}
                                        value={rate.code}
                                        onSelect={handleBaseCurrencySelect}
                                    >
                                        <span>{rate.code}</span>
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedCurrency === rate.code ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )

    const content = (
        <>
            <div>
                {isLoading ? (
                    <LoadingTable />
                ) : (
                    <>
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">#</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Symbol</TableHead>
                                        <TableHead className="text-right">Rate</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedRates.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No results found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedRates.map((rate, index) => (
                                            <TableRow key={rate.code}>
                                                <TableCell>{startIndex + index + 1}</TableCell>
                                                <TableCell>{rate.code}</TableCell>
                                                <TableCell>{rate.name}</TableCell>
                                                <TableCell>{rate.symbol}</TableCell>
                                                <TableCell className="text-right font-mono">
                                                    {formatRate(rate.historical_rate)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="md:hidden">
                            {paginatedRates.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No results found
                                </div>
                            ) : (
                                <div className="grid gap-4 p-4">
                                    {paginatedRates.map((rate, index) => (
                                        <Card key={rate.code}>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <CardDescription>
                                                            #{startIndex + index + 1}
                                                        </CardDescription>
                                                        <CardTitle className="text-xl">
                                                            {rate.code}
                                                        </CardTitle>
                                                    </div>
                                                    <CardTitle className="font-mono tabular-nums">
                                                        {formatRate(rate.historical_rate)}
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <div className="truncate max-w-[60%]">
                                                        {rate.name}
                                                    </div>
                                                    <div className="font-medium">
                                                        {rate.symbol}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {!isLoading && filteredRates.length > 0 && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, i) => {
                            const pageNumber = i + 1;
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            onClick={() => setCurrentPage(pageNumber)}
                                            isActive={currentPage === pageNumber}
                                            className="cursor-pointer"
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            } else if (
                                pageNumber === currentPage - 2 ||
                                pageNumber === currentPage + 2
                            ) {
                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }
                            return null;
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    )

    return (
        <DataDisplayTemplate
            title={title}
            filters={filter}
            content={content}
        />
    )
}

export default ExchangeRateList