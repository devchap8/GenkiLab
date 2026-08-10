import SpoilerText from "./SpoilerText";

function cleanSearchText(text) {
    // replace english parenthesis
    let newText = text.replace(/\([^)]*\)/g, "");
    // replace japanese parenthesis
    newText = newText.replace(/（[^）]*）/g, "");
    // replace special characters
    newText = newText.replace(/[～。~.]/g, "");
    // replace slashes, pluses, and everything following them (words with multiple readings or ending in + negative)
    newText = newText.replace(/[\/／+＋].*/, "");
    return newText.trim();
}

export default function VocabListSection({vocabPair, readingsHidden, defsHidden, isRomaji}) {
    const [sectName, vocab] = vocabPair;

    return (
        <>
        <tr><td className="p-4 text-center text-2xl text-genki-orange" colSpan="3">{sectName}</td></tr>
        {vocab.map(v => 
            <tr key={v.id}>
                <td className="text-center p-1">
                    {readingsHidden && v.kanji
                        ? <SpoilerText><div className="w-full">{v.reading}</div></SpoilerText>
                        : <a className="underline underline-offset-3" href={`https://jisho.org/search/${isRomaji ? cleanSearchText(v.kanji) : cleanSearchText(v.reading)}`} target="_blank" rel="noopener noreferrer">{v.reading}</a>
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