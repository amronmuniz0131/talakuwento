import React, { useState, useEffect } from 'react';

interface QuizData {
    question: string;
    choices: string[];
    answerKey: number; // index of the correct choice
}

interface QuizProps {
    quiz: QuizData;
}

// --- shared score registry: all Quiz instances on the same route pool their results ---
type Results = Map<string, boolean | null>; // question -> correct? (null = not yet answered)

let currentPath = '';
let results: Results = new Map();
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((l) => l());

function ensurePath() {
    const path = window.location.pathname;
    if (path !== currentPath) {
        currentPath = path;
        results = new Map();
    }
}

function useScore() {
    const [, setTick] = useState(0);
    useEffect(() => {
        const listener = () => setTick((t) => t + 1);
        listeners.add(listener);
        return () => { listeners.delete(listener); };
    }, []);
    const values = Array.from(results.values());
    return {
        total: values.length,
        correct: values.filter((v) => v === true).length,
        answered: values.filter((v) => v !== null).length,
    };
}
// --- end registry ---

function Quiz({ quiz }: QuizProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const score = useScore();

    // register this question once (idempotent, safe under StrictMode double-mount)
    useEffect(() => {
        ensurePath();
        if (!results.has(quiz.question)) {
            results.set(quiz.question, null);
            notify();
        }
    }, [quiz.question]);

    const handleSelect = (index: number) => {
        if (answered) return;
        setSelected(index);
        setAnswered(true);
        setShowResult(true);

        // first attempt only is recorded
        ensurePath();
        if (results.get(quiz.question) === null) {
            results.set(quiz.question, index === quiz.answerKey);
            notify();
        }
    };

    const handleRetry = () => {
        setSelected(null);
        setAnswered(false);
        setShowResult(false);
    };

    const allDone = score.total > 0 && score.answered === score.total;
    const finalMessage =
        score.correct === score.total
            ? 'Perpekto! Nakuha mo lahat!'
            : score.correct >= score.total / 2
                ? 'Ang galing mo!'
                : 'Nice try! Basahin muli ang kuwento.';

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

            {/* Final score card: appears once every quiz question on this story is answered */}
            {allDone && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 flex flex-col items-center gap-3">
                        <p className="text-2xl font-extrabold text-gray-800">Final na Iskor</p>
                        <p className="text-6xl font-extrabold text-orange-500">
                            {score.correct}<span className="text-gray-400 text-4xl">/{score.total}</span>
                        </p>
                        <p className="text-lg font-semibold text-gray-600">{finalMessage}</p>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
                        >
                            Tapusin
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
