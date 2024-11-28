export interface PendingRequest {
    id: number
    item: string
    quantity: number
    urgency: 'Low' | 'Medium' | 'High'
    total: number
    requester: string
    department: string
}

export interface FlaggedRequest extends PendingRequest {
    flag: string
}

// Data Separation: Request Arrays
export const PENDING_REQUESTS: PendingRequest[] = [
    { id: 1, item: "Bed Linens", quantity: 200, urgency: "Medium", total: 5000, requester: "Alice Johnson", department: "Housekeeping" },
    { id: 2, item: "Coffee Makers", quantity: 50, urgency: "Low", total: 2500, requester: "Bob Smith", department: "F&B" },
    { id: 3, item: "Desk Chairs", quantity: 30, urgency: "Medium", total: 4500, requester: "Carol Davis", department: "Admin" },
]

export const FLAGGED_REQUESTS: FlaggedRequest[] = [
    { id: 4, item: "Smart TVs", quantity: 100, urgency: "High", total: 50000, requester: "David Brown", department: "IT", flag: "High value request" },
    { id: 5, item: "Luxury Toiletries", quantity: 1000, urgency: "Medium", total: 15000, requester: "Eva Prince", department: "Housekeeping", flag: "Exceeds usual quantity" },
]

export const getUrgencyBadgeClasses = (urgency: string) => {
    switch (urgency) {
        case 'High': return 'border-red-500 text-red-700'
        case 'Medium': return 'border-yellow-500 text-yellow-700'
        default: return 'border-green-500 text-green-700'
    }
}