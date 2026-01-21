"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { getClientsByPartnerId } from "@/lib/firestore-helpers"
import type { Client } from "@/lib/types"
import { Users, Search, Filter, Building2, User, Phone, Mail, MapPin, Calendar } from "lucide-react"

export default function ClientsRolesPage() {
    const { partner } = useAuth()
    const [clients, setClients] = useState<Client[]>([])
    const [filteredClients, setFilteredClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")

    useEffect(() => {
        if (!partner?.id) return

        const loadClients = async () => {
            try {
                const clientList = await getClientsByPartnerId(partner.id)
                setClients(clientList)
                setFilteredClients(clientList)
            } catch (error) {
                console.error("Error loading clients:", error)
            } finally {
                setLoading(false)
            }
        }

        loadClients()
    }, [partner?.id])

    useEffect(() => {
        let filtered = clients

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter((client) => {
                const name = client.type === "commercia"
                    ? client.businessName?.toLowerCase() || ""
                    : `${client.firstName} ${client.lastName}`.toLowerCase()
                const email = client.email?.toLowerCase() || ""
                const phone = client.phone?.toLowerCase() || ""
                return name.includes(query) || email.includes(query) || phone.includes(query)
            })
        }

        // Filter by type
        if (filterType !== "all") {
            filtered = filtered.filter((client) => client.type === filterType)
        }

        // Filter by status
        if (filterStatus !== "all") {
            filtered = filtered.filter((client) => client.status === filterStatus)
        }

        setFilteredClients(filtered)
    }, [searchQuery, filterType, filterStatus, clients])

    const formatDate = (timestamp: any) => {
        if (!timestamp?.seconds) return "N/A"
        return new Date(timestamp.seconds * 1000).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Actif</Badge>
            case "pending":
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">En attente</Badge>
            case "inactive":
                return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">Inactif</Badge>
            case "suspended":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Suspendu</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getTypeBadge = (type: string) => {
        return type === "commercia" ? (
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                Commercia
            </Badge>
        ) : (
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1">
                <User className="w-3 h-3" />
                Mafalia
            </Badge>
        )
    }

    const stats = {
        total: clients.length,
        active: clients.filter((c) => c.status === "active").length,
        mafalia: clients.filter((c) => c.type === "mafalia").length,
        commercia: clients.filter((c) => c.type === "commercia").length,
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                    Clients et Rôles
                </h2>
                <p className="text-gray-500">Gérez vos clients et consultez leurs rôles</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-full">
                                <Users className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total}</p>
                                <p className="text-xs text-muted-foreground">Total Clients</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.active}</p>
                                <p className="text-xs text-muted-foreground">Actifs</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.mafalia}</p>
                                <p className="text-xs text-muted-foreground">Mafalia</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Building2 className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.commercia}</p>
                                <p className="text-xs text-muted-foreground">Commercia</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher par nom, email ou téléphone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les types</SelectItem>
                                <SelectItem value="mafalia">Mafalia</SelectItem>
                                <SelectItem value="commercia">Commercia</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="active">Actif</SelectItem>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                                <SelectItem value="suspended">Suspendu</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Clients List */}
            <div className="space-y-4">
                {loading ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-muted-foreground">Chargement des clients...</p>
                        </CardContent>
                    </Card>
                ) : filteredClients.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">
                                {searchQuery || filterType !== "all" || filterStatus !== "all"
                                    ? "Aucun client ne correspond à vos critères"
                                    : "Aucun client enrôlé pour le moment"}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredClients.map((client) => (
                        <Card key={client.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-bold">
                                                {client.type === "commercia"
                                                    ? client.businessName
                                                    : `${client.firstName} ${client.lastName}`}
                                            </h3>
                                            {getTypeBadge(client.type)}
                                        </div>
                                        {client.type === "commercia" && client.businessType && (
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Type: {client.businessType}
                                            </p>
                                        )}
                                    </div>
                                    {getStatusBadge(client.status)}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span>{client.email}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span>{client.phone}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                        <span>
                                            {client.region && `${client.region}, `}
                                            {client.country}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <span>Inscrit le: {formatDate(client.createdAt)}</span>
                                    </div>
                                </div>

                                {client.address && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Adresse:</strong> {client.address}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
