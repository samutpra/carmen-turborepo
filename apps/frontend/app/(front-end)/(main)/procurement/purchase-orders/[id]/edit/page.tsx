import React from 'react'
import { FormAction } from '@/lib/types';
import PurchaseOrdersComponent from '../../components/PurchaseOrdersComponent';

interface Props {
    params: {
        id: string;
    };
}

const PurchaseorderEditPage: React.FC<Props> = ({ params }) => {
    const { id } = params;
    return (
        <PurchaseOrdersComponent id={id} poMode={FormAction.EDIT} />
    )
}

export default PurchaseorderEditPage