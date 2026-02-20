import { useState } from "react";
import { useGetItemsQuery } from "../api/slices";
import { SearchBar } from "./SearchBar.jsx";
import { PokemonCard } from "./ProductsCard.jsx";
import { Link } from "react-router-dom";

export const Products = () => {
  const { data: pokemon, error, isLoading } = useGetItemsQuery();
  const [searchResult, setSearchResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPokemonDetails, setLoadedPokemonDetails] = useState([]);
  const pokemonPerPage = 10;

  const handleSearchChange = (query) => {
    setSearchResult(query);
    setCurrentPage(1);
  };

  const handlePokemonLoad = (pokemonData) => {
    setLoadedPokemonDetails((prev) => {
      const exists = prev.find((p) => p.id === pokemonData.id);
      if (exists) return prev;
      return [...prev, pokemonData];
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">
            Cargando Pokémon...
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
            {error.message || JSON.stringify(error)}
          </p>
        </div>
      </div>
    );
  }

  // Calcular índices de paginación
  const pokemonList = pokemon.results.slice(0, 151);

  // Filtrar Pokémon basándose en la búsqueda
  let filteredPokemon = pokemonList;
  if (
    searchResult &&
    searchResult.trim() !== "" &&
    loadedPokemonDetails.length > 0
  ) {
    const query = searchResult.toLowerCase();
    filteredPokemon = pokemonList.filter((poke) => {
      // Buscar en los detalles cargados
      const pokemonDetail = loadedPokemonDetails.find(
        (p) => p.name === poke.name
      );

      if (!pokemonDetail) {
        // Si no está cargado, permitir que se muestre para que se cargue
        return true;
      }

      const matchesName = pokemonDetail.name.toLowerCase().includes(query);
      const matchesType = pokemonDetail.types.some((t) =>
        t.type.name.toLowerCase().includes(query)
      );
      const matchesId = pokemonDetail.id.toString().includes(query);

      return matchesName || matchesType || matchesId;
    });
  }

  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Funciones de navegación
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log(pokemon);
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="bg-gray-900 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-600">Pokédex</h1>
              <p className="text-white mt-1">
                Explora el mundo Pokémon - Prueba Técnica Devdatep
              </p>
            </div>
            <Link
              to="/tasks"
              className="group relative inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Tareas →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-3xl">🔍</span>
              Buscar Pokémon
            </h2>
            <SearchBar onSearch={handleSearchChange} />
          </div>
        </div>

        {/* Pokemon Grid Section */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-100">
              Pokémon ({filteredPokemon.length}
              {searchResult && searchResult.trim() !== ""
                ? ` de ${pokemonList.length}`
                : ""}
              )
            </h2>
            <div className="text-white">
              Página {currentPage} de {totalPages} | Mostrando{" "}
              {indexOfFirstPokemon + 1}-
              {Math.min(indexOfLastPokemon, filteredPokemon.length)} de{" "}
              {filteredPokemon.length}
            </div>
          </div>

          {filteredPokemon.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">
                No se encontraron Pokémon que coincidan con "{searchResult}"
              </p>
            </div>
          ) : (
            <>
              <ul
                style={{ padding: 0 }}
                className="grid grid-cols-5 gap-4 mb-6"
              >
                {currentPokemon.map((poke) => (
                  <PokemonCard
                    key={poke.name}
                    pokemonUrl={poke.url}
                    onPokemonLoad={handlePokemonLoad}
                    searchQuery={null}
                  />
                ))}
              </ul>

              {/* Controles de paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-linear-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Anterior
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => {
                        // Mostrar solo algunas páginas alrededor de la actual
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 2 &&
                            pageNumber <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageClick(pageNumber)}
                              className={`px-3 py-2 rounded-lg transition-colors ${
                                currentPage === pageNumber
                                  ? "bg-purple-600 text-white font-bold shadow-lg"
                                  : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPage - 3 ||
                          pageNumber === currentPage + 3
                        ) {
                          return (
                            <span
                              key={pageNumber}
                              className="px-2 text-gray-400"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
