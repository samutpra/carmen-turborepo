'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PurchaseRequestData } from './PrDetail';
import { Button } from '@/components/ui/button';
import { FileDown, Pencil, Printer, Save, Upload, X } from 'lucide-react';
import { export_text, print_text } from '@/paraglide/messages';

interface PrHeaderProps {
	control: Control<PurchaseRequestData>;
	isCreate: boolean;
	isViewMode: boolean;
	isReadOnly: boolean;
	isEditMode: boolean;
	handleCancelEdit: () => void;
	isSubmitting: boolean;
	handleEditMode: () => void;
	isFormValid?: boolean;
}

const PrHeader: React.FC<PrHeaderProps> = ({
	control,
	isCreate,
	isViewMode,
	isReadOnly,
	isEditMode,
	handleCancelEdit,
	isSubmitting,
	handleEditMode,
	isFormValid = true,
}) => {
	const renderActionButtons = () => {
		if (isViewMode) {
			return (
				<Button
					variant="outline"
					size="sm"
					onClick={handleEditMode}
					className="ml-auto"
					aria-label="Edit purchase request"
				>
					<Pencil />
					Edit
				</Button>
			);
		}

		if (isEditMode) {
			return (
				<>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleCancelEdit}
						disabled={isSubmitting}
						aria-label="Cancel editing"
					>
						<X />
						Cancel
					</Button>

					<Button
						size="sm"
						type="submit"
						disabled={isSubmitting}
						aria-label={
							isCreate ? 'Create purchase request' : 'Update purchase request'
						}
					>
						<Save />
						{isSubmitting ? (
							<span>{isCreate ? 'Creating...' : 'Updating...'}</span>
						) : isCreate ? (
							'Create Purchase Request'
						) : (
							'Update Purchase Request'
						)}
					</Button>
				</>
			);
		}

		if (isCreate) {
			return (
				<Button
					type="submit"
					size="sm"
					disabled={isSubmitting || !isFormValid}
					aria-label="Create purchase request"
				>
					<Save />
					{isSubmitting ? 'Creating...' : 'Create Purchase Request'}
				</Button>
			);
		}

		return null;
	};

	return (
		<div className="p-3">
			<div className="flex justify-between">
				<p className="text-lg font-bold">Purchase Request</p>

				<div className="flex flex-row gap-2">
					{renderActionButtons()}

					<Button
						variant="outline"
						size="sm"
						aria-label="Export purchase request"
					>
						<FileDown className="mr-1 h-4 w-4" />
						{export_text()}
					</Button>

					<Button
						variant="outline"
						size="sm"
						aria-label="Print purchase request"
					>
						<Printer className="mr-1 h-4 w-4" />
						{print_text()}
					</Button>

					<Button
						variant="outline"
						size="sm"
						aria-label="Share purchase request"
					>
						<Upload className="mr-1 h-4 w-4" />
						Share
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{!isCreate && (
					<FormField
						control={control}
						name="id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>PR ID</FormLabel>
								<FormControl>
									<Input
										{...field}
										readOnly
										aria-readonly="true"
										disabled={isViewMode}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
							<FormControl>
								<Input
									{...field}
									readOnly={isReadOnly}
									aria-readonly={isReadOnly ? 'true' : 'false'}
									disabled={isViewMode}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="requestor"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Requestor</FormLabel>
							<FormControl>
								<Input
									{...field}
									readOnly={isReadOnly}
									aria-readonly={isReadOnly ? 'true' : 'false'}
									disabled={isViewMode}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="department"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Department</FormLabel>
							<FormControl>
								<Input
									{...field}
									readOnly={isReadOnly}
									aria-readonly={isReadOnly ? 'true' : 'false'}
									disabled={isViewMode}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{!isCreate && (
					<FormField
						control={control}
						name="date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date</FormLabel>
								<FormControl>
									<Input
										{...field}
										readOnly
										aria-readonly="true"
										disabled={isViewMode}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{!isCreate && (
					<FormField
						control={control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Input
										{...field}
										readOnly
										aria-readonly="true"
										disabled={isViewMode}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									{...field}
									type={isReadOnly ? 'text' : 'number'}
									step="0.01"
									readOnly={isReadOnly}
									aria-readonly={isReadOnly ? 'true' : 'false'}
									value={
										isReadOnly
											? `$${Number(field.value).toFixed(2)}`
											: field.value
									}
									onChange={isReadOnly ? undefined : field.onChange}
									disabled={isViewMode}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{!isCreate && (
					<FormField
						control={control}
						name="currentStage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current Stage</FormLabel>
								<FormControl>
									<Input
										{...field}
										readOnly
										aria-readonly="true"
										disabled={isViewMode}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={control}
					name="description"
					render={({ field }) => (
						<FormItem className="col-span-1 md:col-span-2">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									readOnly={isReadOnly}
									aria-readonly={isReadOnly ? 'true' : 'false'}
									className="min-h-[100px]"
									disabled={isViewMode}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
};

export default PrHeader;
