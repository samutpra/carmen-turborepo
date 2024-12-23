import { vendor_type } from '@carmensoftware/shared-types'
import React, { useEffect, useState } from 'react'
import { fetchVendor } from './api'

interface Props {
    id: string
    token: string
    tenantId: string
}
const VendorDetails: React.FC<Props> = ({ id, token, tenantId }) => {
    const [vendor, setVendor] = useState<vendor_type | null>(null)
    const [error, setError] = useState<string | null>(null)

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

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {vendor ? (
                <div>
                    <p>{vendor.name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default VendorDetails
