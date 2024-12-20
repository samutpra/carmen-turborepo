import React from 'react';
import { UnitType } from '@carmensoftware/shared-types';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Trash } from 'lucide-react';
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
import UnitDialog from './UnitDialog';
interface UnitTableProps {
	units: UnitType[];
	onSuccess: (values: UnitType) => void;
	onDelete: (id: string) => void;
}

const UnitTable: React.FC<UnitTableProps> = ({
	units,
	onSuccess,
	onDelete,
}) => {
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
				{units?.map((unit, index) => (
					<TableRow key={unit.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{unit.name}</TableCell>
						<TableCell>{unit.description}</TableCell>
						<TableCell>
							<Badge variant={unit.is_active ? 'default' : 'destructive'}>
								{unit.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end gap-2">
								<UnitDialog
									mode="edit"
									defaultValues={unit}
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
												delete the unit.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => unit.id && onDelete(unit.id)}
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

export default UnitTable;
