"use client"
import React from 'react'
import { FormAction } from '@/lib/types';
import { useRouter } from '@/lib/i18n';

interface Props {
    id?: string;
    prMode?: FormAction;
}

const PurchaseRequestComponent: React.FC<Props> = ({ id, prMode }) => {
    const router = useRouter();
    return (
        <div>PurchaseRequestComponent</div>
    )
}

export default PurchaseRequestComponent