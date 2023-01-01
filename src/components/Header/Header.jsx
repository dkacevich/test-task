import './Header.scss'
import logo from './../../assets/logo.svg'

import { Link } from 'react-scroll'


const Header = () => {
    return (
        <div className="header__container">
            <header className='header'>
                <div>
                    <a className='header__logo' href=""><img src={logo} alt="" /></a>
                </div>
                
                <button className="button"><Link to='team' spy={true} smooth={true}>Users</Link></button>
                <button className="button"><Link to='form' spy={true} smooth={true}>Sign up</Link></button>
            </header>
        </div>
    )
}

export default Header