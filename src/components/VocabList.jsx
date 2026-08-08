import { useParams } from "react-router";
import { useState } from "react";
import data from "../data/dataIndex";
import SpoilerText from "./SpoilerText";
import VocabListSection from "./VocabListSection";

const sortVals = {
    "n.": 1, "い-adj.": 2, "な-adj.": 3, "irr-v.": 4, "u-v.": 5, "ru-v.": 6,
    "adv.": 7, "exp.": 8, "pre.": 9, "suf.": 10, "part.": 11
}

export default function VocabList({}) {
    const params = useParams();
    const [readingsHidden, setReadingsHidden] = useState(false);
    const [defsHidden, setDefsHidden] = useState(false);

    const vocab = data.vocab[params.chapter].toSorted((a, b) => sortVals[a.type] - sortVals[b.type]);
    const sects = [...new Set(vocab.map(v => v.sect))];
    const sectionedVocab = Object.groupBy(vocab, word => word.sect);
    const vocabPairs = Object.entries(sectionedVocab);

    return (
        <div className="h-full bg-bg-main text-text-main flex flex-col justify-center p-4 gap-6">

            <h2 className="text-center text-4xl font-bold">Lesson {params.chapter.replace("L", "")} Vocab</h2>

            <div className="max-w-200 w-full self-center flex justify-between">
                <label className="flex gap-3 justify-end items-center" htmlFor="hideReadingsCheckbox">
                    <div>Hide Readings</div>
                    <input className="size-5" onClick={() => setReadingsHidden(!readingsHidden)} defaultChecked={readingsHidden} type="checkbox" id="hideReadingsCheckbox" name="hideReadingsCheckbox"></input>
                </label>                
                <label className="flex gap-3 justify-end items-center" htmlFor="hideDefsCheckbox">
                    <div>Hide Definitions</div>
                    <input className="size-5" onClick={() => setDefsHidden(!defsHidden)} defaultChecked={defsHidden} type="checkbox" id="hideDefsCheckbox" name="hideDefsCheckbox"></input>
                </label>
            </div>

            
            <table className="max-w-200 w-full self-center border-2 border-genki-orange">
                <thead>
                <tr>
                    <th className="border border-genki-orange p-1">Reading</th>
                    <th className="border border-genki-orange p-1">Kanji</th>
                    <th className="border border-genki-orange p-1">Definition</th>
                </tr>
                </thead>
                <tbody>
                    {vocabPairs.map(vocabPair => 
                        <VocabListSection vocabPair={vocabPair} readingsHidden={readingsHidden} defsHidden={defsHidden} key={vocabPair[0]}/>
                    )}
                </tbody>

            </table>
        </div>
    )

}