import { useState } from "react";
import { useParams } from "react-router"
import data from "../data/dataIndex"
import validateVocab from "../scripts/validateVocab";

let entries;

export default function VocabKanjiQuiz() {
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
        if(!v.kanji) return;
        let isCorrect;
        if(submitted) isCorrect = validateVocab(entries[v.kanji], v.kanji);
        return (
            <div className="p-2" key={v.id}>
                <label htmlFor={v.kanji}>
                    <div className="text-lg">{v.def}</div>
                    <input className={`focus:border-0 focus:outline-0 border-b-2 focus:border-b-genki-orange focus:border-b-2 ${!submitted ? "border-text-dim" : isCorrect ? "border-lime-500" : "border-red-500"}`} disabled={submitted} type="text" autoComplete="off" name={v.kanji} id={v.kanji}></input>
                    {submitted && <div className="">{isCorrect ? "✅" : "❌"}{v.kanji}</div>}
                </label>
            </div>            
        )
    }

    return (
        <>
            <form className="grid grid-cols-1 items-end md:grid-cols-2 gap-5 text-text-main" onSubmit={submitted ? tryAgain : submitForm} onKeyDown={event => {if(event.key === "Enter") event.preventDefault()}}>
                {vocab.map(vocabMap)}
                <button className="md:col-span-2 bg-genki-orange text-bg-dark font-bold text-xl rounded-lg py-2 px-4 max-w-sm cursor-pointer ml-auto mr-auto" type="submit">{submitted ? "Try Again" : "Submit Answers"}</button>
            </form>
        </>
    )
}