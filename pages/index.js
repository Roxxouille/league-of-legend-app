import { useEffect, useState } from "react";
import { Flipper, Flipped } from 'react-flip-toolkit';
import Link from 'next/link';

export default function Home({ champsProps }) {
  const [search, setSearch] = useState('');
  const [champs, setChamps] = useState(champsProps);

  useEffect(() => {
    let champsAfterResearch = champsProps.filter((champ) =>
      champ.name.toLowerCase().includes(search.toLowerCase())
    );
    setChamps(champsAfterResearch);
  }, [search])

  return (
    <Flipper flipKey={champs} className="bg-black min-h-screen w-auto">
      <div className="p-10 flex flex-wrap justify-center">
        <div className="w-full m-2 flex justify-center">
          <input className="bg-gray-100 p-2 font-bold outline-none border-black border-8 rounded  focus:border-gray-900" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
        </div>
        {champs && champs.map(champ => {
          return (
            <Flipped key={champ.id} flipId={champ.id}>
              <Link href={`/champ/${champ.id}`}>
                <div className="text-center p-2 font-mono font-bold text-m bg-gray-900 m-2 rounded-xl text-white cursor-pointer hover:bg-white hover:text-black">
                  <a>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/champion/${champ.image.full}`} />{champ.name}
                  </a>
                </div>
              </Link>
            </Flipped>
          );
        })}
      </div>
    </Flipper >
  )
}

export async function getStaticProps() {
  const res = await fetch('http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion.json');
  const champsObject = await res.json();

  const champsProps = [];

  for (const key in champsObject.data) {
    champsProps.push(champsObject.data[key]);
  }
  return {
    props: {
      champsProps
    }
  }
}