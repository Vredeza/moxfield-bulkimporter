import {useState} from "react";
import './SetInput.css';

function SetInput({text = 'Import', onImport, placeHolder = ''}) {

    const [set, setSet] = useState("");
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            importData(set);
        }
    };

    const importData = () => {
        if (set.length >= 1) {
            onImport(set);
        }
    }

    return(
        <div className={"setInput"}>
            <input type={"text"} onKeyDown={handleKeyPress} onChange={(event) => setSet(event.target.value)} placeholder={placeHolder}/>
            <input type={"button"} value={text} onClick={() => importData(set)} className={set.length >= 1 ? "available" : ""}/>
        </div>
    );
}

export default SetInput;