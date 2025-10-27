"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [evolution, setEvolution] = useState<any[]>([]);

  const typeColors: Record<string, string> = {
    fire: "#ef4444",
    water: "#3b82f6",
    grass: "#22c55e",
    electric: "#facc15",
    bug: "#84cc16",
    ground: "#d97706",
    rock: "#78716c",
    poison: "#9333ea",
    flying: "#38bdf8",
    fairy: "#f472b6",
    fighting: "#ea580c",
    psychic: "#ec4899",
    ice: "#22d3ee",
    ghost: "#4f46e5",
    dragon: "#8b5cf6",
    dark: "#374151",
    steel: "#6b7280",
    normal: "#9ca3af",
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);

      const speciesRes = await fetch(data.species.url);
      const species = await speciesRes.json();

      const evoRes = await fetch(species.evolution_chain.url);
      const evoData = await evoRes.json();

      const chain: any[] = [];
      let evo = evoData.chain;
      while (evo) {
        chain.push(evo.species);
        evo = evo.evolves_to[0];
      }
      setEvolution(chain);
    }

    fetchData();
  }, [id]);

  if (!pokemon)
    return <div className="text-center text-gray-700 p-10">Loading...</div>;

  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] || "#94a3b8";
  const backgroundStyle = {
    background: `linear-gradient(180deg, ${bgColor} 0%, #f1f5f9 90%)`,
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={backgroundStyle}
    >
      <Link
        href="/"
        className="text-white font-semibold bg-blue-600 px-4 py-2 rounded-full shadow hover:bg-blue-700 mb-6"
      >
        ← Back
      </Link>

      {/* White card container */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl text-center flex flex-col items-center justify-center">
        {/* Pokémon Image */}
        <img
          src={
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="mx-auto w-52 h-52 object-contain drop-shadow-xl mb-4"
        />

        {/* Name and ID */}
        <h1 className="capitalize text-4xl font-extrabold text-gray-800">
          {pokemon.name}
        </h1>
        <p className="text-gray-500 text-sm mb-3">#{pokemon.id}</p>

        {/* Type Badges */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {pokemon.types.map((t: any) => (
            <span
              key={t.type.name}
              style={{
                backgroundColor: typeColors[t.type.name] || "#9ca3af",
                color: "white",
                padding: "6px 12px",
                borderRadius: "9999px",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Basic Info */}
        <div className="text-center text-gray-700 mb-6 space-y-2">
          <p>
            <strong>Height:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
          </p>
        </div>

        {/* Base Stats */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Base Stats</h2>
        <div className="space-y-2 text-centre w-full mb-6">
          {pokemon.stats.map((s: any) => (
            <div key={s.stat.name}>
              <p className="text-gray-700 text-sm capitalize">
                {s.stat.name}: {s.base_stat}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  style={{
                    width: `${s.base_stat / 2}%`,
                    backgroundColor: bgColor,
                  }}
                  className="h-2 rounded-full"
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Evolution Chain */}
        {evolution.length > 1 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Evolution Chain
            </h2>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {evolution.map((evo) => {
                const evoId = evo.url.split("/").filter(Boolean).pop();
                return (
                  <div key={evo.name} className="text-center">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoId}.png`}
                      alt={evo.name}
                      className="mx-auto drop-shadow-md"
                      style={{ width: "15rem", height: "15rem" }}
                    />
                    <p className="capitalize text-gray-700 text-sm mt-1">
                      {evo.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
