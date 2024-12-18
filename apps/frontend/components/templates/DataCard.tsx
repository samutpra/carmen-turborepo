import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeIcon, Pen, Trash } from 'lucide-react';
import IsActiveIcon from '../ui-custom/Icon/IsActiveIcon';
import { TypeDateKey, dateKeys, formatDateCustom } from '@/lib/formatDate';
import StatusBadge from '../ui-custom/custom-status-badge';
import { amountKeys, formatPrice, TypeAmountKey } from '@/lib/formatPrice';

interface Column {
    key: string;
    label: string;
}

interface Props<T> {
    data: T[];
    columns: Column[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataCard = <T extends Record<string, any>>({ data, columns, onEdit, onDelete, onView }: Props<T>) => {

    return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.map((item, index) => (
					<Card key={index} className="overflow-hidden">
						<CardContent>
							{columns.map((column) => {
								const value = item[column.key];
								return (
									<div key={column.key} className="flex items-center">
										<div className="w-2/5">
											<span className="text-sm font-medium text-gray-500">
												{column.label}
											</span>
										</div>
										<div>
											{typeof value === 'boolean' ? (
												<IsActiveIcon isChecked={value} />
											) : dateKeys.includes(column.key as TypeDateKey) ? (
												<span className="text-sm w-full">
													{formatDateCustom(value as TypeDateKey)}
												</span>
											) : column.key === 'status' ? (
												<StatusBadge status={value} />
											) : amountKeys.includes(column.key as TypeAmountKey) ? (
												<span className="text-sm w-full">
													{formatPrice(value)}
												</span>
											) : value != null ? (
												<span className="text-sm w-full">{String(value)}</span>
											) : (
												'-'
											)}
										</div>
									</div>
								);
							})}

							{(onEdit || onDelete || onView) && (
								<div className="flex gap-2 pt-2 justify-end">
									{onView && (
										<Button
											variant="outline"
											size="sm"
											onClick={() => onView(item)}
											className="hover:bg-blue-50"
										>
											<EyeIcon />
										</Button>
									)}
									{onEdit && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onEdit(item)}
											className="hover:bg-blue-50"
										>
											<Pen />{' '}
										</Button>
									)}
									{onDelete && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onDelete(item)}
										>
											<Trash />
										</Button>
									)}
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		);
};

export default DataCard;