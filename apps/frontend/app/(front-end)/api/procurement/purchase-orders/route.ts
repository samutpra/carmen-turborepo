import { formatDateCustom } from '@/lib/formatDate';
import { NextResponse } from 'next/server';
import { Mock_purchaseOrders } from '../mock_data';

export const GET = async () => {
	try {
		const formattedData = Mock_purchaseOrders.map((order) => ({
			...order,
			orderDate: formatDateCustom(order.orderDate ?? ''),
			DeliveryDate: formatDateCustom(order.DeliveryDate ?? ''),
		}));

		return NextResponse.json(
			{
				message: 'Purchase orders fetched successfully',
				data: formattedData,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Failed to fetch purchase orders',
				error:
					error instanceof Error ? error.message : 'Unknown error occurred',
			},
			{ status: 500 }
		);
	}
};
