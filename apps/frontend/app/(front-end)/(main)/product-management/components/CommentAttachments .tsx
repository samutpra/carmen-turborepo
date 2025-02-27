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
import PostAndUploadFile, { FileWithPreview } from './PostAndUploadFile';
import { File } from 'lucide-react';

interface UserInfo {
	firstname: string;
	lastname: string;
	middlename?: string;
	profilePic?: string;
}

interface CommentAttachment {
	name: string;
	size: number;
	type: string;
	preview?: string;
}

interface UnitComment {
	id: string;
	message: string;
	created_at: string;
	updated_at: string;
	email: string;
	userInfo?: UserInfo[];
	attachments: CommentAttachment[];
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

	const getFileIcon = (type: string | undefined) => {
		if (!type) return <File className="h-4 w-4 text-gray-500" />;

		if (type.includes('pdf')) {
			return <File className="h-4 w-4 text-red-500" />;
		}
		if (type.includes('word') || type.includes('doc')) {
			return <File className="h-4 w-4 text-blue-500" />;
		}
		if (type.includes('sheet') || type.includes('excel') || type.includes('xls')) {
			return <File className="h-4 w-4 text-green-500" />;
		}

		return <File className="h-4 w-4 text-gray-500" />;
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
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

	const handleSubmitComment = async (message: string, files: FileWithPreview[]) => {
		try {
			const newComment: UnitComment = {
				id: Math.random().toString(36).substring(2),
				message,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				email: 'current.user@example.com',
				attachments: files.map(file => ({
					name: file.name,
					size: file.size,
					type: file.type,
					preview: file.preview
				}))
			};

			setComments(prev => [newComment, ...prev]);
		} catch (error) {
			console.error('Error submitting comment:', error);
			throw error;
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
					className="w-full md:w-[400px] sm:w-[540px] p-0 border-l border-gray-200 shadow-xl"
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
															className="flex items-center gap-2 p-2 rounded bg-white border border-gray-200"
														>
															{attachment.type?.startsWith('image/') && attachment.preview ? (
																<div className="h-8 w-8 rounded overflow-hidden bg-gray-100">
																	<img
																		src={attachment.preview}
																		alt={attachment.name}
																		className="h-full w-full object-cover"
																	/>
																</div>
															) : (
																<div className="h-8 w-8 rounded flex items-center justify-center bg-gray-100">
																	{getFileIcon(attachment.type)}
																</div>
															)}
															<div className="flex-1 min-w-0">
																<p className="text-xs font-medium truncate">{attachment.name}</p>
																<p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
															</div>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						)}

						<div className="mt-4 border-t border-gray-200 bg-background">
							<PostAndUploadFile onSubmit={handleSubmitComment} />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
