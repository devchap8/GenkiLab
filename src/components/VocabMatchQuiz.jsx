import { Fragment, useState, useMemo } from "react";
import { useParams } from "react-router";
import QuizButton from "./QuizButton";
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

function removeDupeReadings(rawVocab) {
    const vocab = [...rawVocab]
    const readingList = vocab.map(v => v.reading);
    const dupes = [...new Set(readingList.filter((item, index) => readingList.indexOf(item) !== index))];
    if(!dupes) return vocab;
    let seenDupes = 0;
    vocab.forEach(v => {
        if(dupes.includes(v.reading)) {
            const reading = v.reading
            v.reading = `${reading}${" ".repeat(seenDupes)}`;
            seenDupes += 1;
        }
    })
    return vocab;
}

export default function VocabMatchQuiz() {
    const params = useParams();
    const rawVocab = data.vocab[params.chapter].filter(v => v.subsect === params.subsect);
    
    const vocab = useMemo(() => removeDupeReadings(rawVocab), []);
    const initialWordbank = useMemo(() => shuffle(vocab), []);
    const initialAnswers = useMemo(() => shuffle(vocab), []);
    const longestDefChars = useMemo(() => Math.max(...vocab.map(v => v.def.length)), [vocab]);

    const [wordbank, setWordbank] = useState(initialWordbank);
    const [matches, setMatches] = useState({});
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [kanaShown, setKanaShown] = useState(false);

    function moveToSlot(word, reading) {
        const previousDef = matches[reading];

        let newWordbank = wordbank.filter(w => w.id !== word.id);
        if (previousDef && previousDef !== word.def) {
            const previousWord = vocab.find(v => v.def === previousDef);
            if (previousWord) newWordbank = [...newWordbank, previousWord];
        }
        setWordbank(newWordbank);

        const newMatches = {...matches};
        for (const key of Object.keys(newMatches)) {
            if (newMatches[key] === word.def) newMatches[key] = null;
        }
        newMatches[reading] = word.def;
        setMatches(newMatches);

        setSelected(null);
    }

    function swapItems(wordA, wordB) {
        if (wordA.id === wordB.id) {
            setSelected(null);
            return;
        }

        const readingA = Object.keys(matches).find(key => matches[key] === wordA.def);
        const readingB = Object.keys(matches).find(key => matches[key] === wordB.def);

        if (!readingA && !readingB) {
            setSelected(null);
            return;
        }

        const newMatches = {...matches};
        if (readingA) newMatches[readingA] = wordB.def;
        if (readingB) newMatches[readingB] = wordA.def;
        setMatches(newMatches);

        if (!readingA) {
            setWordbank(wordbank.filter(w => w.id !== wordA.id).concat(wordB));
        } else if (!readingB) {
            setWordbank(wordbank.filter(w => w.id !== wordB.id).concat(wordA));
        }

        setSelected(null);
    }

    function moveToWordbank(word) {
        const reading = Object.keys(matches).find(key => matches[key] === word.def);
        if (!reading) {
            setSelected(null);
            return;
        }

        const newMatches = {...matches};
        newMatches[reading] = null;
        setMatches(newMatches);

        if (!wordbank.some(w => w.id === word.id)) {
            setWordbank([...wordbank, word]);
        }
        setSelected(null);
    }

    function handleDragStart(e, word) {
        e.dataTransfer.effectAllowed = "move";
        setSelected(word);
    }

    function handleDragOver(e) {
        if (selected) {
            e.preventDefault();
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        if (!selected) return;

        if (e.target.hasAttribute("data-droppable")) {
            moveToSlot(selected, e.target.getAttribute("data-reading"));
        } else if (e.target.hasAttribute("draggable")) {
            const targetWord = vocab.find(v => v.id === e.target.id);
            if (targetWord) swapItems(selected, targetWord);
            else setSelected(null);
        } else {
            moveToWordbank(selected);
        }
    }

    // for selecting item through click instead of drag and drop
    function handleItemSelect(word) {
        if (!selected) {
            setSelected(word);
        } else if (selected.id === word.id) {
            setSelected(null);
        } else {
            swapItems(selected, word);
        }
    }

    function handleSlotClick(reading) {
        if (!selected) return;
        moveToSlot(selected, reading);
    }

    function handleWordbankAreaClick() {
        if (!selected) return;
        moveToWordbank(selected);
    }

    function checkMatch(word) {
        return matches[word.reading] === word.def;
    }

    function startOver() {
        setWordbank(initialWordbank);
        setMatches({});
        setSelected(null);
    }

    return (
        <div className="grid grid-cols-2 text-text-main">
            <div
                className="grid gap-x-1 gap-y-2 w-fit"
                style={{ gridTemplateColumns: `max-content minmax(${longestDefChars}ch, max-content)` }}
            >
            {initialAnswers.map(v => {
                const wordInSlot = vocab.find(word => word.def === matches[v.reading]);
                return (
                    <Fragment key={v.kanji ? v.kanji : v.reading}>
                        <div>
                            <div className="outline-2 py-0.5 px-1 outline-bg-main bg-bg-dim h-full">
                                {v.kanji ? v.kanji : v.reading}
                                {kanaShown && v.kanji &&
                                    <div className="text-sm text-text-dim">{v.reading}</div>
                                }
                            </div>
                        </div>
                        <div
                            className={`outline-2 py-0.5 px-1 outline-bg-dark bg-bg-main cursor-pointer ${selected && "hover:bg-bg-main/50"}`}
                            data-droppable
                            data-reading={v.reading}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => handleSlotClick(v.reading)}
                        >
                            <DragItem
                                v={wordInSlot}
                                matched={submitted ? checkMatch(v) : null}
                                handleDragStart={handleDragStart}
                                onSelect={handleItemSelect}
                                isSelected={wordInSlot ? selected?.id === wordInSlot.id : false}
                            />
                        </div>
                    </Fragment>
                );
            })}
            </div>
            <div className="flex flex-col gap-2 items-end" onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleWordbankAreaClick}>
            <div
                className="grid gap-2 w-fit"
                style={{ gridTemplateColumns: `minmax(${longestDefChars}ch, max-content)` }}
            >
            {wordbank.map(v => (
                <DragItem
                    v={v}
                    handleDragStart={handleDragStart}
                    onSelect={handleItemSelect}
                    isSelected={selected?.id === v.id}
                    key={v.def}
                    submitted={submitted}
                    matched={submitted ? checkMatch(v) : null}
                />
            ))}
            </div>
            </div>
            <div className="col-span-2 p-5 grid grid-cols-3" onDrop={handleDrop} onDragOver={handleDragOver}>
                <QuizButton fn={() => setKanaShown(!kanaShown)} text={kanaShown ? "Hide Reading" : "Show Reading"}/>
                <QuizButton fn={() => setSubmitted(!submitted)} text={submitted ? "Try Again" : "Submit Answers"} />
                <QuizButton fn={submitted ? () => null : startOver} text={"Start Over"} />
            </div>
        </div>
    )
}
