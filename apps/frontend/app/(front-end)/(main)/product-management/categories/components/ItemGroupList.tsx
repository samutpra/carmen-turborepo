'use client';

import React, { useState } from 'react';
import { ProductItemGroupType } from '@carmensoftware/shared-types';
import ItemGroupSummaryModal from './ItemGroupSummaryModal';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

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

	if (!itemGroups.length) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Item Groups</CardTitle>
					<CardDescription>No item groups found</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	const itemGroupListItems = itemGroups.map((itemGroup) => (
		<div
			key={itemGroup.id}
			className="flex items-center p-2 justify-between gap-2"
		>
			<div
				className="cursor-pointer hover:bg-accent rounded-lg p-2 w-full"
				onClick={() => handleItemClick(itemGroup)}
			>
				<span>{itemGroup.name}</span>
			</div>
			<div className="flex">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => handleUpdate(itemGroup.id, itemGroup.name)}
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-destructive hover:text-destructive"
					onClick={() => handleDelete(itemGroup.id)}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</div>
		</div>
	));

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Item Group</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">{itemGroupListItems}</CardContent>
			</Card>

			<ItemGroupSummaryModal
				itemGroup={selectedItemGroup}
				categoryName={categoryName}
				subCategoryName={subCategoryName}
				open={isOpen}
				onOpenChange={setIsOpen}
				onDelete={handleDelete}
				onUpdate={handleUpdate}
			/>
		</>
	);
};
