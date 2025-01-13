'use client';

import React, { Suspense } from 'react'
import ServerListComponent from './ServerListComponent'
import { useAuth } from '@/app/context/AuthContext';

const ServerComponentPage = () => {
    const { accessToken } = useAuth();
    const token = accessToken || '';
    const tenantId = 'DUMMY';
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServerListComponent token={token} tenantId={tenantId} />
        </Suspense>
    )
}

export default ServerComponentPage