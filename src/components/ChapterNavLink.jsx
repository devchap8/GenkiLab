import { Link } from "react-router";

export default function ChapterNavLink({text, link, type, onNavigate}) {
    return (
        <li>
            <Link
            className={`text-text-main underline decoration-text-dim/40 underline-offset-4 hover:text-genki-orange hover:decoration-genki-orange transition-colors ${type === "sidebar" && "text-sm"}`}
            to={link}
            onClick={onNavigate}
            >
                {text}
            </Link>
        </li>
    )
}