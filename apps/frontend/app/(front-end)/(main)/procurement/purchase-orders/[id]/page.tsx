"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { FormAction } from '@/lib/types';
import PurchaseOrdersComponent from '../components/PurchaseOrdersComponent';

const PurchaseOrderByIDPage = () => {
    const params = useParams();
    const id = params.id as string;
    const mode = id === FormAction.CREATE ? FormAction.CREATE : FormAction.VIEW;
    return (
        <PurchaseOrdersComponent id={id} poMode={mode} />
    )
}

export default PurchaseOrderByIDPage