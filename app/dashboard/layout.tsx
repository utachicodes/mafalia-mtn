"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
    BookOpen
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

    // Helper to check if a route is active
    const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/")

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
                            <div className="relative w-28 h-8">
                                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-600">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                                        </svg>
                                    </div>
                                    mafalia
                                </div>
                            </div>
                        </div>
                        <p className="text-white/60 text-xs font-semibold tracking-widest mt-1 ml-10">PARTENAIRE</p>
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

                        <NavGroup label="Tutoriels">
                            <Link href="/dashboard/presentations">
                                <NavItem icon={Video} label="Présentations Virtuelles" active={isActive("/dashboard/presentations")} />
                            </Link>
                        </NavGroup>

                        <NavGroup label="Outils de Vente">
                            <Link href="/dashboard/sales-tools">
                                <NavItem icon={Briefcase} label="Sales Tools" active={pathname === "/dashboard/sales-tools"} />
                            </Link>
                            {/* Sub-items for Sales Tools visual representation (optional, as they are on the page) */}
                            <div className="ml-4 pl-3 border-l border-white/10 space-y-1 mt-1">
                                <Link href="/dashboard/sales-tools">
                                    <span className="block px-2 py-1.5 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                        Discours Commercial
                                    </span>
                                </Link>
                                <Link href="/dashboard/sales-tools">
                                    <span className="block px-2 py-1.5 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                        Plaquette Mafalia
                                    </span>
                                </Link>
                            </div>
                        </NavGroup>

                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Déconnexion
                            </Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between lg:px-8 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-600"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">
                            {pathname === "/dashboard" && "Tableau de bord"}
                            {pathname === "/dashboard/enrolement" && "Enrôlement"}
                            {pathname?.includes("presentations") && "Présentations"}
                            {pathname?.includes("sales-tools") && "Outils de Vente"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 mr-4">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 hover:bg-red-50 relative">
                                <Mail className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <Avatar className="w-9 h-9 border border-gray-200">
                                <AvatarImage src="/avatars/user.png" />
                                <AvatarFallback className="bg-red-100 text-red-600">JD</AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">Jean Dupont</p>
                                <p className="text-xs text-red-500 font-medium">Bronze</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
