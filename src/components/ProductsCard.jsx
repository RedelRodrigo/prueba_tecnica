import { useEffect } from "react";
import { useGetPokemonQuery } from "../api/slices";
import { useNavigate } from "react-router-dom";

export const PokemonCard = ({ pokemonUrl, onPokemonLoad }) => {
  const navigate = useNavigate();
  const pokemonId = pokemonUrl.split("/").filter(Boolean).pop();
  const { data: pokemon, error, isLoading } = useGetPokemonQuery(pokemonId);

  useEffect(() => {
    if (pokemon) {
      onPokemonLoad(pokemon);
    }
  }, [pokemon, onPokemonLoad]);

  if (isLoading) {
    return (
      <div className="bg-gray-700 w-50 h-80 flex items-center justify-center p-4 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-300 text-sm mt-2">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-700 w-50 h-80 flex items-center justify-center p-4 rounded-lg">
        <p className="text-red-400 text-sm">Error al cargar</p>
      </div>
    );
  }

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-500 w-50 h-80 flex items-center justify-center p-4 rounded-lg hover:transition-transform hover:scale-105 cursor-pointer"
    >
      <li key={pokemon.id} style={{ marginBottom: "20px", listStyle: "none" }}>
        <h3>
          #{pokemon.id} -{" "}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          style={{ height: "170px" }}
        />
        <p>
          Altura: {pokemon.height} | Peso: {pokemon.weight}
        </p>
        <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      </li>
    </div>
  );
};
