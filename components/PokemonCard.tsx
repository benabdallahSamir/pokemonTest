"use client";
import Pokemon from "@/classes/pokemon";
import Link from "next/link";
type props = {
  pokemon: Pokemon;
};
function PokemonCard({ pokemon }: props) {
  return (
    <Link
      className="flex flex-col justify-between m-auto w-80 h-96 py-10 rounded-md border cursor-pointer border-gray-300 duration-150 hover:shadow-xl  group perspective"
      href={`/details/${pokemon.name}`}
    >
      <h1 className="text-center font-bold text-3xl capitalize">
        {pokemon.name}
      </h1>
      <img src={pokemon.images.front} alt="front" className="mx-auto w-44" />
      <section className="text-center">
        <h2 className="font-semibold">Abilities</h2>
        <p>
          {pokemon.abilities.map(({ability}: any) => `${ability.name} `)}
        </p>
      </section>
    </Link>
  );
}

export default PokemonCard;
