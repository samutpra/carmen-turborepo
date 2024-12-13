'use client';

import React, { useState } from 'react';
import { ProductItemGroupType } from '@carmensoftware/shared-types';
import ItemGroupSummaryModal from './ItemGroupSummaryModal';

export const ItemGroupList = ({
	itemGroups,
	categoryName,
	subCategoryName,
}: {
	itemGroups: ProductItemGroupType[];
	categoryName: string;
	subCategoryName: string;
}) => {
	const [selectedItemGroup, setSelectedItemGroup] =
		useState<ProductItemGroupType | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleItemClick = (itemGroup: ProductItemGroupType) => {
		setSelectedItemGroup(itemGroup);
		setIsOpen(true);
	};

	return (
		<div className="w-1/3">
			<h2 className="text-xl font-bold mb-4">Item Groups</h2>
			{itemGroups.length > 0 ? (
				itemGroups.map((itemGroup) => (
					<div
						key={itemGroup.id}
						className="border p-2 mb-2 cursor-pointer hover:bg-gray-50"
						onClick={() => handleItemClick(itemGroup)}
					>
						<p>ID: {itemGroup.id}</p>
						<p>Name: {itemGroup.name}</p>
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
			/>
		</div>
	);
};
