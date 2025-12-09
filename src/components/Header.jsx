import ButtonNav from './atomic/ButtonNav';
import Logo from '../assets/images/logo.png';
import '../css/header.css';
import { Link } from "react-router-dom";



const Header= () =>{
    return(
        <header>
            <div className='cabecera'><img src={Logo} alt="Logo Sound Wave"/>
            <h1>
                <Link to="/">Soundwave</Link>
            </h1>
            </div>
            <nav>
            <ul>
                <li><ButtonNav texto="Discover" BtnClass="btn-nav" path="/discover"/></li>
                <li><ButtonNav texto="Join" BtnClass="btn-nav" path="/join"/></li>
            </ul>
</nav>
        </header>
    )
    
}

export default Header;