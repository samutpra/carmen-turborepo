import React from 'react'

interface Props {
    errMessage: string
}
const ErrorDisplay: React.FunctionComponent<Props> = ({ errMessage }) => {
    return (
        <div className="flex items-center justify-center h-96 text-red-500">
            {errMessage}
        </div>
    )
}

export default ErrorDisplay