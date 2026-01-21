"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { getTransactionsByPartnerId } from "@/lib/firestore-helpers"
import type { Transaction } from "@/lib/types"
import Link from "next/link"

export function Leaderboard() {
    const { partner } = useAuth()
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!partner?.id) {
            setLoading(false)
            return
        }

        const loadTransactions = async () => {
            try {
                const allTransactions = await getTransactionsByPartnerId(partner.id)
                // Get last 3 transactions
                setTransactions(allTransactions.slice(0, 3))
            } catch (error) {
                console.error("Error loading transactions:", error)
            } finally {
                setLoading(false)
            }
        }

        loadTransactions()
    }, [partner?.id])

    const formatCurrency = (amount: number) => {
        return `${amount.toLocaleString("fr-FR")} FCFA`
    }

    const formatDate = (timestamp: any) => {
        if (!timestamp?.seconds) return "N/A"
        return new Date(timestamp.seconds * 1000).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
        })
    }

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case "commission":
                return TrendingUp
            case "withdrawal":
                return TrendingDown
            default:
                return Wallet
        }
    }

    const getTransactionColor = (type: string) => {
        switch (type) {
            case "commission":
                return { bg: "bg-green-50", text: "text-green-600" }
            case "withdrawal":
                return { bg: "bg-red-50", text: "text-red-600" }
            default:
                return { bg: "bg-blue-50", text: "text-blue-600" }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <Card className="border-none shadow-sm h-full flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Historique</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                        {loading ? (
                            <div className="text-center py-4 text-muted-foreground">Chargement...</div>
                        ) : transactions.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p className="text-sm">Aucune transaction pour le moment</p>
                            </div>
                        ) : (
                            transactions.map((transaction, index) => {
                                const Icon = getTransactionIcon(transaction.type)
                                const colors = getTransactionColor(transaction.type)

                                return (
                                    <div key={transaction.id} className={`flex items-center justify-between p-3 rounded-xl ${colors.bg}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full bg-white`}>
                                                <Icon className={`w-5 h-5 ${colors.text}`} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm capitalize">{transaction.type}</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(transaction.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-sm font-bold block ${colors.text}`}>
                                                {transaction.type === "withdrawal" ? "-" : "+"}
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                            <span className="text-xs text-muted-foreground capitalize">{transaction.status}</span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <Link href="/dashboard/historique">
                        <Button variant="ghost" className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50 gap-1 font-medium group">
                            Voir tout l'historique
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
    )
}
