'use client';
import React, { useEffect, useMemo, useState } from 'react';
import ListViewData from './template/ListViewData';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import {
	DeliveryPointLabel,
	deliveryPointSchema,
	deliveryPointType,
} from '../type';
import { deliveryPointData } from '../data/data';

const DeliveryPointList = () => {
	const [deliveryPoint, setDeliveryPoint] = useState<deliveryPointType[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [idToDelete, setIdToDelete] = useState<string | null>(null);

	useEffect(() => {
		const fetchCurrency = async () => {
			const data = deliveryPointData.map((data) => {
				return deliveryPointSchema.parse(data);
			});
			setDeliveryPoint(data);
		};
		fetchCurrency();
	}, []);

	const handleAdd = async (item: deliveryPointType) => {
		setDeliveryPoint((prev) => [...prev, item]);
	};

	const handleEdit = async (updatedItem: deliveryPointType) => {
		setDeliveryPoint((prev) =>
			prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
		);
	};

	const handleDelete = (item: deliveryPointType) => {
		setIdToDelete(item.id);
		setIsDialogOpen(true);
	};

	const confirmDelete = () => {
		setDeliveryPoint((prev) => prev.filter((loc) => loc.id !== idToDelete));
		setIdToDelete(null);
	};

	const fieldConfigs: DeliveryPointLabel[] = useMemo(
		() => [
			{ key: 'code', display: 'Code', type: 'string' },
			{ key: 'description', display: 'Description', type: 'string' },
			{ key: 'is_active', display: 'Active Status', type: 'boolean' },
		],
		[]
	);

	return (
		<>
			<ListViewData
				data={deliveryPoint}
				title="Delivery Point"
				titleField="code"
				fields={fieldConfigs}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			<DialogDelete
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onConfirm={confirmDelete}
				idDelete={idToDelete}
			/>
		</>
	);
};

export default DeliveryPointList;
