"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const partners = [
    { name: "Orange", logo: "/partners/orange.png", width: 100, height: 50 },
    { name: "Free", logo: "/partners/free.png", width: 80, height: 40 },
    { name: "Wave", logo: "/partners/wave.png", width: 100, height: 50 },
    { name: "Ecobank", logo: "/partners/ecobank.png", width: 120, height: 60 },
    { name: "Cofina", logo: "/partners/cofina.jpg", width: 100, height: 50 },
]

export function LogoCarousel() {
    return (
        <div className="w-full relative overflow-hidden py-10">
            {/* Gradients to mask edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <motion.div
                className="flex gap-16 items-center w-max"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear",
                }}
            >
                {/* Duplicated list for seamless loop */}
                {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110 transform cursor-pointer"
                    >
                        <div className="relative h-12 w-32 flex items-center justify-center">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={partner.width}
                                height={partner.height}
                                className="object-contain max-h-full max-w-full mix-blend-multiply"
                                onError={(e) => {
                                    // Fallback if image fails
                                    e.currentTarget.style.display = "none"
                                    e.currentTarget.parentElement!.innerText = partner.name
                                    e.currentTarget.parentElement!.className = "text-xl font-bold text-gray-400"
                                }}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
