import styles from './Input.module.css';
import React from "react";

const Input = React.forwardRef((props, ref) => {
    return <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input id={props.input.id} {...props.input} ref={ref}/>
    </div>
});

export default Input;
