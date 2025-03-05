import React from 'react'
import { UserPlatformType } from '@/types/main';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
interface HotelPlatformListProps {
    users: UserPlatformType[]
}

const HotelPlatformList = ({ users }: HotelPlatformListProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cluster Platform</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Hotel</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Module</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Active</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.hotel}</TableCell>
                                <TableCell>{user.department}</TableCell>
                                <TableCell className='space-x-1'>
                                    {user.roles.map((role: string) => (
                                        <Badge variant="outline" className="capitalize" key={role}>
                                            {role}
                                        </Badge>
                                    ))}
                                </TableCell>
                                <TableCell className='space-x-1'>
                                    {user.modules.map((module: string) => (
                                        <Badge variant="outline" className="capitalize" key={module}>
                                            {module}
                                        </Badge>
                                    ))}
                                </TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>{format(user.lastActive, 'dd/MM/yyyy')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default HotelPlatformList