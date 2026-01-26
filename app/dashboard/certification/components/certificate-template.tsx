"use client";

import React, { forwardRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { MafaliaLogo } from "@/components/mafalia-logo";

interface CertificateTemplateProps {
    partnerName: string;
    date: string;
    partnerId: string;
}

export const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
    ({ partnerName, date, partnerId }, ref) => {
        return (
            <div
                ref={ref}
                className="w-[800px] h-[600px] bg-white relative flex flex-col items-center justify-between mx-auto overflow-hidden"
                id="certificate-download"
                style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
            >
                {/* Background Pattern - Subtle Guilloche-like effect */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: "radial-gradient(#dc2626 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                }}></div>

                {/* Decorative Frame */}
                <div className="absolute inset-4 border border-gray-200 z-10"></div>
                <div className="absolute inset-6 border-[3px] border-double border-red-800/20 z-10"></div>

                {/* Corner Decorations */}
                <div className="absolute top-6 left-6 w-16 h-16 border-t-[3px] border-l-[3px] border-red-700 z-20"></div>
                <div className="absolute top-6 right-6 w-16 h-16 border-t-[3px] border-r-[3px] border-red-700 z-20"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 border-b-[3px] border-l-[3px] border-red-700 z-20"></div>
                <div className="absolute bottom-6 right-6 w-16 h-16 border-b-[3px] border-r-[3px] border-red-700 z-20"></div>

                {/* Header Section */}
                <div className="relative z-30 pt-16 flex flex-col items-center w-full">
                    <div className="mb-6 transform scale-125">
                        <MafaliaLogo />
                    </div>

                    <div className="text-center space-y-3">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-wider uppercase" style={{ letterSpacing: '0.15em' }}>
                            Certificat de Partenaire
                        </h1>
                        <div className="flex items-center gap-4 justify-center opacity-60">
                            <div className="h-px w-16 bg-red-600"></div>
                            <span className="text-red-700 uppercase tracking-widest text-xs font-semibold">Officiel</span>
                            <div className="h-px w-16 bg-red-600"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-30 flex-1 flex flex-col items-center justify-center w-full max-w-3xl px-12 text-center">
                    <p className="text-gray-500 italic text-lg mb-8 font-sans">
                        Ce document certifie officiellement que
                    </p>

                    <div className="relative w-full mb-8">
                        <h2 className="text-5xl font-bold text-gray-900 font-serif italic mb-2 relative z-10 px-8 py-2">
                            {partnerName}
                        </h2>
                        {/* Underline decorative */}
                        <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent mx-auto absolute bottom-0 left-0 right-0"></div>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto font-sans">
                        a validé avec succès le parcours de certification <strong className="text-gray-900">Mafalia Partner Network</strong>.
                        <br />
                        En conséquence, il/elle est habilité(e) à accompagner la transformation
                        numérique des commerces et à représenter l'écosystème Mafalia.
                    </p>
                </div>

                {/* Footer Section */}
                <div className="relative z-30 w-full px-16 pb-16 flex items-end justify-between">
                    {/* Signature */}
                    <div className="flex flex-col items-center relative">
                        {/* Simulated Signature */}
                        <div className="font-[cursive] text-4xl text-gray-800 mb-2 rotate-[-5deg] relative z-10" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                            L'Équipe Mafalia
                        </div>
                        <div className="w-40 h-px bg-gray-400"></div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mt-2 font-sans">Signature Autorisée</p>
                    </div>

                    {/* Seal / Badge Center */}
                    <div className="absolute left-1/2 bottom-12 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-red-100 bg-white flex items-center justify-center shadow-sm">
                            <div className="w-20 h-20 rounded-full border border-red-200 flex items-center justify-center bg-red-50">
                                <span className="text-red-800 text-xs font-bold text-center uppercase leading-tight">
                                    Certifié<br />Conforme
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* QR Code & Metadata */}
                    <div className="flex items-center gap-4">
                        <div className="text-right text-xs text-gray-400 font-sans space-y-1">
                            <p>DATE: <span className="text-gray-600 font-medium">{date}</span></p>
                            <p>ID: <span className="text-gray-600 font-medium font-mono">{partnerId}</span></p>
                            <p>VERIFY AT: <span className="text-red-600">mafalia.com/verify</span></p>
                        </div>
                        <div className="p-1.5 bg-white border border-gray-200 shadow-sm rounded-sm">
                            <QRCodeCanvas
                                value={`https://mafalia.com/verify/${partnerId}`}
                                size={70}
                                fgColor="#1f2937"
                                level="H"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

CertificateTemplate.displayName = "CertificateTemplate";
