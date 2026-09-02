import { useState } from "react";
import ChapterSection from "./ChapterSection";
import data from "../data/dataIndex";
import expandIcon from "../assets/icons/expand-gray.svg";

export default function SidebarChapterIndex({lessonNum, extras}) {

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
                <img className={`w-6 mr-1 ${!expanded && "rotate-180"} transition-transform duration-250`} src={expandIcon} href="Expand Icon" />
            </button>
        </div>
    )

}