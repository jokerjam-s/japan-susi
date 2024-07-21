import React from "react";
import SushiImage from "../../assets/sushi.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header}>
            <h1>Япона кухня</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={styles['main-image']}>
            <img src={SushiImage} alt="Sushi image"/>
        </div>
    </React.Fragment>
};

export default Header;