"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, Award, Trophy, User, Settings, Shield, Bell, ChevronRight, LogOut } from "lucide-react";
import { getRankColor, getRankBgColor, getRankProgress, getNextRankInfo, formatScore } from "@/lib/scoring";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { partner } = useAuth();
    const router = useRouter();

    if (!partner) {
        return <div>Chargement...</div>;
    }

    const { currentRank, nextRank, pointsToNext } = getNextRankInfo(partner.score);
    const progress = getRankProgress(partner.score);
    const initials = `${partner.firstName[0]}${partner.lastName[0]}`.toUpperCase();

    return (
        <div className="space-y-6">
            {/* Header / Banner Section */}
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
                {/* Cover Background */}
                <div className="h-48 bg-gradient-to-r from-red-600 to-red-800 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    {/* Decorative patterns */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row items-end -mt-16 gap-6">
                        {/* Profile Picture */}
                        <div className="relative p-1.5 bg-white rounded-full shadow-lg">
                            <Avatar className="w-32 h-32 border-4 border-white">
                                <AvatarImage src={partner.avatar} className="object-cover" />
                                <AvatarFallback className="text-3xl font-bold bg-red-50 text-red-600">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                        </div>

                        {/* Name and Badges */}
                        <div className="flex-1 mb-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-gray-900">{partner.firstName} {partner.lastName}</h1>
                                {partner.isCertified && (
                                    <Badge className="w-fit bg-red-100 text-red-700 hover:bg-red-200 border-red-200 gap-1 px-3 py-1">
                                        <Award className="w-3.5 h-3.5" /> Partenaire Certifié
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {partner.city || 'Dakar'}, {partner.country}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Membre depuis {partner.joinedAt?.toDate().toLocaleDateString('fr-FR')}</span>
                            </div>
                        </div>

                        {/* Rank Badge */}
                        <div className="mb-4 flex flex-col items-center md:items-end">
                            <div className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider mb-1 flex items-center gap-2 ${getRankBgColor(partner.rank)} ${getRankColor(partner.rank)}`}>
                                <Trophy className="w-4 h-4" />
                                {partner.rank}
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{formatScore(partner.score)} Points</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Progress & Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Rank Progress */}
                    {nextRank && (
                        <Card className="border-none shadow-sm bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">Progression vers {nextRank}</h3>
                                        <p className="text-gray-400 text-sm">Plus que {formatScore(pointsToNext)} points pour atteindre le niveau supérieur</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-red-400" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-gray-300">
                                        <span>{partner.rank}</span>
                                        <span>{Math.round(progress)}%</span>
                                        <span>{nextRank}</span>
                                    </div>
                                    <Progress value={progress} className="h-3 bg-white/20" indicatorClassName="bg-gradient-to-r from-red-500 to-orange-500" />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Personal Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations Personnelles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nom Complet</label>
                                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                                        <User className="w-4 h-4 text-gray-400" />
                                        {partner.firstName} {partner.lastName}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        {partner.email}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Téléphone</label>
                                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        {partner.phone}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Adresse</label>
                                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {partner.address}, {partner.country}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Settings & Actions */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres du Compte</CardTitle>
                            <CardDescription>Gérez vos préférences et la sécurité</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-between h-auto py-3 px-4 hover:bg-gray-50 group" onClick={() => router.push("/dashboard/settings?tab=profile")}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-100 transition-colors">
                                        <User className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">Modifier le profil</div>
                                        <div className="text-xs text-gray-500">Mettre à jour vos infos</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                            </Button>

                            <Button variant="outline" className="w-full justify-between h-auto py-3 px-4 hover:bg-gray-50 group" onClick={() => router.push("/dashboard/settings?tab=security")}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <Shield className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">Sécurité & Mot de passe</div>
                                        <div className="text-xs text-gray-500">2FA et changement de mdp</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                            </Button>

                            <Button variant="outline" className="w-full justify-between h-auto py-3 px-4 hover:bg-gray-50 group" onClick={() => router.push("/dashboard/settings?tab=notifications")}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-50 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
                                        <Bell className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">Notifications</div>
                                        <div className="text-xs text-gray-500">Email et alertes</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-50 border-dashed">
                        <CardContent className="p-6">
                            <Button variant="destructive" className="w-full" onClick={() => { }}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Se déconnecter
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
import { TrendingUp } from "lucide-react";
