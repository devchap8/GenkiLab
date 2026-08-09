import ChapterNavLink from "./ChapterNavLink";
import data from "../data/dataIndex";

export default function ChapterIndex({lessonNum, extras}) {
    return (
        <div key={lessonNum}>
            <h3 className="text-genki-orange text-xl font-bold">L{lessonNum}: {data.lessonNames[`L${lessonNum}`]}</h3>
            <ul className="list-disc pl-8 text-lg marker:text-genki-orange">
                {extras && extras.map(extra => 
                    <ChapterNavLink text={extra.text} link={extra.link} key={extra.text}/>
                )}
                <ChapterNavLink text="Vocab List" link={`/vocab/L${lessonNum}`} />
            </ul>
        </div>
    )
}