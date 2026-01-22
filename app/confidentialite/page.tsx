"use client"

import React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"

export default function ConfidentialitePage() {
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-8">Politique de Confidentialité</h1>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-12">
                                Chez Mafalia, la protection de vos données personnelles est une priorité absolue. Cette politique détaille comment nous collectons, utilisons et protégeons vos informations.
                            </p>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
                                <p>
                                    Nous collectons les informations que vous nous fournissez directement lors de votre inscription (nom, email, téléphone, adresse) ainsi que des données techniques liées à votre utilisation de notre plateforme (adresse IP, cookies).
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
                                <p>Vos données sont utilisées pour :</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Gérer votre compte partenaire et vos commissions.</li>
                                    <li>Améliorer nos services et personnaliser votre expérience.</li>
                                    <li>Communiquer avec vous concernant nos mises à jour et offres.</li>
                                    <li>Respecter nos obligations légales et réglementaires.</li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">3. Protection et Partage</h2>
                                <p>
                                    Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données. Nous ne vendons jamais vos informations à des tiers. Le partage de données se fait uniquement avec nos prestataires de confiance (paiement, hébergement) dans le strict cadre de l'exécution de nos services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4">4. Vos droits</h2>
                                <p>
                                    Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à privacy@mafalia.com.
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
