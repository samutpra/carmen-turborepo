'use client';
import { useParams } from 'next/navigation'
import React from 'react'
import VendorDetails from '../../components/VendorDetails';
import { useAuth } from '@/app/context/AuthContext';

const VendorIDPage = () => {
    const { accessToken } = useAuth();
    const token = accessToken || '';
    const tenantId = 'DUMMY';
    const { id } = useParams() as { id: string }
    return (
        <VendorDetails id={id} token={token} tenantId={tenantId} />
    )
}

export default VendorIDPage