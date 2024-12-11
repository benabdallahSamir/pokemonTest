import Pokemon from "@/classes/pokemon";
import axios from "axios";
const APIURL = "https://pokeapi.co/api/v2";
export async function getPokemon(key: string) {
  try {
    if (!key) return { status: 422 };
    const { status, data } = await axios.get(`${APIURL}/pokemon/${key}`);
    const pokemonData = new Pokemon(data);
    return { status, data: pokemonData };
  } catch (error: any) {
    if (!error.response) return { status: 10 };
    return { status: error.response.status };
  }
}
export const getRelatedPokemon = async (pokemon: Pokemon) => {
  try {
    const typesReq = pokemon.types.map(({ type }: any) => axios.get(type.url));
    const abilities = pokemon.abilities.map(({ ability }: any) => ability);
    const responses = await Promise.all(typesReq);
    const data = responses.map(({ data }: any) => data.pokemon);
    let allPokemons = [] as any[];
    data.forEach((ele) => (allPokemons = [...allPokemons, ...ele]));
    allPokemons = allPokemons.map(({ pokemon }: any) => axios.get(pokemon.url));
    const pokRes = await Promise.all([...allPokemons]);
    let pokemons = pokRes.map(({ data }) => new Pokemon(data));
    pokemons = pokemons.filter((ele) => {
      return ele.abilities.filter(({ ability }: any) => {
        for (let i = 0; i < abilities.length; i++) {
          if (abilities[i].name === ability.name) return true;
        }
        return false;
      }).length;
    });
    return { status: 200, data: pokemons };
  } catch (error) {
    return { status: 10 };
  }
  // hundle result
};
export async function getPokemonDashboard() {
  try {
    const types = {} as any;
    const {
      data: { results },
    } = await axios.get(`${APIURL}/type`);
    for (const type of results) {
      const { url, name } = type;
      const {
        data: { pokemon: pokemons },
      } = await axios.get(url);
      const uniqueAbility = new Set();
      let baseExperience = 0;
      let n = 0;
      for (const pokemon of pokemons) {
        const { url } = pokemon.pokemon;
        const {
          data: { abilities ,base_experience},
        } = await axios.get(url);
        baseExperience += base_experience;
        n ++;
        abilities.forEach(({ ability }: any) => {
          uniqueAbility.add(ability.name);
        });
      }

      types[name] = {
        ability : Array.from(uniqueAbility),
        baseExperience : (baseExperience/n).toFixed(2)
      };
    }
    return { types };
  } catch (error) {
    console.log(error);
  }
}
