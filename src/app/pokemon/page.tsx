import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import SearchForm from "./components/search-form";
import { Suspense } from 'react';
import PokemonList from "./components/pokemon-list";

export default async function Search() {
  const query = gql`query samplePokeAPIquery {
    pokemon_v2_pokemon(where: {}) {
      pokemon_v2_pokemonsprites(where: {}, limit: 1) {
        sprites(path: "other.home.front_default")
      }
      id
      name
      pokemon_v2_pokemonspecy {
        is_mythical
        is_legendary
        is_baby
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
        slot
        pokemon_v2_pokemon {
          id
        }
      }
    }
  }`;
  const { data, error } = await getClient().query({ query });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchForm></SearchForm>
      <Suspense fallback={<div></div>}>
        <PokemonList pokemonList={data}></PokemonList>
      </Suspense>
    </main>
  );
}

