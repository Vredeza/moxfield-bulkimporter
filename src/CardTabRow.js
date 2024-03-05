import "./CardTabRow.css"
import QuantitySelector from "./QuantitySelector";
import ManaCost from "./ManaCost";

function CardTabRow({card, cardAmount, foilCardAmount, updateCardAmount, updateFoilCardAmount, symbology}){

    let imageUri
    let mana_cost
    if (!Object.hasOwn(card, "image_uris")){
        imageUri = card.card_faces[0].image_uris.small;
        mana_cost = card.card_faces[0].mana_cost;
    }
    else {
        imageUri = card.image_uris.small;
        mana_cost = card.mana_cost;
    }

    mana_cost === "" ? mana_cost = "-" : mana_cost = mana_cost;

    return (
        <tr className={"tableRow"}>
            <td className={"cardNumber"}>{card.collector_number}</td>
            <td id={"name"}>
                <a href={card.scryfall_uri} target="_blank" rel="noreferrer">
                    {card.name}
                    <img src={imageUri} alt={card.name} loading="lazy" className={"cardImage"}/>
                </a>
            </td>
            <td>
                {Object.keys(symbology).length !== 0 &&
                    <ManaCost manaCost={mana_cost} symbology={symbology}/>
                }
            </td>
            <td><QuantitySelector updateQuantity={updateCardAmount} quantity={cardAmount}/></td>
            <td><QuantitySelector updateQuantity={updateFoilCardAmount} quantity={foilCardAmount}/></td>
        </tr>
    )
}

export default CardTabRow;