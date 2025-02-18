"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp } from "lucide-react";
import { enum_location_type, LocationCreateModel } from "@/dtos/location.dto";
import { useAuth } from "@/app/context/AuthContext";
import LocationHeaderDetail from "./LocationHeaderDetail";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchLocationByID } from "../../actions/store_location";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductLoading from "@/components/ui-custom/Loading/ProductLoading";

const userActive = [
    { id: "user-1", full_name: "John Doe", email: "john.doe@example.com" },
    { id: "user-2", full_name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "user-3", full_name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: "user-4", full_name: "Bob Brown", email: "bob.brown@example.com" },
];

const userAvailable = [
    { id: "user-5", full_name: "Charlie Davis", email: "charlie.davis@example.com" },
    { id: "user-6", full_name: "Eva Wilson", email: "eva.wilson@example.com" },
    { id: "user-7", full_name: "Frank Lee", email: "frank.lee@example.com" },
    { id: "user-8", full_name: "Grace Moore", email: "grace.moore@example.com" },
    { id: "user-9", full_name: "Hannah Taylor", email: "hannah.taylor@example.com" },
    { id: "user-10", full_name: "Ivy Anderson", email: "ivy.anderson@example.com" },
    { id: "user-11", full_name: "Jack Thomas", email: "jack.thomas@example.com" },
    { id: "user-12", full_name: "Karen Clark", email: "karen.clark@example.com" },
    { id: "user-13", full_name: "Linda Lewis", email: "linda.lewis@example.com" },
    { id: "user-14", full_name: "Mike Scott", email: "mike.scott@example.com" },
];

interface Props {
    id: string;
}

const StoreLcationDetails: React.FC<Props> = ({ id }) => {
    const { accessToken } = useAuth();
    const token = accessToken || "";
    const tenantId = "DUMMY";
    const [locationData, setLocationData] = useState<LocationCreateModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mockUsers, setMockUsers] = useState(userActive);
    const [listUser, setListUser] = useState(userAvailable);
    const [selectedActiveUsers, setSelectedActiveUsers] = useState<string[]>([]);
    const [selectedAvailableUsers, setSelectedAvalibleUsers] = useState<string[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const data = await fetchLocationByID(id, token, tenantId);
            setLocationData(data);
            setIsLoading(false);
        };

        loadData();
    }, [id, accessToken]);

    const addHandleChange = (id: string) => {
        if (selectedActiveUsers.includes(id)) {
            setSelectedActiveUsers(selectedActiveUsers.filter((userId) => userId !== id));
        } else {
            setSelectedActiveUsers([...selectedActiveUsers, id]);
        }
    };

    const deleteHandleChange = (id: string) => {
        if (selectedAvailableUsers.includes(id)) {
            setSelectedAvalibleUsers(selectedAvailableUsers.filter((userId) => userId !== id));
        } else {
            setSelectedAvalibleUsers([...selectedAvailableUsers, id]);
        }
    };

    const onDelete = () => {
        const selectedUserData = mockUsers.filter((user) => selectedActiveUsers.includes(user.id));
        setListUser((prevListUser) => [...prevListUser, ...selectedUserData]);
        setMockUsers((prevMockUsers) =>
            prevMockUsers.filter((user) => !selectedActiveUsers.includes(user.id))
        );
        setSelectedActiveUsers([]);
        setIsDialogOpen(false);
    };


    const onCreate = () => {
        const selectedUserData = listUser.filter((user) => selectedAvailableUsers.includes(user.id));
        setMockUsers((prevMockUsers) => [...prevMockUsers, ...selectedUserData]);
        setListUser((prevListUser) =>
            prevListUser.filter((user) => !selectedAvailableUsers.includes(user.id))
        );
        setSelectedAvalibleUsers([]);
    };

    const onCancel = () => {
        setIsEdit(false);
        setSelectedActiveUsers([])
        setSelectedAvalibleUsers([])
    }

    if (isLoading) return <ProductLoading />;

    return (
        <div className="p-6 flex flex-col space-y-4">
            <LocationHeaderDetail
                name={locationData?.name || ""}
                type={locationData?.location_type as enum_location_type}
                description={locationData?.description || ""}
                delivery_point_id={locationData?.delivery_point_id || ''}
                is_active={Boolean(locationData?.is_active)}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                onCancel={onCancel}
                token={token}
                tenantId={tenantId}
            />

            <div className="flex flex-col lg:flex-row items-center w-full gap-4">
                <Card className="w-full lg:w-1/2 p-4 h-[55vh]">
                    <p className='px-2 text-md font-semibold'>Active User</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {isEdit && (
                                    <TableHead className="block lg:hidden"></TableHead>
                                )}
                                <TableHead className="w-[100px]">Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                {isEdit && (
                                    <TableHead className="hidden lg:block"></TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockUsers.length > 0 ? (
                                mockUsers.map((user, index) => (
                                    <TableRow key={index}>
                                        {isEdit && (
                                            <TableCell className="block lg:hidden">
                                                <Checkbox
                                                    id={user.id}
                                                    checked={selectedActiveUsers.includes(user.id)}
                                                    onCheckedChange={() => addHandleChange(user.id)}
                                                />
                                            </TableCell>
                                        )}

                                        <TableCell className="font-medium">{user.full_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        {isEdit && (
                                            <TableCell className="hidden lg:block">
                                                <Checkbox
                                                    id={user.id}
                                                    checked={selectedActiveUsers.includes(user.id)}
                                                    onCheckedChange={() => addHandleChange(user.id)}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <div className="flex flex-row lg:flex-col items-center justify-center gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                size={"lg"}
                                variant={'destructive'}
                                disabled={!isEdit || selectedActiveUsers.length === 0}
                            >
                                <ArrowBigDown className="block lg:hidden" />
                                <ArrowBigRight className="hidden lg:block" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Move</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to move the selected users to the left table?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter >
                                <div className="flex justify-end items-center gap-2">
                                    <Button size={'sm'} variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button size={'sm'} onClick={onDelete}>Confirm</Button>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button
                        size={"lg"}
                        onClick={onCreate}
                        disabled={!isEdit || selectedAvailableUsers.length === 0}
                    >
                        <ArrowBigUp className="block lg:hidden" />
                        <ArrowBigLeft className="hidden lg:block" />
                    </Button>
                </div>

                <Card className="w-full lg:w-1/2 p-4 h-[55vh] overflow-y-auto">
                    <p className="px-2 text-md font-semibold">Available User</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {isEdit && (
                                    <TableHead className="w-[30px]"></TableHead>
                                )}
                                <TableHead className="w-[100px]">Full Name</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {listUser.length > 0 ? (
                                listUser.map((user, index) => (
                                    <TableRow key={index}>
                                        {isEdit && (
                                            <TableCell className="w-[30px]">
                                                <Checkbox
                                                    id={user.id}
                                                    checked={selectedAvailableUsers.includes(user.id)}
                                                    onCheckedChange={() => deleteHandleChange(user.id)}
                                                />
                                            </TableCell>
                                        )}
                                        <TableCell className="w-[100px] font-medium">
                                            {user.full_name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={isEdit ? 3 : 2}
                                        className="text-center"
                                    >
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default StoreLcationDetails;