import "./QuantitySelector.css"
import {useState} from "react";

function QuantitySelector({updateQuantity}) {

    const [quantity, setQuantity] = useState(0)

    const increment = () => {
        setQuantity(quantity + 1);
        updateQuantity(quantity);
    }

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity -1);
            updateQuantity(quantity);
        }
    }

    const requestNewValue = () => {
        let newValue = prompt("New amount : ", quantity.toString())
        if (!isNaN(newValue)) { // is a number
            setQuantity(parseFloat(newValue));
            updateQuantity(parseFloat(newValue));
        }
    }

    return (
        <div className={"quantitySelector"}>

            <button onClick={decrement}>-</button>
            <button className={quantity === 0 && "null"} onClick={requestNewValue}>{quantity}</button>
            <button onClick={increment}>+</button>

        </div>
    );
}

export default QuantitySelector;