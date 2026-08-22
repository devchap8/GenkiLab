export default function DragItem({v, handleDragStart, matched}) {
    if(!v) return;
    return (
        <div 
            className={`outline-2 py-0.5 px-1 bg-bg-dim ${matched === null ? "outline-bg-main" : matched === true ? "outline-lime-400" : "outline-red-500"}`} 
            id={v.id} 
            onDragStart={handleDragStart} 
            draggable={matched === null} 
        >
            {v.def}
            {matched !== null && 
                <div className="text-sm text-text-dim">{v.kanji ? v.kanji : v.reading}</div>
            }
        </div>
    )
}