import { useState } from "react";
import { useParams } from "react-router"
import data from "../data/dataIndex"
import validateVocab from "../scripts/validateVocab";

let entries;

export default function VocabWriteInQuiz() {
    const params = useParams();
    const [submitted, setSubmitted] = useState(false);
    const vocab = data.vocab[params.chapter].filter(v => v.subsect === params.subsect);

    function submitForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        entries = Object.fromEntries(formData.entries());
        setSubmitted(true);
        window.scrollTo(0, 350);
    }
    function tryAgain(event) {
        event.preventDefault();
        setSubmitted(false);
        window.scrollTo(0, 350);
    }

    function vocabMap(v, i) {
        let answer = params.quizType === "kana" ? v.reading : v.kanji;
        let entered;
        if(submitted) entered = params.quizType === "kana" ? entries[v.reading] : entries[v.kanji];

        if(params.quizType === "kanji" && !v.kanji) return;
        let isCorrect;
        if(submitted) isCorrect = validateVocab(entered, answer);

        const rowTint = submitted
            ? (isCorrect ? "bg-lime-500/10" : "bg-red-500/10")
            : (i % 2 === 0 ? "bg-bg-second/40" : "");

        return (
            <tr className={`transition-colors ${rowTint}`} key={v.id}>
                <td className="px-4 py-2 text-left align-middle text-text-main">{v.def}</td>
                {params.quizType === "kana" && <td className="px-4 py-2 text-center align-middle text-lg font-medium text-text-main">{v.kanji}</td>}
                <td className="px-2 py-2 align-middle">
                    <div className="flex items-center justify-center gap-2">
                        <label className="sr-only" htmlFor={answer}>{answer}</label>
                        <input
                            className={`w-28 sm:w-40 rounded border px-2 py-1 text-center bg-bg-main text-text-main focus:outline-none focus:border-genki-orange transition-colors ${!submitted ? "border-bg-dim" : isCorrect ? "border-lime-500" : "border-red-500"}`}
                            disabled={submitted}
                            type="text"
                            autoComplete="off"
                            name={answer}
                            id={answer}
                        ></input>
                        {submitted && <span className={`text-sm ${isCorrect ? "text-lime-500" : "text-red-500"}`}>{isCorrect ? "✓" : `✗ ${answer}`}</span>}
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <form className="text-text-main" onSubmit={submitted ? tryAgain : submitForm} onKeyDown={event => {if(event.key === "Enter") event.preventDefault()}}>
            <div className="w-full mx-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b-2 border-genki-orange">
                            <th className="px-4 py-2 text-left text-sm font-semibold text-text-dim">Definition</th>
                            {params.quizType === "kana" && <th className="px-4 py-2 text-center text-sm font-semibold text-text-dim">Kanji</th>}
                            <th className="px-4 py-2 text-center text-sm font-semibold text-text-dim">Your Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocab.map(vocabMap)}
                    </tbody>
                </table>
            </div>
            <button
                className="mt-6 bg-genki-orange hover:bg-genki-light text-bg-dark transition-colors duration-200 font-semibold rounded-md text-lg py-2 px-4 max-w-sm cursor-pointer mx-auto block"
                type="submit"
                >
                {submitted ? "Try Again" : "Submit Answers"}
            </button>
        </form>
    )
}
