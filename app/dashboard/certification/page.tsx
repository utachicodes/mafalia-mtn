
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

export default function CertificationPage() {
    const router = useRouter();
    const { partner } = useAuth();
    const [isCertified, setIsCertified] = useState(false);
    const [certificationDate, setCertificationDate] = useState<string | null>(null);
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check local storage for certification status
        // In a real app, this should come from the backend (Firestore)
        const storedStatus = localStorage.getItem("mafalia_certification_passed");
        const storedDate = localStorage.getItem("mafalia_certification_date");

        if (storedStatus === "true") {
            setIsCertified(true);
            setCertificationDate(storedDate);
        }
    }, []);

    const handleStartQuiz = () => {
        router.push("/dashboard/certification/quiz");
    };

    const handleDownloadCertificate = async () => {
        if (!certificateRef.current) return;

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // Higher quality
                useCORS: true,
                backgroundColor: "#ffffff"
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
        } catch (err) {
            console.error("Error generating PDF", err);
        }
    };

    if (!partner) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Certification Partenaire Commercial</h1>
                <p className="text-gray-600">
                    Validez vos compétences et obtenez votre badge certifié Mafalia.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Status Card */}
                <Card className="lg:col-span-2 border-l-4 border-l-red-600 shadow-md">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl">Statut de Certification</CardTitle>
                                <CardDescription className="mt-2">
                                    Quiz de Certification Partenaire Commercial Mafalia
                                </CardDescription>
                            </div>
                            {isCertified ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 text-sm gap-1">
                                    <CheckCircle className="w-4 h-4" /> Certifié
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-gray-500 gap-1">
                                    Non Certifié
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isCertified ? (
                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <h3 className="font-semibold mb-2">Détails de l'examen</h3>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                        <li>Durée : <strong>20 minutes</strong></li>
                                        <li>Questions : <strong>25 questions</strong> (QCM)</li>
                                        <li>Score minimum : <strong>75%</strong></li>
                                        <li>Validité : <strong>12 mois</strong></li>
                                    </ul>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Ce quiz vise à valider votre compréhension de Mafalia comme infrastructure numérique complète.
                                    Vous serez testé sur la vision, la segmentation des offres, l'IA, Lendia, et les techniques de vente.
                                </p>
                                <Button onClick={handleStartQuiz} size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                                    <PlayCircle className="mr-2 h-5 w-5" />
                                    Commencer le Quiz
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="bg-green-50 p-6 rounded-lg border border-green-100 flex flex-col items-center justify-center text-center">
                                    <Award className="w-16 h-16 text-green-600 mb-4" />
                                    <h3 className="text-xl font-bold text-green-800 mb-2">Félicitations, vous êtes certifié !</h3>
                                    <p className="text-green-700 mb-4">
                                        Vous avez validé avec succès le parcours de certification officiel.
                                    </p>
                                    <p className="text-sm text-gray-600 mb-6">
                                        Certificat délivré le : {certificationDate}
                                    </p>
                                    <Button onClick={handleDownloadCertificate} variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                                        <Download className="mr-2 h-4 w-4" />
                                        Télécharger mon certificat PDF
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Info / Benefits Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Pourquoi se certifier ?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-3">
                            <div className="bg-red-100 p-2 rounded-full h-fit">
                                <Award className="w-5 h-5 text-red-700" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Badge Officiel</h4>
                                <p className="text-xs text-gray-500 mt-1">Obtenez le badge "Partenaire Certifié" visible sur votre profil.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-blue-100 p-2 rounded-full h-fit">
                                <CheckCircle className="w-5 h-5 text-blue-700" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Crédibilité Accrue</h4>
                                <p className="text-xs text-gray-500 mt-1">Rassurez vos prospects avec une certification officielle Mafalia.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Hidden Certificate Template for PDF Generation */}
            <div className="overflow-hidden h-0 w-0">
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
