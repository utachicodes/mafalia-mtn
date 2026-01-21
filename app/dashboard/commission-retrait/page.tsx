"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { calculatePartnerStats, createWithdrawalRequest, getWithdrawalsByPartnerId } from "@/lib/firestore-helpers"
import type { Withdrawal } from "@/lib/types"
import { Wallet, TrendingDown, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

const MINIMUM_WITHDRAWAL = 25000

export default function CommissionRetraitPage() {
    const { partner } = useAuth()
    const [availableCommission, setAvailableCommission] = useState(0)
    const [pendingCommission, setPendingCommission] = useState(0)
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    // Form state
    const [amount, setAmount] = useState("")
    const [method, setMethod] = useState<Withdrawal["method"]>("mobile_money")
    const [accountDetails, setAccountDetails] = useState<Record<string, string>>({})

    useEffect(() => {
        if (!partner?.id) return

        const loadData = async () => {
            try {
                const [stats, wds] = await Promise.all([
                    calculatePartnerStats(partner.id),
                    getWithdrawalsByPartnerId(partner.id),
                ])
                setAvailableCommission(stats.availableCommission)
                setPendingCommission(stats.pendingCommission)
                setWithdrawals(wds)
            } catch (error) {
                console.error("Error loading commission data:", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [partner?.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!partner?.id) return

        const withdrawalAmount = parseFloat(amount)
        if (withdrawalAmount < MINIMUM_WITHDRAWAL) {
            toast.error(`Le montant minimum de retrait est ${formatCurrency(MINIMUM_WITHDRAWAL)}`)
            return
        }

        if (withdrawalAmount > availableCommission) {
            toast.error("Solde insuffisant")
            return
        }

        setSubmitting(true)
        try {
            await createWithdrawalRequest(partner.id, withdrawalAmount, method, accountDetails)
            toast.success("Demande de retrait soumise avec succès")
            setAmount("")
            setAccountDetails({})
            // Refresh data
            const stats = await calculatePartnerStats(partner.id)
            setAvailableCommission(stats.availableCommission)
            const wds = await getWithdrawalsByPartnerId(partner.id)
            setWithdrawals(wds)
        } catch (error) {
            console.error("Error creating withdrawal:", error)
            toast.error("Erreur lors de la soumission de la demande")
        } finally {
            setSubmitting(false)
        }
    }

    const formatCurrency = (amount: number) => `${amount.toLocaleString("fr-FR")} FCFA`
    const formatDate = (timestamp: any) => {
        if (!timestamp?.seconds) return "N/A"
        return new Date(timestamp.seconds * 1000).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return CheckCircle
            case "approved": case "processing": return Clock
            case "rejected": return XCircle
            default: return AlertTriangle
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "text-green-600 bg-green-100"
            case "approved": case "processing": return "text-blue-600 bg-blue-100"
            case "rejected": return "text-red-600 bg-red-100"
            default: return "text-amber-600 bg-amber-100"
        }
    }

    const canWithdraw = availableCommission >= MINIMUM_WITHDRAWAL

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                    Commission & Retrait
                </h2>
                <p className="text-gray-500">Gérez vos commissions et effectuez des retraits</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Commission Summary Cards */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Commission Disponible</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-full">
                                <Wallet className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{loading ? "..." : formatCurrency(availableCommission)}</p>
                                {canWithdraw && (
                                    <Badge className="bg-green-100 text-green-700 text-xs mt-1">Retrait disponible</Badge>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Commission en Attente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-amber-100 rounded-full">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                            <p className="text-2xl font-bold">{loading ? "..." : formatCurrency(pendingCommission)}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Minimum Requis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <TrendingDown className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-2xl font-bold">{formatCurrency(MINIMUM_WITHDRAWAL)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Withdrawal Request Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Demander un Retrait</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Montant (FCFA)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Montant à retirer"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min={MINIMUM_WITHDRAWAL}
                                    max={availableCommission}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="method">Méthode de Retrait</Label>
                                <Select value={method} onValueChange={(v) => setMethod(v as Withdrawal["method"])}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mobile_money">Mobile Money</SelectItem>
                                        <SelectItem value="bank_transfer">Virement Bancaire</SelectItem>
                                        <SelectItem value="cash">Espèces</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {method === "mobile_money" && (
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Numéro de Téléphone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+221 77 XXX XX XX"
                                        value={accountDetails.phone || ""}
                                        onChange={(e) => setAccountDetails({ ...accountDetails, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            )}

                            {method === "bank_transfer" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="iban">IBAN / RIB</Label>
                                        <Input
                                            id="iban"
                                            placeholder="SN XX XXXX XXXX XXXX XXXX XXXX"
                                            value={accountDetails.iban || ""}
                                            onChange={(e) => setAccountDetails({ ...accountDetails, iban: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bank">Nom de la Banque</Label>
                                        <Input
                                            id="bank"
                                            placeholder="Nom de votre banque"
                                            value={accountDetails.bank || ""}
                                            onChange={(e) => setAccountDetails({ ...accountDetails, bank: e.target.value })}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700"
                                disabled={!canWithdraw || submitting || loading}
                            >
                                {submitting ? "Soumission..." : canWithdraw ? "Soumettre la Demande" : "Solde Insuffisant"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Withdrawal History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Historique des Retraits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p className="text-center py-8 text-muted-foreground">Chargement...</p>
                        ) : withdrawals.length === 0 ? (
                            <p className="text-center py-8 text-muted-foreground">Aucun retrait pour le moment</p>
                        ) : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {withdrawals.map((withdrawal) => {
                                    const StatusIcon = getStatusIcon(withdrawal.status)
                                    return (
                                        <div key={withdrawal.id} className="p-3 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-bold">{formatCurrency(withdrawal.amount)}</p>
                                                <Badge className={getStatusColor(withdrawal.status)}>
                                                    <StatusIcon className="w-3 h-3 mr-1" />
                                                    {withdrawal.status}
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-muted-foreground space-y-1">
                                                <p>Méthode: {withdrawal.method.replace("_", " ")}</p>
                                                <p>Demandé le: {formatDate(withdrawal.requestedAt)}</p>
                                                {withdrawal.completedAt && (
                                                    <p>Complété le: {formatDate(withdrawal.completedAt)}</p>
                                                )}
                                                {withdrawal.rejectedReason && (
                                                    <p className="text-red-600">Raison: {withdrawal.rejectedReason}</p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
