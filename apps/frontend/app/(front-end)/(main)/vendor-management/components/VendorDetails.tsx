'use client';

import { vendor_schema, vendor_type } from '@carmensoftware/shared-types'
import React, { useEffect, useState } from 'react'
import { handleDelete, handleSubmit } from '../actions/vendor'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PencilIcon, Trash, Save, X } from 'lucide-react'
import { useRouter } from '@/lib/i18n'
import { useAuth } from '@/app/context/AuthContext'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import VendorInfo from './sections/VendorInfo';
import { EnvironmentalProfile } from './sections/EnvironmentalProfile';
import AddressesSection from './sections/AddressesSection';
import ContactsSection from './sections/ContactsSection';
import CertificationsSection from './sections/CertificationsSection';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SkeltonVendorDetail from '@/components/ui-custom/Loading/SkeltonVendorDetail';
import * as m from '@/paraglide/messages.js';
interface Props {
    vendor: vendor_type | null;
    mode: formType;
}

const VendorDetails: React.FC<Props> = ({ vendor, mode }) => {
    const { accessToken } = useAuth();
    const token = accessToken || '';
    const tenantId = 'DUMMY';
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<vendor_type>({
        resolver: zodResolver(vendor_schema),
        defaultValues: mode === formType.EDIT && vendor
            ? { ...vendor }
            : { name: '', description: '', is_active: true },
    });

    useEffect(() => {
        if (mode === formType.EDIT && vendor) {
            form.reset({ ...vendor });
        } else if (mode === formType.ADD) {
            form.reset({ name: '', description: '', is_active: true });
        }
    }, [mode, vendor, form]);


    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        if (vendor) {
            form.reset({ ...vendor });
        }
    };

    const onSubmit = async (values: vendor_type) => {
        try {
            const result = await handleSubmit(values, token, tenantId, mode);
            if (result) {
                form.reset();
                toastSuccess({ message: mode === formType.ADD ? 'Vendor created successfully' : 'Vendor updated successfully' });
                // router.push('/vendor-management/vendors');
                // รอ รีโหลด
            }
        } catch (error) {
            console.error('Error saving vendor:', error);
            toastError({ message: 'Failed to save vendor' });
        }
    };

    const onDelete = async (id: string) => {
        const success = await handleDelete(id, token, tenantId);
        if (success) {
            toastSuccess({ message: 'Vendor deleted successfully' });
            router.push('/vendor-management/vendors');
        } else {
            toastError({ message: 'Failed to delete vendor' });
        }
    }

    if (!vendor && mode === formType.EDIT) return <SkeltonVendorDetail />

    const isInputDisabled = mode === formType.EDIT && !isEditing;


    const title = (
        <h1 className='text-2xl font-bold text-center md:text-left'>
            {mode === formType.ADD ? 'Create New Vendor' : vendor?.name}
        </h1>
    )

    const actionsButton = (
        <div className='flex justify-center gap-2'>
            {mode === formType.EDIT ? (
                isEditing ? (
                    <>
                        <Button
                            variant="default"
                            onClick={form.handleSubmit(onSubmit)}
                            size={'sm'}
                        >
                            <Save className="h-4 w-4" />
                            {m.save_text()}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleCancelEdit}
                            size={'sm'}
                        >
                            <X className="h-4 w-4" />
                            {m.cancel_text()}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            size={'sm'}
                            variant={'ghost'}
                            onClick={handleEdit}

                        >
                            <PencilIcon />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    size={'sm'}
                                    variant={'ghost'}
                                >
                                    <Trash />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Vendor</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete this vendor?
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => vendor?.id && onDelete(vendor.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )
            ) : (
                <Button onClick={form.handleSubmit(onSubmit)}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                </Button>
            )}
        </div>
    )

    return (
        <div className="container p-6 space-y-4">
            <Card className='flex flex-col md:flex-row justify-center md:justify-between gap-4 p-4'>
                {title}
                {actionsButton}
            </Card>
            <Card className='p-4 space-y-4'>
                <h1 className='text-base font-bold'>{m.infomation()}</h1>
                <VendorInfo
                    form={form}
                    isInputDisabled={isInputDisabled}
                    onSubmit={onSubmit}
                />
            </Card>
            {/* 
            {mode === formType.EDIT && (
                <Card className='p-4'>
                    <h1 className="text-lg font-medium">Environmental Impact</h1>
                    <EnvironmentalProfile
                        vendorId={vendor?.id?.toString() || ''}
                        environmentalData={{
                            carbonFootprint: {
                                value: 2450,
                                unit: 'tCO2e',
                                trend: -12
                            },
                            energyEfficiency: {
                                value: 85,
                                benchmark: 80,
                                trend: 5
                            },
                            wasteReduction: {
                                value: 45,
                                trend: 15
                            },
                            complianceRate: {
                                value: 98,
                                trend: 3
                            },
                            lastUpdated: '2024-03-15',
                            esgScore: 'A+',
                            certifications: [
                                {
                                    name: 'ISO 14001',
                                    status: 'Active',
                                    expiry: '2025-12-31'
                                },
                                {
                                    name: 'Carbon Trust',
                                    status: 'Active',
                                    expiry: '2024-08-15'
                                },
                                {
                                    name: 'ESG Rating A+',
                                    status: 'Active',
                                    expiry: '2024-12-31'
                                }
                            ]
                        }}
                    />
                </Card>
            )} */}

            <Card className='p-4'>
                <AddressesSection isEdit={isEditing} />
            </Card>

            <Card className='p-4'>
                <ContactsSection isEdit={isEditing} />
            </Card>

            <Card className='p-4'>
                <CertificationsSection isEdit={isEditing} />
            </Card>
        </div>
    )
}

export default VendorDetails