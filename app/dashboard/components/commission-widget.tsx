"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, PlayCircle } from "lucide-react"
import { motion } from "framer-motion"

export function CommissionWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Commission & Retrait</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Available Balance */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-muted-foreground font-medium">Disponible</span>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-bold block">77.500 FCFA</span>
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Actif</span>
                        </div>
                    </div>

                    {/* Pending Balance */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-amber-600" />
                            <span className="text-muted-foreground font-medium">Solde en attente</span>
                        </div>
                        <span className="font-bold">47,500 FCFA</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <Progress value={75} className="h-3 bg-gray-100" indicatorClassName="bg-green-600" />
                            <span className="font-bold ml-3">75%</span>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">Minimum requis: 25,000 FCFA</p>
                    </div>

                    {/* Withdraw Button */}
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-base shadow-lg hover:shadow-xl transition-all">
                        Demander un Retrait
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}
