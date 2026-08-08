import { useParams } from "react-router";
import { useState } from "react";
import data from "../data/dataIndex";
import SpoilerText from "./SpoilerText";

const sortVals = {
    "n.": 1, "い-adj.": 2, "な-adj.": 3, "irr-v.": 4, "u-v.": 5, "ru-v.": 6,
    "adv.": 7, "exp.": 8, "pre.": 9, "suf.": 10, "part.": 11
}

export default function VocabList({}) {
    const params = useParams();
    const [defsHidden, setDefsHidden] = useState(false);
    let vocab = data.vocab[params.chapter].toSorted((a, b) => sortVals[a.type] - sortVals[b.type]);

    return (
        <div className="h-full bg-bg-main text-text-main flex flex-col justify-center p-4 gap-6">

            <h2 className="text-center text-4xl font-bold">Lesson {params.chapter.replace("L", "")} Vocab</h2>

            <label className="max-w-200 w-full self-center flex gap-3 justify-end items-center" htmlFor="hideDefsCheckbox">
                <div>Hide Definitions</div>
                <input className="size-5" onClick={() => setDefsHidden(!defsHidden)} defaultChecked={defsHidden} type="checkbox" id="hideDefsCheckbox" name="hideDefsCheckbox"></input>
            </label>
            
            <table className="max-w-200 w-full self-center border-2 border-genki-orange">
                <thead>
                <tr>
                    <th className="border border-genki-orange p-1">Reading</th>
                    <th className="border border-genki-orange p-1">Kanji</th>
                    <th className="border border-genki-orange p-1">Definition</th>
                </tr>
                </thead>
                <tbody>
                {vocab.map(v => 
                    <tr key={v.id}>
                        <td className="border border-genki-orange p-1"><a className="underline underline-offset-3" href={`https://jisho.org/search/${v.reading}`} target="_blank" rel="noopener noreferrer">{v.reading}</a></td>
                        <td className="border border-genki-orange p-1">{v.kanji}</td>
                        <td className="border border-genki-orange p-1">
                            {defsHidden
                                ? <SpoilerText><div className="w-full">{v.def}</div></SpoilerText>
                                : v.def
                            }
                        </td>
                    </tr>
                )}
                </tbody>

            </table>
        </div>
    )

}