export default function ChapterNavLink({text, link}) {
    return (
        <li>
            <a 
            className="text-text-main underline decoration-text-dim/40 underline-offset-4 hover:text-genki-orange hover:decoration-genki-orange transition-colors"
            href={link}
            >
                {text}
            </a>
        </li>
    )
}