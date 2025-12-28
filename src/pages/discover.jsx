import ButtonDiscover from "../components/atomic/ButtonDiscover";
import Microphone from "../assets/images/microphone.svg";
import Albums from "../assets/images/albums.svg";
import More from "../assets/images/more.svg";
import styles from "../css/discover.module.css";
import Covers from "../assets/images/covers.jpg";
import React from "react";

function Discover(){
return(
    <main className={styles.main_discover}>
        <section className={styles.discover}>
            <div className={styles.container_discover}>
                <h2 className={styles.title_discover}>Discover new music</h2>
                <div className={styles.field_btn}>
                    <ButtonDiscover  image={Microphone} text="Charts" path="/construction"/>
                    <ButtonDiscover image={Albums} text="Albums" path="/construction"/>
                    <ButtonDiscover image={More} text="More" path="/construction"/>
                </div>
                <p className={styles.intro_disc}>By joining you can benefit by listening to the latest albums released.</p>
            </div>
            <div className={styles.field_covers}><img src={Covers} alt="Covers" className={styles.covers} /></div>
        </section>
    </main>
)
}

export default Discover;