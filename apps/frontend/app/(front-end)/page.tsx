import * as m from '@/paraglide/messages.js';

import { Link } from '@/lib/i18n';
import React from 'react';

export default function HomePage() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='text-4xl font-bold mb-4'>{m.home_title()}</h1>
			<p className='text-xl mb-8'>{m.home_subtitle()}</p>
			<div className='space-x-4'>
				<Link href='/auth/login' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					Sign In
				</Link>
				<Link href='/dashboard' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
					Go to Menu
				</Link>
			</div>

			{/* <p className='text-sm text-gray-500 mt-4'>Made with ❤️ by <a href='https://github.com/paraglide' target='_blank' rel='noopener noreferrer'>Paraglide</a></p> */}
		</div>
	);
}
