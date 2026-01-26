import { FileText, Download, Briefcase, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SalesToolsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                    Outils de Vente
                </h2>
                <p className="text-gray-500">
                    Tout ce dont vous avez besoin pour promouvoir MaFalia
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Plaquette Mafalia Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative overflow-hidden">
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <div className="p-3 bg-white/10 rounded-xl w-fit mb-4">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Plaquette Mafalia</h3>
                                <p className="text-red-100 text-sm">Présentation officielle et supports visuels</p>
                            </div>
                        </div>
                        {/* Decorative pattern */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-black/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50">
                                <div className="w-16 h-20 bg-white shadow-sm border border-gray-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-bold text-red-600">PDF</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">Plaquette Partenaire 2025</h4>
                                    <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                                </div>
                                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-red-600">
                                    <Download className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="w-full justify-between group hover:border-red-200 hover:bg-red-50 hover:text-red-700" asChild>
                                    <a href="/documents/BROCHURE_COMMERCIALE_MAFALIA.pdf" target="_blank" rel="noopener noreferrer">
                                        Aperçu
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                                    </a>
                                </Button>
                                <Button className="w-full justify-between bg-red-600 hover:bg-red-700 text-white group" asChild>
                                    <a href="/documents/BROCHURE_COMMERCIALE_MAFALIA.pdf" download="BROCHURE_COMMERCIALE_MAFALIA.pdf">
                                        Télécharger
                                        <Download className="w-4 h-4 text-red-100 group-hover:text-white" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
