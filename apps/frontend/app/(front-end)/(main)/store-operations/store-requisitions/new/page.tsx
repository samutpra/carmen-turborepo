import React from 'react'
import { formType } from '@/types/form_type'
import StoreRequisitionsDetails from '../components/StoreRequisitionsDetails'

const NewStoreRequisitionPage = () => {
    return (
        <StoreRequisitionsDetails
            storeRequisition={null}
            mode={formType.ADD}
        />
    )
}

export default NewStoreRequisitionPage