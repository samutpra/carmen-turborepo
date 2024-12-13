'use client';

import React, { useState } from 'react';
import { ProductItemGroupType } from '@carmensoftware/shared-types';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, X } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ItemGroupSummaryProps = {
	itemGroup: ProductItemGroupType | null;
	categoryName: string;
	subCategoryName: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onDelete: (itemGroupId: string) => void;
	onUpdate: (itemGroupId: string, newName: string) => void;
};

const ItemGroupSummaryModal = ({
	itemGroup,
	categoryName,
	subCategoryName,
	open,
	onOpenChange,
	onDelete,
	onUpdate,
}: ItemGroupSummaryProps) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editedName, setEditedName] = useState('');

	if (!itemGroup || !open) return null;

	const handleDelete = () => {
		console.log('Deleting item group with ID:', itemGroup.id);
		onDelete(itemGroup.id);
		setIsDeleteDialogOpen(false);
	};

	const handleEdit = () => {
		console.log('Edited item group:', {
			id: itemGroup.id,
			newName: editedName,
		});
		onUpdate(itemGroup.id, editedName);
		setIsEditDialogOpen(false);
	};

	const handleEditClick = () => {
		setEditedName(itemGroup.name);
		setIsEditDialogOpen(true);
	};

	return (
		<>
			<div
				className="fixed inset-0 bg-black/50"
				onClick={() => onOpenChange(false)}
			/>
			<Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
				<CardHeader className="relative">
					<Button
						variant="ghost"
						size="icon"
						className="absolute right-2 top-2"
						onClick={() => onOpenChange(false)}
					>
						<X className="h-4 w-4" />
					</Button>
					<CardTitle>Item Group Summary</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
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
				</CardContent>
				<CardFooter className="justify-end space-x-2">
					<Button variant="outline" size="sm" onClick={handleEditClick}>
						<Pencil className="h-4 w-4 mr-2" />
						Edit
					</Button>
					<Button
						variant="destructive"
						size="sm"
						onClick={() => setIsDeleteDialogOpen(true)}
					>
						<Trash2 className="h-4 w-4 mr-2" />
						Delete
					</Button>
				</CardFooter>
			</Card>

			{/* Delete Confirmation Dialog */}
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
					</DialogHeader>
					<p>Are you sure you want to delete this item group?</p>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Item Group</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={editedName}
								onChange={(e) => setEditedName(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsEditDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button variant="default" onClick={handleEdit}>
							Save Changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ItemGroupSummaryModal;
