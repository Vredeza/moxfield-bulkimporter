import "./ManaCost.css"

function ManaCost({manaCost, symbology}){

    let formatedManaCost;
    if (manaCost === "-") {
        formatedManaCost = [];
    } else {
        const splitManaCost = manaCost.split(" // ");
        formatedManaCost = splitManaCost.map(part => part.match(/{[^}]+}/g));
    }

    return (
        <div className={"manaCost"}>
            {formatedManaCost.length !== 0 ?
                formatedManaCost.map((cost, index) => (
                    <>
                        {index > 0 && " // "}
                        {cost.map((symbol, i) => (
                            <>
                                <img src={symbology[symbol]} alt={symbol}/>
                                {i < cost.length - 1 && " "}
                            </>
                        ))}
                    </>
                ))
                :
                <>-</>
            }
        </div>
    );
}

export default ManaCost;