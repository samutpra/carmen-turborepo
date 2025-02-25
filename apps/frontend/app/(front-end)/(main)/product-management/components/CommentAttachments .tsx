import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from '@/components/ui/sheet';
import { useAuth } from '@/app/context/AuthContext';
import { fetchUnitComments } from '../actions/unit';
interface UnitComment {
	id: string;
	message: string;
}

const sheetStateEvent = new CustomEvent('sheetStateChange', {
	detail: { isOpen: false },
	bubbles: true,
});

export const CommentAttachments = () => {
	const { accessToken, tenantId } = useAuth();
	const token = accessToken || '';
	const [open, setOpen] = useState(false);
	const [comments, setComments] = useState<UnitComment[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleToggle = () => {
		setOpen(!open);
	};

	const handleFetchComments = async () => {
		if (!open) return;

		setLoading(true);
		try {
			const result = await fetchUnitComments(token, tenantId);
			setComments(result.data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch comments');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		sheetStateEvent.detail.isOpen = open;
		document.dispatchEvent(sheetStateEvent);

		if (open) {
			handleFetchComments();
		}
	}, [open]);

	return (
		<div className="relative">
			<Button
				variant="outline"
				size="sm"
				onClick={handleToggle}
				aria-label="Toggle comments and attachments"
				tabIndex={0}
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

					<div className="p-4">
						{loading ? (
							<div className="flex justify-center py-4">
								<p>Loading comments...</p>
							</div>
						) : error ? (
							<div className="rounded bg-red-50 text-red-500">
								<p>Error: {error}</p>
							</div>
						) : comments.length === 0 ? (
							<p>No comments found</p>
						) : (
							<div className="space-y-4">
								{comments.map((comment) => (
									<div key={comment.id}>
										<p className="text-xs">{comment.message}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
