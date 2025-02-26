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
import { fetchUnitComments } from '@/app/(front-end)/services/unit';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface UserInfo {
	firstname: string;
	lastname: string;
	middlename?: string;
	profilePic?: string;
}

interface UnitComment {
	id: string;
	message: string;
	created_at: string;
	updated_at: string;
	email: string;
	userInfo?: UserInfo[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attachments: any[];
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

	const getFullName = (comment: UnitComment): string => {
		if (comment.userInfo && comment.userInfo.length > 0) {
			const { firstname, lastname, middlename } = comment.userInfo[0];
			return `${firstname} ${middlename ? middlename + ' ' : ''}${lastname}`.trim();
		}
		return comment.email || 'Unknown User';
	};

	const getInitial = (comment: UnitComment): string => {
		if (comment.userInfo && comment.userInfo.length > 0) {
			const { firstname } = comment.userInfo[0];
			return firstname.charAt(0).toUpperCase();
		}
		return comment.email?.charAt(0).toUpperCase() || 'U';
	};

	const getProfilePic = (comment: UnitComment): string | undefined => {
		if (comment.userInfo && comment.userInfo.length > 0) {
			return comment.userInfo[0].profilePic;
		}
		return undefined;
	};

	const formatDate = (dateString: string): string => {
		try {
			return formatDistanceToNow(new Date(dateString), { addSuffix: true });
		} catch (error) {
			console.error('Error formatting date:', error);
			return 'Unknown date';
		}
	};

	const handleFetchComments = async () => {
		if (!open) return;

		setLoading(true);
		try {
			const result = await fetchUnitComments(token, tenantId);
			setComments(result.data as UnitComment[]);
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
							<div className="flex items-center space-x-4">
								<Skeleton className="h-12 w-12 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						) : error ? (
							<div className="rounded bg-red-50 text-red-500 p-3 my-2">
								<p>Error: {error}</p>
							</div>
						) : comments.length === 0 ? (
							<p className="text-gray-500 text-center py-4">
								No comments found
							</p>
						) : (
							<div className="space-y-4">
								{comments.map((comment) => (
									<div
										key={comment.id}
										className="p-3 bg-background rounded-md border border-gray-200 space-y-2"
									>
										<p className="text-[10px] text-gray-500 text-right">
											{formatDate(comment.updated_at)}
										</p>
										<div className="flex items-start gap-3 mb-2">
											<Avatar className="h-8 w-8">
												<AvatarImage
													src={getProfilePic(comment)}
													alt={getFullName(comment)}
												/>
												<AvatarFallback className="bg-primary text-primary-foreground">
													{getInitial(comment)}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<div className="flex justify-between items-start">
													<p className="font-medium text-xs">
														{getFullName(comment)}
													</p>
												</div>
												<p className="text-xs mt-1">{comment.message}</p>
											</div>
										</div>
										{comment.attachments && comment.attachments.length > 0 && (
											<div className="mt-2 pt-2 border-t border-gray-200 ml-11">
												<p className="text-xs font-medium mb-1">Attachments:</p>
												<div className="flex flex-wrap gap-2">
													{comment.attachments.map((attachment, index) => (
														<div
															key={index}
															className="text-xs text-blue-600 underline"
														>
															{Object.entries(attachment).map(([value]) => (
																<p
																	key={Math.random()}
																	className="cursor-pointer"
																>
																	{typeof value === 'object'
																		? JSON.stringify(value)
																		: String(value)}
																</p>
															))}
														</div>
													))}
												</div>
											</div>
										)}
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
