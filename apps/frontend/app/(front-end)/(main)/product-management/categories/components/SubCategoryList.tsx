'use client';

import React, { useState, useEffect } from 'react';
import { SubCategoryType } from '@carmensoftware/shared-types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash } from 'lucide-react';
import SubCatDialog from './SubCatDialog';
import { useAuth } from '@/app/context/AuthContext';
import { formType } from '@/types/form_type';
import { deleteSubCategory } from '../actions/sub_category';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';

interface Props {
	data: SubCategoryType[];
	setData: React.Dispatch<React.SetStateAction<SubCategoryType[]>>;
	categoryId: string;
	categoryName: string;
	onSelectSubCategory: (subCategory: SubCategoryType) => void;
}

const SubCategoryList: React.FC<Props> = ({
	data,
	setData,
	categoryId,
	categoryName,
	onSelectSubCategory,
}) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [subCategory, setSubCategory] = useState<SubCategoryType>();
	const [subCategoryID, setSubCategoryID] = useState<string | null>(
		null
	);
	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
		string | null
	>(null);

	useEffect(() => {
		setSelectedSubCategoryId(null);
		setSubCategory(undefined);
		onSelectSubCategory({
			id: '',
			name: '',
			description: '',
			is_active: true,
			product_category_id: '',
		});
	}, [categoryId, onSelectSubCategory]);

	const handleEditClick = (subCategory: SubCategoryType) => {
		setSubCategory(subCategory);
		setIsEditDialogOpen(true);
	};

	const handleDeleteSubCategory = async () => {
		if (!subCategoryID) return;
		try {
			const response = await deleteSubCategory(subCategoryID, token);
			if (response.ok) {
				setData((prevSubProducts) =>
					prevSubProducts.filter(
						(subProduct) => subProduct.id !== subCategoryID
					)
				);
				toastSuccess({ message: 'Sub-category deleted successfully' });
			} else {
				toastError({ message: 'Failed to delete sub-category' });
			}
		} catch (error) {
			console.log('error try catch', error);
			toastError({ message: 'Failed to delete sub-category' });
		}
	};

	const subCategoryListItems = data.map((subCategory) => (
		<div
			key={subCategory.id}
			className="flex items-center p-2 justify-between gap-2"
		>
			<div
				className={cn(
					'cursor-pointer hover:bg-accent rounded-lg p-2 w-full',
					selectedSubCategoryId === subCategory.id && 'bg-accent'
				)}
				role="button"
				onClick={() => {
					setSelectedSubCategoryId(subCategory.id || null);
					setSubCategory(subCategory);
					onSelectSubCategory(subCategory);
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setSelectedSubCategoryId(subCategory.id || null);
						setSubCategory(subCategory);
						onSelectSubCategory(subCategory);
					}
				}}
				aria-label={`Select ${subCategory.name} sub-category`}
				aria-selected={selectedSubCategoryId === subCategory.id}
				tabIndex={0}
			>
				<span>{subCategory.name}</span>
			</div>
			<div className="flex">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					aria-label="Edit sub category"
					onClick={() => handleEditClick(subCategory)}
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-destructive hover:text-destructive"
							aria-label="Delete sub category"
							onClick={() => setSubCategoryID(subCategory.id || '')}
						>
							<Trash className="h-4 w-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the
								sub-category &quot;
								{data.find((sc) => sc.id === subCategoryID)?.name}
								&quot;.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeleteSubCategory}
								className="bg-red-500 hover:bg-red-600 text-white"
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	));

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Sub Categories </CardTitle>
					{subCategory && (
						<span className="text-sm text-muted-foreground">
							Selected: {subCategory.name}
						</span>
					)}
				</CardHeader>
				<CardContent className="space-y-2">{subCategoryListItems}</CardContent>
			</Card>

			<SubCatDialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				mode={formType.EDIT}
				product_category_id={categoryId}
				product_category_name={categoryName}
				setSubProducts={setData}
				subCategory={subCategory}
			/>
		</>
	);
};

export default SubCategoryList;