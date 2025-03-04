import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Pencil, Copy, Trash2, Save, X } from 'lucide-react';
import { WorkflowCreateModel } from '@/dtos/workflow.dto';
import { formType } from '@/constants/enums';
import { UseFormReturn } from 'react-hook-form';

interface WorkflowHeaderProps {
	form: UseFormReturn<WorkflowCreateModel>;
	mode: formType;
	isEditing: boolean;
	onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onCancelEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
	onSubmit: (wf: WorkflowCreateModel) => void;
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
	form,
	mode,
	isEditing,
	onEdit,
	onCancelEdit,
	onDelete,
	onSubmit,
}: WorkflowHeaderProps) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4">
				{mode === formType.EDIT ? (
					<div>
						{isEditing ? (
							<>
								<div className="flex items-center space-x-2">
									<CardTitle className="text-2xl font-bold">
										Edit Workflow
									</CardTitle>
								</div>
								<CardDescription>ID: {form.getValues('id')}</CardDescription>
							</>
						) : (
							<>
								<div className="flex items-center space-x-2">
									<CardTitle className="text-2xl font-bold">
										{form.getValues('name')}
									</CardTitle>
									{form.getValues('is_active') && (
										<Badge
											variant={
												form.getValues('is_active') ? 'default' : 'secondary'
											}
										>
											{form.getValues('is_active') ? 'Active' : 'Inactive'}
										</Badge>
									)}
								</div>
								<CardDescription>
									ID: {form.getValues('id')} | Type:{' '}
									{form.getValues('workflow_type')}
								</CardDescription>
							</>
						)}
					</div>
				) : (
					<div>
						<div className="flex items-center space-x-2">
							<CardTitle className="text-2xl font-bold">
								Create Workflow
							</CardTitle>
						</div>
					</div>
				)}

				<div className="flex space-x-2">
					{!isEditing ? (
						<>
							<Button variant="default" onClick={onEdit}>
								<Pencil className="mr-2 h-4 w-4" />
								Edit
							</Button>
							<Button variant="outline">
								<Copy className="mr-2 h-4 w-4" />
								Duplicate
							</Button>
							<Button
								variant="outline"
								onClick={(e) => onDelete(e, form.getValues('id') ?? '')}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</Button>
						</>
					) : (
						<>
							<Button variant="ghost" onClick={onCancelEdit}>
								<X className="mr-2 h-4 w-4" />
								Cancel
							</Button>
							<Button
								type="submit"
								variant="default"
								onClick={form.handleSubmit(onSubmit)}
							>
								<Save className="mr-2 h-4 w-4" />
								Save Changes
							</Button>
						</>
					)}
				</div>
			</CardHeader>
			<CardContent className="px-6 py-4">
				<p className="text-sm text-muted-foreground">
					{form.getValues('description')}
				</p>
			</CardContent>
		</Card>
	);
};

export default WorkflowHeader;
