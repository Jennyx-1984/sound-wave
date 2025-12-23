import Button from './atomic/Button';
import Logo from '../assets/images/logo.png';
import '../css/header.css';
import { Link } from "react-router-dom";

const Header= () =>{
    return(
        <header role='banner'>
            <div className='cabecera'><img src={Logo} alt="Logo Sound Wave"/>
                <h1><Link to="/">Soundwave</Link></h1>
            </div>
            <nav role='navigation'>
                <ul>
                    <li><Button texto="Discover" BtnClass="btn-nav" path="/discover"/></li>
                    <li><Button texto="Join" BtnClass="btn-nav" path="/join"/></li>
                </ul>
            </nav>
        </header>
    ) 
}
export default Header;