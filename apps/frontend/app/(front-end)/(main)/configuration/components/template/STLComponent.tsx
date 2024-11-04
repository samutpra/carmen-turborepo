import React, { ReactNode } from 'react'


interface Props {
    detail: ReactNode;
    content: ReactNode;
}

const STLComponent: React.FC<Props> = ({ detail, content }) => {
    return (
        <div className="flex flex-col p-4 justify-center">
            <div className="shadow p-4 sticky top-0 z-10 rounded-lg">
                <div className="md:flex justify-between items-center mb-4">
                    {detail}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-background mt-4 max-h-[calc(100vh-200px)]">
                {content}
            </div>
        </div>
    )
}

export default STLComponent