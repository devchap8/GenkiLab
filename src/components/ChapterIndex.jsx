import { useState } from "react";
import ChapterNavLink from "./ChapterNavLink";
import data from "../data/dataIndex";
import expandSvg from "../assets/icons/expand.svg";

export default function ChapterIndex({lessonNum, extras}) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div key={lessonNum}>
            <button 
                className="flex gap-2 cursor-pointer w-full justify-between"
                onClick={() => setExpanded(!expanded)}
            >
                <h3 className="text-genki-orange text-lg font-bold inline-block">L{lessonNum}: {data.lessonNames[`L${lessonNum}`]}</h3>
                <img className={`w-6 ${!expanded && "rotate-180"} transition-transform duration-400`} src={expandSvg}></img>
            </button>
            <div className="h-0.5 bg-genki-orange"></div>
            {expanded && <ul className=" pl-8 marker:text-genki-orange">
                <ChapterNavLink text="Vocab List" link={`/vocab/L${lessonNum}`} />

                <li className="text-text-dim">Vocab Quizzes:</li>
                <ul className="list-disc pl-8 marker:text-genki-orange">
                    {data.subsects[`L${lessonNum}`].map(subsect => 
                        <ChapterNavLink text={subsect} link={`/vocabQuiz/L${lessonNum}/${subsect}/match`} key={`L${lessonNum} ${subsect}`}></ChapterNavLink>
                    )} 
                </ul>

                {extras && extras.map(extra => 
                    <ChapterNavLink text={extra.text} link={extra.link} key={extra.text}/>
                )}
            </ul>}
        </div>
    )
}