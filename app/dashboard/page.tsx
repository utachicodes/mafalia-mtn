"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  LayoutDashboard,
  UserPlus,
  LogOut,
  Menu,
  X,
  Bell,
  Mail,
  ChevronDown,
  Video,
  Briefcase,
  FileText
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Import custom dashboard components
import { StatsGrid } from "./components/stats-grid"
import { PerformanceChart } from "./components/performance-chart"
import { CommissionWidget } from "./components/commission-widget"
import { ClientsTable } from "./components/clients-table"
import { Leaderboard } from "./components/leaderboard"

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${active
        ? "bg-white/20 text-white font-medium shadow-sm backdrop-blur-sm"
        : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <>
      <StatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Performance Chart & Clients Table */}
        <div className="xl:col-span-2 space-y-6">
          <PerformanceChart />
          <ClientsTable />
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6">
          <CommissionWidget />
          <Leaderboard />
        </div>
      </div>
    </>
  )
}
