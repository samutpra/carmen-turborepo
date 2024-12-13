'use client';

import React, { useState } from 'react';
import { ProductItemGroupType } from '@carmensoftware/shared-types';
import ItemGroupSummaryModal from './ItemGroupSummaryModal';

type ItemGroupListProps = {
	itemGroups: ProductItemGroupType[];
	categoryName: string;
	subCategoryName: string;
	onDeleteItemGroup: (itemGroupId: string) => void;
	onUpdateItemGroup: (itemGroupId: string, newName: string) => void;
};

export const ItemGroupList = ({
	itemGroups,
	categoryName,
	subCategoryName,
	onDeleteItemGroup,
	onUpdateItemGroup,
}: ItemGroupListProps) => {
	const [selectedItemGroup, setSelectedItemGroup] =
		useState<ProductItemGroupType | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleItemClick = (itemGroup: ProductItemGroupType) => {
		setSelectedItemGroup(itemGroup);
		setIsOpen(true);
	};

	const handleDelete = (itemGroupId: string) => {
		onDeleteItemGroup(itemGroupId);
		setIsOpen(false);
		setSelectedItemGroup(null);
	};

	const handleUpdate = (itemGroupId: string, newName: string) => {
		onUpdateItemGroup(itemGroupId, newName);
		setIsOpen(false);
		setSelectedItemGroup(null);
	};

	return (
		<div className="w-1/3">
			{itemGroups.length > 0 ? (
				itemGroups.map((itemGroup) => (
					<div
						key={itemGroup.id}
						className="border p-2 mb-2 cursor-pointer hover:bg-gray-50"
						onClick={() => handleItemClick(itemGroup)}
					>
						<p>{itemGroup.name}</p>
					</div>
				))
			) : (
				<div className="text-gray-500">No item groups available</div>
			)}

			<ItemGroupSummaryModal
				itemGroup={selectedItemGroup}
				categoryName={categoryName}
				subCategoryName={subCategoryName}
				open={isOpen}
				onOpenChange={setIsOpen}
				onDelete={handleDelete}
				onUpdate={handleUpdate}
			/>
		</div>
	);
};
