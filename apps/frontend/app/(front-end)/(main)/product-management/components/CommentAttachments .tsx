import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from '@/components/ui/sheet';

const sheetStateEvent = new CustomEvent('sheetStateChange', {
	detail: { isOpen: false },
	bubbles: true,
});

export const CommentAttachments = () => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen(!open);
	};

	useEffect(() => {
		sheetStateEvent.detail.isOpen = open;
		document.dispatchEvent(sheetStateEvent);
	}, [open]);

	return (
		<div className="relative">
			<Button
				variant="outline"
				size="sm"
				onClick={handleToggle}
				aria-label="Toggle comments and attachments"
			>
				Comment & Attachments
			</Button>

			<Sheet open={open} onOpenChange={setOpen} modal={false}>
				<SheetContent
					side="right"
					className="w-[400px] sm:w-[540px] p-0 border-l border-gray-200 shadow-xl"
				>
					<SheetHeader className="p-4 border-b border-gray-200">
						<SheetTitle className="text-xl">Comments & Attachments</SheetTitle>
						<SheetClose className="absolute right-4 top-4" />
					</SheetHeader>

					{/* ใส่เนื้อหาของ Sheet ตามต้องการได้ตรงนี้ */}
				</SheetContent>
			</Sheet>
		</div>
	);
};
