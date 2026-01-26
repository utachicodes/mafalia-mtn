
"use client";

import React, { forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { MafaliaLogo } from '@/components/mafalia-logo';

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
                className="w-[800px] h-[600px] bg-white p-12 border-4 border-double border-red-600 relative flex flex-col items-center justify-between mx-auto"
                id="certificate-download"
                style={{ fontFamily: 'Times New Roman, serif' }}
            >
                {/* Top Border Line */}
                <div className="absolute top-8 left-12 right-12 h-0.5 bg-red-600"></div>

                {/* Logo */}
                <div className="mt-8 mb-4 scale-150">
                    <MafaliaLogo />
                </div>

                {/* Title */}
                <div className="text-center space-y-2 mt-4">
                    <h1 className="text-2xl font-bold text-red-800 tracking-wider uppercase">
                        Certificat de Partenaire Commercial
                    </h1>
                    <div className="w-1/2 h-px bg-red-600 mx-auto my-4"></div>
                    <p className="text-gray-600 italic">Mafalia certifie que</p>
                </div>

                {/* Name */}
                <div className="text-center my-6">
                    <h2 className="text-4xl font-bold text-red-900 font-serif italic mb-4">
                        {partnerName}
                    </h2>
                    <div className="w-3/4 h-px bg-gray-300 mx-auto"></div>
                </div>

                {/* Body Text */}
                <div className="text-center max-w-2xl space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        a validé avec succès le parcours de certification officiel
                        et répond aux exigences de qualité, de professionnalisme
                        et de représentation de l’écosystème Mafalia.
                    </p>
                    <p className="font-medium">
                        Ce certificat atteste de sa capacité à accompagner les commerces
                        dans leur transformation numérique via l’infrastructure Mafalia.
                    </p>
                </div>

                {/* Footer Section */}
                <div className="w-full flex justify-between items-end mt-12 px-8">
                    {/* Signature */}
                    <div className="flex flex-col items-center">
                        {/* Creating a signature-like font appearance or using an image if available. 
                 For now, we'll use a cursive font style text. */}
                        <div className="font-[cursive] text-3xl text-gray-800 mb-2" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                            Mafalia
                        </div>
                        <div className="w-32 h-px bg-gray-800"></div>
                        <p className="text-sm font-bold text-gray-800 mt-1">Mafalia</p>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col items-start space-y-2 text-sm text-gray-600">
                        <p>Délivré le : <span className="font-bold text-gray-800">{date}</span></p>
                        <p>Identifiant partenaire : <span className="font-bold text-gray-800">{partnerId}</span></p>
                    </div>

                    {/* QR Code */}
                    <div className="border-2 border-red-600 p-1">
                        <QRCodeCanvas
                            value={`https://mafalia.com/verify/${partnerId}`}
                            size={80}
                            fgColor="#dc2626"
                        />
                    </div>
                </div>

                {/* Bottom Border Line */}
                <div className="absolute bottom-8 left-12 right-12 h-0.5 bg-red-600"></div>
            </div>
        );
    }
);

CertificateTemplate.displayName = "CertificateTemplate";
