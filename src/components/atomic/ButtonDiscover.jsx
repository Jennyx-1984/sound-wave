import styles from '../../css/buttondiscover.module.css';
import { Link } from 'react-router-dom';

const ButtonDiscover=({text,image,path})=>{
return(
<>
<Link to={path} className={styles.linkReset}>
<button className={styles.btn_dsc}><img src={image} alt={text} className={styles.btn_image} />{text}</button>
</Link>
</>
)
}

export default ButtonDiscover;