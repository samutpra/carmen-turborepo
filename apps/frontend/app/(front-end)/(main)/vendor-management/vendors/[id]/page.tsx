'use client';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import VendorDetails from '../../components/VendorDetails';
import { fetchVendor } from '../../actions/vendor';
import { vendor_type } from '@carmensoftware/shared-types';
import { useAuth } from '@/app/context/AuthContext';
import { formType } from '@/types/form_type';

const VendorIDPage = () => {
    const { id } = useParams() as { id: string }
    const [error, setError] = useState<string | null>(null);
    const [vendor, setVendor] = useState<vendor_type | null>(null);
    const { accessToken } = useAuth();
    const token = accessToken || '';
    const tenantId = 'DUMMY';

    useEffect(() => {
        const getVendor = async () => {
            const vendorData = await fetchVendor(id, token, tenantId);
            if (vendorData.error) {
                setError(vendorData.error);
            } else {
                setVendor(vendorData);
            }
        }
        getVendor();
    }, [id, token, tenantId])

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <VendorDetails vendor={vendor} mode={formType.EDIT} />
    )
}

export default VendorIDPage