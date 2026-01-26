"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getDocument, COLLECTIONS } from "@/lib/firestore-helpers"
import type { Partner } from "@/lib/types"
import { MafaliaLogo } from "@/components/mafalia-logo"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle, XCircle, ShieldCheck, Calendar, User, Loader2 } from "lucide-react"

export default function VerifyPartnerPage() {
    const params = useParams()
    const id = params.id as string

    const [partner, setPartner] = useState<Partner | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!id) return

        const verifyPartner = async () => {
            try {
                const data = await getDocument<Partner>(COLLECTIONS.PARTNERS, id)
                // Partner is valid if certified OR expert (expert implies certified usually, but check just in case)
                if (data && (data.isCertified || data.isExpert)) {
                    setPartner(data)
                } else {
                    // Partner exists but not certified, or doesn't exist
                    setError(true)
                }
            } catch (err) {
                console.error("Verification error:", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        verifyPartner()
    }, [id])

    const formatDate = (timestamp: any) => {
        if (!timestamp?.seconds) return "Date inconnue"
        return new Date(timestamp.seconds * 1000).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <Loader2 className="w-10 h-10 text-red-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Vérification du certificat...</p>
            </div>
        )
    }

    if (error || !partner) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <Card className="max-w-md w-full border-red-100 shadow-lg">
                    <CardHeader className="flex flex-col items-center pb-2">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 text-center">Certification Non Valide</h1>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-gray-600">
                            Le lien que vous avez scanné ne correspond à aucun partenaire certifié actif dans notre base de données.
                        </p>
                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-xs text-gray-400 uppercase tracking-wider">ID: {id}</p>
                        </div>
                        <div className="pt-6">
                            <MafaliaLogo className="h-6 mx-auto opacity-50 grayscale" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const isExpert = partner.isExpert;
    // Theme colors based on status
    const themeColor = isExpert ? "yellow" : "green";
    const bgGradient = isExpert ? "from-yellow-400 to-yellow-600" : "from-green-500 to-emerald-600";
    const iconBg = isExpert ? "bg-yellow-100" : "bg-green-100";
    const iconColor = isExpert ? "text-yellow-600" : "text-green-600";
    const pingColor = isExpert ? "bg-yellow-400" : "bg-green-400";
    const badgeBg = isExpert ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-green-100 text-green-700 border-green-200";

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
                backgroundImage: "radial-gradient(#dc2626 1px, transparent 1px)",
                backgroundSize: "24px 24px"
            }}></div>

            <Card className={`max-w-md w-full border-${themeColor}-100 shadow-xl z-10 overflow-hidden relative`}>
                {/* Top colored bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${bgGradient}`}></div>

                <CardHeader className="flex flex-col items-center pb-2 pt-8">
                    <div className="relative mb-6">
                        <div className={`w-20 h-20 ${iconBg} rounded-full flex items-center justify-center relative z-10`}>
                            {isExpert ? (
                                <Award className={`w-10 h-10 ${iconColor}`} />
                            ) : (
                                <ShieldCheck className={`w-10 h-10 ${iconColor}`} />
                            )}
                        </div>
                        {/* Ping animation behind the icon */}
                        <div className={`absolute top-0 left-0 w-20 h-20 ${pingColor} rounded-full animate-ping opacity-20`}></div>
                    </div>

                    <Badge className={`${badgeBg} hover:${badgeBg} mb-2 px-3 py-1 font-bold tracking-wider`}>
                        {isExpert ? "MAFALIA EXPERT" : "CERTIFICAT VALIDE"}
                    </Badge>

                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                        {isExpert ? "Partenaire Expert" : "Partenaire Certifié"}
                    </h1>
                </CardHeader>

                <CardContent className="space-y-6 pt-2">
                    <div className="text-center space-y-1">
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Partenaire</p>
                        <h2 className="text-xl font-bold text-gray-900">
                            {partner.firstName} {partner.lastName}
                        </h2>
                        {partner.businessName && (
                            <p className="text-sm text-gray-600">{partner.businessName}</p>
                        )}
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div className="text-sm">
                                <p className="text-gray-500 text-xs">Certifié le</p>
                                <p className="font-medium text-gray-900">
                                    {formatDate(partner.certificationDate || partner.joinedAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-gray-400" />
                            <div className="text-sm">
                                <p className="text-gray-500 text-xs">Identifiant Partenaire</p>
                                <p className="font-mono font-medium text-gray-900 text-xs">{id}</p>
                            </div>
                        </div>

                        {isExpert && (
                            <div className="flex items-center gap-3 pt-2 border-t border-slate-200 mt-2">
                                <Award className="w-4 h-4 text-yellow-500" />
                                <div className="text-sm">
                                    <p className="text-gray-500 text-xs">Badge Expert</p>
                                    <p className="font-medium text-gray-900">
                                        Validé le {formatDate(partner.expertCertificationDate || partner.certificationDate)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-center text-sm text-gray-600 leading-relaxed px-2">
                        {isExpert
                            ? "Ce partenaire a atteint le niveau d'Expert Mafalia, démontrant une maîtrise avancée de l'écosystème et des solutions."
                            : "Ce partenaire a validé avec succès le parcours de certification officiel Mafalia et est habilité à exercer."
                        }
                    </div>

                    <div className="pt-6 mt-2 border-t border-slate-100 flex justify-center">
                        <MafaliaLogo className="h-8" />
                    </div>
                </CardContent>
            </Card>

            <p className="text-xs text-gray-400 mt-8 text-center bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                Authentification sécurisée par Mafalia Partner Network
            </p>
        </div>
    )
}

// Add missing icon import
import { Award } from "lucide-react";
