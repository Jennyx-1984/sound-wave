import { Link, useLocation } from "react-router-dom";
import styles from "../css/submit.module.css";
import React from "react";

const Submit=()=>{
    const location = useLocation();
    const { name, email, password } = location.state || {};
    return(
        <main role="main">
            <section className={styles.container_submit}>
                <div className={styles.container_results}>   
                    <h2 className={styles.title_submit}>Thank you for 
                        <span className="relative inline-block">
                        <span className="absolute -inset-1 block -skew-y-3 bg-pink-500" aria-hidden="true"></span>
                        <span className="relative text-white">registering </span>
                        </span>
                        with <span className={styles.color_app}>SoundWave!</span></h2>
                    <p className={styles.welcome}>Hi <strong>{name}</strong>!
                        Welcome to <span className={styles.color_app}><strong>SoundWave</strong>.</span> Save your account 
                        information. </p>
                    <div className={styles.result}>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Password:</strong> {password}</p>
                    </div>
                    <div className={styles.button_field}><Link to="/"><button className={styles.back}>Back</button></Link></div>
                </div> 
            </section>
        </main>
    )
}

export default Submit;