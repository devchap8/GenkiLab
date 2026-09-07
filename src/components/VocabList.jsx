import { useParams } from "react-router";
import { useState } from "react";
import useDocTitle from "../scripts/useDocTitle";
import data from "../data/dataIndex";
import VocabListSection from "./VocabListSection";
import NotFound from "./NotFound";

const lessonsRegex = /^L(?:1\d|2[0-3]|\d)$/;

export default function VocabList() {
    const params = useParams();
    useDocTitle(`${params.chapter} Vocab List`);
    const [readingsHidden, setReadingsHidden] = useState(false);
    const [defsHidden, setDefsHidden] = useState(false);
    if(!lessonsRegex.test(params.chapter)) return <NotFound />;

    const vocab = data.vocab[params.chapter];
    const sectionedVocab = Object.groupBy(vocab, word => word.sect);
    const vocabPairs = Object.entries(sectionedVocab);

    return (
        <div className="h-full bg-bg-main text-text-main flex flex-col justify-center p-4 gap-6">

            <h2 className="text-center text-3xl font-bold">第{params.chapter.replace("L", "")}課 Vocab List</h2>

            <div className="max-w-200 w-full self-center flex flex-wrap justify-center gap-3 sm:justify-evenly">
                <label className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm cursor-pointer transition-colors ${readingsHidden ? "border-genki-orange" : "border-bg-dim  text-text-dim hover:border-text-dim"}`} htmlFor="hideReadingsCheckbox">
                    <input className="size-4 accent-genki-orange" onClick={() => setReadingsHidden(!readingsHidden)} defaultChecked={readingsHidden} type="checkbox" id="hideReadingsCheckbox" name="hideReadingsCheckbox"></input>
                    <span>Hide Readings</span>
                </label>
                <label className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm cursor-pointer transition-colors ${defsHidden ? "border-genki-orange" : "border-bg-dim text-text-dim hover:border-text-dim"}`} htmlFor="hideDefsCheckbox">
                    <input className="size-4 accent-genki-orange" onClick={() => setDefsHidden(!defsHidden)} defaultChecked={defsHidden} type="checkbox" id="hideDefsCheckbox" name="hideDefsCheckbox"></input>
                    <span>Hide Definitions</span>
                </label>
            </div>

            <div className="max-w-200 w-full self-center">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="border-b-2 border-genki-orange">
                        <th className="px-4 py-2 text-center text-sm font-semibold text-text-dim">Reading</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold text-text-dim">Kanji</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold text-text-dim">Definition</th>
                    </tr>
                    </thead>
                    <tbody>
                        {vocabPairs.map(vocabPair =>
                            <VocabListSection vocabPair={vocabPair} readingsHidden={readingsHidden} defsHidden={defsHidden} key={vocabPair[0]}/>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )

}