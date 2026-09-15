import SpoilerText from "./SpoilerText";

export default function KanaCell({cell, romajiHidden}) {
    if (!cell) return <td className="border border-bg-dim/60 w-14 h-14 sm:w-16 sm:h-16 bg-bg-second/10"></td>;

    const [kana, romaji] = cell;

    return (
        <td className="border border-bg-dim/60 w-14 h-14 sm:w-16 sm:h-16 text-center align-middle">
            <div className="flex flex-col justify-center gap-0.5">
                <span className="text-xl sm:text-2xl font-medium text-text-main">{kana}</span>
                {romajiHidden
                    ? <SpoilerText><div className="text-xs text-text-dim w-full">{romaji}</div></SpoilerText>
                    : <span className="text-xs text-text-dim">{romaji}</span>
                }
            </div>
        </td>
    )
}
