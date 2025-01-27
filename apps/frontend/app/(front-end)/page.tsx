import * as m from '@/paraglide/messages.js';

import { Link } from '@/lib/i18n';
import React from 'react';

export default function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold mb-4">{m.home_title()}</h1>
			<p className="text-xl mb-8">{m.home_subtitle()}</p>
			<div className="space-x-4">
				<Link
					href="/sign-in"
					data-cy="sign-in-link"
					className="py-2 px-4 rounded-xl border"
				>
					Sign In
				</Link>
			</div>
		</div>
	);
}
