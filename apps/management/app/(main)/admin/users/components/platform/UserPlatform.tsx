import React from 'react';
import { UserPlatformType } from '@/types/main';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface UserPlatformProps {
    users: UserPlatformType[];
}

const UserPlatform = async ({ users }: UserPlatformProps) => {
    console.log('users', users);
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Platform</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Business Units</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Active</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className='space-x-1'>
                                    {user.roles.map((role: string) => (
                                        <Badge variant="outline" className="capitalize" key={role}>
                                            {role}
                                        </Badge>
                                    ))}
                                </TableCell>
                                <TableCell className='space-x-1'>
                                    {user.businessUnits.map((businessUnit: string) => (
                                        <Badge variant="outline" className="capitalize" key={businessUnit}>
                                            {businessUnit}
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

export default UserPlatform;