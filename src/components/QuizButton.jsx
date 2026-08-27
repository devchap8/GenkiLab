export default function QuizButton({fn, text, isSubmit, styles}) {
    return (
        <button
            className={`${styles} bg-genki-orange hover:bg-genki-light text-bg-dark font-bold text-xl rounded-lg py-2 px-4 max-w-sm cursor-pointer ml-auto mr-auto`}
            onClick={fn}
            type={isSubmit ? "submit" : "button"}
        >
            {text}
        </button>
    )
}