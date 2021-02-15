import { useState } from "react";

const PassiveCard = ({ passive }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div className="">
            <div
                className={`m-2 p-2 rounded-xl ${showDetails ? "bg-white" : "bg-gray-900"}`}
                onMouseEnter={() => { setShowDetails(true) }}
                onMouseLeave={() => { setShowDetails(false) }}
            >
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/passive/${passive.image.full}`} />
            </div>
            {showDetails && (
                <div className="absolute left-1/4 right-1/4 text-center">
                    <h3 className="text-xl">{passive.name}</h3>
                    <p>{passive.description}</p>
                </div>
            )}
        </div>

    )
}

export default PassiveCard;