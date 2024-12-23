import React from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from 'lucide-react';

interface Props {
    isEdit: boolean
}

interface Contact {
    id: string;
    name: string;
    position: string;
    phone: string;
    email: string;
    department: string;
    isPrimary: boolean;
}
const contacts: Contact[] = [
    {
        id: 'cont1',
        name: 'John Doe',
        email: 'john.doe@acme.com',
        phone: '+1-555-0123',
        position: 'Manager',
        department: 'Procurement',
        isPrimary: true
    }
]
const ContactsSection: React.FC<Props> = ({ isEdit }) => {
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-base font-bold'>Contact</h1>
                {isEdit && (
                    <Button variant='default' size={'sm'}>Add Contact</Button>
                )}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Primary</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contacts.map((contact: Contact) => (
                        <TableRow key={contact.id}>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.position}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.isPrimary ? 'Yes' : 'No'}</TableCell>
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
        </>
    )
}

export default ContactsSection