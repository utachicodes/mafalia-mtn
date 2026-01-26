"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Shield, Bell, Lock, Save, Smartphone, MapPin, Globe, Mail } from "lucide-react"

import { useSearchParams } from "next/navigation"

export default function SettingsPage() {
    const { partner } = useAuth()
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const defaultTab = searchParams.get("tab") || "profile"

    // Simplified state for demonstration
    const [formData, setFormData] = useState({
        firstName: partner?.firstName || "",
        lastName: partner?.lastName || "",
        email: partner?.email || "",
        phone: partner?.phone || "",
        address: partner?.address || "",
        city: partner?.city || "",
        country: partner?.country || ""
    })

    const handleSaveProfile = async () => {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLoading(false)
        // Add toast notification logic here later
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
                <p className="text-gray-500">Gérez vos préférences et informations personnelles</p>
            </div>

            <Tabs defaultValue={defaultTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 max-w-md bg-gray-100 p-1 rounded-xl">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Profil</TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Sécurité</TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Notifications</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations Personnelles</CardTitle>
                            <CardDescription>Mettez à jour vos informations de contact et d'identité</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="firstName" defaultValue={partner?.firstName} className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Nom</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="lastName" defaultValue={partner?.lastName} className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="email" defaultValue={partner?.email} className="pl-9 bg-gray-50" disabled />
                                    </div>
                                    <p className="text-xs text-muted-foreground">L'adresse email ne peut pas être modifiée.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="phone" defaultValue={partner?.phone} className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Adresse</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="address" defaultValue={partner?.address} className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">Ville</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="city" defaultValue={partner?.city} className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Pays</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="country" defaultValue={partner?.country} className="pl-9" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSaveProfile} disabled={loading}>
                                    {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mot de passe</CardTitle>
                            <CardDescription>Modifiez votre mot de passe pour sécuriser votre compte</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Mot de passe actuel</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input id="current-password" type="password" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input id="new-password" type="password" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input id="confirm-password" type="password" className="pl-9" />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                    Mettre à jour le mot de passe
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Authentification à deux facteurs (2FA)</CardTitle>
                            <CardDescription>Ajoutez une couche de sécurité supplémentaire à votre compte</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Activer l'authentification 2FA</Label>
                                <p className="text-sm text-muted-foreground">
                                    Nous vous enverrons un code par SMS pour chaque connexion.
                                </p>
                            </div>
                            <Switch />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Préférences de notifications</CardTitle>
                            <CardDescription>Choisissez comment vous souhaitez être informé</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-red-50 p-2 rounded-full">
                                        <Mail className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Notifications par Email</p>
                                        <p className="text-sm text-gray-500">Recevoir des mises à jour sur vos commissions et clients</p>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-50 p-2 rounded-full">
                                        <Smartphone className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Notifications SMS</p>
                                        <p className="text-sm text-gray-500">Alertes de sécurité et retraits urgents</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-50 p-2 rounded-full">
                                        <Bell className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Notifications Push</p>
                                        <p className="text-sm text-gray-500">Alertes en temps réel sur le navigateur</p>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                    Enregistrer les préférences
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
