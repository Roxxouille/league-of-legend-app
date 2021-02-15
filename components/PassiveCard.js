import { useState } from "react";

const PassiveCard = ({ passive, handleDetails }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div className="">
            <div
                className={`m-2 p-2 rounded-xl ${showDetails ? "bg-white" : "bg-gray-900"}`}
                onMouseEnter={() => { handleDetails(true, passive); setShowDetails(true) }}
                onMouseLeave={() => { handleDetails(false); setShowDetails(false) }}
            >
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/passive/${passive.image.full}`} />
            </div>
        </div>

    )
}

export default PassiveCard;