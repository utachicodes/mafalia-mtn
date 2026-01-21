"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

const clients = [
    {
        name: "Exemple Company",
        status: "Actif",
        ventes: "40.000",
        inscription: "25/03/2024",
        commission: "0.550",
        statusColor: "bg-green-100 text-green-700 hover:bg-green-200",
    },
    {
        name: "Restaurant Delizioso",
        status: "En Cours",
        ventes: "25.000",
        inscription: "24/05/2024",
        commission: "20,000",
        statusColor: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    },
    {
        name: "Boutique Bella",
        status: "En Test",
        ventes: "91.000",
        inscription: "25/05/2024",
        commission: "19,000",
        statusColor: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    },
    {
        name: "Supermarché Wak",
        status: "Résilié",
        ventes: "31.500",
        inscription: "02/17/2024",
        commission: "5,500",
        statusColor: "bg-red-100 text-red-700 hover:bg-red-200",
    },
]

export function ClientsTable() {
    const [clients, setClients] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const q = query(collection(db, "clients"), orderBy("createdAt", "desc"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const clientList: any[] = []
            querySnapshot.forEach((doc) => {
                clientList.push({ id: doc.id, ...doc.data() })
            })
            setClients(clientList)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Clients Enrôlés</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-4">Chargement...</div>
                    ) : clients.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">Aucun client enrôlé pour le moment.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border/50 text-xs text-muted-foreground">
                                        <th className="text-left font-medium py-3 px-2">Nom / Entreprise</th>
                                        <th className="text-left font-medium py-3 px-2">Type</th>
                                        <th className="text-left font-medium py-3 px-2">Téléphone</th>
                                        <th className="text-right font-medium py-3 px-2">Inscription</th>
                                        <th className="text-right font-medium py-3 px-2">Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client, index) => (
                                        <tr key={index} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                                            <td className="py-4 px-2 font-medium text-sm">
                                                {client.type === 'commercia' ? client.businessName : `${client.firstName} ${client.lastName}`}
                                            </td>
                                            <td className="py-4 px-2 text-sm capitalize">{client.type}</td>
                                            <td className="py-4 px-2 text-sm">{client.phone}</td>
                                            <td className="py-4 px-2 text-right text-sm text-muted-foreground">
                                                {client.createdAt?.seconds ? new Date(client.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="py-4 px-2 text-right text-sm font-medium">
                                                <Badge variant="secondary" className="font-normal bg-orange-100 text-orange-700 hover:bg-orange-200 border-none capitalize">
                                                    {client.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
