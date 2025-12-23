import styles from '../css/footer.module.css';
import Twitter from '../assets/images/twitter.svg';
import Facebook from '../assets/images/facebook.svg';
import { Link } from 'react-router-dom';

const Footer=()=>{
    return(
        <footer role="contentinfo">
            <div className={styles.footer_info}>
                <ul>
                    <Link to="/construction"><li>About Us</li></Link>
                    <Link to="/construction"><li>Contact</li></Link>
                </ul>
            </div>
            <div className={styles.footer_rrss}>
                <ul>
                    <li className={styles.rrss}><img src={Twitter} alt="logo Twitter"/>
                    <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer sponsored">Twitter</a>
                    </li>
                    <li className={styles.rrss}><img src={Facebook} alt="logo Facebook"/>
                    <a href="https://www.facebook.com/" target='_blank' rel="noopener noreferrer sponsored">Facebook</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer;