import Form from "../components/Form";
import styles from "../css/join.module.css";
import Circle from "../components/atomic/Circle";
import useCrud from "../components/helpers/createData";
import React from "react";

function Join(){

    const { createData } = useCrud("http://localhost:3000/accounts");
    return(    
        <main role="main" className={styles.main_join}>
            <section className={styles.container_wrap}>
                <Circle id="circle-four"/>
                <Circle id="circle-five"/>   
                <div className={styles.container_text}>    
                    <h2 className={styles.title_join}>Join the <span className={styles.text_color}>fun.</span></h2>
                </div>
                <div className={styles.container_form}>
                     <Form createData={createData} />   
                </div>
            </section>
        </main>
)
}

export default Join;