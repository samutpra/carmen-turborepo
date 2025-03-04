import { API_URL } from "@/lib/api-url";
import { BusinessUnitCluster, BusinessUnitType } from "@/types/main";

/**
 * Fetches business units and enriches them with their associated cluster data
 * @returns Business units with merged cluster data
 */
export const fetchBusinessUnitsWithClusterData = async () => {
    'use server';

    // Fetch business units
    const buUrl = `${API_URL}/api/business-unit`;
    const buOptions = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    };

    const buResponse = await fetch(buUrl, buOptions);
    if (!buResponse.ok) {
        throw new Error('Failed to fetch business units');
    }
    const businessUnits: BusinessUnitType[] = await buResponse.json();

    // Fetch clusters
    const clusterUrl = `${API_URL}/api/cluster`;
    const clusterOptions = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    };

    const clusterResponse = await fetch(clusterUrl, clusterOptions);
    if (!clusterResponse.ok) {
        throw new Error('Failed to fetch clusters');
    }
    const clusters: BusinessUnitCluster[] = await clusterResponse.json();

    // Create a map of clusters for quick lookup
    const clusterMap = new Map<string, BusinessUnitCluster>();
    clusters.forEach(cluster => {
        clusterMap.set(cluster.id, cluster);
    });

    // Merge business units with cluster data
    const enrichedBusinessUnits = businessUnits.map(businessUnit => {
        const clusterData = clusterMap.get(businessUnit.clusterId);

        return {
            ...businessUnit,
            clusterDetails: clusterData || null
        };
    });

    return enrichedBusinessUnits;
};

/**
 * Fetches a single business unit by ID and enriches it with cluster data
 * @param businessUnitId The ID of the business unit to fetch
 * @returns Business unit with merged cluster data or null if not found
 */
export const fetchBusinessUnitWithClusterData = async (businessUnitId: string) => {
    'use server';

    // Fetch the specific business unit
    const buUrl = `${API_URL}/api/business-unit/${businessUnitId}`;
    const buOptions = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    };

    const buResponse = await fetch(buUrl, buOptions);
    if (!buResponse.ok) {
        throw new Error(`Failed to fetch business unit with ID ${businessUnitId}`);
    }
    const businessUnit: BusinessUnitType = await buResponse.json();

    // Fetch the associated cluster
    const clusterUrl = `${API_URL}/api/cluster/${businessUnit.clusterId}`;
    const clusterOptions = {
        method: 'GET',
        cache: 'no-store' as RequestCache
    };

    const clusterResponse = await fetch(clusterUrl, clusterOptions);
    if (!clusterResponse.ok) {
        throw new Error(`Failed to fetch cluster with ID ${businessUnit.clusterId}`);
    }
    const cluster: BusinessUnitCluster = await clusterResponse.json();

    // Return the business unit with cluster details
    return {
        ...businessUnit,
        clusterDetails: cluster
    };
}; 