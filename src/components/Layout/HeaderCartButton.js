import styles from "./HeaderCartButton.module.css";
import CartIcon from '../Cart/CartIcon';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

    const [isButtonAnimated, setIsButtonAnimated] = useState(false);

    const cartContext = useContext(CartContext);

    const cartItemsCount = cartContext.items.reduce((currentValue, item) => {
        return currentValue + item.amount;
    }, 0);

    useEffect(() => {
        if (!cartContext.items.length) {
            return;
        }
        setIsButtonAnimated(true);

        const timer = setTimeout(() => {
            setIsButtonAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer)
        };
    }, [cartContext.items]);

    const buttonClass = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`;

    return <button className={buttonClass} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>
            Корзина
        </span>
        <span className={styles.badge}>
            {cartItemsCount}
        </span>
    </button>
};

export default HeaderCartButton;