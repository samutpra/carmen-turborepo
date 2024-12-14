'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { SubCategoryFormData } from '@carmensoftware/shared-types';

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string(),
	is_active: z.boolean(),
	product_category_id: z.string(),
});

interface Category {
	id: string;
	name: string;
}

interface SubCategoryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: SubCategoryFormData) => Promise<void>;
	initialData?: SubCategoryFormData;
	mode: 'add' | 'edit';
	categories: Category[];
}

const SubCategoryDialog = ({
	open,
	onOpenChange,
	onSubmit,
	initialData,
	mode,
	categories,
}: SubCategoryDialogProps) => {
	const [openCombobox, setOpenCombobox] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			is_active: true,
			product_category_id: '',
		},
	});

	useEffect(() => {
		if (initialData && open) {
			form.reset(initialData);
		}
	}, [initialData, open, form]);

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		await onSubmit(values);
		if (mode === 'add') {
			form.reset({
				name: '',
				description: '',
				is_active: true,
				product_category_id: '',
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === 'add' ? 'Add New Category' : 'Edit Category'}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="product_category_id"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Category</FormLabel>
									<Popover open={openCombobox} onOpenChange={setOpenCombobox}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													aria-expanded={openCombobox}
													className={cn(
														"w-full justify-between",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value
														? categories.find((category) => category.id === field.value)?.name
														: "Select category..."}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput
													placeholder="Search category..."
													className="h-9"
												/>
												<CommandEmpty>No category found.</CommandEmpty>
												<CommandGroup>
													{categories.map((category) => (
														<CommandItem
															key={category.id}
															value={category.name}
															onSelect={() => {
																form.setValue("product_category_id", category.id);
																setOpenCombobox(false);
															}}
														>
															{category.name}
															<Check
																className={cn(
																	"ml-auto h-4 w-4",
																	category.id === field.value
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex items-center space-x-2">
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Active</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button type="submit">
								{mode === 'add' ? 'Add Category' : 'Save Changes'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default SubCategoryDialog;
