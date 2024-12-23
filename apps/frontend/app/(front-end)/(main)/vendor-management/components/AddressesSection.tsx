import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from 'lucide-react';

enum AddressType {
    MAIN = 'MAIN',
    BILLING = 'BILLING',
    SHIPPING = 'SHIPPING',
    BRANCH = 'BRANCH'
}

interface Address {
    id: string;
    addressType: "MAIN" | "BILLING" | "SHIPPING" | "BRANCH";
    addressLine: string;
    subDistrictId: string;
    districtId: string;
    provinceId: string;
    postalCode: string;
    isPrimary: boolean;
}

const addresses: Address[] = [
    {
        id: 'addr1',
        addressLine: '123 Main St',
        subDistrictId: 'SD001',
        districtId: 'D001',
        provinceId: 'P001',
        postalCode: '10001',
        addressType: AddressType.MAIN,
        isPrimary: true
    }
]

interface Props {
    isEdit: boolean
}

const AddressesSection: React.FC<Props> = ({
    isEdit
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Primary</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {addresses.map(address => (
                    <TableRow key={address.id}>
                        <TableCell>{address.addressType}</TableCell>
                        <TableCell>{address.addressLine}</TableCell>
                        <TableCell>{address.isPrimary ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                            {isEdit && (
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Pencil />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Trash />
                                    </Button>
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default AddressesSection
