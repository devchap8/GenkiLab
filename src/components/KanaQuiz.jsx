import { useParams, useSearchParams, Link } from "react-router";
import KanaWriteInQuiz from "./KanaWriteInQuiz";
import useDocTitle from "../scripts/useDocTitle";
import hiragana from "../data/kana/hiragana";
import katakana from "../data/kana/katakana";
import NotFound from "./NotFound";

const sheets = {hiragana, katakana};

const quizComponents = {
    write: KanaWriteInQuiz
};

export default function KanaQuiz() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const sheet = sheets[params.kanaType];
    useDocTitle(sheet ? `${sheet.title} Quiz` : "Not Found");

    if (!sheet || !Object.keys(quizComponents).includes(params.quizType)) return <NotFound />;

    const tableKeys = (searchParams.get("tables") ?? "").split(",").filter(Boolean);
    const tables = sheet.tables.filter(t => tableKeys.includes(t.key));

    const QuizComponent = quizComponents[params.quizType];

    return (
        <div className="bg-bg-main h-full flex flex-col items-center p-5 gap-6">

            <div className="text-text-main font-bold text-3xl">{sheet.title} Quiz</div>

            {tables.length === 0
                ? <div className="text-text-main flex flex-col items-center gap-3">
                    <div>No tables selected.</div>
                    <Link className="text-genki-orange hover:underline" to={`/kanaQuiz/${params.kanaType}`}>Back to Table Selection</Link>
                </div>
                : <div className="bg-bg-second/50 max-w-250 w-full p-3">
                    <QuizComponent key={tableKeys.join(",")} tables={tables} />
                </div>
            }
        </div>
    )
}
