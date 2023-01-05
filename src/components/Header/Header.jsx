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
                
                <Link to='team' spy={true} smooth={true}><button className="button">Users</button></Link>
                <Link to='form' spy={true} smooth={true}><button className="button">Sign up</button></Link>
            </header>
        </div>
    )
}

export default Header