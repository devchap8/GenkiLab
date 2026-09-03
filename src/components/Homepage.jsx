import ChapterIndex from "./ChapterIndex";
import data from "../data/dataIndex";

const lessonNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const extraLinks = {
    
};

export default function Homepage() {
    return (
        <div className="bg-bg-main h-full flex flex-col items-center p-4">
            <section className="max-w-225">
                <h1 className="text-5xl font-bold text-genki-orange tracking-wide text-center mb-5">Welcome to GenkiLab!</h1>
                <div className="text-text-main whitespace-pre-line mb-5 flex flex-col gap-2">
                    <div>GenkiLab is a study resource meant to help people learning Japanese through the Genki I and II (Third Edition) textbooks. Each lesson has its own vocab list and quizzes, with more features coming soon.</div>
                    <div>GenkiLab is an independent, unofficial fan resource and is not affiliated with The Japan Times, the publisher of the Genki series. All rights to the Genki textbooks belong to their respective owners. This site is meant to be used alongside the official textbooks and workbooks, not as a replacement. Please support the original creators by purchasing the Genki series.</div>
                    <div>Found a mistake? Have some feedback? Email me at <p className="inline text-blue-400">devchap8@uri.edu</p></div>
                    <div>Planned features: Hiragana / Katakana quizzes, chapter overviews, grammar explanation resources, grammar quizzes, and more!</div>
                </div>
            </section>
            <main className="max-w-300 w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <h2 className="text-center mb-3 text-4xl font-bold text-text-main md:col-span-2">Chapter Navigation</h2>
                <div className="grid gap-5">
                    {lessonNums.slice(0, 12).map(n => 
                        <ChapterIndex key={n} lessonNum={n} extras={extraLinks[`L${n}`]}/>
                    )}
                </div>
                <div className="grid gap-5">
                    {lessonNums.slice(-12).map(n => 
                        <ChapterIndex key={n} lessonNum={n} extras={extraLinks[`L${n}`]}/>
                    )}                    
                </div>

            </main>
        </div>
    )
}