import React from 'react'

interface Props {
    id: string;
}

const StoreLcationDetails: React.FC<Props> = ({ id }) => {
    return (
        <div>StoreLcationDetails {id}</div>
    )
}

export default StoreLcationDetails