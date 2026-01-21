"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const leaders = [
    {
        name: "Jean Dupont",
        rank: 1,
        level: "Bronze",
        amount: "125,000 FCFA",
        avatar: "/avatars/01.png",
        bg: "bg-red-50",
        badge: null,
    },
    {
        name: "Maria Cissé",
        rank: 2,
        level: "Bronze",
        amount: "87,000 FCFA",
        avatar: "/avatars/02.png",
        bg: "bg-amber-50",
        badge: "2º",
        badgeColor: "bg-amber-600",
    },
    {
        name: "Nicolas Diallo",
        rank: 3,
        level: "Bronze",
        amount: "52,500 FCFA",
        avatar: "/avatars/03.png",
        bg: "bg-orange-50",
        badge: "3º",
        badgeColor: "bg-orange-600",
    },
]

export function Leaderboard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <Card className="border-none shadow-sm h-full flex flex-col">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Historique</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                        {leaders.map((leader, index) => (
                            <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${leader.bg}`}>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        {leader.badge ? (
                                            <div className={`w-8 h-8 rounded-full ${leader.badgeColor} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                                                {leader.badge}
                                            </div>
                                        ) : (
                                            <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                                                <AvatarImage src={leader.avatar} />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{leader.name}</p>
                                        <p className="text-xs text-muted-foreground">{leader.level}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-red-600 block bg-red-100 px-2 py-0.5 rounded text-[10px]">{leader.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50 gap-1 font-medium group">
                        Voir classement
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}
