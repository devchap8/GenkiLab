import labLogo from '../assets/logos/logo-clear-white.svg';
import xIcon from "../assets/icons/x-icon.svg";

export default function SidebarNav({navShown, toggleNav}) {
    return (
        <nav className={`fixed w-70 h-screen bg-bg-dark top-0 left-0 transition-transform duration-250 ${navShown ? "translate-x-0" : "-translate-x-full"}`}>
            <header className='px-1 py-2 flex justify-between'>
                <a href="/" className='inline-block'>
                    <img 
                        src={labLogo}
                        alt="GenkiLab logo"
                        className='w-10'
                    />
                </a>
                <div className='text-2xl font-semibold text-text-dim'>Navigation</div>
                <button className='p-2 hover:bg-bg-dim/20 rounded-full cursor-pointer' onClick={toggleNav}>
                    <img 
                        src={xIcon}
                        alt="Close Navbar Icon"
                        className='w-6'
                    />
                </button>
            </header>
        </nav>
    )
}