import { useParams } from "react-router";
import VocabKanaQuiz from "./VocabKanaQuiz";
import VocabKanjiQuiz from "./VocabKanjiQuiz";
import VocabMatchQuiz from "./VocabMatchQuiz";

const quizMatch = {
    kana: <VocabKanaQuiz />,
    kanji: <VocabKanjiQuiz />,
    match: <VocabMatchQuiz />
};

export default function VocabQuiz({}) {
    const params = useParams();

    return (
        <div className="bg-bg-main h-full flex flex-col items-center p-5 gap-6">
            <div className="text-text-main font-bold text-3xl">第{params.chapter.replace("L", "")}課 Vocab Quiz: {params.subsect}</div>
            <div className="bg-genki-orange flex flex-1 flex-col max-w-150 max-h-fit p-3">
                <div className="text-bg-dark font-bold text-lg">Quiz Type Here</div>
                <div className="text-bg-main">Quiz explanation here: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, mollitia?</div>
            </div>
            <div>
                <div className="inline-block mr-5 text-text-main text-lg">Quiz Type:</div>
                <a className={`px-3 py-2 ${params.quizType === "kana" ?  "bg-genki-orange" : "bg-bg-dim opacity-90"} rounded-l-lg`} href={`/vocabQuiz/${params.chapter}/${params.subsect}/kana`}>Write Kana</a>
                <a className={`px-3 py-2 ${params.quizType === "kanji" ? "bg-genki-orange" : "bg-bg-dim opacity-90"}`}              href={`/vocabQuiz/${params.chapter}/${params.subsect}/kanji`}>Write Kanji</a>
                <a className={`px-3 py-2 ${params.quizType === "match" ? "bg-genki-orange" : "bg-bg-dim opacity-90"} rounded-r-lg`} href={`/vocabQuiz/${params.chapter}/${params.subsect}/match`}>Match Definition</a>
            </div>
            {quizMatch[params.quizType]}    
        </div>
    )
}