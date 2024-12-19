'use client';
import React from 'react';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import { DepartmentType } from '@carmensoftware/shared-types/src/department';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DepartmentDialog from './DepartmentDialog';
import { CustomButton } from '@/components/ui-custom/CustomButton';
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
import { Trash } from 'lucide-react';

interface DepartmentTableProps {
	departments: DepartmentType[];
	onSuccess: (values: DepartmentType) => void;
	onDelete: (id: string) => void;
	isLoading?: boolean;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({
	departments,
	onSuccess,
	onDelete,
	isLoading = false,
}) => {
	if (isLoading) {
		return <SkeletonTableLoading />;
	}
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">#</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{departments?.map((department, index) => (
					<TableRow key={department.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{department.name}</TableCell>
						<TableCell>{department.description}</TableCell>
						<TableCell>
							<Badge variant={department.is_active ? 'default' : 'destructive'}>
								{department.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end gap-2">
								<DepartmentDialog
									mode="edit"
									defaultValues={department}
									onSuccess={onSuccess}
								/>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<CustomButton variant="ghost" size="sm">
											<Trash className="h-4 w-4" />
										</CustomButton>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete the department.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => department.id && onDelete(department.id)}
												className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default DepartmentTable;
