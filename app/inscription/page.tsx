"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

import { ArrowLeft, Eye, EyeOff } from "lucide-react"

const countries = [
  {
    value: "senegal",
    label: "Sénégal",
    regions: [
      "Dakar",
      "Thiès",
      "Saint-Louis",
      "Ziguinchor",
      "Kaolack",
      "Fatick",
      "Kolda",
      "Matam",
      "Tambacounda",
      "Kédougou",
      "Kaffrine",
      "Sédhiou",
      "Diourbel",
      "Louga",
    ],
  },
  {
    value: "mali",
    label: "Mali",
    regions: ["Bamako", "Kayes", "Koulikoro", "Sikasso", "Ségou", "Mopti", "Tombouctou", "Gao", "Kidal"],
  },
  {
    value: "cote-ivoire",
    label: "Côte d'Ivoire",
    regions: ["Abidjan", "Yamoussoukro", "Bouaké", "Daloa", "San-Pédro", "Korhogo"],
  },
  {
    value: "burkina-faso",
    label: "Burkina Faso",
    regions: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Banfora", "Ouahigouya"],
  },
  { value: "guinee", label: "Guinée", regions: ["Conakry", "Nzérékoré", "Kankan", "Kindia", "Labé"] },
]

export default function InscriptionPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    adresse: "",
    pays: "",
    region: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const selectedCountryData = countries.find((c) => c.value === selectedCountry)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard")
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image src="/mafalia-logo.svg" alt="Mafalia" fill className="object-contain" priority />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">Rejoignez notre réseau de partenaires</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Créez votre compte et commencez à générer des revenus en enrôlant de nouveaux clients sur Mafalia et
              Commercia.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span>Inscrivez-vous gratuitement</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span>Enrôlez vos premiers clients</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span>Gagnez des commissions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
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

        <main className="flex-1 flex items-center justify-center p-4 py-8 lg:py-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </Link>

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Créer un compte</h1>
              <p className="text-muted-foreground">Remplissez le formulaire pour devenir partenaire</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={(e) => updateFormData("prenom", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={(e) => updateFormData("nom", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse domicile</Label>
                <Input
                  id="adresse"
                  placeholder="Votre adresse complète"
                  value={formData.adresse}
                  onChange={(e) => updateFormData("adresse", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pays">Pays</Label>
                  <Select
                    value={selectedCountry}
                    onValueChange={(value) => {
                      setSelectedCountry(value)
                      updateFormData("pays", value)
                      updateFormData("region", "")
                    }}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Région</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => updateFormData("region", value)}
                    disabled={!selectedCountry}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCountryData?.regions.map((region) => (
                        <SelectItem key={region} value={region.toLowerCase()}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="+221 77 123 45 67"
                    value={formData.telephone}
                    onChange={(e) => updateFormData("telephone", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="8 caractères min."
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      required
                      minLength={8}
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      required
                      minLength={8}
                      className="rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-full" size="lg" disabled={isLoading}>
                {isLoading ? "Création en cours..." : "Créer mon compte"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Vous avez déjà un compte ?{" "}
                <Link href="/connexion" className="text-primary hover:underline font-medium">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
