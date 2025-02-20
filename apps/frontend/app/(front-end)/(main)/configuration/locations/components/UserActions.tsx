import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import {
	ArrowBigDown,
	ArrowBigUp,
	ArrowBigRight,
	ArrowBigLeft,
} from 'lucide-react';

interface UserActionsProps {
	isEdit: boolean;
	selectedActiveUsers: string[];
	selectedAvailableUsers: string[];
	onCreate: () => void;
	onDelete: () => void;
	isDialogOpen: boolean;
	setIsDialogOpen: (open: boolean) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
	isEdit,
	selectedActiveUsers,
	selectedAvailableUsers,
	onCreate,
	onDelete,
	isDialogOpen,
	setIsDialogOpen,
}) => {
	return (
		<div className="flex flex-row lg:flex-col items-center justify-center gap-2">
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button
						size={'lg'}
						variant={'destructive'}
						disabled={!isEdit || selectedActiveUsers.length === 0}
					>
						<ArrowBigDown className="block lg:hidden" />
						<ArrowBigRight className="hidden lg:block" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Move</DialogTitle>
						<DialogDescription>
							Are you sure you want to move the selected users to the left
							table?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<div className="flex justify-end items-center gap-2">
							<Button
								size={'sm'}
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button size={'sm'} onClick={onDelete}>
								Confirm
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Button
				size={'lg'}
				onClick={onCreate}
				disabled={!isEdit || selectedAvailableUsers.length === 0}
			>
				<ArrowBigUp className="block lg:hidden" />
				<ArrowBigLeft className="hidden lg:block" />
			</Button>
		</div>
	);
};

export default UserActions;
