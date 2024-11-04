"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import GoodsReceiveNoteComponent from '../components/GoodsReceiveNoteComponent';
import { FormAction } from '@/lib/types';

const GoodsReceivedNoteByIDPage = () => {
    const params = useParams();
    const id = params.id as string;
    const mode = id === FormAction.CREATE ? FormAction.CREATE : FormAction.VIEW;

    return (
        <GoodsReceiveNoteComponent id={id} grnMode={mode} />
    );
};

export default GoodsReceivedNoteByIDPage;
