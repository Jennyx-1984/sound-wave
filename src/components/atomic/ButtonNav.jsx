import '../../css/ButtonNav.css';
import { useNavigate } from 'react-router-dom';

const ButtonNav=({texto, BtnClass,path})=>{
    const navigate = useNavigate();
return(
<>
<button className={BtnClass} onClick={() => navigate(path)}>{texto}</button>
</>

)
}

export default ButtonNav;