"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function ConnexionPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-between p-12 text-primary-foreground">
          <div className="w-full flex justify-center mb-8">
            <div className="relative w-16 h-16">
              <Image src="/mafalia-logo-white.svg" alt="Mafalia" fill className="object-contain" priority />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">Content de vous revoir</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Connectez-vous pour accéder à votre tableau de bord et suivre vos performances.
            </p>
          </div>

          <div className="text-sm text-primary-foreground/60">La plateforme des partenaires commerciaux Mafalia</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="lg:hidden border-b border-border bg-card">
          <div className="px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <Link
              href="/"
              className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </Link>

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Connexion</h1>
              <p className="text-muted-foreground">Accédez à votre tableau de bord partenaire</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-full" size="lg" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Vous n'avez pas de compte ?{" "}
                <Link href="/inscription" className="text-primary hover:underline font-medium">
                  S'inscrire
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
