import backgroundImage from '../assets/images/landing-page-girl.png';
import Circle from '../components/atomic/Circle';
import Button from '../components/atomic/Button';
import '../css/presentacion.css';

function Presentacion(){
return(
    <main className="present">
        <Circle id="circle-one"/>
        <Circle id="circle-two"/>
        <Circle id="circle-three"/> 
        <div className='container'>   
<           img src={backgroundImage} alt='Chica escuchando musica'/>
            <div className='container-text'>
                <h2>Feel The Music</h2>
                <p>Stream over 20 thousand songs with one click</p>
                <Button texto="Join Now" BtnClass="cta-join" path="/join"/>
            </div>
        </div>
    </main>
)
}

export default Presentacion;