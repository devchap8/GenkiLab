import { useParams } from "react-router";
import data from "../data/dataIndex";

export default function VocabList({}) {
    const params = useParams();
    const vocab = data.vocab[params.chapter];

    return (
        <table>
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
    )

}