export default function DragItem({v, handleDragStart, onSelect, matched, isSelected}) {
    if(!v) return;

    const selectable = matched === null;
    const outlineClass = !selectable
        ? (matched === true ? "outline-2 outline-lime-400" : "outline-2 outline-red-500")
        : (isSelected ? "outline-4 outline-genki-orange" : "outline-2 outline-bg-main hover:outline-genki-orange/50");

    return (
        <div
            className={`py-0.5 px-1 bg-bg-dim ${outlineClass} ${selectable ? "cursor-pointer" : ""}`}
            id={v.id}
            onDragStart={selectable ? (e) => handleDragStart(e, v) : undefined}
            onClick={selectable ? (e) => { e.stopPropagation(); onSelect(v); } : undefined}
            draggable={selectable}
        >
            {v.def}
            {matched !== null &&
                <div className="text-sm text-text-dim">{v.kanji ? v.kanji : v.reading}</div>
            }
        </div>
    )
}
