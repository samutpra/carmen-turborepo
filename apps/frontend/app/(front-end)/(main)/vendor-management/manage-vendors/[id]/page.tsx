"use client"
import { FormAction } from '@/lib/types';
import { useParams } from 'next/navigation';
import React from 'react'
import ManageVendorComponent from '../components/ManageVendorComponent';


const ManageVendorsByIDPage = () => {
    const params = useParams();
    const id = params.id as string;
    const mode = id === FormAction.CREATE ? FormAction.CREATE : FormAction.VIEW;
    return (
        <ManageVendorComponent id={id} mvMode={mode} />
    )
}

export default ManageVendorsByIDPage