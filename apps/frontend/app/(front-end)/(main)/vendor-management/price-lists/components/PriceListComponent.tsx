"use client";

import { Link, useRouter } from '@/lib/i18n';
import React, { useEffect, useState } from 'react'
import { Pricelist, pricelistData } from '../types_data';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Filter, MoreVertical, Pencil, Plus, Printer, Search, Upload } from 'lucide-react';
import ListPageTemplate from '@/components/templates/ListPageTemplate';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@radix-ui/react-checkbox';
import * as m from '@/paraglide/messages.js';
import { Badge } from '@/components/ui-custom/is-active-badge';
const PriceListComponent = () => {
    const router = useRouter();
    const [pricelists, setPricelists] = useState<Pricelist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        async function fetchPricelists() {
            try {
                const data = pricelistData
                setPricelists(data.pricelists)
                setTotalPages(Math.ceil(data.total / pageSize))
            } catch (err) {
                setError('Error fetching pricelists')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPricelists()
    }, [currentPage, searchQuery])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleAddPricelist = () => {
        router.push('/vendor-management/price-lists/new');
    };

    const handleImport = () => {
        router.push('/vendor-management/price-lists/import');
    };

    const handleGenerateReport = () => {
        router.push('/vendor-management/reports/pricelists');
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const actionButtons = (
        <div className='flex gap-2'>
            <Button variant="outline" onClick={handleAddPricelist} size={'sm'}>
                <Plus className="h-4 w-4" /> Add Pricelist
            </Button>
            <Button variant="outline" onClick={handleImport} size={'sm'}>
                <Upload className="h-4 w-4" /> Import
            </Button>
            <Button variant="outline" onClick={handleGenerateReport} size={'sm'}>
                <Printer className="h-4 w-4" /> Print
            </Button>
        </div>
    )

    const content = (
        <div className="space-y-6">
            {/* Description Section */}
            <div className="px-6 py-4 border rounded-lg">
                <h2 className="text-sm font-semibold text-gray-900">About Price Lists</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Manage your vendor price lists, special offers, and seasonal discounts. Create and track different pricing strategies for various time periods.
                </p>
            </div>

            {/* Search and Filters Row */}
            <div className="flex items-center justify-between gap-4 bg-background">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search price lists..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-10 w-full h-8"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 text-sm" size={'sm'}>
                        <Filter className="h-4 w-4" />
                        More Filters
                    </Button>
                    <Button variant="outline" className="gap-2 text-sm" size={'sm'}>
                        <ArrowUpDown className="h-4 w-4" />
                        Sort
                    </Button>
                </div>
            </div>

            {pricelists.length > 0 ? (
                <div className="rounded-lg border ">
                    <Table>
                        <TableHeader>
                            <TableRow >
                                <TableHead className="w-12 py-3">
                                    <Checkbox className="ml-3" />
                                </TableHead>
                                <TableHead className="py-3 font-medium text-gray-600">Name</TableHead>
                                <TableHead className="py-3 font-medium text-gray-600">Start Date</TableHead>
                                <TableHead className="py-3 font-medium text-gray-600">End Date</TableHead>
                                <TableHead className="py-3 font-medium text-gray-600">Status</TableHead>
                                <TableHead className="py-3 text-right font-medium text-gray-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pricelists.map((pricelist) => (
                                <TableRow
                                    key={pricelist.id}
                                    className="group cursor-pointer border-b last:border-b-0"
                                >
                                    <TableCell className="py-4 pl-4">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{pricelist.name}</span>
                                                {pricelist.isActive && (
                                                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                                                        {pricelist.id}
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500 mt-0.5">
                                                {pricelist.description}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-gray-600">
                                        {new Date(pricelist.startDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="py-4 text-gray-600">
                                        {new Date(pricelist.endDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge variant={pricelist.isActive ? 'default' : 'destructive'}>
                                            {pricelist.isActive ? `${m.status_active()}` : `${m.status_inactive()}`}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                                asChild
                                            >
                                                <Link href={`/vendor-management/price-lists/${pricelist.id}`}>
                                                    <span className="sr-only">View</span>
                                                    <Search className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                                asChild
                                            >
                                                <Link href={`/vendor-management/price-lists/${pricelist.id}/edit`}>
                                                    <span className="sr-only">Edit</span>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                            >
                                                <span className="sr-only">More</span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-12 border rounded-lg bg-gray-50/50">
                    <p className="text-gray-600 mb-4">No price lists found</p>
                    <Button onClick={handleAddPricelist} variant="default">
                        Add Your First Price List
                    </Button>
                </div>
            )}

            {/* Pagination */}
            {pricelists.length > 0 && (
                <div className="flex items-center justify-between border-t p-2">
                    <p className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                className="h-8 min-w-[2rem] px-2"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
    return (
        <ListPageTemplate
            title="Price Lists"
            actionButtons={actionButtons}
            content={content}
        />
    )
}

export default PriceListComponent