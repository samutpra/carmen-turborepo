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
            <div className="shadow p-4 sticky top-0 z-10 rounded-lg">
                <div className="md:flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    {actionButtons && (
                        <div className="mt-4 md:mt-0">{actionButtons}</div>
                    )}
                </div>
                {filters && <div className="mb-4">{filters}</div>}
                {bulkActions && <div className="mb-4">{bulkActions}</div>}
            </div>
            <div className="flex-1 overflow-y-auto bg-background mt-4 max-h-[calc(100vh-200px)]">
                {content}
            </div>
        </div>
    )
}

export default DataDisplayTemplate
