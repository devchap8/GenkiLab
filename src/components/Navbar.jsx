import logo from '../assets/logos/logo-clear-white.svg';


export default function Navbar() {
    return (
        <nav className="bg-bg-main h-16 min-h-16 flex items-center justify-between px-4">
            <a href="/" className="inline-block">
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="GenkiLab Logo"
                        className='w-10'
                    />
                    <span className="text-text-main text-xl font-bold tracking-wide">GenkiLab</span>
                </div>
                <div className="bg-genki-orange h-0.5 mt-1"></div>
            </a>
        </nav>
    )
}