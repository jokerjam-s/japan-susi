import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD_ACTION") {
        const updatesTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = [...state.items, action.item];
        }

        return {
            items: updatedItems,
            totalAmount: updatesTotalAmount,
        };
    }

    if (action.type === "REMOVE_ACTION" && state.items.length > 0) {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem;
        let updatedItems;
        let updatesTotalAmount = state.totalAmount;

        if (existingCartItem) {
            updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            if (updatedItem.amount === 0) {
                updatedItems = state.items.filter(item => item.id !== action.id);
            } else {
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            updatesTotalAmount -= updatedItem.price;
        } else {
            updatedItems = [...state.items];
        }

        return {
            items: updatedItems,
            totalAmount: updatesTotalAmount,
        }
    }

    return defaultCartState;
};

const CartContextProvider = (props) => {

    const [cartState, dispatcCartState] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatcCartState({
            type: "ADD_ACTION",
            item: item,
        });
    };

    const removeItemHandler = id => {
        dispatcCartState({
            type: "REMOVE_ACTION",
            id: id,
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartContextProvider;