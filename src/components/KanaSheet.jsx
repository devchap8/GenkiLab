import { useParams } from "react-router";
import { useState } from "react";
import useDocTitle from "../scripts/useDocTitle";
import NotFound from "./NotFound";
import KanaTable from "./KanaTable";
import hiragana from "../data/kana/hiragana";
import katakana from "../data/kana/katakana";

const sheets = {hiragana, katakana};

export default function KanaSheet() {
    const params = useParams();
    const sheet = sheets[params.kanaType];
    useDocTitle(sheet ? `${sheet.title} Sheet` : "Not Found");
    const [romajiHidden, setRomajiHidden] = useState(false);

    if (!sheet) return <NotFound />;

    return (
        <div className="h-full bg-bg-main text-text-main flex flex-col items-center p-4 gap-6 overflow-y-auto">

            <h2 className="text-center text-3xl font-bold">{sheet.title} Sheet</h2>

            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm cursor-pointer transition-colors ${romajiHidden ? "border-genki-orange" : "border-bg-dim text-text-dim hover:border-text-dim"}`} htmlFor="hideRomajiCheckbox">
                <input className="size-4 accent-genki-orange" onClick={() => setRomajiHidden(!romajiHidden)} defaultChecked={romajiHidden} type="checkbox" id="hideRomajiCheckbox" name="hideRomajiCheckbox"></input>
                <span>Hide Romaji</span>
            </label>

            <div className="max-w-200 w-full flex flex-col gap-8 items-center">
                {sheet.tables.map((table, i) =>
                    <KanaTable key={i} table={table} romajiHidden={romajiHidden}/>
                )}
            </div>
        </div>
    )
}
