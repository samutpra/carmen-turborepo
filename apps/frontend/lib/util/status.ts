import { GoodsReceiveNoteStatus } from '../types';

export const enum PD_STATUS {
	ACTIVE = 'active',
	IN_ACTIVE = 'inactive',
	DISCONTINUED = 'discontinued',
}

export const enum PRODUCT_STATUS_FILTER {
	ALL_STATUS = '',
	ACTIVE = PD_STATUS.ACTIVE,
	IN_ACTIVE = PD_STATUS.IN_ACTIVE,
	DISCONTINUED = PD_STATUS.DISCONTINUED,
}

export const statusGrnColor = (status: GoodsReceiveNoteStatus): string => {
	switch (status) {
		case 'Pending':
			return 'bg-yellow-200 text-yellow-800';
		case 'Received':
			return 'bg-green-100 text-green-800';
		case 'Partial':
			return 'bg-blue-100 text-blue-800';
		case 'Cancelled':
			return 'bg-red-100 text-red-800';
		case 'Voided':
			return 'bg-gray-100 text-gray-800';
		default:
			return 'bg-indigo-100 text-indigo-800';
	}
};
