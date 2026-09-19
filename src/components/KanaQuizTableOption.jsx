export default function KanaQuizTableOption({table, checked, onToggle}) {
    return (
        <label
            className={`flex flex-col gap-2 p-3 rounded-md border cursor-pointer transition-colors w-56 ${checked ? "border-genki-orange bg-genki-orange/10" : "border-bg-dim hover:border-text-dim"}`}
            htmlFor={`table-${table.key}`}
        >
            <div className="flex items-center gap-2">
                <input
                    className="size-4 accent-genki-orange"
                    type="checkbox"
                    id={`table-${table.key}`}
                    name={`table-${table.key}`}
                    checked={checked}
                    onChange={onToggle}
                ></input>
                <span className="text-text-main font-semibold">{table.name}</span>
            </div>
            <div className="flex gap-3 justify-center">
                {table.examples.map(([kana, romaji]) =>
                    <div className="flex flex-col items-center" key={kana}>
                        <span className="text-lg text-text-main">{kana}</span>
                        <span className="text-xs text-text-dim">{romaji}</span>
                    </div>
                )}
            </div>
        </label>
    )
}
