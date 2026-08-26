import { useParams } from "react-router";
import { useState } from "react";
import data from "../data/dataIndex";
import VocabListSection from "./VocabListSection";

export default function VocabList({}) {
    const params = useParams();
    const [readingsHidden, setReadingsHidden] = useState(false);
    const [defsHidden, setDefsHidden] = useState(false);

    const vocab = data.vocab[params.chapter];
    const sectionedVocab = Object.groupBy(vocab, word => word.sect);
    const vocabPairs = Object.entries(sectionedVocab);

    const romajiLessons = ["L0", "L1", "L2"];
    const isRomaji = romajiLessons.includes(params.chapter)

    return (
        <div className="h-full bg-bg-main text-text-main flex flex-col justify-center p-4 gap-6">

            <h2 className="text-center text-3xl font-bold">第{params.chapter.replace("L", "")}課 Vocab List</h2>

            <div className="max-w-200 w-full self-center flex flex-wrap justify-center gap-3 sm:justify-between">
                <label className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-second  text-sm text-text-dim cursor-pointer hover:border-genki-orange/60 transition-colors" htmlFor="hideReadingsCheckbox">
                    <input className="size-4 accent-genki-orange" onClick={() => setReadingsHidden(!readingsHidden)} defaultChecked={readingsHidden} type="checkbox" id="hideReadingsCheckbox" name="hideReadingsCheckbox"></input>
                    <span>Hide Readings</span>
                </label>
                <label className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-second  text-sm text-text-dim cursor-pointer hover:border-genki-orange/60 transition-colors" htmlFor="hideDefsCheckbox">
                    <input className="size-4 accent-genki-orange" onClick={() => setDefsHidden(!defsHidden)} defaultChecked={defsHidden} type="checkbox" id="hideDefsCheckbox" name="hideDefsCheckbox"></input>
                    <span>Hide Definitions</span>
                </label>
            </div>

            <div className="max-w-200 w-full self-center rounded-xl overflow-hidden  bg-bg-second shadow-sm">
                <table className="w-full">
                    <thead>
                    <tr className="">
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-dim">Reading</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-dim">{isRomaji ? "Kana" : "Kanji"}</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-dim">Definition</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-bg-dim/60">
                        {vocabPairs.map(vocabPair =>
                            <VocabListSection vocabPair={vocabPair} readingsHidden={readingsHidden} defsHidden={defsHidden} isRomaji={isRomaji} key={vocabPair[0]}/>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )

}