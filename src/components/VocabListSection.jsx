import SpoilerText from "./SpoilerText";

export default function VocabListSection({vocabPair, readingsHidden, defsHidden}) {
    const [sectName, vocab] = vocabPair;

    return (
        <>
        <tr><td className="p-4 text-center text-2xl text-genki-orange" colSpan="3">{sectName}</td></tr>
        {vocab.map(v => 
            <tr key={v.id}>
                <td className="text-center p-1">
                    {readingsHidden && v.kanji
                        ? <SpoilerText><div className="w-full">{v.reading}</div></SpoilerText>
                        : <a className="underline underline-offset-3" href={`https://jisho.org/search/${v.reading}`} target="_blank" rel="noopener noreferrer">{v.reading}</a>
                    }
                </td>

                <td className="text-center p-1">{v.kanji}</td>
                <td className="text-center p-1">
                    {defsHidden
                        ? <SpoilerText><div className="w-full">{v.def}</div></SpoilerText>
                        : v.def
                    }
                </td>
            </tr>
        )}        
        </>
    )
}