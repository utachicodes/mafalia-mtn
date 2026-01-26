"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import {
    LayoutDashboard,
    UserPlus,
    LogOut,
    Menu,
    X,
    Mail,
    ChevronDown,
    Video,
    Briefcase,
    BookOpen,
    History,
    Users,
    TrendingUp,
    Wallet,
    Award,
    User,
    Settings,
    Building2,
    Check,
    PlusCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { getRankColor, getRankBgColor } from "@/lib/scoring"
import Image from "next/image"

function NavItem({
    icon: Icon,
    label,
    active = false,
    className = "",
}: {
    icon: React.ElementType
    label: string
    active?: boolean
    className?: string
}) {
    return (
        <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${active
                ? "bg-white/20 text-white font-medium shadow-sm backdrop-blur-sm"
                : "text-white/80 hover:bg-white/10 hover:text-white"
                } ${className}`}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium text-sm">{label}</span>
        </div>
    )
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{label}</p>
            <div className="space-y-1">
                {children}
            </div>
        </div>
    )
}


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const { partner, logout, loading, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/connexion")
        }
    }, [loading, isAuthenticated, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) return null

    // Helper to check if a route is active
    const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/")

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName || !lastName) return "PA"
        return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/50 flex font-dm-sans">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-red-600 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full bg-gradient-to-b from-red-600 to-red-700">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/mafalia-logo-white.svg"
                                alt="Mafalia"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="text-white/60 text-xs font-semibold tracking-widest mt-2">PARTENAIRE</p>
                    </div>

                    <nav className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-1 mb-6">
                            <Link href="/dashboard">
                                <NavItem icon={LayoutDashboard} label="Tableau de bord" active={pathname === "/dashboard"} />
                            </Link>
                            <Link href="/dashboard/enrolement">
                                <NavItem icon={UserPlus} label="Enrôlement" active={isActive("/dashboard/enrolement")} />
                            </Link>
                        </div>

                        <NavGroup label="Gestion">
                            <Link href="/dashboard/historique">
                                <NavItem icon={History} label="Historique" active={isActive("/dashboard/historique")} />
                            </Link>
                            <Link href="/dashboard/clients-roles">
                                <NavItem icon={Users} label="Clients et Rôles" active={isActive("/dashboard/clients-roles")} />
                            </Link>
                            <Link href="/dashboard/performance">
                                <NavItem icon={TrendingUp} label="Performance" active={isActive("/dashboard/performance")} />
                            </Link>
                            <Link href="/dashboard/commission-retrait">
                                <NavItem icon={Wallet} label="Commission & Retrait" active={isActive("/dashboard/commission-retrait")} />
                            </Link>
                        </NavGroup>

                        <NavGroup label="Formation">
                            <Link href="/dashboard/certification">
                                <NavItem icon={Award} label="Certification" active={isActive("/dashboard/certification")} />
                            </Link>
                            <Link href="/dashboard/presentations">
                                <NavItem icon={Video} label="Présentations Virtuelles" active={isActive("/dashboard/presentations")} />
                            </Link>
                        </NavGroup>

                        <NavGroup label="Outils de Vente">
                            <Link href="/dashboard/sales-tools">
                                <NavItem icon={Briefcase} label="Sales Tools" active={pathname === "/dashboard/sales-tools"} />
                            </Link>
                        </NavGroup>

                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Déconnexion
                        </Button>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between lg:px-6 shadow-sm sticky top-0 z-30">
                    {/* Left: Sidebar Toggle + Title (Mobile) or Welcome (Desktop) */}
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-600"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        {/* Welcome Message - Clean & Visible */}
                        <div className="hidden lg:flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900">
                                {partner ? `Bonjour, ${partner.firstName} 👋` : "Bonjour !"}
                            </h1>
                            <p className="text-xs text-gray-500">Heureux de vous revoir sur votre espace.</p>
                        </div>
                    </div>

                    {/* Right: User Actions */}
                    <div className="flex items-center gap-6">

                        {/* Organization Selector - Premium & Functional Look */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="hidden md:flex items-center gap-3 bg-gray-50 border border-gray-200 pl-2 pr-4 py-1.5 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all shadow-sm group">
                                    <div className="w-8 h-8 bg-white border border-gray-100 rounded-md flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                        <Image src="/mafalia-logo.svg" alt="M" width={20} height={20} className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col items-start mr-2">
                                        <span className="text-xs text-gray-500 font-medium leading-none mb-0.5">Organisation</span>
                                        <span className="text-sm font-bold text-gray-800 leading-none">Mafalia Partner</span>
                                    </div>
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-60">
                                <DropdownMenuLabel className="text-gray-500 text-xs font-normal">Changer d'organisation</DropdownMenuLabel>
                                <DropdownMenuItem className="flex justify-between items-center bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-white border rounded flex items-center justify-center">
                                            <Image src="/mafalia-logo.svg" alt="M" width={14} height={14} className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="font-medium">Mafalia Partner</span>
                                    </div>
                                    <Check className="w-4 h-4 text-green-600" />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-gray-500 cursor-not-allowed">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>Rejoindre une autre org</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Vertical Divider */}
                        <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                        {/* User Profile - Premium Look */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="relative">
                                        <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-2 ring-gray-100">
                                            <AvatarImage src={partner?.avatar} />
                                            <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white font-bold">
                                                {getInitials(partner?.firstName, partner?.lastName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white ring-1 ring-gray-100"></div>
                                    </div>

                                    <div className="hidden md:block text-left mr-1">
                                        <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                                            {partner ? `${partner.firstName} ${partner.lastName}` : "Chargement..."}
                                        </p>
                                        {partner && (
                                            <Badge variant="secondary" className={`text-[10px] h-5 px-1.5 font-bold ${getRankBgColor(partner.rank)} ${getRankColor(partner.rank)} border-none`}>
                                                {partner.rank}
                                            </Badge>
                                        )}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-2">
                                <div className="flex items-center gap-3 p-2 mb-2 bg-gray-50 rounded-lg">
                                    <Avatar className="w-10 h-10 border border-gray-200">
                                        <AvatarImage src={partner?.avatar} />
                                        <AvatarFallback className="bg-red-100 text-red-600 font-bold">
                                            {getInitials(partner?.firstName, partner?.lastName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-gray-900 truncate">{partner?.firstName} {partner?.lastName}</p>
                                        <p className="text-xs text-gray-500 truncate">{partner?.email}</p>
                                    </div>
                                </div>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/dashboard/profile")} className="cursor-pointer py-2.5">
                                    <User className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>Mon Profil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="cursor-pointer py-2.5">
                                    <Settings className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>Paramètres</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer py-2.5">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Déconnexion</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
