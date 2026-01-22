"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedBackground } from "@/components/animated-background"
import { GradientCard } from "@/components/gradient-card"
import {
  Users,
  TrendingUp,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Globe,
  Store,
  Utensils,
  Tractor,
  Building2,
  CreditCard,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/framer-variants"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const translations = {
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

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  const [language, setLanguage] = React.useState<"FR" | "EN" | "AR">("FR")
  const t = translations[language]

  return (
    <div className={`min-h-screen flex flex-col bg-background font-sans ${language === 'AR' ? 'dir-rtl' : ''}`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1">
        {/* Premium Hero Section with Animated Background */}
        <AnimatedBackground variant="mesh">
          <section className="py-20 md:py-28 lg:py-32">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={staggerContainer}
                >
                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight"
                    variants={staggerItem}
                  >
                    {language === 'FR' ? (
                      <>
                        Le réseau partenaire
                        <br />
                        pour développer
                        <br />
                        <span className="text-primary relative inline-block">
                          votre activité.
                          <motion.svg
                            className="absolute -bottom-2 left-0 w-full"
                            viewBox="0 0 200 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                          >
                            <motion.path
                              d="M2 6C50 2 150 2 198 6"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              className="text-primary"
                            />
                          </motion.svg>
                        </span>
                      </>
                    ) : (
                      <span className="text-foreground">
                        {t.heroTitle}
                      </span>
                    )}

                  </motion.h1>

                  <motion.p
                    className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed font-light"
                    variants={staggerItem}
                  >
                    {t.heroSubtitle}
                  </motion.p>

                  <motion.div className="flex flex-wrap gap-4" variants={staggerItem}>
                    <Link href="/inscription">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-xl bg-primary hover:bg-primary/90">
                          {t.demo}
                          <ArrowRight className={`w-5 h-5 ${language === 'AR' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/connexion">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full px-8 h-12 text-base border-2 hover:bg-muted/50"
                        >
                          {t.portal}
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Premium Dashboard Preview */}
                <motion.div
                  className="relative hidden lg:block"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="relative">
                    {/* Main dashboard card with premium effects */}
                    <motion.div
                      className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform rotate-1"
                      whileHover={{ rotate: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                        <div className="relative w-8 h-8">
                          <Image src="/mafalia-logo.svg" alt="Mafalia" fill className="object-contain" />
                        </div>
                        <div className="flex-1 h-2 bg-muted rounded-full w-24" />
                        <div className="w-10 h-10 rounded-full bg-primary/10" />
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <StatPreviewCard delay={0.4} />
                        <StatPreviewCard delay={0.5} color="success" />
                        <StatPreviewCard delay={0.6} color="chart-3" />
                      </div>
                      <motion.div
                        className="gradient-primary rounded-xl p-6 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm" />
                          <div className="flex-1">
                            <div className="h-3 bg-white/40 rounded w-3/4 mb-2" />
                            <div className="h-2 bg-white/20 rounded w-1/2" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm" />
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Floating success card */}
                    <motion.div
                      className="absolute -top-6 -right-6 glass-effect rounded-2xl shadow-premium p-4 transform -rotate-6 border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      whileHover={{ rotate: 0, scale: 1.05 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div className="h-2.5 bg-foreground/10 rounded w-20" />
                      </div>
                      <div className="flex items-center gap-2 pl-1">
                        <div className="text-2xl font-bold text-foreground">$12.4k</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </AnimatedBackground>

        {/* Trust Banner */}
        <motion.section
          className="py-10 border-y border-border/50 bg-background/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <p className="text-center text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8">
              {t.trustedBy}
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60">
              {/* Placeholders for partner logos - using text for now but would be images */}
              {["Orange", "Free", "Wave", "Ecobank", "Cofina"].map((partner) => (
                <span key={partner} className="text-xl font-bold font-mono">{partner}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-muted/20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{t.ourSolutions}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.solutionsDesc}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SolutionCard
                icon={<Utensils className="w-8 h-8" />}
                title="Restaurants"
                description="Gérez vos commandes, menus et paiements en toute simplicité. Fidélisez vos clients avec des outils marketing intégrés."
                color="orange"
              />
              <SolutionCard
                icon={<Store className="w-8 h-8" />}
                title="Commerce de détails"
                description="Une caisse enregistreuse puissante et une gestion de stock en temps réel pour votre boutique."
                color="blue"
              />
              <SolutionCard
                icon={<Tractor className="w-8 h-8" />}
                title="Distributeurs & Agriculteurs"
                description="Connectez-vous directement aux acheteurs, gérez votre logistique et optimisez vos revenus."
                color="green"
              />
              <SolutionCard
                icon={<Building2 className="w-8 h-8" />}
                title="Entreprise - Avantages Salariés"
                description="Offrez des titres-restaurant et avantages sociaux digitaux à vos collaborateurs."
                color="purple"
              />
              <SolutionCard
                icon={<CreditCard className="w-8 h-8" />}
                title="Établissements de crédits"
                description="Proposez des solutions de financement et de crédit directement intégrées au point de vente."
                color="indigo"
              />
              <SolutionCard
                icon={<Sparkles className="w-8 h-8" />}
                title="Sur Mesure"
                description="Une solution spécifique ? Nos APIs s'adaptent à vos besoins les plus complexes."
                color="pink"
              />
            </div>
          </div>
        </section>



        {/* Premium Stats Section with Animated Counters */}
        <section className="py-20 bg-muted/30">
          <motion.div
            className="container mx-auto px-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem value="500+" label={t.stats.partners} delay={0} />
              <StatItem value="12K+" label={t.stats.clients} delay={0.1} />
              <StatItem value="5" label={t.stats.countries} delay={0.2} />
              <StatItem value="98%" label={t.stats.satisfaction} delay={0.3} />
            </div>
          </motion.div>
        </section>


        {/* Premium CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <AnimatedBackground variant="gradient">
            <div className="container mx-auto px-6 text-center py-12">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {t.ctaTitle}
              </motion.h2>
              <motion.p
                className="text-primary-foreground/90 mb-10 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t.ctaDesc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/inscription">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="rounded-full px-10 h-14 text-lg bg-white text-primary hover:bg-white/90 shadow-2xl"
                    >
                      {t.ctaButton}
                      <ArrowRight className={`w-5 h-5 ${language === 'AR' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </AnimatedBackground>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon && <div>{icon}</div>}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>

          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Premium Stat Item with Animated Counter
function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      className="text-center"
      variants={staggerItem}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        <AnimatedCounter value={value} />
      </div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

// Solution Card
function SolutionCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string, color: string }) {
  return (
    <motion.div variants={staggerItem} className="h-full">
      <GradientCard className="p-8 h-full hover:shadow-2xl transition-shadow duration-300">
        <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 flex items-center justify-center mb-6 text-${color}-500`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </GradientCard>
    </motion.div>
  )
}




// Dashboard Preview Stat Card
function StatPreviewCard({ delay, color = "primary" }: { delay: number; color?: string }) {
  return (
    <motion.div
      className="bg-muted/50 rounded-xl p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`w-10 h-10 rounded-lg bg-${color}/10 mb-3`} />
      <div className="h-2 bg-muted-foreground/20 rounded w-full mb-2" />
      <div className="h-4 bg-foreground/10 rounded w-1/2" />
    </motion.div>
  )
}

