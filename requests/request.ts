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
    //get url of types to fetch
    const typesReq = pokemon.types.map(({ type }: any) => type.url);
    const responses = await Promise.all(
      typesReq.map((typeReq) => axios.get(typeReq))
    );
    const data = responses.map(({ data }: any) => data.pokemon);
    // get abilities of pokemon
    const abilities = pokemon.abilities.map(({ ability }: any) => ability);
    // get all pokemon of types
    let allPokemons = [] as any[];
    data.forEach((ele) => (allPokemons = [...allPokemons, ...ele]));
    allPokemons = allPokemons.map(({ pokemon }: any) => pokemon.url);
    const pokRes = await Promise.all(
      allPokemons.map((pokemon) => axios.get(pokemon))
    );
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
    const pokemonsData = {} as any;
    let {
      data: { results },
    } = await axios.get(`${APIURL}/type`);
    const typeUrl = results.map(
      (res: { url: string; name: string }) => res.url
    );
    const typesData = await Promise.all(
      typeUrl.map((ele: string) => axios.get(ele))
    );
    const data = typesData.map((ele) => ele.data);
    for (const type of data) {
      const { pokemon: pokemons, name } = type;
      const uniqueAbility = new Set();
      let baseExperience = 0;
      for (const pokemon of pokemons) {
        const { url, name } = pokemon.pokemon;
        let abilities = [] as [];
        let base_experience: any;
        if (!pokemonsData[name]) {
          const { data } = await axios.get(url);
          abilities = data.abilities;
          base_experience = data.base_experience;
          pokemonsData[data.name] = data;
        } else {
          abilities = pokemonsData[name].abilities;
          base_experience = pokemonsData[name].base_experience;
        }
        baseExperience += base_experience;
        abilities.forEach(({ ability }: any) => {
          uniqueAbility.add(ability.name);
        });
      }
      types[name] = {
        ability: Array.from(uniqueAbility).length,
        baseExperience: (baseExperience / pokemons.length).toFixed(2),
      };
    }
    return { types };
  } catch (error) {
    return { types: null };
  }
}
