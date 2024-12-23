'use client';

import { UnitType } from '@carmensoftware/shared-types';
import React from 'react';
import { fetchUnits } from './api';

interface Props {
    token: string;
    tenantId: string;
}

const ServerListComponent: React.FC<Props> = async ({ token, tenantId }) => {
    const units = await fetchUnits(token, tenantId);

    console.log('units:', units);

    return (
        <div>
            <h1>Unit List</h1>
            <ul>
                {units.map((unit: UnitType) => (
                    <li key={unit.id}>{unit.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServerListComponent;
