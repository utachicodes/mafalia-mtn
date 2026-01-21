import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    WhereFilterOp,
    DocumentData,
    QueryConstraint,
} from "firebase/firestore"
import { db } from "./firebase"
import type {
    Partner,
    Client,
    Order,
    Transaction,
    Commission,
    Withdrawal,
    PartnerStats,
} from "./types"

// Collection names
export const COLLECTIONS = {
    PARTNERS: "partners",
    CLIENTS: "clients",
    ORDERS: "orders",
    TRANSACTIONS: "transactions",
    COMMISSIONS: "commissions",
    WITHDRAWALS: "withdrawals",
    PRESENTATIONS: "presentations",
    SALES_TOOLS: "sales_tools",
    PERFORMANCE_METRICS: "performance_metrics",
} as const

// Generic Firestore helpers
export async function getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
    try {
        const docRef = doc(db, collectionName, docId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as T
        }
        return null
    } catch (error) {
        console.error(`Error getting document from ${collectionName}:`, error)
        return null
    }
}

export async function setDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: T
): Promise<void> {
    try {
        const docRef = doc(db, collectionName, docId)
        await setDoc(docRef, data)
    } catch (error) {
        console.error(`Error setting document in ${collectionName}:`, error)
        throw error
    }
}

export async function updateDocument(
    collectionName: string,
    docId: string,
    data: Partial<DocumentData>
): Promise<void> {
    try {
        const docRef = doc(db, collectionName, docId)
        await updateDoc(docRef, data)
    } catch (error) {
        console.error(`Error updating document in ${collectionName}:`, error)
        throw error
    }
}

export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
        const docRef = doc(db, collectionName, docId)
        await deleteDoc(docRef)
    } catch (error) {
        console.error(`Error deleting document from ${collectionName}:`, error)
        throw error
    }
}

export async function queryDocuments<T>(
    collectionName: string,
    constraints: QueryConstraint[]
): Promise<T[]> {
    try {
        const q = query(collection(db, collectionName), ...constraints)
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T))
    } catch (error) {
        console.error(`Error querying ${collectionName}:`, error)
        return []
    }
}

// Partner-specific helpers
export async function getPartnerByUid(uid: string): Promise<Partner | null> {
    const partners = await queryDocuments<Partner>(COLLECTIONS.PARTNERS, [where("uid", "==", uid), limit(1)])
    return partners.length > 0 ? partners[0] : null
}

export async function createPartner(uid: string, data: Omit<Partner, "id" | "uid">): Promise<string> {
    const partnerId = doc(collection(db, COLLECTIONS.PARTNERS)).id
    await setDocument(COLLECTIONS.PARTNERS, partnerId, {
        ...data,
        uid,
        joinedAt: Timestamp.now(),
    })
    return partnerId
}

// Client-specific helpers
export async function getClientsByPartnerId(partnerId: string): Promise<Client[]> {
    return queryDocuments<Client>(COLLECTIONS.CLIENTS, [
        where("partnerId", "==", partnerId),
        orderBy("createdAt", "desc"),
    ])
}

export async function getActiveClientCount(partnerId: string): Promise<number> {
    const clients = await queryDocuments<Client>(COLLECTIONS.CLIENTS, [
        where("partnerId", "==", partnerId),
        where("status", "==", "active"),
    ])
    return clients.length
}

// Order-specific helpers
export async function getOrdersByPartnerId(partnerId: string): Promise<Order[]> {
    return queryDocuments<Order>(COLLECTIONS.ORDERS, [
        where("partnerId", "==", partnerId),
        orderBy("createdAt", "desc"),
    ])
}

export async function getOrdersByStatus(partnerId: string, status: string): Promise<Order[]> {
    return queryDocuments<Order>(COLLECTIONS.ORDERS, [
        where("partnerId", "==", partnerId),
        where("status", "==", status),
    ])
}

// Transaction-specific helpers
export async function getTransactionsByPartnerId(partnerId: string): Promise<Transaction[]> {
    return queryDocuments<Transaction>(COLLECTIONS.TRANSACTIONS, [
        where("partnerId", "==", partnerId),
        orderBy("createdAt", "desc"),
    ])
}

export async function getCompletedPayments(partnerId: string): Promise<Transaction[]> {
    return queryDocuments<Transaction>(COLLECTIONS.TRANSACTIONS, [
        where("partnerId", "==", partnerId),
        where("type", "==", "payment"),
        where("status", "==", "completed"),
    ])
}

// Commission-specific helpers
export async function getCommissionsByPartnerId(partnerId: string): Promise<Commission[]> {
    return queryDocuments<Commission>(COLLECTIONS.COMMISSIONS, [
        where("partnerId", "==", partnerId),
        orderBy("createdAt", "desc"),
    ])
}

export async function getAvailableCommissions(partnerId: string): Promise<Commission[]> {
    return queryDocuments<Commission>(COLLECTIONS.COMMISSIONS, [
        where("partnerId", "==", partnerId),
        where("status", "==", "available"),
    ])
}

export async function getPendingCommissions(partnerId: string): Promise<Commission[]> {
    return queryDocuments<Commission>(COLLECTIONS.COMMISSIONS, [
        where("partnerId", "==", partnerId),
        where("status", "==", "pending"),
    ])
}

// Withdrawal-specific helpers
export async function getWithdrawalsByPartnerId(partnerId: string): Promise<Withdrawal[]> {
    return queryDocuments<Withdrawal>(COLLECTIONS.WITHDRAWALS, [
        where("partnerId", "==", partnerId),
        orderBy("requestedAt", "desc"),
    ])
}

export async function createWithdrawalRequest(
    partnerId: string,
    amount: number,
    method: Withdrawal["method"],
    accountDetails: Record<string, string>
): Promise<string> {
    const withdrawalId = doc(collection(db, COLLECTIONS.WITHDRAWALS)).id
    await setDocument(COLLECTIONS.WITHDRAWALS, withdrawalId, {
        partnerId,
        amount,
        method,
        accountDetails,
        status: "pending",
        requestedAt: Timestamp.now(),
    })
    return withdrawalId
}

// Partner Stats calculation
export async function calculatePartnerStats(partnerId: string): Promise<PartnerStats> {
    const [clients, orders, transactions, commissions] = await Promise.all([
        getClientsByPartnerId(partnerId),
        getOrdersByPartnerId(partnerId),
        getTransactionsByPartnerId(partnerId),
        getCommissionsByPartnerId(partnerId),
    ])

    const activeClients = clients.filter((c) => c.status === "active").length
    const confirmedOrders = orders.filter((o) => o.status === "confirmed" || o.status === "completed").length
    const activeOrders = orders.filter((o) => o.status === "active").length
    const completedPayments = transactions.filter((t) => t.type === "payment" && t.status === "completed").length

    const totalRevenue = transactions
        .filter((t) => t.type === "payment" && t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0)

    const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0)
    const availableCommission = commissions
        .filter((c) => c.status === "available")
        .reduce((sum, c) => sum + c.amount, 0)
    const pendingCommission = commissions
        .filter((c) => c.status === "pending")
        .reduce((sum, c) => sum + c.amount, 0)

    return {
        partnerId,
        totalClients: clients.length,
        activeClients,
        totalOrders: orders.length,
        confirmedOrders,
        activeOrders,
        completedPayments,
        totalRevenue,
        totalCommission,
        availableCommission,
        pendingCommission,
    }
}
