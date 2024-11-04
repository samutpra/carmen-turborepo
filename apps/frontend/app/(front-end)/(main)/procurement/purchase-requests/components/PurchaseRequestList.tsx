"use client"
import React, { useMemo, useState } from 'react'
import { useRouter } from '@/lib/i18n';
import { sampleData } from '../data/sampleData';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown, Download, Edit, Eye, Filter, Plus, Printer, Search, Trash, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import StatusBadge from '@/components/ui-custom/custom-status-badge';
import ListPageTemplate from '@/components/templates/ListPageTemplate';
import SearchInput from '@/components/ui-custom/SearchInput';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { FormAction } from '@/lib/types';


const typeOptions = [
    {
        value: "All Types",
        label: "All Types",
    },
    {
        value: "General Purchase",
        label: "General Purchase",
    },
    {
        value: "Market List",
        label: "Market List",
    },
    {
        value: "Asset Purchase",
        label: "Asset Purchase",
    },
]

const statusOptions = [
    {
        value: "All Statuses",
        label: "All Statuses",
    },
    {
        value: "Draft",
        label: "Draft",
    },
    {
        value: "Submitted",
        label: "Submitted",
    },
    {
        value: "Approved",
        label: "Approved",
    },
    {
        value: "Rejected",
        label: "Rejected",
    },
]


const PurchaseRequestList = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [selectedStatus, setSelectedStatus] = useState("All Statuses");
    const [sortField, setSortField] = useState<
        keyof (typeof sampleData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const itemsPerPage = 7;
    const [selectedPRs, setSelectedPRs] = useState<string[]>([]);
    const [openTypeSearch, setOpenTypeSearch] = useState(false)
    const [openStatusSearch, setOpenStatusSearch] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false)
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        return sampleData.filter((pr) => {
            const matchesSearch = Object.values(pr).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesType =
                selectedType === "All Types" || pr.type === selectedType;
            const matchesStatus =
                selectedStatus === "All Statuses" || pr.status === selectedStatus;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [searchTerm, selectedType, selectedStatus]);

    const sortedAndFilteredData = useMemo(() => {
        let result = filteredData;

        if (sortField) {
            result = [...result].sort((a, b) => {
                if (a[sortField] < b[sortField])
                    return sortDirection === "asc" ? -1 : 1;
                if (a[sortField] > b[sortField])
                    return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [filteredData, sortField, sortDirection]);


    const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedAndFilteredData.slice(startIndex, endIndex);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (field: keyof (typeof sampleData)[0]) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handleCreateNewPR = () => {
        router.push(`/procurement/purchase-requests/${FormAction.CREATE}`)
    };

    const handleViewPR = (id: string) => {
        router.push(`/procurement/purchase-requests/${id}`);
    };

    const handleEditPR = (id: string) => {
        router.push(`/procurement/purchase-requests/${id}/${FormAction.EDIT}`)
    };

    const handleSelectPR = (id: string) => {
        setSelectedPRs((prev) =>
            prev.includes(id) ? prev.filter((prId) => prId !== id) : [...prev, id]
        );
    };

    const handleSelectAllPRs = (checked: boolean) => {
        if (checked) {
            setSelectedPRs(getCurrentPageData().map((pr) => pr.id));
        } else {
            setSelectedPRs([]);
        }
    };

    const handleDelete = (id: string) => {
        setItemToDelete(id);
        setOpenDialogDelete(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            console.log(`Deleting item with id: ${itemToDelete}`);
            setItemToDelete(null);
        }
    };

    const bulkActions =
        selectedPRs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
                <Button variant="outline">Delete Selected</Button>
                <Button variant="outline">Approve Selected</Button>
                <Button variant="outline">Reject Selected</Button>
            </div>
        ) : null;

    const filters = (
        <>
            <div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="w-full sm:w-auto flex-grow">
                    <SearchInput
                        placeholder="Search Purchase Requests..."
                        value={searchTerm}
                        onChange={handleSearch}
                        Icon={Search}
                        variant="suffix"
                    />
                </div>
                <div className='flex items-center space-x-2'>
                    <Popover open={openTypeSearch} onOpenChange={setOpenTypeSearch}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full md:w-1/2 lg:w-[200px] lg:flex justify-between"
                            >
                                {selectedType
                                    ? typeOptions.find((option) => option.value === selectedType)?.label
                                    : "Select status..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search status..." />
                                <CommandList>
                                    <CommandEmpty>No status found.</CommandEmpty>
                                    <CommandGroup>
                                        {typeOptions.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onSelect={(currentValue) => {
                                                    setSelectedType(currentValue === selectedType ? "All Types" : currentValue)
                                                    setOpenTypeSearch(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedType === option.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Popover open={openStatusSearch} onOpenChange={setOpenStatusSearch}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full md:w-1/2 lg:w-[200px] lg:flex justify-between"
                            >
                                {selectedStatus
                                    ? statusOptions.find((option) => option.value === selectedStatus)?.label
                                    : "Select status..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search status..." />
                                <CommandList>
                                    <CommandEmpty>No status found.</CommandEmpty>
                                    <CommandGroup>
                                        {statusOptions.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onSelect={(currentValue) => {
                                                    setSelectedStatus(currentValue === selectedStatus ? "All Statuses" : currentValue)
                                                    setOpenStatusSearch(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedType === option.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='text-xs'>
                            <Filter className="mr-2 h-4 w-4" /> More Filters
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem>Date Range</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Department</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Requestor</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Amount Range</DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );

    const actionButtons = (
        <>
            <div className="flex flex-col gap-2 lg:flex-row">
                <Button onClick={handleCreateNewPR} className="w-full">
                    <Plus className="h-4 w-4" /> New Purchase Request
                </Button>

                <div className="flex gap-2 w-full lg:w-auto">
                    <Button variant="outline" className="w-full lg:w-auto">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                    <Button variant="outline" className="w-full lg:w-auto">
                        <Printer className="h-4 w-4" /> Print
                    </Button>
                </div>
            </div>
        </>
    );


    const content = (
        <>
            <div className="space-y-2" >
                {getCurrentPageData().map((pr) => (
                    <Card key={pr.id} className="overflow-hidden p-2 hover:bg-secondary dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <div className="py-2 px-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-2 mb-6">
                                    <Checkbox
                                        checked={selectedPRs.includes(pr.id)}
                                        onCheckedChange={() => handleSelectPR(pr.id)}
                                    />
                                    <StatusBadge status={pr.status} />

                                    <span className="text-sm text-muted-foreground">
                                        {pr.id}
                                    </span>
                                    <h3 className="text-sm font-semibold">
                                        {pr.description}
                                    </h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="View purchase request"
                                        onClick={() => handleViewPR(pr.id)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Edit purchase request"
                                        onClick={() => handleEditPR(pr.id)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Delete purchase request"
                                        onClick={() => handleDelete(pr.id)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 md:gap-2">
                                {[
                                    { label: "Date", field: "date" },
                                    { label: "Type", field: "type" },
                                    { label: "Requestor", field: "requestor" },
                                    { label: "Department", field: "department" },
                                    { label: "Amount", field: "amount" },
                                    { label: "Workflow Stage", field: "currentStage" },
                                ].map(({ label, field }) => (
                                    <div key={field} className='space-y-1'>
                                        <p className="  text-muted-foreground text-xs font-bold">
                                            {label}
                                        </p>
                                        {field === 'currentStage' ?
                                            <StatusBadge status={pr[field as keyof typeof pr] as string} />
                                            :
                                            <p className="text-xs">{pr[field as keyof typeof pr]}</p>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, sortedAndFilteredData.length)}{" "}
                    of {sortedAndFilteredData.length} results
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="sr-only">First page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only">Last page</span>
                    </Button>
                </div>
            </div>
            <DialogDelete
                open={openDialogDelete}
                onOpenChange={setOpenDialogDelete}
                onConfirm={confirmDelete}
                idDelete={itemToDelete}
            />
        </>
    );

    return (
        <>
            <ListPageTemplate
                title="Purchase Requests"
                actionButtons={actionButtons}
                filters={filters}
                content={content}
                bulkActions={bulkActions}
            />
        </>
    )
}

export default PurchaseRequestList