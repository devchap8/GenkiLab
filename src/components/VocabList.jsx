import { useParams } from "react-router";
import data from "../data/dataIndex";

const sortVals = {
    "n.": 1, "い-adj.": 2, "な-adj.": 3, "irr-v.": 4, "u-v.": 5, "ru-v.": 6,
    "adv.": 7, "exp.": 8, "pre.": 9, "suf.": 10, "part.": 11
}

export default function VocabList({}) {
    const params = useParams();
    let vocab = data.vocab[params.chapter].toSorted((a, b) => sortVals[a.type] - sortVals[b.type]);

    return (
        <div className="h-full bg-bg-main text-text-main flex flex-col justify-center p-4 gap-6">
            <h2 className="text-center text-4xl font-bold">Lesson {params.chapter.replace("L", "")} Vocab</h2>
            <table className="max-w-200 w-full self-center">
                <thead>
                <tr>
                    <th>Reading</th>
                    <th>Kanji</th>
                    <th>Word Type</th>
                    <th>Definition</th>
                </tr>
                </thead>
                <tbody>
                {vocab.map(v => 
                    <tr key={v.id}>
                        <td><a href={`https://jisho.org/search/${v.reading}`} target="_blank" rel="noopener noreferrer">{v.reading}</a></td>
                        <td>{v.kanji}</td>
                        <td>{v.type}</td>
                        <td>{v.def}</td>
                    </tr>
                )}
                </tbody>

            </table>
        </div>
    )

}