import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";
import SearchForm from "./components/search-form";
import { Suspense } from 'react';

interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: any[]
}
export default async function Search({
  searchParams,
}: {
  searchParams?: {
    s?: string;
    page?: string;
  };
}) {
  const s = searchParams?.s || '';
  const currentPage = Number(searchParams?.page) || 1;
  const query = gql`query samplePokeAPIquery {
    pokemon_v2_pokemon(where: {name: {_like: "%${s}%"}}) {
      pokemon_v2_pokemonsprites(where: {}, limit: 1) {
        sprites
      }
      id
      name
    }
  }`;
  const { data, error } = await getClient().query({ query });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchForm></SearchForm>
      <Suspense fallback={<div></div>}>
        {
          data.pokemon_v2_pokemon.map((pokemon_v2: Pokemon) => (
            <div className="pokemon border-2 rounded-sm border-sky-500 mb-2 w-96 h-64" key={pokemon_v2.id}>
              <h1>{pokemon_v2.id}</h1>
              <h1>{pokemon_v2.name}</h1>
              {pokemon_v2.pokemon_v2_pokemonsprites.map((sprites) => (
                <img src={sprites.sprites.other.home.front_default} className="h-48" key={pokemon_v2.id} />
              ))}
            </div>
          ))
        }
      </Suspense>
    </main>
  );
}

