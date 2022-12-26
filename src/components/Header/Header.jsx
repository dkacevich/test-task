import './Header.scss'
import logo from './../../assets/logo.svg'

const Header = () => {
    return (
        <div className="header__container">
            <header className='header'>
                <div>
                    <a className='header__logo' href=""><img src={logo} alt="" /></a>
                </div>
                <button className="button">Users</button>
                <button className="button">Sign up</button>
            </header>
        </div>
    )
}

export default Header