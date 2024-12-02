'use client';

import React from 'react';
import PurchaseRequestComponent from '../../components/PurchaseRequestComponent';
import { FormAction } from '@/lib/types';

interface Props {
	params: {
		id: string;
	};
}

const PurchaseRequestEditPage: React.FC<Props> = ({ params }) => {
	const { id } = params;
	return <PurchaseRequestComponent id={id} prMode={FormAction.EDIT} />;
};

export default PurchaseRequestEditPage;
