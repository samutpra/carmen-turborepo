import { BusinessUnitCluster, BusinessUnitType } from "@/types/main";

export const statusAdminDashboard = [
    {
        title: "Total Reports",
        value: "2345",
        description: "Generated this month",
        icon: "FileText",
    },
    {
        title: "Business Units",
        value: "24",
        description: "Across all clusters",
        icon: "Building2",
    },
    {
        title: "Active Clusters",
        value: "3",
        description: "APAC, EMEA, Americas",
        icon: "FolderTree",
    },
    {
        title: "Total Users",
        value: "573",
        description: "Active this month",
        icon: "Users",
    },
];


export const reportOverview = {
    today: 5,
    thisWeek: 12,
    active: 3,
    uptime: 99.9,
}


export const clusterOverview = [
    { name: "APAC", businessUnits: 12, status: "Active" },
    { name: "أوروبا والشرق الأوسط وأفريقيا (EMEA)", businessUnits: 7, status: "Active" },
    { name: "Américas", businessUnits: 9, status: "Active" },
    { name: "DACH (Deutschland, Österreich, Schweiz)", businessUnits: 6, status: "Active" },
    { name: "Nordiska länderna", businessUnits: 4, status: "Active" },
    { name: "Benelux (België, Nederland, Luxembourg)", businessUnits: 5, status: "Active" },
    { name: "France", businessUnits: 8, status: "Active" },
    { name: "Iberia (España y Portugal)", businessUnits: 7, status: "Active" },
    { name: "Italia", businessUnits: 6, status: "Active" },
    { name: "Regno Unito e Irlanda", businessUnits: 9, status: "Active" },
    { name: "Europa de Est", businessUnits: 5, status: "Active" },
    { name: "الشرق الأوسط", businessUnits: 6, status: "Active" },
    { name: "दक्षिण एशिया", businessUnits: 10, status: "Active" },
    { name: "เอเชียตะวันออกเฉียงใต้", businessUnits: 11, status: "Active" },
    { name: "大中华区", businessUnits: 14, status: "Active" },
    { name: "日本", businessUnits: 5, status: "Active" },
    { name: "대한민국", businessUnits: 5, status: "Active" },
    { name: "Brasil", businessUnits: 6, status: "Active" },
    { name: "México y América Central", businessUnits: 7, status: "Active" },
    { name: "Canada (Canada)", businessUnits: 4, status: "Active" },
];

export const recentActivity = [
    {
        title: "New Report",
        description: "Generated this month",
        cluster: "APAC",
        create_at: "2025-03-04",
    },
    {
        title: "System Update",
        description: "Scheduled maintenance completed",
        cluster: "EMEA",
        create_at: "2025-03-03",
    },
    {
        title: "User Access Granted",
        description: "New user added to the system",
        cluster: "AMER",
        create_at: "2025-03-02",
    },
    {
        title: "Policy Change",
        description: "Updated security policies",
        cluster: "APAC",
        create_at: "2025-03-01",
    },
    {
        title: "Bug Fix",
        description: "Resolved login issue",
        cluster: "EMEA",
        create_at: "2025-02-28",
    },
    {
        title: "Data Backup",
        description: "Completed weekly data backup",
        cluster: "APAC",
        create_at: "2025-02-27",
    },
    {
        title: "Server Migration",
        description: "Transferred to a new data center",
        cluster: "AMER",
        create_at: "2025-02-26",
    },
    {
        title: "Incident Report",
        description: "Identified and mitigated network issue",
        cluster: "EMEA",
        create_at: "2025-02-25",
    },
];

export const mockClusters: BusinessUnitCluster[] = [
    {
        id: "C-1",
        name: "US-East Cluster",
        businessUnits: ["BU-1234"],
        region: "US-East",
        status: "active"
    },
    {
        id: "C-2",
        name: "US-Central Cluster",
        businessUnits: ["BU-1235"],
        region: "US-Central",
        status: "active"
    },
    {
        id: "C-3",
        name: "APAC Cluster",
        businessUnits: ["BU-1236"],
        region: "APAC",
        status: "active"
    }
]

export const mockBusinessUnits: BusinessUnitType[] = [
    {
        id: "BU-1234",
        name: "Grand Hotel Downtown",
        brand: "Luxury Collection",
        clusterId: "C-1",
        head: "Sarah Johnson",
        location: {
            city: "New York",
            country: "USA"
        },
        details: {
            rooms: 280,
            teams: 8,
            members: 350
        },
        configuration: {
            database: {
                host: "db-nyc-1.hotel.internal",
                name: "grand_hotel_db",
                type: "postgres"
            },
            cluster: {
                id: "C-1",
                name: "US-East Cluster"
            }
        },
        contact: {
            email: "operations.grand@luxurycollection.com",
            phone: "+1-212-555-0123",
            address: "123 Broadway, New York, NY 10013"
        },
        settings: {
            notifications: {
                email: true,
                slack: true,
                webhook: false
            },
            integrations: {
                enabled: ["supply-chain", "inventory", "procurement"],
                configurations: {}
            }
        },
        reports: [],
        status: "active",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-03-15T10:30:00Z"
    },
    {
        id: "BU-1235",
        name: "Business Tower Hotel",
        brand: "Business Hotels",
        clusterId: "C-2",
        head: "Michael Chen",
        location: {
            city: "Chicago",
            country: "USA"
        },
        details: {
            rooms: 180,
            teams: 6,
            members: 220
        },
        configuration: {
            database: {
                host: "db-chi-1.hotel.internal",
                name: "business_tower_db",
                type: "mysql"
            },
            cluster: {
                id: "C-2",
                name: "US-Central Cluster"
            }
        },
        contact: {
            email: "operations.tower@businesshotels.com",
            phone: "+1-312-555-0123",
            address: "456 Michigan Ave, Chicago, IL 60601"
        },
        settings: {
            notifications: {
                email: true,
                slack: false,
                webhook: true
            },
            integrations: {
                enabled: ["supply-chain", "maintenance"],
                configurations: {}
            }
        },
        reports: [],
        status: "active",
        createdAt: "2024-01-15T00:00:00Z",
        updatedAt: "2024-03-14T15:45:00Z"
    },
    {
        id: "BU-1236",
        name: "Beachfront Resort & Spa",
        brand: "Resort Collection",
        clusterId: "C-3",
        head: "Maria Garcia",
        location: {
            city: "Bali",
            country: "Indonesia"
        },
        details: {
            rooms: 320,
            teams: 10,
            members: 400
        },
        configuration: {
            database: {
                host: "db-bali-1.hotel.internal",
                name: "beachfront_resort_db",
                type: "postgres"
            },
            cluster: {
                id: "C-3",
                name: "APAC Cluster"
            }
        },
        contact: {
            email: "operations.beachfront@resortcollection.com",
            phone: "+62-361-555-0123",
            address: "789 Beach Road, Kuta, Bali 80361"
        },
        settings: {
            notifications: {
                email: true,
                slack: true,
                webhook: true
            },
            integrations: {
                enabled: ["supply-chain", "spa-booking", "restaurant"],
                configurations: {}
            }
        },
        reports: [],
        status: "active",
        createdAt: "2024-02-01T00:00:00Z",
        updatedAt: "2024-03-15T08:15:00Z"
    }
]

