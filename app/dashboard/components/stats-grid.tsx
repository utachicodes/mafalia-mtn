"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingBag, CheckCircle, Activity, CreditCard, TrendingUp, Wallet, Coins } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

const stats = [
    {
        label: "Clients Enrôlés",
        value: "0",
        icon: Users,
        color: "text-red-500",
        bg: "bg-red-50",
        border: "border-red-100",
    },
    {
        label: "Commandes Générées",
        value: "12",
        icon: ShoppingBag,
        color: "text-orange-500",
        bg: "bg-orange-50",
        border: "border-orange-100",
    },
    {
        label: "Confirmées",
        value: "8",
        icon: CheckCircle,
        color: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber-100",
    },
    {
        label: "Actives",
        value: "4",
        icon: Activity,
        color: "text-blue-500",
        bg: "bg-blue-50",
        border: "border-blue-100",
    },
    {
        label: "Paiements Complétés",
        value: "5",
        icon: CreditCard,
        color: "text-green-500",
        bg: "bg-green-50",
        border: "border-green-100",
    },
    {
        label: "Revenu Généré",
        value: "1.250.000 FCFA",
        icon: TrendingUp,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
    },
    {
        label: "Commission Totale Gagnée",
        value: "125.000 FCFA",
        icon: Coins,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-100",
    },
    {
        label: "Commission",
        value: "77.500 FCFA",
        subValue: "+12,500 FCFA",
        icon: Wallet,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-100",
        isHighlight: true,
    },
]

export function StatsGrid() {
    const [clientCount, setClientCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "clients"), (snapshot) => {
            setClientCount(snapshot.size)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const dynamicStats = stats.map(stat => {
        if (stat.label === "Clients Enrôlés") {
            return { ...stat, value: loading ? "..." : clientCount.toString() }
        }
        // Simulate dynamic revenue based on clients (e.g. 50,000 FCFA per client)
        if (stat.label === "Revenu Généré") {
            const revenue = clientCount * 50000
            return { ...stat, value: loading ? "..." : `${revenue.toLocaleString()} FCFA` }
        }
        return stat
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dynamicStats.map((stat, index) => (
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
