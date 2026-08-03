export default function ChapterNavLink({text, link}) {
    return (
        <li><a className="text-zinc-200 underline" href={link}>{text}</a></li>
    )
}