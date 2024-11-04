import React from 'react'
import ManageVendorComponent from '../../components/ManageVendorComponent';
import { FormAction } from '@/lib/types';

interface Props {
    params: {
        id: string;
    };
}

const ManageVendorsByEditPage: React.FC<Props> = ({ params }) => {
    const { id } = params;
    return (
        <ManageVendorComponent id={id} mvMode={FormAction.EDIT} />
    )
}

export default ManageVendorsByEditPage