import CardTabRow from "./CardTabRow";
import "./CardTab.css"
import {useState} from "react";
import axios from "axios";

function CardTab({cards, cardAmounts, updateCardAmounts, foilCardAmounts, updateFoilCardAmounts   }) {

    const [symbology, setSymbology] = useState([])

    if (Object.keys(symbology).length === 0) {
        axios.get("https://api.scryfall.com/symbology")
            .then((response) => {

                let formatedSymbology = [];

                response.data.data.forEach(symbol => {
                    formatedSymbology[symbol.symbol] = symbol.svg_uri;
                });

                setSymbology(formatedSymbology);
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
                    cardAmount={cardAmounts[index]}
                    foilCardAmount={foilCardAmounts[index]}
                    updateCardAmount={(newValue) => updateCardAmounts(index, newValue)}
                    updateFoilCardAmount={(newValue) => updateFoilCardAmounts(index, newValue)}
                    symbology={symbology}
                />
            ))}
            </tbody>
        </table>
    )
}

export default CardTab;