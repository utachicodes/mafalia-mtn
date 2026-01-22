"use client"

import React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"

export default function MentionsLegalesPage() {
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-8">Mentions Légales</h1>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">Éditeur du site</h2>
                                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                                    <p className="font-semibold text-lg">Mafalia Group SAS</p>
                                    <p>Société par Actions Simplifiée au capital de 10 000 000 FCFA</p>
                                    <p>Siège social : Dakar, Sénégal</p>
                                    <p>R.C.C.M : SN-DKR-202X-B-XXXXX</p>
                                    <p>Email : contact@mafalia.com</p>
                                    <p>Téléphone : +221 33 000 00 00</p>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">Directeur de la publication</h2>
                                <p>Monsieur le Directeur Général de Mafalia Group.</p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-4">Hébergement</h2>
                                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                                    <p className="font-semibold text-lg">Vercel Inc.</p>
                                    <p>340 S Lemon Ave #4133</p>
                                    <p>Walnut, CA 91789</p>
                                    <p>États-Unis</p>
                                    <p>https://vercel.com</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4">Propriété Intellectuelle</h2>
                                <p>
                                    L'ensemble de ce site relève de la législation sénégalaise et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
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
