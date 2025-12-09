import '../../css/ButtonJoin.css';
import { useNavigate } from 'react-router-dom';

const ButtonJoin=({texto, BtnClass,path})=>{
    const navigate = useNavigate();
return(
<>
<button className={BtnClass} onClick={() => navigate(path)}>{texto}</button>
</>
)
}
export default ButtonJoin;