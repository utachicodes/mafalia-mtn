"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const data = [
    { name: "Prospects", value: 0.2 },
    { name: "Clients", value: 0.4 },
    { name: "Transactions", value: 0.3 },
    { name: "Trenalt", value: 0.6 },
    { name: "Payants", value: 0.5 },
    { name: "Validés", value: 0.9 },
    { name: "Actifs", value: 0.8 },
    { name: "Retours", value: 0.95 },
    { name: "Fidèles", value: 1.2 },
]

export function PerformanceChart() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className="border-none shadow-sm h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-bold">Performance</CardTitle>
                    <Tabs defaultValue="jour" className="w-auto">
                        <TabsList className="bg-muted/50">
                            <TabsTrigger value="jour" className="text-xs">
                                Jour
                            </TabsTrigger>
                            <TabsTrigger value="semaine" className="text-xs">
                                Semaine
                            </TabsTrigger>
                            <TabsTrigger value="mois" className="text-xs">
                                Mois
                            </TabsTrigger>
                            <TabsTrigger value="personnalise" className="text-xs">
                                Personnalisé
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                                    padding={{ left: 10, right: 10 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#EA580C"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#EA580C", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value2"
                                    stroke="#CBD5E1"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-muted-foreground px-4">
                        <span>Prospects</span>
                        <span>→</span>
                        <span>Clients</span>
                        <span>→</span>
                        <span>Transactions</span>
                        <span>→</span>
                        <span>Trenalt</span>
                        <span>→</span>
                        <span>Payants</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
