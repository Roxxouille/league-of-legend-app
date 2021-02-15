import { useState } from "react";
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
    console.log(champ);
    return (
        <div className="bg-black h-screen font-mono text-white font-bold">
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
            <div className="flex justify-center p-2 ">
                <PassiveCard passive={champ.passive}/>
                {champ.spells.map((spell, index) => {
                    return (
                        <SpellCard spell={spell} index={index} key={spell.id}/>
                    )
                })}
            </div>
        </div>
    )

    return (
        <div>
            <h1>{champ.name}</h1>
            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.name}_0.jpg`} />
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/passive/${champ.passive.image.full}`} />
            {champ.spells.map(spell => {
                return (
                    <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${spell.image.full}`} />
                )
            })}
        </div>
    )
}

export default Champ;

