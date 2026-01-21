"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { getTransactionsByPartnerId, getWithdrawalsByPartnerId, createWithdrawalRequest, calculatePartnerStats } from "@/lib/firestore-helpers"
import type { Transaction, Withdrawal } from "@/lib/types"
import { History, TrendingUp, TrendingDown, Wallet, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

const MINIMUM_WITHDRAWAL = 25000

export default function HistoriquePage() {
    const { partner } = useAuth()
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        if (!partner?.id) return

        const loadData = async () => {
            try {
                const [txns, wds] = await Promise.all([
                    getTransactionsByPartnerId(partner.id),
                    getWithdrawalsByPartnerId(partner.id),
                ])
                setTransactions(txns)
                setWithdrawals(wds)
            } catch (error) {
                console.error("Error loading history:", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [partner?.id])

    const formatCurrency = (amount: number) => `${amount.toLocaleString("fr-FR")} FCFA`
    const formatDate = (timestamp: any) => {
        if (!timestamp?.seconds) return "N/A"
        return new Date(timestamp.seconds * 1000).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case "commission": return TrendingUp
            case "withdrawal": return TrendingDown
            default: return Wallet
        }
    }

    const getTransactionColor = (type: string) => {
        switch (type) {
            case "commission": return { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" }
            case "withdrawal": return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" }
            default: return { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" }
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Complété</Badge>
            case "pending":
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">En attente</Badge>
            case "failed":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Échoué</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const filteredTransactions = transactions.filter((t) => {
        if (activeTab === "all") return true
        if (activeTab === "commissions") return t.type === "commission"
        if (activeTab === "withdrawals") return t.type === "withdrawal"
        return true
    })

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                    Historique des Transactions
                </h2>
                <p className="text-gray-500">Consultez l'historique complet de vos commissions et retraits</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="commissions">Commissions</TabsTrigger>
                    <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    {loading ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <p className="text-muted-foreground">Chargement...</p>
                            </CardContent>
                        </Card>
                    ) : filteredTransactions.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-muted-foreground">Aucune transaction pour le moment</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {filteredTransactions.map((transaction) => {
                                const Icon = getTransactionIcon(transaction.type)
                                const colors = getTransactionColor(transaction.type)

                                return (
                                    <Card key={transaction.id} className={`border ${colors.border}`}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-full ${colors.bg}`}>
                                                        <Icon className={`w-6 h-6 ${colors.text}`} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold capitalize">{transaction.type}</p>
                                                        <p className="text-sm text-muted-foreground">{formatDate(transaction.createdAt)}</p>
                                                        {transaction.description && (
                                                            <p className="text-xs text-muted-foreground mt-1">{transaction.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-xl font-bold ${colors.text}`}>
                                                        {transaction.type === "withdrawal" ? "-" : "+"}
                                                        {formatCurrency(transaction.amount)}
                                                    </p>
                                                    {getStatusBadge(transaction.status)}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
