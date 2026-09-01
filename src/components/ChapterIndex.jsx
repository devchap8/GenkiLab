import { useState } from "react";
import ChapterNavLink from "./ChapterNavLink";
import ChapterSection from "./ChapterSection";
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

            {expanded && <div className="flex flex-col gap-3">
                <div className="w-full bg-bg-second/80 p-2">
                    <div className="text-text-main tracking-wide font-semibold">In this lesson we will...</div>
                    <ul className="columns-2 gap-x-6 pl-6 text-text-dim list-disc marker:text-genki-orange text-sm space-y-0">
                        {data.inThisLesson[`L${lessonNum}`].map(item =>
                            <li className="break-inside-avoid pr-5" key={item}>{item}</li>
                        )}
                    </ul>
                </div>

                <div className="pl-8 flex flex-col gap-3">

                    <ChapterSection title="Vocab">
                        <ul className="pl-5 list-disc marker:text-genki-orange">
                            <ChapterNavLink text="Vocab List" link={`/vocab/L${lessonNum}`} />
                        </ul>
                    </ChapterSection>

                    <ChapterSection title="Vocab Quizzes">
                        <ul className="list-disc pl-5 marker:text-genki-orange">
                            {data.subsects[`L${lessonNum}`].map(subsect =>
                                <ChapterNavLink text={subsect} link={`/vocabQuiz/L${lessonNum}/${subsect}/match`} key={`L${lessonNum} ${subsect}`}></ChapterNavLink>
                            )}
                        </ul>
                    </ChapterSection>

                    {extras && extras.length > 0 && <ChapterSection title="Extras">
                        <ul className="pl-5 marker:text-genki-orange">
                            {extras.map(extra =>
                                <ChapterNavLink text={extra.text} link={extra.link} key={extra.text}/>
                            )}
                        </ul>
                    </ChapterSection>}
                </div>

            </div>}
        </div>
    )
}