export interface StatItem {
    icon: string;
    title: string;
    value: string | number;
    description: string;
}

export interface ClusterType {
    name: string;
    businessUnits: number;
    status: string;
}

export interface RecentActivityType {
    title: string;
    description: string;
    cluster: string;
    create_at: string;
}

