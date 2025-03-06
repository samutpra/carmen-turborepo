export enum StatusType {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum RoleType {
    MANAGER = 'manager',
    INVENTORY = 'inventory',
    REPORTS = 'reports',
    PROCUREMENT = 'procurement',
    SPA_MANAGER = 'spa-manager',
    RESTAURANT_MANAGER = 'restaurant-manager',
}

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

export interface AssignedReport {
    id: string
    templateId: string
    businessUnitId: string
    status: 'active' | 'inactive'
    schedule?: {
        frequency: 'daily' | 'weekly' | 'monthly'
        time: string
        startDate: string
    }
    configuration?: {
        database?: {
            connection: string
            tables: string[]
        }
        filters?: Record<string, unknown>
        customFields?: string[]
    }
};

export interface BusinessUnitType {
    id: string
    name: string
    brand: string
    clusterId: string
    head: string
    location: {
        city: string
        country: string
    }
    details: {
        rooms: number
        teams: number
        members: number
        maxUsers?: number
    }
    configuration: {
        database: {
            host: string
            name: string
            type: 'mysql' | 'postgres'
        }
        cluster: {
            id: string
            name: string
        }
    }
    contact: {
        email: string
        phone: string
        address: string
    }
    settings: {
        notifications: {
            email: boolean
            slack: boolean
            webhook: boolean
        }
        integrations: {
            enabled: string[]
            configurations: Record<string, unknown>
        }
    }
    reports: AssignedReport[]
    status: 'active' | 'inactive'
    createdAt: string
    updatedAt: string
    cluster: BusinessUnitCluster
}

export interface BusinessUnitCluster {
    id: string
    name: string
    businessUnits: string[] // Business Unit IDs
    region: string
    status: 'active' | 'inactive'
}

export interface UserType {
    id: string
    name: string
    email: string
    status: 'active' | 'inactive'
    lastActive: string
    platformRole?: 'admin' | 'support' | 'finance'
}

export interface BusinessUnitUserRoleType {
    userId: string
    businessUnitId: string
    roles: string[]  // Multiple roles from supply chain system
    lastUpdated: string
    updatedBy: string  // Supply chain system identifier
}

export interface UserPlatformType {
    id: string
    name: string
    email: string
    roles: string[]
    businessUnits: string[]
    status: 'active' | 'inactive'
    hotelGroup: string
    modules: string[]
    department: string
    lastActive: string
    hotel: string
}

export interface ROLE_TYPE {
    id: string
    name: string
    scope: string
    permissions: string[]
    count_users: number
    last_active: string
}

export interface ModuleType {
    name: string;
    hotel_groups: string;
    users: number;
    usage: number;
    active_users: number;
    status: "active" | "Near Limit" | "Exceeded Limit";
    last_active: string;
};

export interface AccessControlType {
    total_users: number;
    active_modules: number;
    usage_warning: number;
    excess_limits: number;
    modules: ModuleType[];
};

export type Ticket = {
    ticket_id: string;
    subject: string;
    tenant: string;
    status: "open" | "closed" | "pending";
    priority: "low" | "medium" | "high";
    assigned: string;
    created_at: string;
    updated_at: string;
};

export type SupportType = {
    tickets: {
        total: number;
        new: number;
    };
    average_response_time: {
        time: number;
        response_time: number;
    };
    resolution_rate: {
        rate: number;
        resolution_rate: number;
    };
    critical_issues: {
        total: number;
        resolved: number;
    };
    support_results: Ticket[];
};