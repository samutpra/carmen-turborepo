import React, { ReactNode } from 'react'

interface Props {
	title: string;
	actionButtons?: ReactNode;
	filters?: ReactNode;
	content: ReactNode;
	bulkActions?: ReactNode;
}

const DataDisplayTemplate: React.FC<Props> = ({
	title,
	actionButtons,
	filters,
	content,
	bulkActions,
}) => {
	return (
		<div className="flex flex-col p-6 justify-center">
			<div className="sticky top-0 z-10">
				<div className="md:flex justify-between items-start">
					<h1 className="text-2xl font-semibold">{title}</h1>
					{actionButtons && (
						<div className="mt-4 md:mt-0">{actionButtons}</div>
					)}
				</div>
				{filters && <div className="my-4">{filters}</div>}
				{bulkActions && <div className="mb-4">{bulkActions}</div>}
			</div>
			<div className="flex-1 overflow-y-auto bg-background max-h-[calc(100vh-200px)] rounded-lg">
				{content}
			</div>
		</div>
	);
}

export default DataDisplayTemplate
