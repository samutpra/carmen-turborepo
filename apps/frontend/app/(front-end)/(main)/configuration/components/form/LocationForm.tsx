import { LocationSchema, LocationType, PayloadLocationType } from '@/lib/types';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui-custom/FormCustom';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputCustom } from '@/components/ui-custom/InputCustom';
import { Switch } from '@/components/ui/switch';
import { LoaderButton } from '@/components/ui-custom/button/LoaderButton';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    open: boolean;
    editingItem: LocationType | null;
    isLoading: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: LocationType) => void;
}

const LocationForm: React.FC<Props> = ({
    open,
    editingItem,
    isLoading,
    onOpenChange,
    onSubmit,
}) => {

    const form = useForm<PayloadLocationType>({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            name: "",
            locationType: "Inventory",
            description: "",
            deliveryPointId: null,
            isActive: true,
        },
    });

    useEffect(() => {
        if (editingItem) {
            form.reset({
                name: editingItem.name,
                locationType: editingItem.locationType,
                description: editingItem.description,
                deliveryPointId: null,
                isActive: editingItem.isActive,
            });
        }
    }, [editingItem, form]);

    const handleClose = () => {
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>
                        {editingItem ? "Edit Location" : "Add New Location"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter Name"
                                                error={!!form.formState.errors.name}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="locationType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select location type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Inventory">Inventory</SelectItem>
                                                    <SelectItem value="Direct">Direct</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                required
                            />

                            <FormField
                                control={form.control}
                                name="deliveryPointId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Derivery Point</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter Derivery Point"
                                                error={!!form.formState.errors.deliveryPointId}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                                    <FormMessage />
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
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <LoaderButton
                                type="submit"
                                disabled={isLoading}
                                isLoading={isLoading}
                            >
                                {isLoading ? "Saving..." : editingItem ? "Save Changes" : "Add"}
                            </LoaderButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default LocationForm;