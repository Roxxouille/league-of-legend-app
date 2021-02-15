import { useState } from "react";
import ChampDetails from "../../components/ChampDetails";
import PassiveCard from "../../components/PassiveCard";
import SpellCard from "../../components/SpellCard";

export const getStaticPaths = async () => {
    const res = await fetch('http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion.json');
    const champsObject = await res.json();
    const paths = [];

    for (const key in champsObject.data) {
        paths.push({ params: { cid: key } })
    }

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.cid;
    const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion/${id}.json`);
    const champObject = await res.json();
    return {
        props: {
            champ: champObject.data[id]
        }
    }
}

const Champ = ({ champ }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [currentSpell, setCurrentSpell] = useState({});

    const handleDetails = (show, spell = undefined) => {
        setShowDetails(show);
        if (spell != undefined) {
            setCurrentSpell(spell);
        }
    }

    return (
        <div className="bg-black font-mono text-white font-bold min-h-screen">
            <div className="flex p-12 pb-2 pt-4 cardList">
                {champ.skins.map(skin => {
                    return (
                        <div className="flex relative flex-col p-2 rounded-xl bg-gray-900 h-2/3 shadow-new champCard" key={skin.id}>
                            <img height="560px" width="308px" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${skin.num}.jpg`} />
                            <h2 className=" text-center">{skin.name === "default" ? champ.name : skin.name}</h2>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center p-2 flex-wrap">
                <PassiveCard passive={champ.passive} handleDetails={handleDetails} />
                {champ.spells.map((spell, index) => {
                    return (
                        <SpellCard spell={spell} index={index} key={spell.id} handleDetails={handleDetails} />
                    )
                })}
            </div>
            {showDetails && (
                <div className="flex justify-center">
                    <ChampDetails spell={currentSpell} />
                </div>

            )}
        </div>
    )
}

export default Champ;

