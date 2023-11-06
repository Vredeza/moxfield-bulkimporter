import CardTabRow from "./CardTabRow";
import "./CardTab.css"
import {useState} from "react";
import axios from "axios";

function CardTab({cards, cardAmounts, setCardAmounts, foilCardAmounts, setFoilCardAmounts   }) {

    const [symbology, setSymbology] = useState([])

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

    if (Object.keys(symbology).length === 0) {
        axios.get("https://api.scryfall.com/symbology")
            .then((response) => {

                let formatedSymbology = [];

                response.data.data.forEach(symbol => {
                    formatedSymbology[symbol.symbol] = symbol.svg_uri;
                });

                setSymbology(formatedSymbology);
                console.log(symbology);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                    symbology={symbology}
                />
            ))}
            </tbody>
        </table>
    )
}

export default CardTab;