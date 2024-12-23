import React from 'react'
import { vendor_type } from '@carmensoftware/shared-types';
import { UseFormReturn } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui-custom/FormCustom';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface Props {
    form: UseFormReturn<vendor_type>;
    isInputDisabled: boolean;
    onSubmit: (values: vendor_type) => void;
}

const VendorInfo: React.FC<Props> = ({
    form,
    isInputDisabled,
    onSubmit
}) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vendor Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isInputDisabled}
                                    placeholder="Enter vendor name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isInputDisabled}
                                    placeholder="Enter vendor description"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isInputDisabled}
                                />
                            </FormControl>
                            <FormLabel>Active</FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default VendorInfo