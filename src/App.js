import './App.css';
import SetInput from "./SetInput";
import axios from "axios";
import CardTab from "./CardTab";
import {useState} from "react";
import LanguageSelector from "./LanguageSelector";
import DownloadButton from "./DownloadButton";

function App() {

    const languageList =["French", "English"];

    const [cards, setCards] = useState([])
    const [setMessage, setSetMessage] = useState("")
    const [language, setLanguage] = useState(languageList[0])

    const [cardAmounts, setCardAmounts] = useState([]);
    const [foilCardAmounts, setFoilCardAmounts] = useState([]);

    const getAllCards = async (searchUri, allData = []) => {
        try {
            const response = await axios.get(searchUri);
            const { data, has_more, next_page } = response.data;
            allData = allData.concat(data);

            if (has_more) {
                return getAllCards(next_page, allData);
            } else {
                return allData;
            }
        } catch (error) {
            console.error(error);
            return allData;
        }
    }

    const getSet = (setAcronym) => {
        axios.get(`https://api.scryfall.com/sets/${setAcronym}`)
            .then(response => {
                console.log("extension trouvée, acquisition des cartes")
                setSetMessage(`Set : ${response.data.name}`)
                getAllCards(response.data.search_uri).then(cards => {
                    setCards(cards)
                    console.log(cards);
                    setCardAmounts(Array(cards.length).fill(0))
                    setFoilCardAmounts(Array(cards.length).fill(0))
                });
            })
            .catch(error => {
                setSetMessage("Unable to find set")
                setCards([])
            });
    }

    function generateFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Le mois commence à 0, donc on ajoute 1 et on formate sur deux chiffres.
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    const getData = () => {
        const data = [];
        const date = generateFormattedDate();

        cards.map((card, index) => {

            // Non-foil
            if (cardAmounts[index] > 0) {
                data.push({
                    "Count": cardAmounts[index],
                    "Tradelist Count": cardAmounts[index],
                    "Name": `"${card.name}"`, // quotes
                    "Edition": card.set,
                    "Condition": "Near Mint",
                    "Language": language,
                    "Foil": "\"\"",
                    "Tags": "\"\"",
                    "Last Modified": date,
                    "Collector Number": card.collector_number,
                    "Alter": "False",
                    "Proxy": "False",
                    "Purchase Price": "\"\""
                });
            }

            // Foil
            if (foilCardAmounts[index] > 0) {
                data.push({
                    "Count": foilCardAmounts[index],
                    "Tradelist Count": foilCardAmounts[index],
                    "Name": `"${card.name}"`,
                    "Edition": card.set,
                    "Condition": "Near Mint",
                    "Language": language,
                    "Foil": "foil",
                    "Tags": "\"\"",
                    "Last Modified": date,
                    "Collector Number": card.collector_number,
                    "Alter": "False",
                    "Proxy": "False",
                    "Purchase Price": "\"\""
                });
            }
        })

        return data;
    }

    return (
        <div id="App">
            <div id={"settings"}>
                <SetInput
                    text={"Select set"}
                    placeHolder={"set acronym"}
                    onImport={getSet}
                />
                <LanguageSelector
                    languageList={languageList}
                    setLanguage={setLanguage}
                />

                <DownloadButton
                    getData={getData}
                    available={cards.length !== 0}
                />
            </div>

            <p className={"setMessage"}>{setMessage}</p>

            {cards.length !== 0 &&
                <CardTab
                    cards={cards}
                    cardAmounts={cardAmounts}
                    setCardAmounts={setCardAmounts}
                    foilCardAmounts={foilCardAmounts}
                    setFoilCardAmounts={setFoilCardAmounts}
                />
            }

        </div>
    );
}

export default App;
