"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
    value: string | number
    duration?: number
    className?: string
}

export function AnimatedCounter({ value, duration = 2, className = "" }: AnimatedCounterProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    // Extract numeric value from string (e.g., "500+" -> 500)
    const numericValue = typeof value === "number" ? value : parseInt(value.toString().replace(/[^0-9]/g, ""))
    const suffix = typeof value === "string" ? value.replace(/[0-9]/g, "") : ""

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * numericValue))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [isInView, numericValue, duration])

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            {isInView ? `${count}${suffix}` : "0"}
        </motion.span>
    )
}
