import logo from '../assets/logos/logo-clear-white.svg';
import navIcon from "../assets/icons/nav-icon.svg";

export default function HeaderBar() {
    return (
        <header className="bg-bg-main h-16 min-h-16 flex items-center gap-3 px-4">
            <button className='hover:bg-bg-dim/50 p-2 rounded-full cursor-pointer'>
                <img 
                    src={navIcon} 
                    alt="Navigation icon"
                    className='w-6'
                />
            </button>
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
        </header>
    )
}