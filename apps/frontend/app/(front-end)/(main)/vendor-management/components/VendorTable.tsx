import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { vendor_type } from '@carmensoftware/shared-types';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import EmptyState from '@/components/ui-custom/EmptyState';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import * as m from '@/paraglide/messages.js';
interface VendorTableProps {
	vendors: vendor_type[];
	isLoading: boolean;
}
const VendorTable: React.FC<VendorTableProps> = ({
	vendors,
	isLoading,
}) => {
	if (isLoading) {
		return <SkeletonTableLoading />;
	}
	if (vendors.length === 0) {
		return (
			<EmptyState title={m.no_vendors_found_text()} description={m.no_vendors_found_text()} />
		);
	}
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">#</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{vendors?.map((vendor, index) => (
					<TableRow key={vendor.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{vendor.name}</TableCell>
						<TableCell>{vendor.description}</TableCell>
						<TableCell>
							<Badge variant={vendor.is_active ? 'default' : 'destructive'}>
								{vendor.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<Button asChild variant="ghost" size={'sm'}>
								<Link href={`/vendor-management/vendors/${vendor.id}`}>
									<Eye className="h-4 w-4" />
								</Link>
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default VendorTable;
