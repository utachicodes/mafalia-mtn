"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingBag, CheckCircle, Activity, CreditCard, TrendingUp, Wallet, Coins } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { calculatePartnerStats } from "@/lib/firestore-helpers"
import { useAuth } from "@/hooks/use-auth"
import type { PartnerStats } from "@/lib/types"

interface StatCard {
    label: string
    value: string
    icon: React.ElementType
    color: string
    bg: string
    border: string
    isHighlight?: boolean
    subValue?: string
}

export function StatsGrid() {
    const { partner } = useAuth()
    const [stats, setStats] = useState<PartnerStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!partner?.id) {
            setLoading(false)
            return
        }

        const loadStats = async () => {
            try {
                const partnerStats = await calculatePartnerStats(partner.id)
                setStats(partnerStats)
            } catch (error) {
                console.error("Error loading stats:", error)
            } finally {
                setLoading(false)
            }
        }

        loadStats()
        // Refresh stats every 30 seconds
        const interval = setInterval(loadStats, 30000)
        return () => clearInterval(interval)
    }, [partner?.id])

    const formatCurrency = (amount: number) => {
        return `${amount.toLocaleString("fr-FR")} FCFA`
    }

    const statsCards: StatCard[] = [
        {
            label: "Clients Enrôlés",
            value: loading ? "..." : stats?.totalClients.toString() || "0",
            icon: Users,
            color: "text-red-500",
            bg: "bg-red-50",
            border: "border-red-100",
        },
        {
            label: "Commandes Générées",
            value: loading ? "..." : stats?.totalOrders.toString() || "0",
            icon: ShoppingBag,
            color: "text-orange-500",
            bg: "bg-orange-50",
            border: "border-orange-100",
        },
        {
            label: "Confirmées",
            value: loading ? "..." : stats?.confirmedOrders.toString() || "0",
            icon: CheckCircle,
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-100",
        },
        {
            label: "Actives",
            value: loading ? "..." : stats?.activeOrders.toString() || "0",
            icon: Activity,
            color: "text-blue-500",
            bg: "bg-blue-50",
            border: "border-blue-100",
        },
        {
            label: "Paiements Complétés",
            value: loading ? "..." : stats?.completedPayments.toString() || "0",
            icon: CreditCard,
            color: "text-green-500",
            bg: "bg-green-50",
            border: "border-green-100",
        },
        {
            label: "Revenu Généré",
            value: loading ? "..." : formatCurrency(stats?.totalRevenue || 0),
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
        },
        {
            label: "Commission Totale Gagnée",
            value: loading ? "..." : formatCurrency(stats?.totalCommission || 0),
            icon: Coins,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            border: "border-yellow-100",
        },
        {
            label: "Commission Disponible",
            value: loading ? "..." : formatCurrency(stats?.availableCommission || 0),
            subValue: stats?.pendingCommission ? `+${formatCurrency(stats.pendingCommission)}` : undefined,
            icon: Wallet,
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-100",
            isHighlight: true,
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-4 flex flex-col justify-between h-full">
                            <div className="flex items-start justify-between mb-2">
                                <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className={`text-2xl font-bold ${stat.isHighlight ? "text-red-600" : "text-foreground"}`}>
                                        {stat.value}
                                    </h3>
                                    {stat.subValue && <span className="text-xs text-red-500 font-medium">{stat.subValue}</span>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
