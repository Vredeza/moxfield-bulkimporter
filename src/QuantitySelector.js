import "./QuantitySelector.css"

function QuantitySelector({updateQuantity}) {

    return (
        <div className={"quantitySelector"}>
            <input type={"number"} onChange={(event) => updateQuantity(event.target.value)} placeholder={"0"}/>
        </div>

    );
}

export default QuantitySelector;