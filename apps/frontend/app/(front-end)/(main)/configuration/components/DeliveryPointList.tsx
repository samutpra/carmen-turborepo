'use client';
import { useAuth } from '@/app/context/AuthContext';
import { DeliveryPointType } from '@carmensoftware/shared-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeliveryPointDialog } from './DeliveryPointDialog';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import DataCard, { FieldConfig } from '@/components/templates/DataCard';
import EmptyState from '@/components/ui-custom/EmptyState';
import TableData from '@/components/templates/TableData';
import { deleteDeliveryPoint, fetchDeliveryPoints } from '../actions/delivery_point';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import * as m from '@/paraglide/messages.js';
import { FileDown, Printer } from 'lucide-react';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import SortDropDown from '@/components/ui-custom/SortDropDown';

enum DeliveryPointField {
	Name = 'name',
	isActive = 'is_active',
}

const deliveryPointsFields: FieldConfig<DeliveryPointType>[] = [
	{ key: DeliveryPointField.Name, label: `${m.delivery_point_label()}` },
	{ key: DeliveryPointField.isActive, label: `${m.status_text()}`, type: 'badge' }
];

const DeliveryPointList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPointType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchDeliveryPoints(token, tenantId, {
				search,
				status,
			});
			setDeliveryPoints(data.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status]);


	const handleSuccess = useCallback((values: DeliveryPointType) => {
		setDeliveryPoints((prev) => {
			const mapValues = new Map(prev.map((u) => [u.id, u]));
			mapValues.set(values.id, values);
			return Array.from(mapValues.values());
		});
	}, [setDeliveryPoints]);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteDeliveryPoint(id, token, tenantId);
				if (res) {
					setDeliveryPoints((prev) => prev.filter((p) => p.id !== id));
					toastSuccess({ message: `${m.delivery_point_del_success()}` });
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({ message: `${m.session_expire()}` });
					} else {
						toastError({ message: `${m.fail_del_delivery_point()}: ${error.message}` });
					}
				} else {
					toastError({ message: `${m.error_del_text()} ${m.delivery_point()}.` });
				}
			}
		}, [token, tenantId, deleteDeliveryPoint]
	)


	if (error) {
		return (
			<Card className="border-destructive">
				<CardContent className="pt-6">
					<p className="text-destructive">
						Error loading delivery points: {error}
					</p>
				</CardContent>
			</Card>
		);
	}

	const title = `${m.delivery_point()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<DeliveryPointDialog mode={formType.ADD} onSuccess={handleSuccess} />
			<Button variant="outline" className="group" size={'sm'}>
				<FileDown className="h-4 w-4" />
				{m.export_text()}
			</Button>
			<Button variant="outline" size={'sm'}>
				<Printer className="h-4 w-4" />
				{m.print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div className="filter-container">
			<SearchForm
				defaultValue={search}
				onSearch={setSearch}
				placeholder={`${m.Search()} ${m.delivery_point()}...`}
			/>
			<div className="all-center gap-2">
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
				/>
				<SortDropDown
					fieldConfigs={deliveryPointsFields}
					items={deliveryPoints}
					onSort={setDeliveryPoints}
				/>
			</div>
		</div>
	);

	const content = (
		<>
			<div className="block md:hidden">
				<DataCard<DeliveryPointType>
					items={deliveryPoints}
					fields={deliveryPointsFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<DeliveryPointDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
			<div className="hidden md:block">
				<TableData<DeliveryPointType>
					items={deliveryPoints}
					fields={deliveryPointsFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<DeliveryPointDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
				/>
			</div>
		</>
	);

	if (isLoading) {
		return (
			<>
				<div className='block md:hidden'>
					<SkeltonCardLoading />
				</div>
				<div className='hidden md:block'>
					<SkeletonTableLoading />;
				</div>
			</>
		)
	}
	if (deliveryPoints.length === 0) {
		return (
			<EmptyState
				title={title}
				description={m.no_delivery_point_found()}
				actionButtons={actionButtons}
				filters={filter}
			/>
		);
	}

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={actionButtons}
			filters={filter}
			content={content}
		/>
	);
};

export default DeliveryPointList;
