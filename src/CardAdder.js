import './CardAdder.css';
import {useState} from "react";

function CardAdder({ cards, addNonFoil, addFoil }) {
    const [cardNumber, setCardNumber] = useState('');

    const [lastAddedCardIndex, setLastAddedCardIndex] = useState(-2)
    const [isLastAddedCardFoil, setIsLastAddedCardFoil] = useState(false)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleAddNonFoil();
        } else if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            handleAddFoil();
        }
    };

    const getIndexFromCardNumber = () => {
        const index = cards.findIndex(card => card.collector_number === cardNumber);
        return index !== -1 ? index : -1;
    };


    const handleAddNonFoil = () => {

        const index = getIndexFromCardNumber()
        if (index !== -1){
            setIsLastAddedCardFoil(false)
            addNonFoil(index, 1)
        }
        setLastAddedCardIndex(index)
        setCardNumber('');
    };

    const handleAddFoil = () => {

        const index = getIndexFromCardNumber()
        if (index !== -1){
            setIsLastAddedCardFoil(true)
            addFoil(index, 1)
        }
        setLastAddedCardIndex(index)
        setCardNumber('');
    };

    const removeLastAddedCard = () => {
        if (!isLastAddedCardFoil) {
            addNonFoil(lastAddedCardIndex, -1)
        }
        else {
            addFoil(lastAddedCardIndex, -1)
        }
        setLastAddedCardIndex(-2)
    }

    return (
        <div className={"cardAdder"}>
            <p>Add cards : </p>
            <div className={"cardAdderInput"}>
                <input
                    type={"text"}
                    placeholder={"Card number"}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    type={"button"}
                    value={"Add non-foil"}
                    onClick={handleAddNonFoil}
                    className={cardNumber.length >= 1 ? "available" : ""}
                />
                <input
                    type={"button"}
                    value={"Add foil"}
                    onClick={handleAddFoil}
                    className={cardNumber.length >= 1 ? "available" : ""}
                />
            </div>
            <div className={"cardAdderFeedback"}>
                {lastAddedCardIndex === -1 &&
                    <span>No corresponding cards</span>
                }
                {lastAddedCardIndex >= 0 &&
                    <>
                        <span>
                            Added {isLastAddedCardFoil && "foil "}
                            <span className={"addedCardName"}>
                                {cards[lastAddedCardIndex].name}
                                <img
                                    src={(cards[lastAddedCardIndex].image_uris && cards[lastAddedCardIndex].image_uris.small) || (cards[lastAddedCardIndex].card_faces && cards[lastAddedCardIndex].card_faces[0].image_uris && cards[lastAddedCardIndex].card_faces[0].image_uris.small)}
                                    alt={cards[lastAddedCardIndex].name}
                                    loading="lazy"
                                    className={"cardImage"}
                                />
                            </span>
                        </span>
                        <input
                            type={"button"}
                            value={"Undo"}
                            onClick={removeLastAddedCard}
                        />
                    </>

                }
            </div>
        </div>
    );
}

export default CardAdder;