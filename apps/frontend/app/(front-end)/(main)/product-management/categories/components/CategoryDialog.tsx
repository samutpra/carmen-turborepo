'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { CategoryFormData } from '@carmensoftware/shared-types/dist/productCategorySchema';

interface CategoryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: CategoryFormData) => Promise<void>;
	initialData?: CategoryFormData;
	mode: 'add' | 'edit';
}

const CategoryDialog = ({
	open,
	onOpenChange,
	onSubmit,
	initialData,
	mode,
}: CategoryDialogProps) => {
	const [formData, setFormData] = useState<CategoryFormData>({
		name: '',
		description: '',
		is_active: true,
	});

	useEffect(() => {
		if (initialData && open) {
			setFormData(initialData);
		}
	}, [initialData, open]);

	const handleSubmit = async () => {
		await onSubmit(formData);
		if (mode === 'add') {
			setFormData({ name: '', description: '', is_active: true });
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'add' ? 'Add New Category' : 'Edit Category'}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							value={formData.name}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							value={formData.description}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
						/>
					</div>
					<div className="flex items-center space-x-2">
						<Switch
							id="is_active"
							checked={formData.is_active}
							onCheckedChange={(checked) =>
								setFormData((prev) => ({ ...prev, is_active: checked }))
							}
						/>
						<Label htmlFor="is_active">Active</Label>
					</div>
					<div className="flex justify-end space-x-2">
						<Button variant="outline" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>
							{mode === 'add' ? 'Add Category' : 'Save Changes'}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CategoryDialog;
