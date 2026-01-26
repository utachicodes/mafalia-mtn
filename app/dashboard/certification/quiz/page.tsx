"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { basicQuizQuestions, expertQuizQuestions } from "../data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, AlertCircle, ArrowRight, ArrowLeft, CheckCircle, Award } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

function QuizContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { partner } = useAuth();

    // Determine Quiz Type
    const type = searchParams.get("type") === "expert" ? "expert" : "basic";
    const questions = type === "expert" ? expertQuizQuestions : basicQuizQuestions;
    const isExpert = type === "expert";

    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(isExpert ? 15 * 60 : 20 * 60); // 15 min for expert, 20 for basic
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [hasPassed, setHasPassed] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

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
        if (currentQuestionIndex < questions.length - 1) {
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
        questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const calculatedScore = (correctCount / questions.length) * 100;
        const passingScore = isExpert ? 80 : 75; // Higher bar for expert
        const passed = calculatedScore >= passingScore;

        setScore(calculatedScore);
        setHasPassed(passed);
        setIsSubmitted(true);

        if (passed) {
            // Save to localStorage
            const storageKey = isExpert ? "mafalia_expert_passed" : "mafalia_certification_passed";
            localStorage.setItem(storageKey, "true");
            localStorage.setItem(`${storageKey}_date`, new Date().toLocaleDateString("fr-FR"));

            // Save to Firestore if partner exists
            if (partner?.id) {
                try {
                    const partnerRef = doc(db, "partners", partner.id);
                    const updateData = isExpert
                        ? { isExpert: true, expertCertificationDate: Timestamp.now() }
                        : { isCertified: true, certificationDate: Timestamp.now() };

                    await updateDoc(partnerRef, updateData);
                    const badgeName = isExpert ? "Expert" : "Certifié";
                    toast.success(`Félicitations ! Vous avez obtenu le badge ${badgeName}.`);
                } catch (error) {
                    console.error("Error updating profile:", error);
                    toast.error("Erreur mise à jour profil, mais examen réussi.");
                }
            } else {
                toast.success("Félicitations ! Vous avez réussi l'examen.");
            }
        } else {
            toast.error("Score insuffisant. Veuillez réessayer.");
        }
    }, [answers, partner, questions, isExpert]);

    const handleFinish = () => {
        if (Object.keys(answers).length < questions.length) {
            const confirmSubmit = window.confirm("Questions manquantes. Terminer quand même ?");
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <Card className="w-full max-w-lg p-8 shadow-xl border-t-8 border-t-gray-900">
                    <CardHeader>
                        <div className={`mx-auto p-4 rounded-full mb-4 ${hasPassed ? "bg-green-100" : "bg-red-100"}`}>
                            {hasPassed ? (
                                isExpert ? <Award className="w-16 h-16 text-yellow-600" /> : <CheckCircle className="w-16 h-16 text-green-600" />
                            ) : (
                                <AlertCircle className="w-16 h-16 text-red-600" />
                            )}
                        </div>
                        <CardTitle className="text-3xl font-bold mb-2">
                            {hasPassed
                                ? (isExpert ? "Niveau Expert Validé !" : "Certification Réussie !")
                                : "Échec de l'examen"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-5xl font-black text-gray-900">
                            {score.toFixed(0)}%
                        </div>
                        <p className="text-gray-500 font-medium">
                            Score requis : {isExpert ? "80%" : "75%"}
                        </p>
                        <p className="text-lg text-gray-700">
                            {hasPassed
                                ? isExpert
                                    ? "Incroyable ! Vous maîtrisez parfaitement l'écosystème Mafalia."
                                    : "Bravo ! Vous êtes maintenant un partenaire officiel."
                                : "Ne lâchez rien. Révisez les points clés et réessayez."}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center gap-4 pt-4">
                        <Button onClick={handleExit} className={`${hasPassed ? "bg-green-600 hover:bg-green-700" : "bg-gray-800 hover:bg-gray-900"} w-full`}>
                            {hasPassed ? "Retour au tableau de bord" : "Retour"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    // Quiz View
    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        {isExpert ? "Examen Expert Mafalia" : "Certification Partenaire"}
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Question {currentQuestionIndex + 1} / {questions.length}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold ${timeLeft < 300 ? "bg-red-100 text-red-700 animate-pulse" : "bg-slate-100 text-slate-700"}`}>
                    <Clock className="w-4 h-4" />
                    {formatTime(timeLeft)}
                </div>
            </div>

            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full h-2 bg-gray-100" />

            <Card className="mt-6 border-0 shadow-md ring-1 ring-gray-200 min-h-[400px] flex flex-col">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
                        {currentQuestion.category}
                    </span>
                    <CardTitle className="text-xl leading-relaxed text-gray-800">
                        {currentQuestion.question}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                    <RadioGroup
                        value={answers[currentQuestion.id] || ""}
                        onValueChange={handleAnswer}
                        className="space-y-3"
                    >
                        {currentQuestion.options.map((option) => (
                            <div
                                key={option.id}
                                className={`flex items-start space-x-3 border-2 p-4 rounded-xl transition-all cursor-pointer hover:shadow-md ${answers[currentQuestion.id] === option.id
                                        ? "border-red-600 bg-red-50"
                                        : "border-transparent bg-slate-50 hover:bg-white hover:border-slate-200"
                                    }`}
                                onClick={() => handleAnswer(option.id)}
                            >
                                <RadioGroupItem value={option.id} id={`option-${option.id}`} className="mt-1" />
                                <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer font-medium text-gray-700 leading-relaxed">
                                    {option.text}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-slate-100 p-6 bg-slate-50/30">
                    <Button
                        variant="ghost"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="hover:bg-slate-100"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
                    </Button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
                            onClick={handleFinish}
                        >
                            Terminer <CheckCircle className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200"
                            onClick={handleNext}
                        >
                            Suivant <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

export default function QuizPage() {
    return (
        <Suspense fallback={<div>Chargement du quiz...</div>}>
            <QuizContent />
        </Suspense>
    );
}
