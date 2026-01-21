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
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react"
import { toast } from "sonner"

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
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
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
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      toast.error("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    setIsLoading(true)

    try {
      // Get country label
      const countryLabel = countries.find((c) => c.value === formData.pays)?.label || formData.pays

      await register(
        formData.email,
        formData.password,
        formData.prenom,
        formData.nom,
        formData.telephone,
        {
          address: formData.adresse,
          country: countryLabel,
          region: formData.region,
        }
      )
      toast.success("Compte créé avec succès!")
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Registration error:", err)
      const errorMessage = err.code === "auth/email-already-in-use"
        ? "Cette adresse email est déjà utilisée"
        : err.code === "auth/invalid-email"
          ? "Adresse email invalide"
          : err.code === "auth/weak-password"
            ? "Le mot de passe est trop faible"
            : "Une erreur s'est produite lors de la création du compte"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground h-full">
          <div className="w-full flex justify-center mb-8">
            <div className="relative w-16 h-16">
              <Image src="/mafalia-logo-white.svg" alt="Mafalia" fill className="object-contain" priority />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">Rejoignez notre réseau de partenaires</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Créez votre compte et commencez à générer des revenus en enrôlant de nouveaux clients sur Mafalia et
              Commercia.
            </p>
          </div>

          <div className="space-y-8 relative">
            {/* Connecting vertical line */}
            <div className="absolute left-[19px] top-2 bottom-12 w-0.5 bg-primary-foreground/20" />

            <div className="relative flex items-start gap-6 group">
              <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold text-primary shadow-lg flex-shrink-0 transition-transform group-hover:scale-110">
                1
              </div>
              <div className="pt-1">
                <p className="text-xl font-bold leading-tight">Inscrivez-vous gratuitement</p>
                <p className="text-primary-foreground/70 text-sm mt-1">Créez votre compte partenaire</p>
              </div>
            </div>

            <div className="relative flex items-start gap-6 group">
              <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold text-primary shadow-lg flex-shrink-0 transition-transform group-hover:scale-110">
                2
              </div>
              <div className="pt-1">
                <p className="text-xl font-bold leading-tight">Enrôlez vos premiers clients</p>
                <p className="text-primary-foreground/70 text-sm mt-1">Sur Mafalia et Commercia</p>
              </div>
            </div>

            <div className="relative flex items-start gap-6 group">
              <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold text-primary shadow-lg flex-shrink-0 transition-transform group-hover:scale-110">
                3
              </div>
              <div className="pt-1">
                <p className="text-xl font-bold leading-tight">Gagnez des commissions</p>
                <p className="text-primary-foreground/70 text-sm mt-1">Générez des revenus récurrents</p>
              </div>
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

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={!selectedCountry || isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
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
