import { useState } from "react";

const SpellCard = ({ spell, index, handleDetails }) => {
    const [showDetails, setShowDetails] = useState(false);
    const control = ["Q", "W", "E", "R"];
    return (
        <div className="">
            <div
                className={`m-2 p-2 rounded-xl ${showDetails ? "bg-white" : "bg-gray-900"} relative`}
                onMouseEnter={() => { handleDetails(true, spell); setShowDetails(true) }}
                onMouseLeave={() => { handleDetails(false); setShowDetails(false) }}
            >
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${spell.image.full}`} />
                <p className="absolute right-0 bottom-0 bg-opacity-50 bg-black p-2 py-0">{control[index]}</p>
            </div>
        </div>

    )
}

export default SpellCard;