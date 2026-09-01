export default function ChapterSection({title, children}) {
    if (!children || (Array.isArray(children) && children.every(c => !c))) return null;

    return (
        <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-text-dim">{title}</p>
            {children}
        </div>
    )
}
