import React from 'react';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
	title: string;
	description: string;
	icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title,
	description,
	icon = <FileQuestion className="h-12 w-12 text-muted-foreground" />,
}) => {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
			<div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
				{icon}
				<h3 className="mt-4 text-lg font-semibold">{title}</h3>
				<p className="mt-2 text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
};

export default EmptyState;
