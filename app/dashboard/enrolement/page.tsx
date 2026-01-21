"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LayoutDashboard,
  UserPlus,
  LogOut,
  Menu,
  X,
  CheckCircle,
  User,
  Building2,
  Mail,
  ChevronDown
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

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

const businessTypes = [
  { value: "boutique", label: "Boutique" },
  { value: "restaurant", label: "Restaurant" },
  { value: "supermarche", label: "Supermarché" },
  { value: "pharmacie", label: "Pharmacie" },
  { value: "autre", label: "Autre" },
]

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${active
        ? "bg-white/20 text-white font-medium shadow-sm backdrop-blur-sm"
        : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </div>
  )
}

export default function EnrolementPage() {
  const [selectedService, setSelectedService] = useState("mafalia")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const selectedCountryData = countries.find((c) => c.value === selectedCountry)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Gather form data based on active tab
      const data: any = {
        type: selectedService,
        country: selectedCountry,
        status: "pending",
        createdAt: serverTimestamp(),
      }

      if (selectedService === "mafalia") {
        data.firstName = (document.getElementById("mafalia-prenom") as HTMLInputElement).value
        data.lastName = (document.getElementById("mafalia-nom") as HTMLInputElement).value
        data.phone = (document.getElementById("mafalia-telephone") as HTMLInputElement).value
        data.email = (document.getElementById("mafalia-email") as HTMLInputElement).value
        // data.region = region // We need to lift region state up to access it here or use form data
        data.address = (document.getElementById("mafalia-adresse") as HTMLInputElement).value
      } else {
        data.businessName = (document.getElementById("commercia-entreprise") as HTMLInputElement).value
        data.firstName = (document.getElementById("commercia-prenom") as HTMLInputElement).value
        data.lastName = (document.getElementById("commercia-nom") as HTMLInputElement).value
        data.phone = (document.getElementById("commercia-telephone") as HTMLInputElement).value
        data.email = (document.getElementById("commercia-email") as HTMLInputElement).value
        data.address = (document.getElementById("commercia-adresse") as HTMLInputElement).value
        data.ninea = (document.getElementById("commercia-ninea") as HTMLInputElement).value
      }

      await addDoc(collection(db, "clients"), data)
      setSuccess(true)
    } catch (error) {
      console.error("Error adding document: ", error)
      alert("Erreur lors de l'enrôlement. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSuccess(false)
    setSelectedCountry("")
  }

  return (
    <div className="max-w-3xl mx-auto">
      {success ? (
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Client enrôlé avec succès</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Le client a été ajouté à votre réseau et recevra un email pour finaliser son inscription.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetForm} size="lg" className="rounded-full bg-red-600 hover:bg-red-700 shadow-md">
                <UserPlus className="w-5 h-5 mr-2" />
                Enrôler un autre client
              </Button>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Retour au tableau de bord
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Enrôler un nouveau client</CardTitle>
            <CardDescription>Inscrivez un nouveau client sur Mafalia ou Commercia</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedService} onValueChange={setSelectedService}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/80 p-1 rounded-xl">
                <TabsTrigger value="mafalia" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm">
                  <User className="w-4 h-4" />
                  Mafalia
                </TabsTrigger>
                <TabsTrigger value="commercia" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm">
                  <Building2 className="w-4 h-4" />
                  Commercia
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mafalia">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                    <div className="mt-1 bg-red-100 p-1.5 rounded-full">
                      <User className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-900">Module Particuliers</p>
                      <p className="text-sm text-red-700/80">
                        Pour les particuliers souhaitant utiliser les services Mafalia
                      </p>
                    </div>
                  </div>

                  <MafaliaForm
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    selectedCountryData={selectedCountryData}
                    countries={countries}
                  />
                  <Button type="submit" className="w-full rounded-full bg-red-600 hover:bg-red-700 font-bold shadow-lg" size="lg" disabled={isLoading}>
                    {isLoading ? "Enrôlement en cours..." : "Enrôler sur Mafalia"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="commercia">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
                    <div className="mt-1 bg-orange-100 p-1.5 rounded-full">
                      <Building2 className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Module Commerces</p>
                      <p className="text-sm text-orange-700/80">
                        Pour les commerces et entreprises souhaitant rejoindre le réseau
                      </p>
                    </div>
                  </div>

                  <CommerciaForm
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    selectedCountryData={selectedCountryData}
                    countries={countries}
                    businessTypes={businessTypes}
                  />
                  <Button type="submit" className="w-full rounded-full bg-red-600 hover:bg-red-700 font-bold shadow-lg" size="lg" disabled={isLoading}>
                    {isLoading ? "Enrôlement en cours..." : "Enrôler sur Commercia"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface FormProps {
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedCountryData: { value: string; label: string; regions: string[] } | undefined
  countries: { value: string; label: string; regions: string[] }[]
}

function MafaliaForm({ selectedCountry, setSelectedCountry, selectedCountryData, countries }: FormProps) {
  const [region, setRegion] = useState("")

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="mafalia-prenom">Prénom</Label>
          <Input id="mafalia-prenom" placeholder="Prénom du client" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mafalia-nom">Nom</Label>
          <Input id="mafalia-nom" placeholder="Nom du client" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="mafalia-telephone">Téléphone</Label>
          <Input id="mafalia-telephone" type="tel" placeholder="+221 77 123 45 67" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mafalia-email">Email</Label>
          <Input id="mafalia-email" type="email" placeholder="client@email.com" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Pays</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors">
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
          <Label>Région</Label>
          <Select value={region} onValueChange={setRegion} disabled={!selectedCountry}>
            <SelectTrigger className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              {selectedCountryData?.regions.map((r) => (
                <SelectItem key={r} value={r.toLowerCase()}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mafalia-adresse">Adresse</Label>
        <Input id="mafalia-adresse" placeholder="Adresse complète" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
      </div>
    </>
  )
}

interface CommerciaFormProps extends FormProps {
  businessTypes: { value: string; label: string }[]
}

function CommerciaForm({
  selectedCountry,
  setSelectedCountry,
  selectedCountryData,
  countries,
  businessTypes,
}: CommerciaFormProps) {
  const [region, setRegion] = useState("")

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="commercia-entreprise">Nom de l'entreprise</Label>
        <Input id="commercia-entreprise" placeholder="Nom de l'entreprise" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="commercia-prenom">Prénom du gérant</Label>
          <Input id="commercia-prenom" placeholder="Prénom" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="commercia-nom">Nom du gérant</Label>
          <Input id="commercia-nom" placeholder="Nom" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Type d'activité</Label>
        <Select>
          <SelectTrigger className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors">
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="commercia-telephone">Téléphone</Label>
          <Input id="commercia-telephone" type="tel" placeholder="+221 77 123 45 67" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="commercia-email">Email</Label>
          <Input id="commercia-email" type="email" placeholder="entreprise@email.com" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Pays</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors">
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
          <Label>Région</Label>
          <Select value={region} onValueChange={setRegion} disabled={!selectedCountry}>
            <SelectTrigger className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              {selectedCountryData?.regions.map((r) => (
                <SelectItem key={r} value={r.toLowerCase()}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="commercia-adresse">Adresse du commerce</Label>
        <Input id="commercia-adresse" placeholder="Adresse complète" required className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commercia-ninea">NINEA (optionnel)</Label>
        <Input id="commercia-ninea" placeholder="Numéro d'identification fiscale" className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
      </div>
    </>
  )
}
