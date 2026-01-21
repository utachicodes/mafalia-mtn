import { Video, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PresentationsPage() {
    const presentations = [
        {
            id: 1,
            title: "Présentation Mafalia - Introduction",
            duration: "15:00",
            thumbnail: "/images/video-thumb-1.jpg",
            date: "12 Jan 2025"
        },
        {
            id: 2,
            title: "Formation Avancée - Techniques de Vente",
            duration: "45:30",
            thumbnail: "/images/video-thumb-2.jpg",
            date: "14 Jan 2025"
        },
        {
            id: 3,
            title: "Démonstration Plateforme",
            duration: "20:15",
            thumbnail: "/images/video-thumb-3.jpg",
            date: "15 Jan 2025"
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                        Présentations Virtuelles
                    </h2>
                    <p className="text-gray-500">
                        Retrouvez toutes les présentations et tutoriels pour vous accompagner
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {presentations.map((video) => (
                    <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                            {/* Fallback pattern if no image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button size="icon" className="rounded-full w-12 h-12 bg-white/90 text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-lg">
                                    <Play className="w-5 h-5 ml-1" fill="currentColor" />
                                </Button>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
                                {video.duration}
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-semibold text-gray-800 line-clamp-2">
                                    {video.title}
                                </h3>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Video className="w-4 h-4" />
                                    <span>Présentation</span>
                                </div>
                                <span>{video.date}</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50">
                                <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                                    Regarder maintenant
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
