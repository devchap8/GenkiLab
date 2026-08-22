import { useState, useMemo } from "react";
import { useParams } from "react-router";
import DragItem from "./DragItem";
import data from "../data/dataIndex";

function shuffle(array) {
  const shuffled = [...array];  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  } 
  return shuffled;
}

export default function VocabMatchQuiz() {
    const params = useParams();
    const vocab = data.vocab[params.chapter].filter(v => v.subsect === params.subsect);

    const initialWordbank = useMemo(() => shuffle(vocab), []);
    const initialAnswers = useMemo(() => shuffle(vocab), []);

    const [wordbank, setWordbank] = useState(initialWordbank);
    const [matches, setMatches] = useState({});
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [kanaShown, setKanaShown] = useState(false);


    function handleDragStart(e) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("definition", e.target.innerText);
        e.dataTransfer.setData("id", e.target.id);
        setSelected(e.target);
    }

    function handleDragOver(e) {
        if(selected) {
            e.preventDefault();
        }       
    }

    function handleDrop(e) {
        e.preventDefault();

        if(e.target.hasAttribute("data-droppable")) {
            setWordbank(wordbank.filter(w => w.id !== selected.id));
            const newMatches = {...matches};
            for(const key of Object.keys(newMatches)) {
                if(newMatches[key] === selected.innerHTML) {
                    newMatches[key] = null;
                }
            }
            const reading = e.target.getAttribute("data-reading");
            newMatches[reading] = selected.innerHTML;
            setMatches(newMatches);
        }
        else if(e.target.hasAttribute("draggable")) {
            const def1 = e.target.innerHTML;
            const reading1 = Object.keys(matches).find(key => matches[key] === def1);
            const def2 = selected.innerHTML;
            const reading2 = Object.keys(matches).find(key => matches[key] === def2);
            let newMatches = {...matches};
            if(!reading1 && !reading2) return;
            else if(!reading1) swapMatchWordbank(def1, reading1, def2, reading2);
            else if(!reading2) swapMatchWordbank(def2, reading2, def1, reading1);
            else {
                newMatches[reading1] = def2;
                newMatches[reading2] = def1;
                setMatches(newMatches);
            }

        }
        else {
            // remove the def from matches
            // add the word back to the wordbank
            const def = removeFromMatches();
            if(def) {
                const word = vocab.find(v => v.def === def);
                setWordbank([...wordbank, word]);               
            }
        }
        setSelected(null);
    }

    function swapMatchWordbank(wordbankDef, wordbankReading, matchDef, matchReading) {
        let newMatches = {...matches};
        newMatches[matchReading] = wordbankDef;
        setMatches(newMatches);
        let newWordbank = wordbank.filter(w => w.def !== wordbankDef);
        const word = vocab.find(v => v.def === matchDef);
        setWordbank([...newWordbank, word]);
    }

    function removeFromMatches() {
        const matchPairs = Object.entries(matches);
        const pair = matchPairs.find(p => p[1] === selected.innerHTML);
        if(!pair) return;
        if(pair[1]) {
            const newMatches = {...matches};
            const [reading, def] = pair;
            newMatches[reading] = null;
            setMatches(newMatches)
            return def;
        }       
    }

    function checkMatch(word) {
        return matches[word.reading] === word.def;
    }

    function startOver() {
        setWordbank(initialWordbank);
        setMatches({});
    }

    return (
        <div className="grid grid-cols-2 text-text-main">
            <div className="flex flex-col gap-2">
            {initialAnswers.map(v => (
                <div className="grid grid-cols-2 gap-1" key={v.reading}>
                    <div>
                        <div className="outline-2 py-0.5 px-1 outline-bg-main bg-bg-dim">
                            {v.kanji ? v.kanji : v.reading}
                            {kanaShown && v.kanji && 
                                <div className="text-sm text-text-dim">{v.reading}</div>
                            }
                        </div>
                    </div>
                    <div className="outline-2 py-0.5 px-1 outline-bg-dark bg-bg-main" data-droppable data-reading={v.reading} onDrop={handleDrop} onDragOver={handleDragOver}>
                        <DragItem v={vocab.find(word => word.def === matches[v.reading])} matched={submitted ? checkMatch(v) : null} handleDragStart={handleDragStart} />
                    </div>
                </div>
            ))}
            </div>
            <div className="flex flex-col gap-2" onDrop={handleDrop} onDragOver={handleDragOver}>
            {wordbank.map(v => (
                <DragItem v={v} handleDragStart={handleDragStart} key={v.def} submitted={submitted} matched={submitted ? checkMatch(v) : null}/>
            ))}
            </div>
            <div className="col-span-2 p-5 grid grid-cols-3" onDrop={handleDrop} onDragOver={handleDragOver}>
                <button className="bg-genki-orange text-bg-dark font-bold text-xl rounded-lg py-2 px-4 max-w-sm cursor-pointer ml-auto mr-auto" onClick={() => setKanaShown(!kanaShown)} >{kanaShown ? "Hide Kana" : "Show Kana"}</button>
                <button className="bg-genki-orange text-bg-dark font-bold text-xl rounded-lg py-2 px-4 max-w-sm cursor-pointer ml-auto mr-auto" onClick={() => setSubmitted(!submitted)}>{submitted ? "Try Again" : "Submit Answers"}</button>
                <button className="bg-genki-orange text-bg-dark font-bold text-xl rounded-lg py-2 px-4 max-w-sm cursor-pointer ml-auto mr-auto" onClick={submitted ? () => null : startOver}>Start Over</button>
            </div>
        </div>
    )
}