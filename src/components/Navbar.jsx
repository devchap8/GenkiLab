import logo from '../assets/logos/logo-clear-white.svg';


export default function Navbar() {
    return (
        <nav className="bg-genki-orange h-28 min-h-28">
            <a href="/">
                <img 
                    src={logo} 
                    alt="GenkiLab Logo"
                    className='w-30 ml-1'
                >

                </img>
            </a>
        </nav>
    )
}