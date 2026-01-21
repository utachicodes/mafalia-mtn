"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, PlayCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { calculatePartnerStats } from "@/lib/firestore-helpers"
import Link from "next/link"

const MINIMUM_WITHDRAWAL = 25000 // 25,000 FCFA

export function CommissionWidget() {
    const { partner } = useAuth()
    const [availableCommission, setAvailableCommission] = useState(0)
    const [pendingCommission, setPendingCommission] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!partner?.id) {
            setLoading(false)
            return
        }

        const loadCommissions = async () => {
            try {
                const stats = await calculatePartnerStats(partner.id)
                setAvailableCommission(stats.availableCommission)
                setPendingCommission(stats.pendingCommission)
            } catch (error) {
                console.error("Error loading commissions:", error)
            } finally {
                setLoading(false)
            }
        }

        loadCommissions()
        // Refresh every 30 seconds
        const interval = setInterval(loadCommissions, 30000)
        return () => clearInterval(interval)
    }, [partner?.id])

    const formatCurrency = (amount: number) => {
        return `${amount.toLocaleString("fr-FR")} FCFA`
    }

    const withdrawalProgress = Math.min((availableCommission / MINIMUM_WITHDRAWAL) * 100, 100)
    const canWithdraw = availableCommission >= MINIMUM_WITHDRAWAL

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Commission & Retrait</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Available Balance */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-muted-foreground font-medium">Disponible</span>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-bold block">
                                {loading ? "..." : formatCurrency(availableCommission)}
                            </span>
                            {canWithdraw && (
                                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Actif</span>
                            )}
                        </div>
                    </div>

                    {/* Pending Balance */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-amber-600" />
                            <span className="text-muted-foreground font-medium">Solde en attente</span>
                        </div>
                        <span className="font-bold">
                            {loading ? "..." : formatCurrency(pendingCommission)}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progression vers le minimum</span>
                            <span className="font-bold">{Math.round(withdrawalProgress)}%</span>
                        </div>
                        <div className="relative">
                            <Progress value={withdrawalProgress} className="h-3" />
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                            Minimum requis: {formatCurrency(MINIMUM_WITHDRAWAL)}
                        </p>
                    </div>

                    {/* Withdraw Button */}
                    <Link href="/dashboard/commission-retrait">
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-base shadow-lg hover:shadow-xl transition-all"
                            disabled={!canWithdraw || loading}
                        >
                            {canWithdraw ? "Demander un Retrait" : "Solde Insuffisant"}
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    )
}
