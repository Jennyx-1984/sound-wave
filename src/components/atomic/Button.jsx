import '../../css/ButtonNav.css';
import '../../css/buttonJoin.css';
import { useNavigate } from 'react-router-dom';

const Button=({texto, BtnClass,path})=>{
    const navigate = useNavigate();
return(
<>
<button className={BtnClass} onClick={() => navigate(path)}>{texto}</button>
</>

)
}

export default Button;