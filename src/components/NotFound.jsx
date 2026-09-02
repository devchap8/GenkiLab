export default function NotFound() {
    return (
        <div className="flex flex-col bg-bg-main h-full w-full justify-center items-center">
            <div className="flex flex-col text-center mb-30 gap-3">
                <h1 className="text-genki-orange text-6xl sm:text-8xl font-bold">Error 404</h1>
                <div className="text-2xl sm:text-3xl text-text-main">The page you requested could not be found</div>
                <a className="text-text-dim mt-10 text-2xl border py-2 px-6 rounded-lg w-fit mx-auto hover:border-genki-orange hover:bg-genki-orange hover:text-text-main transition-colors duration-250" href="/">Return Home</a>
            </div>
        </div>
    )
}