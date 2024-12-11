"use client";
import Pokemon from "@/classes/pokemon";
import Loading from "@/components/Loading";
import PokemonCard from "@/components/PokemonCard";
import { getPokemon } from "@/requests/request";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [inputFocus, setInputFocus] = useState(false);
  const [value, setValue] = useState("");
  const [loadingState, setLodingState] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  function inputOnchange(e: any) {
    setValue(e.target.value);
  }
  async function searchSubmit() {
    if (!value) {
      Swal.fire({
        title: "inter id or name of pokemon",
        icon: "error",
        timer: 1200,
      });
      return;
    }
    setPokemonData(null);
    setLodingState(true);
    const { status, data } = await getPokemon(value);
    setLodingState(false);
    switch (status) {
      case 200:
        setPokemonData(data as Pokemon);
        break;
      default:
        Swal.fire({
          title: "error",
          icon: "error",
          text: data as any,
          timer: 1200,
        });
    }
  }

  return (
    <main className="h-max flex flex-col pt-5">
      <div className="h-[10vh] flex items-center justify-center">
        <div className="w-max flex items-center justify-center relative">
          <label
            htmlFor="searchInput"
            className={`absolute text-gray-700 -translate-y-1/2 duration-300 ${
              inputFocus ? "top-0 bg-white px-2 left-1" : "top-1/2 left-3"
            }`}
          >
            pokemon search:
          </label>
          <input
            id="searchInput"
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(Boolean(value))}
            type="text"
            value={value}
            onChange={(e) => inputOnchange(e)}
            className="rounded-md border border-gray-400 pl-3 h-10 focus:outline-none bg-transparent"
          />
        </div>
        <button
          className="px-5 py-2 rounded-md ml-2 cursor-pointer duration-300 hover:bg-green-400 bg-green-500 text-white font-semibold"
          onClick={searchSubmit}
        >
          Search
        </button>
      </div>
      {loadingState && <Loading/>}
      {pokemonData && <PokemonCard pokemon={pokemonData} />}
    </main>
  );
}
