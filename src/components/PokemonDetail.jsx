import { useParams, useNavigate } from "react-router-dom";
import { useGetPokemonQuery } from "../api/slices";

export const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pokemon, error, isLoading } = useGetPokemonQuery(id);

  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">
            Cargando detalles del Pokémon...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2 text-center">
            Error al cargar
          </h2>
          <p className="text-white text-center">
            {error.message || "Error al cargar el Pokémon"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            ← Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="bg-gray-900 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-600">
                Detalles del Pokémon
              </h1>
              <p className="text-white mt-1">
                Información completa del Pokémon
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="group relative inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>← Volver a la lista</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4 capitalize text-purple-400">
              #{pokemon.id} - {pokemon.name}
            </h1>

            <div className="bg-gray-800 rounded-xl p-8 mb-6">
              <img
                src={
                  pokemon.sprites.other.dream_world.front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="w-64 h-64 object-contain"
              />
            </div>

            <div className="w-full space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <span>📊</span> Información Básica
                </h2>
                <p className="text-lg text-gray-200">
                  <span className="font-semibold text-blue-400">Altura:</span>{" "}
                  {pokemon.height / 10} m
                </p>
                <p className="text-lg text-gray-200">
                  <span className="font-semibold text-blue-400">Peso:</span>{" "}
                  {pokemon.weight / 10} kg
                </p>
                <p className="text-lg text-gray-200">
                  <span className="font-semibold text-blue-400">
                    Experiencia Base:
                  </span>{" "}
                  {pokemon.base_experience}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <span>🏷️</span> Tipos
                </h2>
                <div className="flex gap-2">
                  {pokemon.types.map((t) => (
                    <span
                      key={t.type.name}
                      className="px-4 py-2 text-white rounded-full capitalize"
                      style={{
                        backgroundColor: typeColors[t.type.name] || "#777",
                      }}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <span>⚡</span> Habilidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg capitalize shadow-md"
                    >
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden && " (Oculta)"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <span>📈</span> Estadísticas
                </h2>
                <div className="space-y-3">
                  {pokemon.stats.map((stat) => (
                    <div
                      key={stat.stat.name}
                      className="flex items-center gap-2"
                    >
                      <span className="w-32 capitalize font-semibold text-gray-200">
                        {stat.stat.name.replace("-", " ")}:
                      </span>
                      <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-linear-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (stat.base_stat / 255) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-12 text-right font-bold text-blue-400">
                        {stat.base_stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <span>🎨</span> Sprites
                </h2>
                <div className="grid grid-cols-4 gap-3">
                  {pokemon.sprites.front_default && (
                    <div className="bg-gray-700 rounded-lg p-2">
                      <img
                        src={pokemon.sprites.front_default}
                        alt="front"
                        className="w-full"
                      />
                    </div>
                  )}
                  {pokemon.sprites.back_default && (
                    <div className="bg-gray-700 rounded-lg p-2">
                      <img
                        src={pokemon.sprites.back_default}
                        alt="back"
                        className="w-full"
                      />
                    </div>
                  )}
                  {pokemon.sprites.front_shiny && (
                    <div className="bg-gray-700 rounded-lg p-2">
                      <img
                        src={pokemon.sprites.front_shiny}
                        alt="front shiny"
                        className="w-full"
                      />
                    </div>
                  )}
                  {pokemon.sprites.back_shiny && (
                    <div className="bg-gray-700 rounded-lg p-2">
                      <img
                        src={pokemon.sprites.back_shiny}
                        alt="back shiny"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
