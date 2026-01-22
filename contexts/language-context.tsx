"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "FR" | "EN" | "AR"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: Record<string, any>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
    FR: {
        solutions: "Solutions",
        tarifs: "Tarifs",
        login: "Se connecter",
        start: "Démarrer maintenant",
        heroTitle: "Le réseau partenaire pour développer votre activité.",
        heroSubtitle: "Rejoignez le réseau Mafalia Teranga, enrôlez de nouveaux clients, suivez vos performances et gagnez des commissions attractives.",
        demo: "Demander une démo",
        portal: "Accéder au portail",
        trustedBy: "Reconnu par les leaders du secteur",
        ourSolutions: "Nos Solutions",
        solutionsDesc: "Des outils adaptés à chaque secteur pour maximiser votre potentiel.",
        stats: {
            partners: "Partenaires actifs",
            clients: "Clients enrôlés",
            countries: "Pays couverts",
            satisfaction: "Taux de satisfaction"
        },
        ctaTitle: "Prêt à rejoindre le réseau ?",
        ctaDesc: "Inscrivez-vous et commencez à développer votre activité avec Mafalia Teranga Network dès aujourd'hui.",
        ctaButton: "Créer mon compte partenaire",
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
        login: "Login",
        start: "Start Now",
        heroTitle: "The partner network to grow your business.",
        heroSubtitle: "Join the Mafalia Teranga network, enroll new clients, track your performance, and earn attractive commissions.",
        demo: "Request a Demo",
        portal: "Access Portal",
        trustedBy: "Trusted by industry leaders",
        ourSolutions: "Our Solutions",
        solutionsDesc: "Tools adapted to each sector to maximize your potential.",
        stats: {
            partners: "Active Partners",
            clients: "Enrolled Clients",
            countries: "Countries Covered",
            satisfaction: "Satisfaction Rate"
        },
        ctaTitle: "Ready to join the network?",
        ctaDesc: "Sign up and start growing your business with Mafalia Teranga Network today.",
        ctaButton: "Create Partner Account",
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
        login: "تسجيل الدخول",
        start: "ابدأ الآن",
        heroTitle: "شبكة الشركاء لتنمية نشاطك التجاري.",
        heroSubtitle: "انضم إلى شبكة Mafalia Teranga، وسجّل عملاء جدد، وتتبع أدائك واكسب عمولات جذابة.",
        demo: "طلب عرض توضيحي",
        portal: "الوصول إلى البوابة",
        trustedBy: "موثوق به من قبل قادة الصناعة",
        ourSolutions: "حلولنا",
        solutionsDesc: "أدوات مكيفة لكل قطاع لتعظيم إمكاناتك.",
        stats: {
            partners: "شركاء نشطين",
            clients: "عملاء مسجلين",
            countries: "البلدان المشمولة",
            satisfaction: "معدل الرضا"
        },
        ctaTitle: "جاهز للانضمام إلى الشبكة؟",
        ctaDesc: "سجل وابدأ في تنمية نشاطك التجاري مع Mafalia Teranga Network اليوم.",
        ctaButton: "إنشاء حساب شريك",
        footerDesc: "شبكة الشركاء الأولى المخصصة لنمو الأعمال في غرب إفريقيا.",
        product: "المنتج",
        legal: "قانوني",
        privacy: "الخصوصية",
        terms: "شروط الخدمة",
        legalNotice: "إشعار قانوني",
        copyright: "© 2026 Mafalia. جميع الحقوق محفوظة."
    }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("FR")

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem("mafalia-language") as Language | null
        if (savedLanguage && (savedLanguage === "FR" || savedLanguage === "EN" || savedLanguage === "AR")) {
            setLanguageState(savedLanguage)
        }
    }, [])

    // Save language to localStorage when it changes
    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("mafalia-language", lang)
    }

    const t = translations[language]

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
