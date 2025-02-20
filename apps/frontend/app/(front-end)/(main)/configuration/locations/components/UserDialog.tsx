import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface UserDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
	isOpen,
	onClose,
	onConfirm,
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Move</DialogTitle>
					<DialogDescription>
						Are you sure you want to move the selected users to the left table?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<div className="flex justify-end items-center gap-2">
						<Button size={'sm'} variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button size={'sm'} onClick={onConfirm}>
							Confirm
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UserDialog;
