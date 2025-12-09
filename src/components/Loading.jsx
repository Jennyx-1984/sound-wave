import Logo from '../assets/images/logo.png';
import '../css/loading.css';


function Loading(){
    return(
        <div className='loading'>
            <img src={Logo} alt="Logo Sound Wave"/><p className='title-load'>SoundWave</p>
        </div>
    )
}

export default Loading;