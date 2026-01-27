
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, PlayCircle, Download } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { CertificateTemplate } from "./components/certificate-template";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Add missing imports
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function CertificationPage() {
    const router = useRouter();
    const { partner } = useAuth();
    const [isCertified, setIsCertified] = useState(false);
    const [certificationDate, setCertificationDate] = useState<string | null>(null);
    const [isExpert, setIsExpert] = useState(false);
    const [expertDate, setExpertDate] = useState<string | null>(null);
    const certificateRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        // Check local storage for certification status (fallback)
        // Ideally this synchs with Firestore partner data
        if (partner) {
            if (partner.isCertified) {
                setIsCertified(true);
                setCertificationDate(partner.certificationDate ? new Date(partner.certificationDate.seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString());
            }
            if (partner.isExpert) {
                setIsExpert(true);
                setExpertDate(partner.expertCertificationDate ? new Date(partner.expertCertificationDate.seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString());
            }
        }

        // Fallback to local storage if partner data isn't fully updated yet (client-side only flow)
        const storedStatus = localStorage.getItem("mafalia_certification_passed");
        const storedDate = localStorage.getItem("mafalia_certification_date");
        if (storedStatus === "true" && !partner?.isCertified) {
            setIsCertified(true);
            setCertificationDate(storedDate);
        }

        const storedExpert = localStorage.getItem("mafalia_expert_passed");
        const storedExpertDate = localStorage.getItem("mafalia_expert_date");
        if (storedExpert === "true" && !partner?.isExpert) {
            setIsExpert(true);
            setExpertDate(storedExpertDate);
        }

    }, [partner]);

    const handleStartQuiz = (type: 'basic' | 'expert') => {
        router.push(`/dashboard/certification/quiz?type=${type}`);
    };

    const handleDownloadCertificate = async () => {
        if (!certificateRef.current) {
            toast.error("Erreur technique : Le modèle de certificat est introuvable.");
            return;
        }

        setIsGenerating(true);
        toast.info("Génération du certificat en cours...");

        try {
            // Wait a brief moment to ensure rendering
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // Higher quality
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
                onclone: (clonedDoc) => {
                    // Ensure the cloned element is visible
                    const clonedElement = clonedDoc.getElementById('certificate-download');
                    if (clonedElement) {
                        clonedElement.style.display = 'flex';
                    }
                }
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("Certificat_Partenaire_Mafalia.pdf");

            toast.success("Certificat téléchargé avec succès !");
        } catch (err) {
            console.error("Error generating PDF", err);
            toast.error("Impossible de générer le certificat. Veuillez réessayer.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!partner) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Centre de Certification</h1>
                <p className="text-gray-600">
                    Validez vos compétences et obtenez vos badges officiels Mafalia.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Certification Card */}
                <Card className={`border-l-4 ${isCertified ? "border-l-green-500" : "border-l-red-600"} shadow-md flex flex-col h-full`}>
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant={isCertified ? "default" : "outline"} className={isCertified ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}>
                                {isCertified ? "Certifié" : "Niveau 1"}
                            </Badge>
                            {isCertified && <CheckCircle className="text-green-600 w-6 h-6" />}
                        </div>
                        <CardTitle className="text-xl">Partenaire Certifié</CardTitle>
                        <CardDescription>
                            Fondations, Vision et Outils Mafalia
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Infrastructure & Vision</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Segmentation Offres</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Lendia & Crédit</li>
                            </ul>
                        </div>

                        {isCertified ? (
                            <div className="text-center bg-green-50 p-4 rounded-lg border border-green-100">
                                <p className="text-green-800 font-medium mb-1">Certification Validée</p>
                                <p className="text-xs text-green-600">Obtenu le {certificationDate}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600 italic">
                                Score requis : 75% • 25 Questions
                            </p>
                        )}
                    </CardContent>
                    <CardContent className="pt-0 mt-auto">
                        {isCertified ? (
                            <Button
                                onClick={handleDownloadCertificate}
                                disabled={isGenerating}
                                variant="outline"
                                className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                            >
                                {isGenerating ? (
                                    <>Génération...</>
                                ) : (
                                    <>
                                        <Download className="mr-2 h-4 w-4" /> Télécharger Certificat
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button onClick={() => handleStartQuiz('basic')} className="w-full bg-red-600 hover:bg-red-700 text-white">
                                <PlayCircle className="mr-2 h-4 w-4" /> Commencer l'examen
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* Expert Certification Card */}
                <Card className={`border-l-4 ${isExpert ? "border-l-yellow-500" : "border-l-gray-300"} shadow-md flex flex-col h-full opacity-${isCertified ? '100' : '75'}`}>
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant={isExpert ? "default" : "outline"} className={isExpert ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" : ""}>
                                {isExpert ? "Expert" : "Niveau 2"}
                            </Badge>
                            {isExpert && <Award className="text-yellow-600 w-6 h-6" />}
                        </div>
                        <CardTitle className="text-xl">Partenaire Expert</CardTitle>
                        <CardDescription>
                            Maîtrise avancée et Argumentaire Expert
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>Inclusion Financière</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>Gestion des Objections</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>Services Avancés Hôtellerie</li>
                            </ul>
                        </div>

                        {isExpert ? (
                            <div className="text-center bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <p className="text-yellow-800 font-medium mb-1">Badge Expert Obtenu</p>
                                <p className="text-xs text-yellow-600">Obtenu le {expertDate}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600 italic">
                                Score requis : 80% • 10 Questions
                            </p>
                        )}

                        {!isCertified && !isExpert && (
                            <div className="flex items-center gap-2 text-xs text-red-600 font-medium bg-red-50 p-2 rounded">
                                <AlertCircle className="w-3 h-3" />
                                Prérequis : Valider le niveau 1
                            </div>
                        )}
                    </CardContent>
                    <CardContent className="pt-0 mt-auto">
                        {isExpert ? (
                            <Button disabled variant="secondary" className="w-full bg-yellow-100 text-yellow-800 opacity-100 cursor-default">
                                <Award className="mr-2 h-4 w-4" /> Badge Actif
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleStartQuiz('expert')}
                                disabled={!isCertified}
                                className={`w-full ${!isCertified ? 'bg-gray-200 text-gray-400' : 'bg-gray-900 hover:bg-black text-white'}`}
                            >
                                <PlayCircle className="mr-2 h-4 w-4" /> Passer l'examen Expert
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Info Section */}
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
                <CardHeader>
                    <CardTitle className="text-lg text-white">Pourquoi devenir Expert ?</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex gap-3">
                        <div className="bg-white/10 p-2 rounded-lg h-fit">
                            <Award className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-1">Badge Or Distinctif</h4>
                            <p className="text-xs text-slate-300">Démarquez-vous avec un badge Expert visible sur votre profil.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white/10 p-2 rounded-lg h-fit">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-1">Accès Prioritaire</h4>
                            <p className="text-xs text-slate-300">Accès aux nouvelles fonctionnalités et formations avancées en avant-première.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white/10 p-2 rounded-lg h-fit">
                            <PlayCircle className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-1">Meilleures Commissions</h4>
                            <p className="text-xs text-slate-300">Débloquez des paliers de commissions supérieurs (à venir).</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Hidden Certificate Template for PDF Generation */}
            <div className="absolute top-[-9999px] left-[-9999px]">
                <CertificateTemplate
                    ref={certificateRef}
                    partnerName={`${partner.firstName} ${partner.lastName}`}
                    date={certificationDate || new Date().toLocaleDateString()}
                    partnerId={partner.id || "ID-UNKNOWN"}
                />
            </div>
        </div>
    );
}

// Add missing imports
