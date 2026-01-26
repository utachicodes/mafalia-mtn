
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "../data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, AlertCircle, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

export default function QuizPage() {
    const router = useRouter();
    const { partner } = useAuth();

    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [hasPassed, setHasPassed] = useState(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((Object.keys(answers).length) / quizQuestions.length) * 100;

    // Timer Effect
    useEffect(() => {
        if (isSubmitted) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isSubmitted]);

    // Format Time
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    // Handle Answer Selection
    const handleAnswer = (value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: value,
        }));
    };

    // Navigation
    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    // Submission Logic
    const handleSubmit = useCallback(async () => {
        let correctCount = 0;
        quizQuestions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const calculatedScore = (correctCount / quizQuestions.length) * 100;
        const passed = calculatedScore >= 75;

        setScore(calculatedScore);
        setHasPassed(passed);
        setIsSubmitted(true);

        if (passed) {
            // Save to localStorage
            localStorage.setItem("mafalia_certification_passed", "true");
            localStorage.setItem("mafalia_certification_date", new Date().toLocaleDateString("fr-FR"));

            // Save to Firestore if partner exists
            if (partner?.id) {
                try {
                    const partnerRef = doc(db, "partners", partner.id);
                    await updateDoc(partnerRef, {
                        isCertified: true,
                        certificationDate: Timestamp.now()
                    });
                    toast.success("Félicitations ! Vous êtes certifié et votre profil a été mis à jour.");
                } catch (error) {
                    console.error("Error updating profile:", error);
                    toast.error("Erreur lors de la mise à jour du profil, mais l'examen est réussi.");
                }
            } else {
                toast.success("Félicitations ! Vous avez réussi l'examen.");
            }
        } else {
            toast.error("Vous n'avez pas atteint le score minimum. Veuillez réessayer.");
        }
    }, [answers, partner]);

    const handleFinish = () => {
        // Check if all questions are answered
        if (Object.keys(answers).length < quizQuestions.length) {
            const confirmSubmit = window.confirm("Vous n'avez pas répondu à toutes les questions. Voulez-vous vraiment terminer ?");
            if (!confirmSubmit) return;
        }
        handleSubmit();
    };

    const handleExit = () => {
        router.push("/dashboard/certification");
    };

    // Result View
    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <Card className="w-full max-w-lg text-center p-6 shadow-lg">
                    <CardHeader>
                        <div className={`mx-auto p-4 rounded-full mb-4 ${hasPassed ? "bg-green-100" : "bg-red-100"}`}>
                            {hasPassed ? <CheckCircle className="w-12 h-12 text-green-600" /> : <AlertCircle className="w-12 h-12 text-red-600" />}
                        </div>
                        <CardTitle className="text-2xl">{hasPassed ? "Certification Réussie !" : "Échec de la Certification"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-4xl font-bold mb-2">
                            {score.toFixed(0)}%
                        </div>
                        <p className="text-gray-600">
                            Score minimum requis : 75%
                        </p>
                        <p className="text-sm">
                            {hasPassed
                                ? "Bravo ! Vous êtes maintenant un partenaire commercial certifié Mafalia."
                                : "Vous n'avez pas obtenu le score nécessaire. Prenez le temps de réviser les supports de formation avant de réessayer."}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center gap-4">
                        {hasPassed ? (
                            <Button onClick={handleExit} className="bg-red-600 hover:bg-red-700 w-full">
                                Obtenir mon certificat
                            </Button>
                        ) : (
                            <div className="flex flex-col w-full gap-2">
                                <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                                    Réessayer
                                </Button>
                                <Button onClick={handleExit} variant="ghost" className="w-full">
                                    Retour au tableau de bord
                                </Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>
        );
    }

    // Quiz View
    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            {/* Header Info */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-semibold">Examen de Certification</h1>
                    <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} sur {quizQuestions.length}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-medium ${timeLeft < 300 ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700"}`}>
                    <Clock className="w-4 h-4" />
                    {formatTime(timeLeft)}
                </div>
            </div>

            <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="w-full h-2" />

            {/* Question Card */}
            <Card className="mt-6 border-t-4 border-t-red-600 shadow-sm min-h-[400px] flex flex-col">
                <CardHeader>
                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
                        {currentQuestion.category}
                    </span>
                    <CardTitle className="text-xl leading-relaxed">
                        {currentQuestion.question}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <RadioGroup
                        value={answers[currentQuestion.id] || ""}
                        onValueChange={handleAnswer}
                        className="space-y-4"
                    >
                        {currentQuestion.options.map((option) => (
                            <div key={option.id} className={`flex items-center space-x-2 border p-4 rounded-lg transition-colors cursor-pointer hover:bg-slate-50 ${answers[currentQuestion.id] === option.id ? "border-red-500 bg-red-50" : "border-gray-200"}`}>
                                <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                                <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer font-normal text-base">
                                    {option.text}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
                    </Button>

                    {currentQuestionIndex === quizQuestions.length - 1 ? (
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleFinish}
                        >
                            Terminer l'examen <CheckCircle className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleNext}
                        >
                            Suivant <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </CardFooter>
            </Card>

            {/* Alert if skipping questions (optional visual cue) */}
            {!answers[currentQuestion.id] && (
                <p className="text-xs text-center text-gray-400 italic">
                    Veuillez sélectionner une réponse pour continuer.
                </p>
            )}
        </div>
    );
}
