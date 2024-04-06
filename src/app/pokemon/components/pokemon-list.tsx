"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: any[],
  pokemon_v2_pokemontypes: any[]
}

export default function PokemonList({
  pokemonList,
}) {
  const searchParams = useSearchParams();
  const search: string = searchParams.get('s') || '';
  const filteredData = pokemonList.pokemon_v2_pokemon.filter((pokemon_v2) => {
    return pokemon_v2.name.includes(search);
  });
  function getBorderColor(type: string) {
    let border = '';
    if (type == 'grass') {
      border = 'border-green-400'
    }
    else if (type == 'fire') {
      border = 'border-rose-700'
    }
    else if (type == 'water') {
      border = 'border-sky-500'
    }
    else if (type == 'bug') {
      border = 'border-green-700'
    }
    else if (type == 'poison') {
      border = 'border-purple-700'
    }
    else if (type == 'fairy') {
      border = 'border-pink-400'
    }
    else if (type == 'normal') {
      border = 'border-slate-800'
    }
    else if (type == 'electric') {
      border = 'border-yellow-300'
    }
    return border;
  }
  return (
    <div className="pokemon-list mb-6">
      {
        filteredData.map((pokemon_v2: Pokemon) => {
          let border = ''
          let types: string[] = []
          {
            pokemon_v2.pokemon_v2_pokemontypes.forEach((type) => {
              types.push(type.pokemon_v2_type.name);
              if (type.slot == 1) {
                border = getBorderColor(type.pokemon_v2_type.name);
              }
            });
          }
          return (<div className={`p-4 pokemon border-8 rounded-lg ${border} mb-2 w-96 h-68 bg-slate-100`} key={pokemon_v2.id} >
            <h1>{pokemon_v2.id}</h1>
            <h1>{pokemon_v2.name}</h1>
            {types.map((type) => {
              return (<h1 key={type}>{type}</h1>);
            })}
            {/* {console.log(pokemon_v2.pokemon_v2_pokemontypes)} // loop through this */}
            {/* {pokemon_v2.pokemon_v2_pokemontypes.forEach((type) => { */}
            {/*   return type; */}
            {/* })} */}
            {/* <h1>{mainType}</h1> */}
            {
              pokemon_v2.pokemon_v2_pokemonsprites.map((sprites) => (
                <img src={sprites.sprites} className="p-1 m-auto h-48" key={pokemon_v2.id} />
              ))
            }
          </div>
          )
        })
      }
    </div >
  )
}
