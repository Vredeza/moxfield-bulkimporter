import "./Loading.css"
function Loading() {
    return (
        <div className={"loadingImg"}>
            <img src={process.env.PUBLIC_URL + "/ratIcon.ico"} alt={"Rat qui bouge"}/>
        </div>
    )
}

export default Loading;