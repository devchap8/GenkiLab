export default function ChapterSection({title, children, navType}) {
    if (!children || (Array.isArray(children) && children.every(c => !c))) return null;

    return (
        <div>
            <p 
            className={
                navType === "main"
                ? "text-xs uppercase tracking-wide font-semibold text-text-dim"
                : navType === "sidebar"
                ? "text-xs uppercase tracking-wide font-semibold text-text-dim"
                : null
            }
            >
                {title}
            </p>
            {children}
        </div>
    )
}
