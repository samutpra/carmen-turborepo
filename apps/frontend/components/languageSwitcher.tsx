'use client';

import { AvailableLanguageTag, availableLanguageTags } from '@/paraglide/runtime';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/lib/i18n';

import { Button } from '@/components/ui-custom/button';
import { Globe } from 'lucide-react';
import React from 'react';
import { Route } from 'next';

export default function LanguageSwitcher() {
	const pathname = usePathname() as Route;
	const router = useRouter();

	const labels: Record<AvailableLanguageTag, string> = {
		'en-us': 'English',
		'th-th': 'ไทย',
	};

	const setLanguage = (lang: AvailableLanguageTag) => {
		router.push(pathname, {
			locale: lang,
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='text-blue-950'>
					<Globe size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{availableLanguageTags.map((lang) => (
					<DropdownMenuItem key={lang} onClick={() => setLanguage(lang)} className='cursor-pointer'>
						{labels[lang]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
