export default function KanaQuizCell({kana, romaji, name, submitted, isCorrect}) {
    const tint = !submitted
        ? "border-bg-dim bg-bg-second/40"
        : isCorrect
            ? "border-lime-500 bg-lime-500/10"
            : "border-red-500 bg-red-500/10";

    return (
        <div className={`flex flex-col items-center gap-1.5 p-2 rounded-md border transition-colors ${tint}`}>
            <span className="text-2xl font-medium text-text-main">{kana}</span>
            <label className="sr-only" htmlFor={name}>{kana}</label>
            <input
                className={`w-16 text-center rounded border px-1 py-0.5 bg-bg-main text-text-main focus:outline-none focus:border-genki-orange transition-colors ${!submitted ? "border-bg-dim" : isCorrect ? "border-lime-500" : "border-red-500"}`}
                disabled={submitted}
                type="text"
                autoComplete="off"
                name={name}
                id={name}
            ></input>
            {submitted && !isCorrect && <span className="text-xs text-red-400">{romaji}</span>}
        </div>
    )
}
