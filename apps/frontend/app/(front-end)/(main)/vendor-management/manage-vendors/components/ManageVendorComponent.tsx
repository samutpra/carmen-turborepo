"use client";
import React, { useEffect, useState } from "react";
import { FormAction } from "@/lib/types";
import { useFieldArray, useForm } from "react-hook-form";
import { VendorSchema, VendorType } from "../types";
import { VendorDataList } from "../vendorsData";
import { PlusCircle, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui-custom/FormCustom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "@/lib/i18n";
import { InputCustom } from "@/components/ui-custom/InputCustom";
import Rating from "@/components/Rating";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui-custom/TableCustom";


interface Props {
    id?: string;
    mvMode?: FormAction;
}

const ADDRESS_TYPES = [
    { value: "MAIN", label: "Main Office" },
    { value: "BILLING", label: "Billing Address" },
];

const ManageVendorComponent: React.FC<Props> = ({ id, mvMode }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const form = useForm<VendorType>({
        resolver: zodResolver(VendorSchema),
        defaultValues: {
            id: "",
            companyName: "",
            businessRegistrationNumber: "",
            taxId: "",
            establishmentDate: "",
            businessType: { id: "", name: "" },
            isActive: true,
            addresses: [
                {
                    addressType: "MAIN",
                    addressLine: "",
                    subDistrictId: "",
                    districtId: "",
                    provinceId: "",
                    postalCode: "",
                    isPrimary: true,
                },
            ],
            contacts: [
                {
                    name: "",
                    position: "",
                    phone: "",
                    email: "",
                    department: "",
                    isPrimary: true,
                },
            ],
            rating: 0,
        },
    });

    const {
        fields: addressFields,
        append: appendAddress,
        remove: removeAddress,
    } = useFieldArray({
        control: form.control,
        name: "addresses",
    });

    const {
        fields: contactFields,
        append: appendContact,
        remove: removeContact,
    } = useFieldArray({
        control: form.control,
        name: "contacts",
    });

    useEffect(() => {
        if ((mvMode === FormAction.VIEW || mvMode === FormAction.EDIT) && id) {
            const vendorData = VendorDataList.vendors.find((vendor) => vendor.id === id);
            if (vendorData) {
                Object.keys(vendorData).forEach((key) => {
                    form.setValue(key, vendorData[key]);
                });
            }
        }
    }, [id, mvMode, form.setValue]);

    const onSubmit = (data: VendorType) => {
        console.log(data);
    };

    const onBack = () => {
        router.push("/vendor-management/manage-vendors")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Vendor Information</CardTitle>
                        <div className="flex justify-end gap-4">
                            <Button variant="secondary" onClick={onBack}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter company name"
                                                error={!!form.formState.errors.companyName}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                required
                            />

                            <FormField
                                control={form.control}
                                name="businessRegistrationNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Registration Number</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter registration number"
                                                error={!!form.formState.errors.businessRegistrationNumber}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                required
                            />

                            <FormField
                                control={form.control}
                                name="taxId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tax ID</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter tax ID"
                                                error={!!form.formState.errors.taxId}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                required
                            />

                            <FormField
                                control={form.control}
                                name="businessType.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Type</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                placeholder="Enter business type"
                                                error={!!form.formState.errors.businessType?.name}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                required
                            />

                            <FormField
                                control={form.control}
                                name="establishmentDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Establishment Date</FormLabel>
                                        <FormControl>
                                            <InputCustom
                                                type="date"
                                                placeholder="Enter Establishment Date"
                                                error={!!form.formState.errors.establishmentDate}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-6 md:flex-row">
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rating</FormLabel>
                                        <FormControl>
                                            <Rating
                                                initialRating={field.value}
                                                onRatingChange={(newRating) => field.onChange(newRating)}
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
                                    <FormItem className="flex flex-col mt-2 gap-1">
                                        <FormLabel>Active Vendor</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <CardHeader className="my-6">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">Addresses</CardTitle>
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        appendAddress({
                                            addressType: "MAIN",
                                            addressLine: "",
                                            subDistrictId: "",
                                            districtId: "",
                                            provinceId: "",
                                            postalCode: "",
                                            isPrimary: false,
                                        })
                                    }
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Add Address
                                </Button>
                            </div>
                        </CardHeader>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Address Type</TableCell>
                                    <TableCell>Address Line</TableCell>
                                    <TableCell>Provice</TableCell>
                                    <TableCell>District</TableCell>
                                    <TableCell>Sub District</TableCell>
                                    <TableCell>Post Code</TableCell>
                                    <TableCell>Primary Address</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {addressFields.map((address, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{address.addressType}</TableCell>
                                        <TableCell>{address.addressLine}</TableCell>
                                        <TableCell>{address.provinceId}</TableCell>
                                        <TableCell>{address.districtId}</TableCell>
                                        <TableCell>{address.subDistrictId}</TableCell>
                                        <TableCell>{address.postalCode}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={address.isPrimary}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeAddress(index)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>


                        {/* {addressFields.map((field, index) => (
                            <Card key={field.id}>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`addresses.${index}.addressType`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address Type</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select address type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {ADDRESS_TYPES.map((type) => (
                                                                <SelectItem key={type.value} value={type.value}>
                                                                    {type.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`addresses.${index}.addressLine`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address Line</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {["subDistrictId", "districtId", "provinceId", "postalCode"].map(
                                            (fieldName) => (
                                                <FormField
                                                    key={fieldName}
                                                    control={form.control}
                                                    name={`addresses.${index}.${fieldName}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                {fieldName
                                                                    .replace(/Id$/, "")
                                                                    .split(/(?=[A-Z])/)
                                                                    .join(" ")}
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={`Enter ${fieldName.replace(/Id$/, "")}`}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                        )}

                                        <FormField
                                            control={form.control}
                                            name={`addresses.${index}.isPrimary`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Primary Address</FormLabel>
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeAddress(index)}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))} */}

                        {/* Contacts Section */}
                        <CardHeader className="my-6">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">Contacts</CardTitle>
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        appendContact({
                                            name: "",
                                            position: "",
                                            phone: "",
                                            email: "",
                                            department: "",
                                            isPrimary: false,
                                        })
                                    }
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Add Contact
                                </Button>
                            </div>

                        </CardHeader>
                        <CardContent className="space-y-4">
                            {contactFields.map((field, index) => (
                                <Card key={field.id}>
                                    <CardContent className="pt-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name={`contacts.${index}.name`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter contact name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`contacts.${index}.position`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Position</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter position" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`contacts.${index}.phone`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter phone" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`contacts.${index}.email`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter email" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`contacts.${index}.department`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Department</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter department" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`contacts.${index}.isPrimary`}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Primary Contact</FormLabel>
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeContact(index)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
};

export default ManageVendorComponent;
