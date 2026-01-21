"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
    children?: ReactNode
    variant?: "gradient" | "mesh" | "minimal"
    className?: string
}

export function AnimatedBackground({
    children,
    variant = "mesh",
    className = ""
}: AnimatedBackgroundProps) {
    if (variant === "gradient") {
        return (
            <div className={`relative overflow-hidden ${className}`}>
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 gradient-primary animate-gradient"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                {/* Overlay content */}
                <div className="relative z-10">{children}</div>
            </div>
        )
    }

    if (variant === "mesh") {
        return (
            <div className={`relative overflow-hidden ${className}`}>
                {/* Gradient mesh background */}
                <div className="absolute inset-0 gradient-mesh" />

                {/* Animated floating orbs */}
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-chart-3/5 blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />

                {/* Overlay content */}
                <div className="relative z-10">{children}</div>
            </div>
        )
    }

    // Minimal variant
    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
            <div className="relative z-10">{children}</div>
        </div>
    )
}
