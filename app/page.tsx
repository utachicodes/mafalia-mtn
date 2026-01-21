"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedBackground } from "@/components/animated-background"
import { GradientCard } from "@/components/gradient-card"
import { Users, TrendingUp, Wallet, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/framer-variants"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Premium Glassmorphic Header */}
      <motion.header
        className="sticky top-0 z-50 glass-effect border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
      >
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-12 h-12">
              <Image
                src="/mafalia-logo.svg"
                alt="Mafalia"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
          <nav className="flex items-center gap-3">
            <Link href="/inscription">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-full px-6 shadow-glow hover:shadow-xl transition-shadow">
                  Démarrer maintenant
                </Button>
              </motion.div>
            </Link>
            <Link href="/connexion">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-primary text-primary hover:bg-primary/5 bg-transparent"
                >
                  Se connecter
                </Button>
              </motion.div>
            </Link>
          </nav>
        </div>
      </motion.header >

      <main className="flex-1">
        {/* Premium Hero Section with Animated Background */}
        <AnimatedBackground variant="mesh">
          <section className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={staggerContainer}
                >


                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
                    variants={staggerItem}
                  >
                    Le réseau partenaire
                    <br />
                    pour développer
                    <br />
                    <span className="text-primary relative inline-block">
                      votre activité.
                      {/* Animated underline */}
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
                  </motion.h1>

                  <motion.p
                    className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed"
                    variants={staggerItem}
                  >
                    Rejoignez le réseau Mafalia Teranga, enrôlez de nouveaux clients, suivez vos performances et
                    gagnez des commissions attractives.
                  </motion.p>

                  <motion.div className="flex flex-wrap gap-4" variants={staggerItem}>
                    <Link href="/inscription">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-glow">
                          Demander une démo
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/connexion">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="rounded-full px-8 h-12 text-base border-primary text-primary hover:bg-primary/5 bg-transparent"
                        >
                          Accéder au portail
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
                      className="bg-card rounded-2xl shadow-xl border border-border p-4 transform rotate-1"
                      whileHover={{ rotate: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                        <div className="relative w-6 h-6">
                          <Image src="/mafalia-logo.svg" alt="Mafalia" fill className="object-contain" />
                        </div>
                        <div className="flex-1 h-2 bg-muted rounded-full w-24" />
                        <div className="w-8 h-8 rounded-full bg-primary/10" />
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <StatPreviewCard delay={0.4} />
                        <StatPreviewCard delay={0.5} color="success" />
                        <StatPreviewCard delay={0.6} color="chart-3" />
                      </div>
                      <motion.div
                        className="gradient-primary rounded-xl p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/20" />
                          <div className="flex-1">
                            <div className="h-2 bg-white/30 rounded w-3/4 mb-1" />
                            <div className="h-2 bg-white/20 rounded w-1/2" />
                          </div>
                          <div className="w-6 h-6 rounded-full bg-white/20" />
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Floating success card */}
                    <motion.div
                      className="absolute -top-4 -right-4 glass-effect rounded-xl shadow-premium p-3 transform -rotate-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      whileHover={{ rotate: 0, scale: 1.05 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <div className="h-2 bg-success/30 rounded w-16" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-success/20" />
                        <div className="h-2 bg-success/30 rounded w-12" />
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
          className="py-8 border-y border-border bg-muted/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <p className="text-center text-sm font-semibold text-foreground tracking-wide uppercase">
              Reconnu par les entreprises les plus influentes du Sénégal.
            </p>
          </div>
        </motion.section>

        {/* Premium Stats Section with Animated Counters */}
        <section className="py-16 bg-background">
          <motion.div
            className="container mx-auto px-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem value="500+" label="Partenaires actifs" delay={0} />
              <StatItem value="12K+" label="Clients enrôlés" delay={0.1} />
              <StatItem value="5" label="Pays couverts" delay={0.2} />
              <StatItem value="98%" label="Taux de satisfaction" delay={0.3} />
            </div>
          </motion.div>
        </section>

        {/* Premium Features Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background gradient mesh */}
          <div className="absolute inset-0 gradient-mesh opacity-30" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi devenir partenaire ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Profitez d'une opportunité unique pour générer des revenus en aidant les particuliers et les commerces.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Enrôlez des clients"
                description="Inscrivez facilement de nouveaux clients sur Mafalia ou Commercia via votre tableau de bord dédié."
              />
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Suivez vos performances"
                description="Accédez à des statistiques détaillées sur vos clients et vos commissions en temps réel."
              />
              <FeatureCard
                icon={<Wallet className="w-6 h-6" />}
                title="Gagnez des commissions"
                description="Recevez des commissions attractives sur chaque transaction de vos clients enrôlés."
              />
            </motion.div>
          </div>
        </section>

        {/* Premium Steps Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Trois étapes simples pour commencer</p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <StepItem number="1" title="Inscrivez-vous" description="Créez votre compte partenaire en quelques minutes" />
              <StepItem
                number="2"
                title="Enrôlez des clients"
                description="Utilisez votre tableau de bord pour inscrire de nouveaux clients"
              />
              <StepItem number="3" title="Recevez vos gains" description="Gagnez des commissions sur chaque transaction" />
            </motion.div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <AnimatedBackground variant="gradient">
            <div className="container mx-auto px-6 text-center py-8">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Prêt à rejoindre le réseau ?
              </motion.h2>
              <motion.p
                className="text-primary-foreground/80 mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Inscrivez-vous et commencez à développer votre activité avec Mafalia Teranga Network.
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
                      className="rounded-full px-8 h-12 text-base bg-white text-primary hover:bg-white/90 shadow-xl"
                    >
                      Créer mon compte partenaire
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </AnimatedBackground>
        </section>
      </main>

      {/* Premium Footer */}
      <motion.footer
        className="border-t border-border bg-background py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src="/mafalia-logo.svg" alt="Mafalia" fill className="object-contain" />
              </div>
              <span className="font-semibold text-foreground">Mafalia</span>
            </div>
            <p className="text-sm text-muted-foreground">2026 Mafalia. Tous droits réservés.</p>
          </div>
        </div>
      </motion.footer>
    </div >
  )
}

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
      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
        <AnimatedCounter value={value} />
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

// Premium Feature Card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={staggerItem}>
      <GradientCard className="p-6 h-full">
        <motion.div
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </GradientCard>
    </motion.div>
  )
}

// Premium Step Item
function StepItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div className="text-center" variants={staggerItem}>
      <motion.div
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-glow"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {number}
      </motion.div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  )
}

// Dashboard Preview Stat Card
function StatPreviewCard({ delay, color = "primary" }: { delay: number; color?: string }) {
  return (
    <motion.div
      className="bg-muted/50 rounded-xl p-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`w-8 h-8 rounded-lg bg-${color}/10 mb-2`} />
      <div className="h-2 bg-muted rounded w-full mb-1" />
      <div className="h-3 bg-foreground/20 rounded w-1/2" />
    </motion.div>
  )
}
