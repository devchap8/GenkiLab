import SidebarChapterIndex from './SidebarChapterIndex';
import labLogo from '../assets/logos/logo-clear-orange.svg';
import xIcon from "../assets/icons/x-icon.svg";

const lessonNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const extraLinks = {
    
};

export default function SidebarNav({navShown, toggleNav}) {
    return (
        <nav className={`fixed w-70 h-screen bg-bg-dark top-0 left-0 transition-transform duration-250 ${navShown ? "translate-x-0" : "-translate-x-full"}`}>
            <header className='px-1 py-2 flex justify-between border-b border-bg-dim'>
                <a href="/" className='inline-block'>
                    <img 
                        src={labLogo}
                        alt="GenkiLab logo"
                        className='w-10'
                    />
                </a>
                <div className='text-2xl font-semibold text-text-main'>Navigation</div>
                <button className='p-2 hover:bg-bg-dim/20 rounded-full cursor-pointer' onClick={toggleNav}>
                    <img 
                        src={xIcon}
                        alt="Close Navbar Icon"
                        className='w-6'
                    />
                </button>
            </header>
            <div className='flex flex-col'>
                {lessonNums.map(n => 
                    <SidebarChapterIndex key={n} lessonNum={n} extras={extraLinks[`L${n}`]}/>
                )}                
            </div>
        </nav>
    )
}