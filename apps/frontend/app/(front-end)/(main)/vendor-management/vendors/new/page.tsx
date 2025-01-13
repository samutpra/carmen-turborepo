import React from 'react'
import VendorDetails from '../../components/VendorDetails'
import { formType } from '@/types/form_type'
const NewVendorPage = () => {
    return (
        <VendorDetails vendor={null} mode={formType.ADD} />
    )
}

export default NewVendorPage