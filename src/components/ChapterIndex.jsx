import { useState } from "react";
import ChapterNavLink from "./ChapterNavLink";
import ChapterSection from "./ChapterSection";
import data from "../data/dataIndex";
import expandSvg from "../assets/icons/expand.svg";

export default function ChapterIndex({lessonNum, extras}) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div key={lessonNum} className="rounded-xl border border-bg-dim/60 bg-bg-second/20 hover:border-genki-orange/60 transition-colors">
            <button
                className={`flex gap-2 cursor-pointer w-full justify-between p-4`}
                onClick={() => setExpanded(!expanded)}
            >
                <h3 className="text-genki-orange text-lg font-bold inline-block">L{lessonNum}: {data.lessonNames[`L${lessonNum}`]}</h3>
                <img className={`w-6 ${!expanded && "rotate-180"} transition-transform duration-400`} alt="Expand Icon" src={expandSvg}></img>
            </button>

            {expanded && <div className="flex flex-col gap-3 border-t border-bg-dim/60 pt-3 p-4">
                <div className="w-full bg-bg-second/80 rounded-md p-2">
                    <div className="text-text-main tracking-wide font-semibold">In this lesson we will...</div>
                    <ul className="columns-2 gap-x-6 pl-6 text-text-dim list-disc marker:text-genki-orange text-sm space-y-0">
                        {data.inThisLesson[`L${lessonNum}`].map(item =>
                            <li className="break-inside-avoid pr-5" key={item}>{item}</li>
                        )}
                    </ul>
                </div>

                <div className="pl-8 flex flex-col gap-3">

                    <ChapterSection title="Vocab" navType="main">
                        <ul className="pl-5 list-disc marker:text-genki-orange">
                            <ChapterNavLink text="Vocab List" link={`/vocab/L${lessonNum}`} type="main"/>
                        </ul>
                    </ChapterSection>

                    <ChapterSection title="Vocab Quizzes" navType="main">
                        <ul className="list-disc pl-5 marker:text-genki-orange">
                            {data.subsects[`L${lessonNum}`].map(subsect =>
                                <ChapterNavLink text={subsect} link={`/vocabQuiz/L${lessonNum}/${subsect}/match`} key={`L${lessonNum} ${subsect}`} type="main"/>
                            )}
                        </ul>
                    </ChapterSection>

                    {extras && extras.length > 0 && <ChapterSection title="Extras" navType="main">
                        <ul className="pl-5 marker:text-genki-orange">
                            {extras.map(extra =>
                                <ChapterNavLink text={extra.text} link={extra.link} key={extra.text} type="main"/>
                            )}
                        </ul>
                    </ChapterSection>}
                </div>

            </div>}
        </div>
    )
}