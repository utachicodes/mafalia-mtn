"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const translations = {
    FR: {
        solutions: "Solutions",
        tarifs: "Tarifs",
        footerDesc: "Le premier réseau de partenaires dédié à la croissance des entreprises en Afrique de l'Ouest.",
        product: "Produit",
        legal: "Légal",
        privacy: "Confidentialité",
        terms: "CGU",
        legalNotice: "Mentions légales",
        copyright: "© 2026 Mafalia. Tous droits réservés."
    },
    EN: {
        solutions: "Solutions",
        tarifs: "Pricing",
        footerDesc: "The premier partner network dedicated to business growth in West Africa.",
        product: "Product",
        legal: "Legal",
        privacy: "Privacy",
        terms: "Terms of Service",
        legalNotice: "Legal Notice",
        copyright: "© 2026 Mafalia. All rights reserved."
    },
    AR: {
        solutions: "حلول",
        tarifs: "التسعير",
        footerDesc: "شبكة الشركاء الأولى المخصصة لنمو الأعمال في غرب إفريقيا.",
        product: "المنتج",
        legal: "قانوني",
        privacy: "الخصوصية",
        terms: "شروط الخدمة",
        legalNotice: "إشعار قانوني",
        copyright: "© 2026 Mafalia. جميع الحقوق محفوظة."
    }
}

export function Footer() {
    const [language, setLanguage] = React.useState<"FR" | "EN" | "AR">("FR")
    const t = translations[language]

    return (
        <motion.footer
            className="border-t border-border bg-background pt-16 pb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="relative w-10 h-10 mb-6">
                            <Image src="/mafalia-logo.svg" alt="Mafalia" fill className="object-contain" />
                        </div>
                        <p className="text-muted-foreground max-w-sm">
                            {t.footerDesc}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t.product}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/#solutions" className="hover:text-primary">{t.solutions}</Link></li>
                            <li><Link href="/inscription" className="hover:text-primary">{t.tarifs}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t.legal}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/confidentialite" className="hover:text-primary">{t.privacy}</Link></li>
                            <li><Link href="/cgu" className="hover:text-primary">{t.terms}</Link></li>
                            <li><Link href="/mentions-legales" className="hover:text-primary">{t.legalNotice}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">{t.copyright}</p>
                    <div className="flex gap-4">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}
