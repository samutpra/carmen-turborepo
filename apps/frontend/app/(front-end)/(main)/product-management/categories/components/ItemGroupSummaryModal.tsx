'use client';

import React from 'react';
import { ProductItemGroupType } from '@carmensoftware/shared-types';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

type ItemGroupSummaryProps = {
	itemGroup: ProductItemGroupType | null;
	categoryName: string;
	subCategoryName: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const ItemGroupSummaryModal = ({
	itemGroup,
	categoryName,
	subCategoryName,
	open,
	onOpenChange,
}: ItemGroupSummaryProps) => {
	if (!itemGroup) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Item Group Summary</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="border-b pb-2">
						<p className="text-sm text-gray-500">Category</p>
						<p className="font-medium">{categoryName}</p>
					</div>

					<div className="border-b pb-2">
						<p className="text-sm text-gray-500">Sub Category</p>
						<p className="font-medium">{subCategoryName}</p>
					</div>

					<div className="border-b pb-2">
						<p className="text-sm text-gray-500">Item Group</p>
						<p className="font-medium">{itemGroup.name}</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ItemGroupSummaryModal;
