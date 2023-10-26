import './App.css';
import SetInput from "./SetInput";
import axios from "axios";

function getCards(searchUri, pageNumber){
    axios.get(`${searchUri}&page=${pageNumber}`)
        .then(response=>{
            if(response.data.has_more){
                // requête + data
            }
            else {
                // data
            }
        })
    return 'a'
}
function getSet(setAcronym){
    axios.get(`https://api.scryfall.com/sets/${setAcronym}`)
        .then(response => {
            console.log("extension trouvée, acquisition des cartes")
            console.log(getCards(response.data.search_uri, 1));
        })
        .catch(error => {
            console.log("impossible de trouver l'extension")
        });
}

function App() {
  return (
    <div className="App">

      <SetInput
          text={"Select set"}
          placeHolder={"set acronym"}
          onImport={getSet}
      />

    </div>
  );
}

export default App;
