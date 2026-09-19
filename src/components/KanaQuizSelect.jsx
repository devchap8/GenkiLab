import { useParams, Link } from "react-router";
import { useState } from "react";
import useDocTitle from "../scripts/useDocTitle";
import NotFound from "./NotFound";
import KanaQuizTableOption from "./KanaQuizTableOption";
import hiragana from "../data/kana/hiragana";
import katakana from "../data/kana/katakana";

const sheets = {hiragana, katakana};

export default function KanaQuizSelect() {
    const params = useParams();
    const sheet = sheets[params.kanaType];
    useDocTitle(sheet ? `${sheet.title} Quiz` : "Not Found");
    const [selected, setSelected] = useState(() => sheet ? sheet.tables.map(t => t.key) : []);

    if (!sheet) return <NotFound />;

    function toggleTable(key) {
        setSelected(selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key]);
    }

    return (
        <div className="h-full bg-bg-main text-text-main flex flex-col items-center p-4 gap-6 overflow-y-auto">

            <h2 className="text-center text-3xl font-bold">{sheet.title} Quiz</h2>

            <div className="inline-flex rounded-md border border-bg-dim overflow-hidden divide-x divide-bg-dim">
                <Link className={`px-3 py-1.5 transition-colors duration-200 ${params.kanaType === "hiragana" ? "bg-genki-orange text-bg-dark font-semibold" : "text-text-dim hover:text-text-main hover:bg-bg-second"}`} to="/kanaQuiz/hiragana">Hiragana</Link>
                <Link className={`px-3 py-1.5 transition-colors duration-200 ${params.kanaType === "katakana" ? "bg-genki-orange text-bg-dark font-semibold" : "text-text-dim hover:text-text-main hover:bg-bg-second"}`} to="/kanaQuiz/katakana">Katakana</Link>
            </div>

            <div className="text-text-dim text-center max-w-150">Select which tables to include, then start the quiz. You'll be shown each kana and write in its reading.</div>

            <div className="max-w-250 w-full flex flex-wrap justify-center gap-4">
                {sheet.tables.map(table =>
                    <KanaQuizTableOption
                        key={table.key}
                        table={table}
                        checked={selected.includes(table.key)}
                        onToggle={() => toggleTable(table.key)}
                    />
                )}
            </div>

            {selected.length > 0
                ? <Link
                    className="bg-genki-orange hover:bg-genki-light text-bg-dark transition-colors duration-200 font-semibold rounded-md text-lg py-2 px-4"
                    to={`/kanaQuiz/${params.kanaType}/write?tables=${selected.join(",")}`}
                >Start Quiz</Link>
                : <button className="bg-bg-dim text-text-dim font-semibold rounded-md text-lg py-2 px-4 cursor-not-allowed" disabled>Select at least one table</button>
            }
        </div>
    )
}
