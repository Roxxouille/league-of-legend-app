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
    <Flipper flipKey={champs} className="bg-black min-h-screen">
      <input className="rounded bg-gray-100 ml-12 mt-10 p-2 font-bold" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
      <div className="p-10 pt-0 flex flex-wrap justify-around">
        {champs && champs.map(champ => {
          return (
            <Flipped key={champ.id} flipId={champ.id}>
              <div className="text-center p-2 font-mono font-bold text-m bg-gray-900 m-2 rounded-xl text-white">
                <Link href={`/champ/${champ.id}`}>
                  <a>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/champion/${champ.image.full}`} />{champ.name}
                  </a>
                </Link>
              </div>
            </Flipped>
          );
        })}
      </div>
    </Flipper>
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