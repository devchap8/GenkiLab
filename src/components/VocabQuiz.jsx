import { useParams } from "react-router";
import VocabMatchQuiz from "./VocabMatchQuiz";
import VocabWriteInQuiz from "./VocabWriteInQuiz";

const quizMatch = {
    kana: <VocabWriteInQuiz />,
    kanji: <VocabWriteInQuiz />,
    match: <VocabMatchQuiz />
};

const quizExplanations = {
    kana: "Write the hiragana or katakana reading for each word. Special characters like `~` and anything inside parenthesis can be omitted.",
    kanji: "Write in the kanji for each word's definition. Special characters like `~` and anything inside parenthesis can be omitted. For words with multiple different kanji, either kanji can be written.",
    match: "Drag and drop each definition into the box next to it's corresponding reading, or click a definition to select it and click a box to drop it in."
}

const quizTypeNames = {
    kana: "Kana Write-In",
    kanji: "Kanji Write-In",
    match: "Match Definition to Reading"
}

const firstThree = ["L0", "L1", "L2"]; 

export default function VocabQuiz({}) {
    const params = useParams();

    return (
        <div className="bg-bg-main h-full flex flex-col items-center p-5 gap-6">

            <div className="text-text-main font-bold text-3xl">第{params.chapter.replace("L", "")}課 Vocab Quiz: {params.subsect}</div>
            <div className="bg-genki-orange flex flex-1 flex-col max-w-150 max-h-fit p-3">
                <div className="text-bg-dark font-bold text-lg">{quizTypeNames[params.quizType]}</div>
                <div className="text-bg-main">{quizExplanations[params.quizType]}</div>
            </div>

            {!firstThree.includes(params.chapter) && <div className="text-xs sm:text-base flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="text-text-main text-lg">Quiz Type:</div>
                <div className="inline-flex rounded-md border border-bg-dim overflow-hidden divide-x divide-bg-dim">
                    <a className={`px-3 py-1.5 transition-colors duration-200 ${params.quizType === "match" ? "bg-genki-orange text-bg-dark font-semibold" : "text-text-dim hover:text-text-main hover:bg-bg-second"}`} href={`/vocabQuiz/${params.chapter}/${params.subsect}/match`}>Match Definition</a>
                    <a className={`px-3 py-1.5 transition-colors duration-200 ${params.quizType === "kana" ? "bg-genki-orange text-bg-dark font-semibold" : "text-text-dim hover:text-text-main hover:bg-bg-second"}`} href={`/vocabQuiz/${params.chapter}/${params.subsect}/kana`}>Write Kana</a>
                    <a className={`px-3 py-1.5 transition-colors duration-200 ${params.quizType === "kanji" ? "bg-genki-orange text-bg-dark font-semibold" : "text-text-dim hover:text-text-main hover:bg-bg-second"}`} href={`/vocabQuiz/${params.chapter}/${params.subsect}/kanji`}>Write Kanji</a>
                </div>
            </div>}

            <div className="bg-bg-second max-w-250 w-full p-3">
                {quizMatch[params.quizType]} 
            </div>               
        </div>
    )
}