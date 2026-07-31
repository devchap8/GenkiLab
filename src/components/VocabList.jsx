import vocab from "../data/test-data"
// later instead of importing directly we will take the vocab list as a prop to the vocabList component

export default function VocabList() {


    return (
        <table>
            <tr>
                <th>Reading</th>
                <th>Kanji</th>
                <th>Word Type</th>
                <th>Definition</th>
            </tr>
            {vocab.map(v => 
                <tr>
                    <td>{v.reading}</td>
                    <td>{v.kanji}</td>
                    <td>{v.type}</td>
                    <td>{v.def}</td>
                </tr>
            )}
        </table>
    )

}