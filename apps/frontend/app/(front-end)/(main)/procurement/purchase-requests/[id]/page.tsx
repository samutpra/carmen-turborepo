"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { FormAction } from '@/lib/types';
import PurchaseRequestComponent from '../components/PurchaseRequestComponent';

const PurchaseRequestByIDPage = () => {
    const params = useParams();
    const id = params.id as string;
    const mode = id === FormAction.CREATE ? FormAction.CREATE : FormAction.VIEW;
    return (
        <PurchaseRequestComponent id={id} prMode={mode} />
    )
}

export default PurchaseRequestByIDPage