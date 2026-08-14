import { useParams } from "react-router"
import data from "../data/dataIndex"

export default function VocabKanaQuiz() {
    const params = useParams();
    const vocab = data.vocab[params.chapter].filter(v => v.subsect === params.subsect);
    // console.log(vocab)

    return (
        <>
            <form className="grid grid-cols-1 items-end md:grid-cols-2 gap-5 text-text-main">
                {vocab.map(v =>
                    <div className="p-2" key={v.id}>
                        <label htmlFor={v.reading}>
                            <div className="text-lg font-bold">{v.kanji && `${v.kanji}`}</div>
                            <div className="text-text-dim">{v.def}</div>
                            <input className="focus:border-0 focus:outline-0 border-b-2 border-text-dim focus:border-b-genki-orange focus:border-b-2" type="text" name={v.reading} id={v.reading}></input>
                        </label>
                    </div>
                )}
                <button className="md:col-span-2 bg-genki-orange text-bg-dark font-bold text-xl rounded-lg py-2 px-4 max-w-sm cursor-pointer ml-auto mr-auto" type="submit">Submit Answers</button>
            </form>
        </>
    )
}