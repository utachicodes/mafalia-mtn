"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { hoverLift } from "@/lib/framer-variants"

interface GradientCardProps {
    children: ReactNode
    variant?: "default" | "glass" | "gradient"
    hover?: boolean
    className?: string
}

export function GradientCard({
    children,
    variant = "default",
    hover = true,
    className = ""
}: GradientCardProps) {
    const baseClasses = "rounded-2xl overflow-hidden transition-all duration-300"

    const variantClasses = {
        default: "bg-card border border-border shadow-premium",
        glass: "glass-effect shadow-premium",
        gradient: "gradient-primary text-primary-foreground shadow-glow",
    }

    if (!hover) {
        return (
            <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
                {children}
            </div>
        )
    }

    return (
        <motion.div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            variants={hoverLift}
            initial="rest"
            whileHover="hover"
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </motion.div>
    )
}
