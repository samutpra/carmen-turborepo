import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface Props {
    isEdit: boolean
}

interface Certification {
    id: string
    name: string
    issuer: string
    validUntil: string
    status: 'active' | 'expired' | 'pending'
}

const certifications: Certification[] = [
    {
        id: 'cert1',
        name: 'ISO 9001',
        status: 'active',
        issuer: 'ISO',
        validUntil: '2025-12-31'
    }
]

const CertificationsSection: React.FC<Props> = ({ isEdit }) => {
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-base font-bold'>Certification</h1>
                {isEdit && (
                    <Button variant='default' size={'sm'}>Add Certification</Button>
                )}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Issuer</TableHead>
                        <TableHead>Valid Until</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {certifications.map((cert) => (
                        <TableRow key={cert.id}>
                            <TableCell className="font-medium">{cert.name}</TableCell>
                            <TableCell>{cert.issuer}</TableCell>
                            <TableCell>{new Date(cert.validUntil).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge
                                >
                                    {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                                </Badge>
                            </TableCell>
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

export default CertificationsSection