export default function ChapterNavLink({text, link}) {
    return (
        <li>
            <a 
            className="text-text-main underline underline-offset-3 hover:text-genki-light" 
            href={link}
            >
                {text}
            </a>
        </li>
    )
}