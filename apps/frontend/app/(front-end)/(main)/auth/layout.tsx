'use client';

import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex h-screen overflow-hidden'>
			<div className='flex-1 flex flex-col overflow-hidden'>
				<main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 pt-16'>{children}</main>
			</div>
		</div>
	);
}
