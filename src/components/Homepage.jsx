import data from "../data/dataIndex";
const lessonNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export default function Homepage() {
    return (
        <div className="bg-zinc-800 h-full flex flex-col items-center p-4">
            <main className=" max-w-250 w-full p-2 flex flex-col gap-3">
                <h2 className="text-center text-4xl font-bold text-zinc-200">Chapter Navigation</h2>
                {lessonNums.map(n => 
                    <div key={n}>
                        <h3 className="text-genki-orange text-xl font-bold">L{n}: {data.lessonNames[`L${n}`]}</h3>
                        <ul className="list-disc pl-8 text-lg marker:text-genki-orange">
                            <li><a className="text-zinc-200 underline" href={`/vocab/L${n}`}>Vocab List</a></li>
                        </ul>
                    </div>
                )}
            </main>
        </div>
    )
}