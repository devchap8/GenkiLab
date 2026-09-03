export default function ChapterNavLink({text, link, type}) {
    return (
        <li>
            <a 
            className={`text-text-main underline decoration-text-dim/40 underline-offset-4 hover:text-genki-orange hover:decoration-genki-orange transition-colors ${type === "sidebar" && "text-sm"}`}
            href={link}
            >
                {text}
            </a>
        </li>
    )
}