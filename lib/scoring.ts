import type { PartnerRank, PartnerStats, LeaderboardEntry, Partner } from "./types"

// Scoring weights
const SCORING_WEIGHTS = {
    CLIENT: 10000, // Points per client (value approx 10k FCFA)
    ACTIVE_CLIENT: 15000, // Extra points for active clients
    ORDER: 5000, // Points per order
    CONFIRMED_ORDER: 10000, // Extra points for confirmed orders
    COMPLETED_PAYMENT: 20000, // Points per completed payment
    REVENUE_MULTIPLIER: 1, // Points per FCFA of revenue (1 point per 1 FCFA)
    COMMISSION_MULTIPLIER: 0, // Commission included in revenue or treated separately
}

// Rank thresholds
const RANK_THRESHOLDS = {
    Bronze: 0,
    Silver: 1000000, // 1 Million
    Gold: 5000000, // 5 Million
    Platinum: 100000000, // 100 Million
}

/**
 * Calculate partner score based on their stats
 */
export function calculatePartnerScore(stats: PartnerStats): number {
    let score = 0

    // Client-based scoring
    score += stats.totalClients * SCORING_WEIGHTS.CLIENT
    score += stats.activeClients * SCORING_WEIGHTS.ACTIVE_CLIENT

    // Order-based scoring
    score += stats.totalOrders * SCORING_WEIGHTS.ORDER
    score += stats.confirmedOrders * SCORING_WEIGHTS.CONFIRMED_ORDER

    // Payment-based scoring
    score += stats.completedPayments * SCORING_WEIGHTS.COMPLETED_PAYMENT

    // Financial performance
    score += stats.totalRevenue * SCORING_WEIGHTS.REVENUE_MULTIPLIER
    score += stats.totalCommission * SCORING_WEIGHTS.COMMISSION_MULTIPLIER

    return Math.round(score)
}

/**
 * Determine partner rank based on score
 */
export function getPartnerRank(score: number): PartnerRank {
    if (score >= RANK_THRESHOLDS.Platinum) return "Platinum"
    if (score >= RANK_THRESHOLDS.Gold) return "Gold"
    if (score >= RANK_THRESHOLDS.Silver) return "Silver"
    return "Bronze"
}

/**
 * Get rank color for UI display
 */
export function getRankColor(rank: PartnerRank): string {
    switch (rank) {
        case "Platinum":
            return "text-cyan-600"
        case "Gold":
            return "text-yellow-600"
        case "Silver":
            return "text-gray-500"
        case "Bronze":
            return "text-red-600"
    }
}

/**
 * Get rank background color for UI display
 */
export function getRankBgColor(rank: PartnerRank): string {
    switch (rank) {
        case "Platinum":
            return "bg-cyan-100"
        case "Gold":
            return "bg-yellow-100"
        case "Silver":
            return "bg-gray-100"
        case "Bronze":
            return "bg-red-100"
    }
}

/**
 * Get next rank and points needed
 */
export function getNextRankInfo(currentScore: number): {
    currentRank: PartnerRank
    nextRank: PartnerRank | null
    pointsToNext: number
} {
    const currentRank = getPartnerRank(currentScore)

    let nextRank: PartnerRank | null = null
    let pointsToNext = 0

    switch (currentRank) {
        case "Bronze":
            nextRank = "Silver"
            pointsToNext = RANK_THRESHOLDS.Silver - currentScore
            break
        case "Silver":
            nextRank = "Gold"
            pointsToNext = RANK_THRESHOLDS.Gold - currentScore
            break
        case "Gold":
            nextRank = "Platinum"
            pointsToNext = RANK_THRESHOLDS.Platinum - currentScore
            break
        case "Platinum":
            nextRank = null
            pointsToNext = 0
            break
    }

    return { currentRank, nextRank, pointsToNext }
}

/**
 * Sort partners by score for leaderboard
 */
export function createLeaderboard(partners: Partner[], stats: Map<string, PartnerStats>): LeaderboardEntry[] {
    const entries: LeaderboardEntry[] = partners
        .map((partner) => {
            const partnerStats = stats.get(partner.id)
            if (!partnerStats) return null

            return {
                partnerId: partner.id,
                partnerName: `${partner.firstName} ${partner.lastName}`,
                rank: partner.rank,
                score: partner.score,
                totalRevenue: partnerStats.totalRevenue,
                totalClients: partnerStats.totalClients,
                position: 0, // Will be set after sorting
            }
        })
        .filter((entry): entry is LeaderboardEntry => entry !== null)

    // Sort by score descending
    entries.sort((a, b) => b.score - a.score)

    // Assign positions
    entries.forEach((entry, index) => {
        entry.position = index + 1
    })

    return entries
}

/**
 * Check if partner qualifies for rank upgrade
 */
export function shouldUpgradeRank(currentRank: PartnerRank, newScore: number): boolean {
    const newRank = getPartnerRank(newScore)
    const rankOrder: PartnerRank[] = ["Bronze", "Silver", "Gold", "Platinum"]
    return rankOrder.indexOf(newRank) > rankOrder.indexOf(currentRank)
}

/**
 * Format score for display
 */
export function formatScore(score: number): string {
    return score.toLocaleString("fr-FR")
}

/**
 * Get progress percentage to next rank
 */
export function getRankProgress(currentScore: number): number {
    const currentRank = getPartnerRank(currentScore)

    let currentThreshold = 0
    let nextThreshold = 0

    switch (currentRank) {
        case "Bronze":
            currentThreshold = RANK_THRESHOLDS.Bronze
            nextThreshold = RANK_THRESHOLDS.Silver
            break
        case "Silver":
            currentThreshold = RANK_THRESHOLDS.Silver
            nextThreshold = RANK_THRESHOLDS.Gold
            break
        case "Gold":
            currentThreshold = RANK_THRESHOLDS.Gold
            nextThreshold = RANK_THRESHOLDS.Platinum
            break
        case "Platinum":
            return 100 // Max rank
    }

    const progress = ((currentScore - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    return Math.min(Math.max(progress, 0), 100)
}
