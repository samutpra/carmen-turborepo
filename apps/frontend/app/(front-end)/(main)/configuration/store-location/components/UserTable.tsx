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
		<Card className="w-full lg:w-1/2 p-4 h-[55vh] overflow-y-auto">
			<p className="px-2 text-md font-semibold">{title}</p>
			<Table>
				<TableHeader>
					<TableRow>
						{isEdit && <TableHead className="w-[30px]"></TableHead>}
						<TableHead className="w-[100px]">Full Name</TableHead>
						<TableHead>Email</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.length > 0 ? (
						users.map((user) => (
							<TableRow key={user.id}>
								{isEdit && (
									<TableCell className="w-[30px]">
										<Checkbox
											id={user.id}
											checked={selectedUsers.includes(user.id)}
											onCheckedChange={() => onUserChange(user.id)}
										/>
									</TableCell>
								)}
								<TableCell className="w-[100px] font-medium">
									{user.full_name}
								</TableCell>
								<TableCell>{user.email}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={isEdit ? 3 : 2} className="text-center">
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
