import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import React from 'react';

const ProfileComponent = () => {
	return (
		<div>
			<h1>Profile</h1>
			<Button asChild>
				<Link href="/profile/change-password">Change Password</Link>
			</Button>
		</div>
	);
};

export default ProfileComponent;
