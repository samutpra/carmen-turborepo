export interface ComingSoonProps {
	title: string;
}

import React from 'react';

export default function ComingSoon({ title }: ComingSoonProps) {
	return (
		<div className='all-center h-full'>
			<div className='text-center'>
				<h1 className='text-2xl md:text-3xl font-bold mb-4'>{title}</h1>
				<p className='text-lg md:text-xl'>Coming Soon!</p>
			</div>
		</div>
	);
}
