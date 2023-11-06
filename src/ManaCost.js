import "./ManaCost.css"

function ManaCost({manaCost, symbology}){

    let formatedManaCost;
    manaCost === "-" ? formatedManaCost = [] : formatedManaCost = manaCost.match(/{[^}]+}/g)

    return (
        <div className={"manaCost"}>
            {formatedManaCost.length !== 0 ?
                formatedManaCost.map((cost, index) => (
                    <img
                        key={index}
                        src={symbology[cost]}
                        alt={cost}
                    />
                ))
                :
                <>-</>
            }
        </div>
    );
}

export default ManaCost;