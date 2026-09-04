import { useState } from "react";
import ChapterSection from "./ChapterSection";
import ChapterNavLink from "./ChapterNavLink";
import data from "../data/dataIndex";
import expandIcon from "../assets/icons/expand-gray.svg";

export default function SidebarChapterIndex({lessonNum}) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div key={lessonNum}>
            <button
                className="flex w-full border-b border-bg-dim cursor-pointer justify-between hover:bg-bg-dim/20"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="text-lg px-2 py-.5 text-text-dim font-semibold tracking-wide">
                    {`Lesson ${lessonNum}`}
                </div>
                <img className={`w-6 mr-1 ${!expanded && "rotate-180"} transition-transform duration-250`} src={expandIcon} alt="Expand Icon" />
            </button>

            {expanded && <div className="py-1 px-2 flex flex-col gap-2">

                <ChapterSection title="Vocab" navType="sidebar">
                    <ul className="pl-5 list-disc marker:text-genki-orange">
                        <ChapterNavLink text="Vocab List" link={`/vocab/L${lessonNum}`} type="sidebar"/>
                    </ul>
                </ChapterSection>

                <ChapterSection title="Vocab Quizzes" navType="sidebar">
                    <ul className="list-disc pl-5 marker:text-genki-orange">
                        {data.subsects[`L${lessonNum}`].map(subsect =>
                            <ChapterNavLink text={subsect} link={`/vocabQuiz/L${lessonNum}/${subsect}/match`} key={`L${lessonNum} ${subsect}`} type="sidebar"/>
                        )}
                    </ul>
                </ChapterSection>
            </div>}
        </div>
    )

}