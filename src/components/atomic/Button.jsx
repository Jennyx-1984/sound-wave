import '../../css/ButtonNav.css';
import '../../css/buttonJoin.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Button=({texto, BtnClass,path})=>{
    const navigate = useNavigate();
return(
<>
<button className={BtnClass} onClick={() => navigate(path)}>{texto}</button>
</>

)
}

export default Button;