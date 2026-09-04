import labLogo from '../assets/logos/logo-clear-white.svg';
import navIcon from "../assets/icons/nav-icon.svg";
import SidebarNav from './SidebarNav';
import { useState } from 'react';
import { Link } from 'react-router';

export default function HeaderBar() {

    const [navShown, setNavShown] = useState(false);
    function toggleNav() {
        setNavShown(!navShown);
    }

    return (
        <header className="bg-bg-main h-16 min-h-16 flex items-center gap-3 relative px-3">
            <SidebarNav navShown={navShown} toggleNav={toggleNav}/>
            <button className='hover:bg-bg-dim/50 p-2 rounded-full cursor-pointer' onClick={toggleNav}>
                <img 
                    src={navIcon} 
                    alt="Navigation icon"
                    className='w-6'
                />
            </button>
            <Link to="/" className="inline-block">
                <div className="flex items-center gap-2">
                    <img
                        src={labLogo}
                        alt="GenkiLab Logo"
                        className='w-10'
                    />
                    <span className="text-text-main text-xl font-bold tracking-wide">GenkiLab</span>
                </div>
                <div className="bg-genki-orange h-0.5 mt-1"></div>
            </Link>
        </header>
    )
}