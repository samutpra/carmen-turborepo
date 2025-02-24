import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import { export_text, print_text } from '@/paraglide/messages';
import { FileDown, Plus, Printer } from 'lucide-react';
import React, { useMemo } from 'react';

const PoActions = () => {
	const actionButtons = useMemo(
		() => (
			<div className="action-btn-container">
				<Button asChild variant={'outline'} size={'sm'}>
					<Link href="/procurement/goods-received-note/new">
						<Plus className="h-4 w-4" />
						Create Good Recieve Note
					</Link>
				</Button>
				<Button variant="outline" className="group" size={'sm'}>
					<FileDown className="h-4 w-4" />
					{export_text()}
				</Button>
				<Button variant="outline" size={'sm'}>
					<Printer className="h-4 w-4" />
					{print_text()}
				</Button>
			</div>
		),
		[]
	);
	return actionButtons;
};

export default PoActions;
