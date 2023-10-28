import "./LanguageSelector.css"

function LanguageSelector({languageList, setLanguage}) {
    return (
        <select>
            {languageList.map((language, index) => (
                <option value={language} key={index}>{language}</option>
            ))}
        </select>
    )
}

export default LanguageSelector;