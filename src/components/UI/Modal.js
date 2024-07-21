import styles from './Modal.module.css';
import React from "react";
import ReactDOM from "react-dom";

const Backdrops = (props) => {
    return <div className={styles.backdrop} onClick={props.onHideCart}></div>
};

const ModalWindow = (props) => {
    return <div className={styles.modal}>
        <div>{props.children}</div>
    </div>
};

const portalElement = document.querySelector('#overlays');

const Modal = (props) => {
    return <React.Fragment>
        {ReactDOM.createPortal(<Backdrops onHideCart={props.onHideCart}/>, portalElement)}
        {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
    </React.Fragment>
};

export default Modal;