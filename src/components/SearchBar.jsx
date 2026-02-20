import { useEffect, useState } from "react";
import { useSearch } from "../hooks/useSearch";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useSearch(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar pokémon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg w-64"
      />
    </div>
  );
};
