'use client';
import React, { useState } from 'react';
import { useRouter } from '@/lib/i18n';
import { FormAction, PrList, PRType, DocumentStatus } from '@/lib/types';
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { PlusCircle, Printer, Search, Sheet } from 'lucide-react';
import SearchInput from '@/components/ui-custom/SearchInput';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import DialogDelete from '@/components/ui-custom/DialogDelete';
import DataTable from '@/components/templates/DataTable';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import DataCard from '@/components/templates/DataCard';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import ErrorDisplay from '@/components/ErrorDisplay';
import { useAuth } from '@/app/context/AuthContext';
import { usePurchaseRequests } from '../actions/purchase-request';

export interface filterOptionType {
	type?: PRType;
	status?: DocumentStatus;
}

const PurchaseRequestList = () => {
	const { accessToken } = useAuth();
	const router = useRouter();
	const [idToDelete, setIdToDelete] = useState<string | null | undefined>(null);
	const [dialogDelete, setDialogDelete] = useState(false);
	const token = accessToken || '';

	const {
		prList,
		isLoading,
		error,
		pagination,
		search,
		goToPage,
		nextPage,
		previousPage,
		setPerPage,
		handleSearch,
	} = usePurchaseRequests(token);

	const handleAdd = () => {
		router.push(`/procurement/purchase-requests/${FormAction.CREATE}`);
	};

	const handleView = (item: PrList) => {
		console.log('Viewing pr:', item);
		router.push(`/procurement/purchase-requests/${item.id}`);
	};

	const handleEdit = (item: PrList) => {
		console.log(item);
		router.push(`/procurement/purchase-requests/${item.id}/${FormAction.EDIT}`);
	};

	const handleDelete = (item: PrList) => {
		setIdToDelete(item.id);
		setDialogDelete(true);
	};

	const confirmDelete = async () => {
		// try {
		// 	setIsLoading(true);
		// 	setPrData((prev) => prev.filter((item) => item.id !== idToDelete));
		// 	setDialogDelete(false);
		// } catch (error) {
		// 	console.error('Error deleting:', error);
		// } finally {
		// 	setIsLoading(false);
		// 	setIdToDelete(null);
		// }
	};

	const title = 'Purchase Request';

	const columns: { key: keyof PrList; label: string }[] = [
		{ key: 'type', label: 'Type' },
		{ key: 'requestor', label: 'Requestor' },
		{ key: 'department', label: 'Department' },
		{ key: 'description', label: 'Description' },
		{ key: 'date', label: 'Date' },
		{ key: 'status', label: 'Status' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'currentStage', label: 'Current Stage' },
	];

	const actionButtons = (
		<div className="flex flex-col gap-4 md:flex-row">
			<CustomButton
				className="w-full md:w-20"
				prefixIcon={<PlusCircle />}
				onClick={handleAdd}
			>
				Add
			</CustomButton>
			<div className="flex flex-row md:flex-row gap-4">
				<CustomButton
					className="w-full md:w-20"
					variant="outline"
					prefixIcon={<Sheet />}
				>
					Export
				</CustomButton>
				<CustomButton
					className="w-full md:w-20"
					variant="outline"
					prefixIcon={<Printer />}
				>
					Print
				</CustomButton>
			</div>
		</div>
	);

	const filter = (
		<div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
			<div className="w-full sm:w-auto flex-grow">
				<SearchInput
					placeholder="Search"
					value={search}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						handleSearch(e.target.value, false);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							handleSearch(e.currentTarget.value, true);
						}
					}}
					Icon={Search}
				/>
			</div>
		</div>
	);

	const content = (
		<>
			<div className="block lg:hidden">
				{isLoading ? (
					<SkeltonCardLoading />
				) : error ? (
					<div className="text-red-500">{error.message}</div>
				) : (
					<DataCard
						data={prList}
						columns={columns}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onView={handleView}
					/>
				)}
			</div>

			<div className="hidden lg:block">
				{isLoading ? (
					<SkeletonTableLoading />
				) : error ? (
					<ErrorDisplay errMessage={error.message} />
				) : (
					<DataTable
						data={prList}
						columns={columns}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onView={handleView}
						pagination={pagination}
						goToPage={goToPage}
						nextPage={nextPage}
						previousPage={previousPage}
						setPerPage={setPerPage}
					/>
				)}
			</div>

			<DialogDelete
				open={dialogDelete}
				onOpenChange={setDialogDelete}
				onConfirm={confirmDelete}
				idDelete={idToDelete}
			/>
		</>
	);

	return (
		<>
			<DataDisplayTemplate
				title={title}
				actionButtons={actionButtons}
				filters={filter}
				content={content}
			/>
		</>
	);
};

export default PurchaseRequestList;
