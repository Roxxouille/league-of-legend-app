import { useState } from "react";

const SpellCard = ({ spell, index }) => {
    const [showDetails, setShowDetails] = useState(false);
    const control = ["Q", "W", "E", "R"];
    return (
        <div className="">
            <div
                className={`m-2 p-2 rounded-xl ${showDetails ? "bg-white" : "bg-gray-900"}`}
                onMouseEnter={() => { setShowDetails(true) }}
                onMouseLeave={() => { setShowDetails(false) }}
            >
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${spell.image.full}`} />
                <p className="absolute right-0 bottom-0 bg-opacity-50 bg-black p-2 py-0">{control[index]}</p>
            </div>
            {showDetails && (
                <div className="absolute left-1/4 right-1/4 text-center">
                    <h3 className="text-xl">{spell.name}</h3>
                    <p>{spell.description}</p>
                </div>
            )}
        </div>

    )
}

export default SpellCard;