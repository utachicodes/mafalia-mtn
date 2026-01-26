"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { queryDocuments, calculatePartnerStats, COLLECTIONS } from "@/lib/firestore-helpers"
import { createLeaderboard, getRankColor, getRankBgColor, formatScore } from "@/lib/scoring"
import type { Partner, PartnerStats, LeaderboardEntry } from "@/lib/types"
import { Trophy, TrendingUp, Target, Award, Users, DollarSign } from "lucide-react"

export default function PerformancePage() {
    const { partner } = useAuth()
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const [myStats, setMyStats] = useState<PartnerStats | null>(null)
    const [myPosition, setMyPosition] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPerformanceData = async () => {
            try {
                // Get all partners
                const partners = await queryDocuments<Partner>(COLLECTIONS.PARTNERS, [])

                // Calculate stats for each partner
                const statsMap = new Map<string, PartnerStats>()
                for (const p of partners) {
                    const stats = await calculatePartnerStats(p.id)
                    statsMap.set(p.id, stats)
                }

                // Create leaderboard
                const board = createLeaderboard(partners, statsMap)
                setLeaderboard(board)

                // Find current partner's position
                if (partner?.id) {
                    const myEntry = board.find((e) => e.partnerId === partner.id)
                    setMyPosition(myEntry?.position || null)
                    setMyStats(statsMap.get(partner.id) || null)
                }
            } catch (error) {
                console.error("Error loading performance data:", error)
            } finally {
                setLoading(false)
            }
        }

        loadPerformanceData()
    }, [partner?.id])

    const formatCurrency = (amount: number) => `${amount.toLocaleString("fr-FR")} FCFA`

    const getPositionBadge = (position: number) => {
        if (position === 1) return { icon: <Trophy className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-600 border border-yellow-200" }
        if (position === 2) return { icon: <Award className="w-6 h-6" />, color: "bg-gray-100 text-gray-600 border border-gray-200" }
        if (position === 3) return { icon: <Award className="w-6 h-6" />, color: "bg-orange-100 text-orange-700 border border-orange-200" }
        return { icon: <span className="text-lg font-bold">{position}</span>, color: "bg-gray-50 text-gray-600 border border-gray-200" }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                    Performance & Classement
                </h2>
                <p className="text-gray-500">Consultez votre performance et comparez-vous aux autres partenaires</p>
            </div>

            {/* Personal Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Ma Position
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-red-600">
                            {loading ? "..." : myPosition ? `#${myPosition}` : "N/A"}
                        </p>
                        {partner && (
                            <Badge className={`${getRankBgColor(partner.rank)} ${getRankColor(partner.rank)} mt-2`}>
                                {partner.rank}
                            </Badge>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Score Total
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {loading ? "..." : partner?.score ? formatScore(partner.score) : "0"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">points</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Clients Actifs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {loading ? "..." : myStats?.activeClients || 0}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            sur {myStats?.totalClients || 0} total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Revenu Total
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {loading ? "..." : myStats ? formatCurrency(myStats.totalRevenue) : "0 FCFA"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Leaderboard */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        Classement des Partenaires
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-center py-8 text-muted-foreground">Chargement...</p>
                    ) : leaderboard.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">Aucun partenaire inscrit</p>
                    ) : (
                        <div className="space-y-3">
                            {leaderboard.map((entry) => {
                                const badge = getPositionBadge(entry.position)
                                const isCurrentUser = entry.partnerId === partner?.id

                                return (
                                    <div
                                        key={entry.partnerId}
                                        className={`p-4 rounded-lg border-2 transition-all ${isCurrentUser
                                            ? "border-red-500 bg-red-50"
                                            : entry.position <= 3
                                                ? "border-yellow-200 bg-yellow-50/50"
                                                : "border-gray-200 bg-white"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl ${badge.color} flex items-center justify-center shadow-sm`}>
                                                    {badge.icon}
                                                </div>
                                                <div>
                                                    <p className="font-bold">
                                                        {entry.partnerName}
                                                        {isCurrentUser && (
                                                            <Badge variant="secondary" className="ml-2 text-xs">Vous</Badge>
                                                        )}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className={`${getRankBgColor(entry.rank)} ${getRankColor(entry.rank)} text-xs`}>
                                                            {entry.rank}
                                                        </Badge>
                                                        <p className="text-xs text-muted-foreground">
                                                            {entry.totalClients} client{entry.totalClients !== 1 ? "s" : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xl font-bold">{formatScore(entry.score)}</p>
                                                <p className="text-xs text-muted-foreground">points</p>
                                                <p className="text-xs font-medium text-green-600 mt-1">
                                                    {formatCurrency(entry.totalRevenue)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
