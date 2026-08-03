export default function ChapterNavLink({text, link}) {
    return (
        <li><a className="text-text-main underline" href={link}>{text}</a></li>
    )
}