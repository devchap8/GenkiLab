import { useState } from "react";
import { useParams } from "react-router"
import data from "../data/dataIndex"
import validateVocab from "../scripts/validateVocab";
import QuizButton from "./QuizButton";

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

    function vocabMap(v) {
        let answer = params.quizType === "kana" ? v.reading : v.kanji;
        let entered;
        if(submitted) entered = params.quizType === "kana" ? entries[v.reading] : entries[v.kanji];

        if(params.quizType === "kanji" && !v.kanji) return;
        let isCorrect;
        if(submitted) isCorrect = validateVocab(entered, answer);
        return (
            <div className="p-2" key={v.id}>
                <label htmlFor={answer}>
                    {params.quizType === "kana" && <div className="text-lg font-bold">{v.kanji && `${v.kanji}`}</div>}
                    <div className={params.quizType === "kana" ? "text-text-dim" : "text-lg"}>{v.def}</div>
                    <input className={`focus:border-0 focus:outline-0 border-b-2 focus:border-b-genki-orange focus:border-b-2 ${!submitted ? "border-text-dim" : isCorrect ? "border-lime-500" : "border-red-500"}`} disabled={submitted} type="text" autoComplete="off" name={answer} id={answer}></input>
                    {submitted && <div className="">{isCorrect ? "✅" : "❌"}{answer}</div>}
                </label>
            </div>            
        )
    }

    return (
        <>
            <form className="grid grid-cols-1 items-end md:grid-cols-2 gap-5 text-text-main" onSubmit={submitted ? tryAgain : submitForm} onKeyDown={event => {if(event.key === "Enter") event.preventDefault()}}>
                {vocab.map(vocabMap)}
                <QuizButton text={submitted ? "Try Again" : "Submit Answers"} isSubmit={true} styles={"md:col-span-2"} />
            </form>
        </>
    )
}