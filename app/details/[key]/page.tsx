"use client";
import Pokemon from "@/classes/pokemon";
import PokemonCard from "@/components/PokemonCard";
import { getPokemon, getRelatedPokemon } from "@/requests/request";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function page() {
  const { key } = useParams();
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [relatedPokemon, setRelatedPokemon] = useState<Pokemon[]>([]);
  function hundleError(text: string) {
    Swal.fire({
      title: "oops !!!",
      text,
      icon: "error",
      timer: 1200,
    });
  }
  useEffect(() => {
    (async function () {
      let { status, data: pokemon } = await getPokemon(key as string);
      switch (status) {
        case 200:
          setPokemonData(pokemon as Pokemon);
          break;
        default:
          hundleError(pokemon as any);
      }
    })();
  }, []);
  useEffect(() => {
    (async function () {
      if (pokemonData !== null) {
        const { status, data } = await getRelatedPokemon(
          pokemonData as Pokemon
        );
        if (status === 200) setRelatedPokemon(data as Pokemon[]);
        else hundleError("internal server error");
      }
    })();
  }, [pokemonData]);
  return (
    <div className="h-max flex flex-col items-center py-10">
      {pokemonData ? (
        <>
          <header className="px-4 py-10 w-96 border rounded-md border-gray-300 flex flex-col">
            <div className="flex">
              <img
                src={pokemonData?.images.front}
                className="mr-5 w-40"
                alt="front"
              />
              <img
                src={pokemonData?.images.back}
                className=" w-40"
                alt="back"
              />
            </div>
            <p className="text-3xl text-center font-extrabold mb-3">
              {pokemonData?.name}
            </p>
            <p className="text-center">
              <span className="capitalize font-semibold font-xl mr-3">
                abilities:
              </span>
              {pokemonData?.abilities.map(
                (ability: any) => `${ability.ability.name} `
              )}
            </p>
            <p className="text-center">
              <span className="capitalize font-semibold font-xl mr-2">
                types:
              </span>
              {pokemonData?.types.map((ele: any) => `${ele.type.name} `)}
            </p>
          </header>
          <h1 className="text-3xl font-extrabold text-center capitalize my-10">
            pokemons has same type or ability:
          </h1>
          <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-3 justify-center w-full h-max px-20">
            {relatedPokemon.map((p, index) => (
              <PokemonCard pokemon={p} key={index} />
            ))}
          </section>
        </>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default page;
