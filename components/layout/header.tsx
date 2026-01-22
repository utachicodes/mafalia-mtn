"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
    const { language, setLanguage, t } = useLanguage()

    return (
        <motion.header
            className="sticky top-0 z-50 glass-effect border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/" className="relative w-12 h-12">
                        <Image
                            src="/mafalia-logo.svg"
                            alt="Mafalia"
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>
                </motion.div>

                <div className="flex-1" />

                <nav className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                                <Globe className="w-4 h-4" />
                                <span className="text-sm font-medium">{language}</span>
                                <ChevronDown className="w-3 h-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setLanguage("FR")}>Français (FR)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage("EN")}>English (EN)</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage("AR")}>العربية (AR)</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="h-6 w-px bg-border/50 hidden sm:block" />

                    <div className="flex items-center gap-3">
                        <Link href="/connexion">
                            <Button
                                variant="ghost"
                                className="text-foreground/80 hover:text-primary font-medium px-4"
                            >
                                {t.login}
                            </Button>
                        </Link>

                        <Link href="/inscription">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="rounded-full px-6 shadow-lg hover:shadow-primary/25 transition-all bg-primary text-primary-foreground font-semibold">
                                    {t.start}
                                </Button>
                            </motion.div>
                        </Link>
                    </div>
                </nav>
            </div>
        </motion.header>
    )
}
