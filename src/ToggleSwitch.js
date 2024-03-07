import "./ToggleSwitch.css"

function ToggleSwitch({value, setValue}) {

    const handleChange = (event) => {
        const newValue = event.target.checked;
        setValue(newValue);
    };

    return (
        <label className="toggleSwitch">
            <input type="checkbox" checked={value} onChange={handleChange}/>
            <span className="slider round"></span>
        </label>
    )
}

export default ToggleSwitch;