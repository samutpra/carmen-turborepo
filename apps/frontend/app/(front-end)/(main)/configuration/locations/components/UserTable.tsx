import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

interface UserTableProps {
	users: { id: string; full_name: string; email: string }[];
	selectedUsers: string[];
	isEdit: boolean;
	onUserChange: (id: string) => void;
	title: string;
}

const UserTable: React.FC<UserTableProps> = ({
	users,
	selectedUsers,
	isEdit,
	onUserChange,
	title,
}) => {
	return (
		<Card
			className="w-full lg:w-1/2 p-4 h-[55vh] overflow-y-auto"
			data-id="user-table-card"
		>
			<p className="px-2 text-md font-semibold" data-id="user-table-title">
				{title}
			</p>
			<Table data-id="user-table">
				<TableHeader data-id="user-table-header">
					<TableRow data-id="user-table-row">
						{isEdit && <TableHead className="w-[30px]"></TableHead>}
						<TableHead className="w-[100px]">Full Name</TableHead>
						<TableHead>Email</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody data-id="user-table-body">
					{users.length > 0 ? (
						users.map((user) => (
							<TableRow key={user.id} data-id="user-table-row">
								{isEdit && (
									<TableCell className="w-[30px]" data-id="user-table-cell">
										<Checkbox
											id={user.id}
											checked={selectedUsers.includes(user.id)}
											onCheckedChange={() => onUserChange(user.id)}
											data-id="user-table-checkbox"
										/>
									</TableCell>
								)}
								<TableCell
									className="w-[100px] font-medium"
									data-id="user-table-cell"
								>
									{user.full_name}
								</TableCell>
								<TableCell data-id="user-table-cell">{user.email}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow data-id="user-table-row">
							<TableCell
								colSpan={isEdit ? 3 : 2}
								className="text-center"
								data-id="user-table-cell"
							>
								No users found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Card>
	);
};

export default UserTable;
