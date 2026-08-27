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
        <tr>
            <td className="px-4 pt-4 pb-1 text-left text-lg font-bold text-genki-orange" colSpan="3">{sectName}</td>
        </tr>
        {vocab.map((v, i) =>
            <tr key={v.id} className={i % 2 === 0 ? "bg-bg-second/40" : ""}>
                <td className="px-4 py-2 text-center align-middle text-text-dim">
                    {readingsHidden && v.kanji
                        ? <SpoilerText><div className="w-full">{v.reading}</div></SpoilerText>
                        : <a className="underline decoration-text-dim/40 underline-offset-4 hover:text-genki-orange hover:decoration-genki-orange transition-colors" href={`https://jisho.org/search/${isRomaji ? cleanSearchText(v.kanji) : cleanSearchText(v.reading)}`} target="_blank" rel="noopener noreferrer">{v.reading}</a>
                    }
                </td>

                <td className="px-4 py-2 text-center align-middle text-lg font-medium text-text-main">{v.kanji}</td>
                <td className="px-4 py-2 text-left align-middle text-text-main">
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