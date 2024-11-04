"use client";

import React, { useEffect, useState } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { ArrowUpDown, Filter, PlusCircle, Printer, Sheet } from 'lucide-react';
import { UnitLabel, UnitSchema, UnitType } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui-custom/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DataTable from '@/components/templates/DataTable';
import DataCard from '@/components/templates/DataCard';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui-custom/FormCustom";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { FilterBuilder } from '@/components/ui-custom/FilterBuilder';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import { nanoid } from 'nanoid'
import { unitData } from '../../configuration/data/data';
import { useUnits } from '../unit/actions/units';


const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "true", label: "Active" },
    { value: "false", label: "Not Active" }
];

const UnitList = () => {
    const [units, setUnits] = useState<UnitType[]>([]);
    const [statusOpen, setStatusOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [dialogForm, setDialogForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingItem, setEditingItem] = useState<UnitType | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    // const { units, isLoading, error } = useUnits(accessToken);

    const form = useForm<UnitType>({
        resolver: zodResolver(UnitSchema),
        defaultValues: {
            name: "",
            description: "",
            isActive: true
        }
    });


    // useEffect(() => {
    //     setIsLoading(true)
    //     const fetchUnit = async () => {
    //         try {
    //             const data = unitData.map((data) => UnitSchema.parse(data));
    //             setUnits(data);
    //         } catch (error) {
    //             console.error('Error fetching units:', error);
    //         }
    //     };
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 3000);

    //     fetchUnit();
    // }, []);
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MzhmZjQ0LTc1NGYtNDJiZC05NWI1LTUzYWFlMjBkZWMzZSIsInVzZXJuYW1lIjoidGVzdDEiLCJpYXQiOjE3MzA3MTgwOTYsImV4cCI6MTczMDcyMTY5Nn0.JnFGcgNEsLVGcfZm_CmcG9ktMIyz_lSjSjpOBM_XBh8'


    useEffect(() => {
        setIsLoading(true);
        const fetchUnits = async () => {
            try {
                // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MzhmZjQ0LTc1NGYtNDJiZC05NWI1LTUzYWFlMjBkZWMzZSIsInVzZXJuYW1lIjoidGVzdDEiLCJpYXQiOjE3MzA3MTQxNDEsImV4cCI6MTczMDcxNzc0MX0.4U_A_lpYFAyEEaANUgffe8GYEaNH5Ax6Rzb4IMYik_4";
                const tenantId = 'DUMMY';

                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'x-tenant-id': tenantId,
                        'Content-Type': 'application/json',
                    },
                };

                const response = await fetch('http://localhost:4000/api/v1/units', options);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                const result = data.map((unit: UnitType) => UnitSchema.parse(unit));
                setUnits(result);
                console.log('result', result);
            } catch (error) {
                console.error('Error fetching units:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUnits();
    }, []);


    useEffect(() => {
        if (editingItem) {
            form.reset({
                name: editingItem.name,
                description: editingItem.description,
                isActive: editingItem.isActive
            });
        }
    }, [editingItem, form]);

    const handleEdit = (item: UnitType) => {
        form.setValue('name', item.name);
        form.setValue('description', item.description);
        form.setValue('isActive', item.isActive);
        setEditingItem(item);
        setDialogForm(true);
    };

    const handleDelete = (item: UnitType) => {
        setIdToDelete(item.id);
        setDialogDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            setUnits((prev) => prev.filter((unit) => unit.id !== idToDelete));
            setDialogDelete(false);
        } catch (error) {
            console.error('Error deleting unit:', error);
        } finally {
            setIsLoading(false);
            setIdToDelete(null);
        }
    };

    const handleView = (item: UnitType) => {
        console.log('Viewing unit:', item);
    };

    const handleSave = async (data: UnitType) => {
        console.log(data);

        try {
            setIsLoading(true);
            setFormError(null);

            const newUnit = {
                ...data,
                id: editingItem ? editingItem.id : nanoid(),
            };

            if (editingItem) {
                setUnits((prev) =>
                    prev.map((unit) => (unit.id === editingItem.id ? newUnit : unit))
                );
            } else {
                setUnits((prev) => [...prev, newUnit]);
            }

            const method = editingItem ? 'PATCH' : 'POST';
            const API_URL = '/api/product-management/unit';

            const response = await fetch(API_URL, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUnit),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error('An error occurred');
                throw new Error(result.error || 'An error occurred');
            } else {
                toast.success(`Unit has been ${editingItem ? 'edited' : 'created'}.`);
                handleCloseDialog();
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
            setFormError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };


    const handleCloseDialog = () => {
        form.reset({
            name: "",
            description: "",
            isActive: true
        });
        setDialogForm(false);
        setEditingItem(null);
    };

    const title = 'Unit';

    const columns: UnitLabel[] = [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'isActive', label: 'Active' }
    ];

    const actionButtons = (
        <div className="flex flex-col gap-4 md:flex-row">
            <CustomButton
                className='w-full md:w-20'
                prefixIcon={<PlusCircle />}
                onClick={() => setDialogForm(true)}
            >
                Add
            </CustomButton>
            <div className='flex flex-row md:flex-row gap-4'>
                <CustomButton className='w-full md:w-20' variant="outline" prefixIcon={<Sheet />}>Export</CustomButton>
                <CustomButton className='w-full md:w-20' variant="outline" prefixIcon={<Printer />}>Print</CustomButton>
            </div>

        </div>
    );

    const filter = (
        <div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-full sm:w-auto flex-grow">
                <Input
                    placeholder="Search Units..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center space-x-4">
                <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={statusOpen}
                            className="w-[200px] justify-between"
                        >
                            {selectedStatus
                                ? statusOptions.find((status) => status.value === selectedStatus)?.label
                                : "Select status..."}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search status..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No status found.</CommandEmpty>
                                <CommandGroup>
                                    {statusOptions.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            onSelect={() => {
                                                setSelectedStatus(status.value === selectedStatus ? "" : status.value);
                                                setStatusOpen(false);
                                            }}
                                        >
                                            {status.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Filter className="h-4 w-4" />
                            More Filters
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:w-[70vw] max-w-[60vw]">
                        <FilterBuilder
                            fields={[
                                { value: 'name', label: 'Name' },
                                { value: 'description', label: 'Description' },
                                { value: 'isActive', label: 'Status' }
                            ]}
                            onFilterChange={(filters) => {
                                console.log('Applied filters:', filters);
                            }}
                        />
                    </DialogContent>
                </Dialog>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <ArrowUpDown className="h-4 w-4" />
                            Sort
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Name</DropdownMenuItem>
                        <DropdownMenuItem>Description</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );

    const content = (
        <>
            <div className="block lg:hidden">
                {isLoading ? (
                    <SkeltonCardLoading />) : (

                    <DataCard
                        data={units}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                )}
            </div>

            <div className="hidden lg:block">


                {isLoading ? (
                    <SkeletonTableLoading />
                ) : (
                    <DataTable
                        data={units}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                )}
            </div>

            <DialogDelete
                open={dialogDelete}
                onOpenChange={setDialogDelete}
                onConfirm={confirmDelete}
                idDelete={idToDelete}
            />

            <Dialog open={dialogForm} onOpenChange={handleCloseDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? `Edit ${title}` : `Add New ${title}`}
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
                            {formError && (
                                <Alert variant="destructive">
                                    <AlertDescription>{formError}</AlertDescription>
                                </Alert>
                            )}

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter unit name"
                                                error={!!form.formState.errors.name}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                required
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter unit description"
                                                error={!!form.formState.errors.description}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                required
                            />

                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Active</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleCloseDialog}
                                    disabled={isLoading}
                                    className=''
                                >
                                    Cancel
                                </Button>
                                <LoaderButton
                                    type="submit"
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                >
                                    {isLoading ? 'Saving...' : (editingItem ? 'Save Changes' : 'Add')}
                                </LoaderButton>

                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );

    return (
        <DataDisplayTemplate
            title={title}
            actionButtons={actionButtons}
            filters={filter}
            content={content}
        />
    );
};

export default UnitList;