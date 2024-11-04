"use client";

import React from 'react';
import GoodsReceiveNoteComponent from '../../components/GoodsReceiveNoteComponent';
import { FormAction } from '@/lib/types';

interface Props {
    params: {
        id: string;
    };
}

const GoodsReceiveNoteEditPage: React.FC<Props> = ({ params }) => {
    const { id } = params;
    return (
        <GoodsReceiveNoteComponent id={id} grnMode={FormAction.EDIT} />
    );
}

export default GoodsReceiveNoteEditPage;
