'use client';
import React from 'react'
import { useParams } from 'next/navigation'
import PrDetail from './components/PrDetail';

const PurchaseRequestIdPage = () => {
    const { id } = useParams() as { id: string };
    return <PrDetail id={id} />
}

export default PurchaseRequestIdPage