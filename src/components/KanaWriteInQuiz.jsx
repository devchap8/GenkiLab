import { useState, useMemo } from "react";
import KanaQuizCell from "./KanaQuizCell";

function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function KanaWriteInQuiz({tables}) {
    const flatKana = useMemo(() =>
        tables.flatMap(t => t.rows.flatMap(r => r.cells))
            .filter(Boolean)
            .map(([kana, romaji, alts]) => ({kana, romaji, alts: alts ?? []})),
        [tables]
    );

    const [seed, setSeed] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState([]);

    // seed is bumped by tryAgain to force a reshuffle
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const quizList = useMemo(() => shuffle(flatKana), [flatKana, seed]);

    function submitForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newResults = quizList.map((item, i) => {
            const entered = (formData.get(`k${i}`) ?? "").trim().toLowerCase();
            const accepted = [item.romaji, ...item.alts].map(r => r.toLowerCase());
            return accepted.includes(entered);
        });
        setResults(newResults);
        setSubmitted(true);
    }

    function tryAgain(event) {
        event.preventDefault();
        setSubmitted(false);
        setSeed(seed + 1);
    }

    const correctCount = results.filter(Boolean).length;

    return (
        <form
            className="flex flex-col items-center gap-6"
            onSubmit={submitted ? tryAgain : submitForm}
            onKeyDown={event => {if(event.key === "Enter") event.preventDefault()}}
        >
            <div key={seed} className="grid grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-3 w-full">
                {quizList.map((item, i) =>
                    <KanaQuizCell
                        key={i}
                        kana={item.kana}
                        romaji={item.romaji}
                        name={`k${i}`}
                        submitted={submitted}
                        isCorrect={results[i]}
                    />
                )}
            </div>
            {submitted && <div className="text-text-main">{correctCount} / {quizList.length} correct</div>}
            <button
                className="bg-genki-orange hover:bg-genki-light text-bg-dark transition-colors duration-200 font-semibold rounded-md text-lg py-2 px-4 max-w-sm cursor-pointer"
                type="submit"
            >
                {submitted ? "Try Again" : "Grade"}
            </button>
        </form>
    )
}
