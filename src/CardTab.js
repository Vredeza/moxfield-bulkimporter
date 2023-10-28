import CardTabRow from "./CardTabRow";
import "./CardTab.css"

function CardTab({cards, cardAmounts, setCardAmounts, foilCardAmounts, setFoilCardAmounts   }) {

    const handleUpdateCardAmount = (index, newValue) => {
        console.log("nouvelle valeur")
        const newCardAmounts = [...cardAmounts];
        newCardAmounts[index] = newValue;
        setCardAmounts(newCardAmounts);
    };

    const handleUpdateFoilCardAmount = (index, newValue) => {
        console.log("nouvelle valeur foil")
        const newFoilCardAmounts = [...foilCardAmounts];
        newFoilCardAmounts[index] = newValue;
        setFoilCardAmounts(newFoilCardAmounts);
    };

    return (
        <table className={"cardTab"}>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mana value</th>
                <th>Amount</th>
                <th>Foil Amount</th>
            </tr>
            </thead>
            <tbody>
            {cards.length !== 0 && cards.map((card, index) => (
                <CardTabRow
                    card={card}
                    key={index}
                    updateCardAmount={(newValue) => handleUpdateCardAmount(index, newValue)}
                    updateFoilCardAmount={(newValue) => handleUpdateFoilCardAmount(index, newValue)}
                />
            ))}
            </tbody>
        </table>
    )
}

export default CardTab;