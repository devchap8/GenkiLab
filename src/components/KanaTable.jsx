import KanaCell from "./KanaCell";

export default function KanaTable({table, romajiHidden}) {
    const {columns, rows, footnote} = table;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-full overflow-x-auto">
                <table className="border-collapse mx-auto">
                    <thead>
                        <tr>
                            <th className="w-8"></th>
                            {columns.map(col =>
                                <th key={col} className="px-1 pb-1 text-sm italic font-normal text-text-dim">{col}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) =>
                            <tr key={i}>
                                <td className="pr-2 text-sm italic text-text-dim text-right align-middle">{row.label}</td>
                                {row.cells.map((cell, j) =>
                                    <KanaCell key={j} cell={cell} romajiHidden={romajiHidden}/>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {footnote && <p className="text-xs text-text-dim mt-2 max-w-150 text-center">{footnote}</p>}
        </div>
    )
}
