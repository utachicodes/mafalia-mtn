import { Timestamp } from "firebase/firestore"

// User & Partner Types
export type PartnerRank = "Bronze" | "Silver" | "Gold" | "Platinum"

export interface Partner {
    id: string
    uid: string // Firebase Auth UID
    email: string
    firstName: string
    lastName: string
    phone: string
    country: string
    region: string
    address: string
    rank: PartnerRank
    score: number
    joinedAt: Timestamp
    avatar?: string
}

export interface PartnerStats {
    partnerId: string
    totalClients: number
    activeClients: number
    totalOrders: number
    confirmedOrders: number
    activeOrders: number
    completedPayments: number
    totalRevenue: number
    totalCommission: number
    availableCommission: number
    pendingCommission: number
}

// Client Types
export type ClientType = "mafalia" | "commercia"
export type ClientStatus = "pending" | "active" | "inactive" | "suspended"

export interface Client {
    id: string
    partnerId: string
    type: ClientType
    status: ClientStatus

    // Personal info (Mafalia)
    firstName?: string
    lastName?: string

    // Business info (Commercia)
    businessName?: string
    businessType?: string
    ninea?: string

    // Common fields
    email: string
    phone: string
    country: string
    region?: string
    address: string
    createdAt: Timestamp
    lastActive?: Timestamp
}

// Order Types
export type OrderStatus = "pending" | "confirmed" | "active" | "completed" | "cancelled"

export interface Order {
    id: string
    clientId: string
    partnerId: string
    amount: number
    status: OrderStatus
    items: OrderItem[]
    createdAt: Timestamp
    updatedAt: Timestamp
    confirmedAt?: Timestamp
    completedAt?: Timestamp
}

export interface OrderItem {
    productId: string
    productName: string
    quantity: number
    unitPrice: number
    totalPrice: number
}

// Transaction Types
export type TransactionType = "payment" | "commission" | "withdrawal"
export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled"

export interface Transaction {
    id: string
    partnerId: string
    clientId?: string
    orderId?: string
    type: TransactionType
    amount: number
    status: TransactionStatus
    createdAt: Timestamp
    completedAt?: Timestamp
    description?: string
}

// Commission Types
export interface Commission {
    id: string
    partnerId: string
    clientId: string
    orderId: string
    amount: number
    percentage: number
    status: "pending" | "available" | "withdrawn"
    createdAt: Timestamp
    availableAt?: Timestamp
    withdrawnAt?: Timestamp
}

// Withdrawal Types
export type WithdrawalStatus = "pending" | "approved" | "processing" | "completed" | "rejected"
export type WithdrawalMethod = "bank_transfer" | "mobile_money" | "cash"

export interface Withdrawal {
    id: string
    partnerId: string
    amount: number
    method: WithdrawalMethod
    status: WithdrawalStatus
    accountDetails: Record<string, string>
    requestedAt: Timestamp
    processedAt?: Timestamp
    completedAt?: Timestamp
    rejectedReason?: string
}

// Presentation Types
export interface Presentation {
    id: string
    title: string
    description: string
    videoUrl: string // YouTube URL or Firebase Storage URL
    thumbnailUrl?: string
    duration: string // e.g., "15:30"
    category: "introduction" | "training" | "demo" | "other"
    tags: string[]
    createdAt: Timestamp
    viewCount: number
}

export interface PresentationView {
    id: string
    presentationId: string
    partnerId: string
    viewedAt: Timestamp
    progress: number // 0-100
    completed: boolean
}

// Sales Tool Types
export interface SalesTool {
    id: string
    title: string
    description: string
    type: "pdf" | "docx" | "pptx" | "other"
    fileUrl: string // Firebase Storage URL
    fileSize: number // in bytes
    category: "script" | "brochure" | "template" | "catalog" | "other"
    thumbnailUrl?: string
    createdAt: Timestamp
    updatedAt: Timestamp
    downloadCount: number
}

export interface SalesToolDownload {
    id: string
    toolId: string
    partnerId: string
    downloadedAt: Timestamp
}

// Performance & Analytics Types
export interface PerformanceMetrics {
    partnerId: string
    period: "day" | "week" | "month" | "quarter" | "year"
    periodStart: Timestamp
    periodEnd: Timestamp

    // Funnel metrics
    prospects: number
    clients: number
    transactions: number
    completedPayments: number

    // Conversion rates
    prospectToClientRate: number
    clientToTransactionRate: number
    transactionToPaymentRate: number

    // Financial metrics
    revenue: number
    commission: number
    averageOrderValue: number

    createdAt: Timestamp
}

export interface LeaderboardEntry {
    partnerId: string
    partnerName: string
    rank: PartnerRank
    score: number
    totalRevenue: number
    totalClients: number
    position: number
}
