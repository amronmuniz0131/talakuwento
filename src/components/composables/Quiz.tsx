import React, { useState } from 'react';

interface QuizData {
    question: string;
    choices: string[];
    answerKey: number; // index of the correct choice
}

interface QuizProps {
    quiz: QuizData;
}

function Quiz({ quiz }: QuizProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (index: number) => {
        if (answered) return;
        setSelected(index);
        setAnswered(true);
        setShowResult(true);
    };

    const handleRetry = () => {
        setSelected(null);
        setAnswered(false);
        setShowResult(false);
    };

    return (
        <div className="h-screen w-screen bg-blue-400 flex flex-col items-center justify-end pb-24 gap-8 px-16">
            <h2 className="text-3xl font-bold text-white text-center drop-shadow-md">{quiz.question}</h2>

            <div className="grid grid-cols-2 gap-6 w-3/4">
                {quiz.choices.map((choice, index) => {
                    const isCorrect = showResult && index === quiz.answerKey;
                    const isWrong = showResult && index === selected && index !== quiz.answerKey;
                    return (
                        <button
                            key={index}
                            onClick={(e) => { e.stopPropagation(); handleSelect(index); }}
                            className={`px-6 py-4 rounded-xl shadow-md text-left text-lg font-semibold transition-all duration-300 ${isCorrect ? 'bg-green-400 text-white scale-105' : isWrong ? 'bg-red-400 text-white' : 'bg-white hover:bg-white/80'}`}
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>

            {showResult && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xl font-bold text-white">
                        {selected === quiz.answerKey
                            ? 'Tama! Congrats!'
                            : `Mali! Ang tamang sagot ay: ${quiz.choices[quiz.answerKey]}`}
                    </p>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleRetry(); }}
                        className="bg-white px-6 py-2 rounded-xl font-semibold shadow-md"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
