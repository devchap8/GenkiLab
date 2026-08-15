import { useParams } from "react-router";
import VocabMatchQuiz from "./VocabMatchQuiz";
import VocabWriteInQuiz from "./VocabWriteInQuiz";

const quizMatch = {
    kana: <VocabWriteInQuiz />,
    kanji: <VocabWriteInQuiz />,
    match: <VocabMatchQuiz />
};

const firstThree = ["L0", "L1", "L2"]; 

export default function VocabQuiz({}) {
    const params = useParams();

    return (
        <div className="bg-bg-main h-full flex flex-col items-center p-5 gap-6">

            <div className="text-text-main font-bold text-3xl">第{params.chapter.replace("L", "")}課 Vocab Quiz: {params.subsect}</div>
            <div className="bg-genki-orange flex flex-1 flex-col max-w-150 max-h-fit p-3">
                <div className="text-bg-dark font-bold text-lg">Quiz Type Here</div>
                <div className="text-bg-main">Quiz explanation here: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, mollitia?</div>
            </div>

            {!firstThree.includes(params.chapter) && <div className="text-xs sm:text-base">
                <div className="md:inline-block text-center pb-3 md:pb-0 md:mr-5 text-text-main text-lg">Quiz Type:</div>
                <a className={`px-3 py-2 ${params.quizType === "match" ?  "bg-genki-orange" : "bg-bg-dim opacity-90"} rounded-l-lg`} href={`/vocabQuiz/${params.chapter}/${params.subsect}/match`}>Match Definition</a>
                <a className={`px-3 py-2 ${params.quizType === "kana" ? "bg-genki-orange" : "bg-bg-dim opacity-90"}`}              href={`/vocabQuiz/${params.chapter}/${params.subsect}/kana`}>Write Kana</a>
                <a className={`px-3 py-2 ${params.quizType === "kanji" ? "bg-genki-orange" : "bg-bg-dim opacity-90"} rounded-r-lg`} href={`/vocabQuiz/${params.chapter}/${params.subsect}/kanji`}>Write Kanji</a>
            </div>}

            <div className="bg-bg-second max-w-250 w-full p-3">
                {quizMatch[params.quizType]} 
            </div>               
        </div>
    )
}