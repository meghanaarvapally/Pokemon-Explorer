"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define Pokémon types
interface Pokemon {
  name: string;
  url: string;
}
interface PokemonDetail {
  id: string;
  types: { type: { name: string } }[];
}

// Type colors
const typeColors: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  bug: "bg-lime-500",
  ground: "bg-amber-600",
  rock: "bg-stone-500",
  poison: "bg-purple-600",
  flying: "bg-sky-400",
  fairy: "bg-pink-400",
  fighting: "bg-orange-600",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  ghost: "bg-indigo-600",
  dragon: "bg-violet-500",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  normal: "bg-gray-400",
};

export default function Home() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [displayed, setDisplayed] = useState<(Pokemon & PokemonDetail)[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 50;

  useEffect(() => {
    async function fetchAllPokemons() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const data = await res.json();
      setAllPokemons(data.results);
      loadPageData(0, data.results);
    }
    fetchAllPokemons();
  }, []);

  async function loadPageData(pageNum: number, list = allPokemons) {
    const start = pageNum * limit;
    const pagePokemons = list.slice(start, start + limit);
    const detailed = await Promise.all(
      pagePokemons.map(async (p) => {
        const id = p.url.split("/").filter(Boolean).pop()!;
        const details = await fetch(p.url).then((r) => r.json());
        return { ...p, id, types: details.types };
      })
    );
    setDisplayed(detailed);
  }

  async function handleSearch(value: string) {
    setSearch(value);
    if (value.trim() === "") {
      loadPageData(page);
      return;
    }
    const matches = allPokemons.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    const detailed = await Promise.all(
      matches.slice(0, 50).map(async (p) => {
        const id = p.url.split("/").filter(Boolean).pop()!;
        const details = await fetch(p.url).then((r) => r.json());
        return { ...p, id, types: details.types };
      })
    );
    setDisplayed(detailed);
  }

  function nextPage() {
    const newPage = page + 1;
    setPage(newPage);
    loadPageData(newPage);
  }

  function prevPage() {
    const newPage = Math.max(page - 1, 0);
    setPage(newPage);
    loadPageData(newPage);
  }

  const totalPages = Math.ceil(allPokemons.length / limit);

  return (
    <main className="p-6 min-h-screen bg-slate-100">
      {/* Title */}
      <div className="flex justify-center items-center gap-3 mb-10">
        <h1
          style={{
            color: "#FBBF24",
            textShadow: `
            -2px -2px 0 #2563EB,
            2px -2px 0 #2563EB,
            -2px  2px 0 #2563EB,
            2px  2px 0 #2563EB`,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 10,
          }}
          className="text-[3rem] max-[640px]:text-[2rem] text-center"
        >
          Pokémon Explorer
        </h1>
        <div className="w-10 h-10">
          <img
            src="/pokeball1.png"
            alt="pokeball"
            className="w-full h-full object-contain animate-spin-slow"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-[600px] h-14 border border-gray-300 rounded-full px-8 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-4 max-[640px]:grid-cols-2"
        style={{ columnGap: "1rem", rowGap: "3rem" }}
      >
        {displayed.map((pokemon) => {
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

          return (
            <Link href={`/${pokemon.id}`} key={pokemon.name}>
              <div className="bg-white p-4 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer text-center">
                <img
                  src={image}
                  alt={pokemon.name}
                  className="mx-auto object-contain"
                  style={{ width: "13rem", height: "13rem" }}
                />
                <p className="text-xs text-gray-500 mt-1">#{pokemon.id}</p>
                <h2 className="capitalize font-semibold mt-2 text-lg text-slate-800">
                  {pokemon.name}
                </h2>

                {/* Type Badges */}
                <div
                  className="flex flex-wrap justify-center mt-3"
                  style={{ gap: "0.5rem" }}
                >
                  {pokemon.types.map((t) => {
                    const color =
                      {
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
                      }[t.type.name] || "#9ca3af";
                    return (
                      <span
                        key={t.type.name}
                        style={{
                          backgroundColor: color,
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          fontSize: "1rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {t.type.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {search.trim() === "" && (
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex items-center gap-6">
            <button
              onClick={prevPage}
              disabled={page === 0}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-gray-700">
              Page {page + 1} of {totalPages || 1}
            </span>
            <button
              onClick={nextPage}
              disabled={page + 1 >= totalPages}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
