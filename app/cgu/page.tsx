"use client"

import React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"

export default function CGUPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-1 py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-8">Conditions Générales d'Utilisation</h1>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-12">
                                En accédant au réseau Mafalia Teranga Network, vous acceptez les présentes conditions générales d'utilisation.
                            </p>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">1. Objet du Service</h2>
                                <p>
                                    Mafalia Teranga Network est une plateforme permettant aux partenaires indépendants d'enrôler des clients pour les produits Mafalia et de percevoir des commissions sur les ventes générées.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">2. Engagements du Partenaire</h2>
                                <p>En tant que partenaire, vous vous engagez à :</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Fournir des informations exactes lors de votre inscription.</li>
                                    <li>Agir de manière éthique et professionnelle lors de la promotion de nos produits.</li>
                                    <li>Ne pas utiliser de méthodes de marketing trompeuses ou illégales.</li>
                                    <li>Respecter la confidentialité des informations clients collectées.</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">3. Commissions et Paiements</h2>
                                <p>
                                    Les commissions sont calculées sur la base des ventes validées. Le paiement est effectué mensuellement dès que le seuil minimum de retrait est atteint. Mafalia se réserve le droit de modifier les taux de commission avec un préavis de 30 jours.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4">4. Résiliation</h2>
                                <p>
                                    Mafalia peut suspendre ou résilier le compte d'un partenaire en cas de violation des présentes CGU ou d'activité frauduleuse, sans préavis ni indemnité.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
